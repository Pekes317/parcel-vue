/**
 * Project Builder for Parcel to work with Nrwl NX Workspace
 */
/// <reference path="./models/workspace.type.js" />
/// <reference path="./models/bundler.types.js" />

const { existsSync, readFileSync } = require('fs');
const { join } = require('path');
const { argv } = require('yargs');
const { prototype: ParcelOpts } = require('parcel');

const { allFilesSync } = require('./utils/all-files-sync');
const Bundler = require('./utils/bundler');
const Logger = require('./utils/logger');

/**
 * Prepare data for Bundler
 * @function setBundleOpts
 * @param {Project} project
 * @param {Targets} target
 * @param {string} rootPath
 * @param {string} architect
 *
 * @returns {BundlerOptions} bundleData
 */
const setBundleOpts = (project, target, rootPath, architect) => {
  const options = target.options ? target.options : {};
  /** @type {string[]} */
  const assetsPaths = [];
  const opts = {
    ...ParcelOpts.options,
    outDir: options.outputPath,
    watch: true,
  };
  if (options.assets) {
    options.assets.forEach(asset => {
      const list = allFilesSync(join(rootPath, asset));
      assetsPaths.push(...list);
    });
  }

  const bundleData = {
    assets: assetsPaths,
    bundleOpts: opts,
    entryFile: join(rootPath, options.index ? options.index : options.main),
    hasStatic: options.staticPath ? true : false,
    port: argv.port ? argv.port : 4200,
    prod: false,
    static: options.staticPath ? join(rootPath, options.staticPath) : '',
    type: project.projectType,
    universal: /(server)/.test(architect),
  };

  return bundleData;
};

/**
 * Parses the Workspace config via angular.json or workspace.json
 * @function getWorkspaceConfig
 * @param {string} rootPath
 *
 * @returns {Workspace} Workspace
 */
const getWorkspaceConfig = rootPath => {
  const jsonOpts = {
    angular: 'angular.json',
    nx: 'workspace.json',
  };
  let path = '';
  if (existsSync(join(rootPath, jsonOpts.angular))) {
    path = join(rootPath, jsonOpts.angular);
  } else if (existsSync(join(rootPath, jsonOpts.nx))) {
    path = join(rootPath, jsonOpts.nx);
  } else {
    Logger.error(
      `No workspace detected. Make sure that either ${jsonOpts.angular} or ${
        jsonOpts.nx
      } has be created in the project.`,
      3,
    );
  }

  return JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
};

(async () => {
  /**
   * @enum {string} envs
   */
  const envs = {
    dev: 'development',
    prod: 'production',
  };
  const env = (process.env.NODE_ENV = argv.prod ? envs.prod : envs.dev);
  const isProd = env === envs.prod;
  const projectRoot = process.cwd();
  const workspace = getWorkspaceConfig(projectRoot);

  /** @type {string} */
  const selectProject = argv.project ? argv.project : workspace.defaultProject;

  /** @type {string} */
  const selectArchitect = argv.config ? argv.config : 'serve';
  const project = workspace.projects[selectProject];

  if (!project) {
    Logger.error(`Project ${selectProject} doesn't exist in the workspace.`, 4);
  }

  const architect = project.architect[selectArchitect];

  /**
   * @enum {string} builders
   */
  const builders = {
    build: 'parcel:build',
    serve: 'parcel:serve',
  };

  if (!architect) {
    Logger.error(`Project ${selectProject} isn't configured with ${selectArchitect}.`, 4);
  }

  if (architect.builder && !/(parcel)/.test(architect.builder)) {
    Logger.error(`The ${selectArchitect} architect for the ${selectProject} project isn't configured for Parcel.`, 9);
  }

  const bundleOpts = setBundleOpts(project, architect, projectRoot, selectArchitect);
  bundleOpts.prod = isProd;

  const bundler = new Bundler(bundleOpts);
  if (architect.builder && architect.builder === builders.build) {
    await bundler.build();
  }

  if (architect.builder && architect.builder === builders.serve) {
    await bundler.serve();
  }
})();
