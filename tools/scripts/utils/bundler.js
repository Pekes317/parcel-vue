/// <reference path="../models/bundler.types.js" />
const { existsSync } = require('fs');
const Parcel = require('parcel');
const shell = require('shelljs');
const { generateSW } = require('workbox-build');

const Logger = require('./logger');

/**
 * Class used to run Parcel
 * @class Bundler
 */
class Bundler {
  /**
   * Bundle Options
   *
   * @private
   * @type {BundlerOptions}
   */
  options = {};

  /**
   * Bundle Options
   *
   * @private
   * @type {Parcel} */
  parcel = {};

  /**
   *
   * @param {BundlerOptions} opts
   */
  constructor(opts) {
    this.options = this.normalizeOptions(opts);
    this.parcel = new Parcel(this.options.entryFile, this.options.bundleOpts);
  }

  /**
   * Bundle Code
   * @public
   * @async
   */
  async build() {
    Logger.info(`The ${this.options.type} is being compiling a build.`);
    await this.parcel.loadPlugins();
    if (this.options.prod) {
      this.handleAssets();
    } else {
      this.finishBuild();
    }

    this.parcel.bundle();
  }

  /**
   * Serve Code on a Local Server
   * @public
   * @async
   */
  async serve() {
    Logger.info(`The ${this.options.type} is being compiling for Local Server.`);
    if (this.options.prod) {
      this.handleAssets();
    }

    this.parcel.serve(this.options.port);
  }

  /**
   * Builds Service Work
   * @private
   *
   */
  buildSW() {
    return generateSW({
      globDirectory: this.options.bundleOpts.outDir,
      globPatterns: ['**/*.{html,json,js,css,png,ico,jpg,jpeg,gif,svg}'],
      swDest: `${this.options.bundleOpts.outDir}/service-worker.js`,
    });
  }

  /**
   * Exit Node Process
   * @private
   */
  exitProcess() {
    Logger.success(`The ${this.options.type} has finished`);
    process.exit(0);
  }

  /**
   * Finish Non-Prod Build
   * @private
   */
  finishBuild() {
    this.parcel.on('buildEnd', async () => {
      await this.parcel.loadPlugins();
      if (!this.options.universal) {
        await this.buildSW();
      }
      this.exitProcess();
    });
  }

  /**
   * Handle Static Assets for Prof Deployment
   * @private
   */
  handleAssets() {
    this.parcel.on('buildEnd', async () => {
      await this.parcel.loadPlugins();
      if (!this.options.universal) {
        await this.buildSW();
      }

      this.options.assets.forEach(file => {
        const asset = this.parcel.getLoadedAsset(file);
        const genFile = asset && asset.parentBundle ? asset.parentBundle.name : '';

        if (genFile && existsSync(genFile)) {
          if (this.options.hasStatic) {
            shell.mkdir('-p', this.options.static);
            shell.mv('-f', genFile, this.options.static);
          } else {
            shell.rm('-f', genFile);
          }
        }
      });

      this.exitProcess();
    });
  }

  /**
   * Normaliza Option to fix for Universal/SSR
   *
   * @private
   * @param {BundlerOptions} opts - Represents the Options
   *
   * @returns {BundlerOptions} options
   */
  normalizeOptions(opts) {
    let options = opts;
    if (opts.prod && opts.universal) {
      process.env.NODE_ENV = 'Universal';
      options = {
        ...opts,
        bundleOpts: {
          ...opts.bundleOpts,
          production: opts.universal,
          minify: opts.universal,
        },
      };
    }

    return options;
  }
}

module.exports = Bundler;
