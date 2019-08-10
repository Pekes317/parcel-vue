/**
 * Represents a Workspace object
 * @description NX Workspace Configuration
 * @typedef {object} Workspace
 *
 * @property {integer} version - File format version
 * @property {Cli} [cli] - Represents a CLI object
 * @property {Schematics} [schematics] - Represents a Schmeatics object
 * @property {string} [newProjectRoot] - Path where new projects will be created.
 * @property {string} [defaultProject] - Default project name used in commands.
 * @property {Projects} [projects] - Represents a Projects object
 *
 * @typedef {object} Cli - Defines the CLI congifuration options
 *
 * @property {string} [defaultCollection] - The default schematics collection to use.
 * @property {PackageManager} [packageManager] - Specify which package manager tool to use.
 * @property {Warnings} [warnings] - Control CLI specific console warnings
 *
 * @typedef {object} Warnings - Represents a Warnings object
 *
 * @property {boolean} [versionMismatch] - Show a warning when the global version is newer than the local one.
 * @property {boolean} [typescriptMismatch] - Show a warning when the TypeScript version is incompatible.
 *
 * @typedef {{[key: string]: ObjectLike}} Schematics - Defines the congfiguration of a Schematics
 *
 * @typedef {{[key: string]: any}} ObjectLike
 *
 * @typedef {{[key: string]: Project}} Projects - Defines the list of Projects as an Object
 *
 * @typedef {object} Project - Defines the Project configuration Object
 *
 * @property {Cli} [cli] - Represents a  object
 * @property {Schematics} [schematics] - Represents a  object
 * @property {string} [prefix] - The prefix to apply to generated selectors.
 * @property {string} root - Root of the project files.
 * @property {string} [sourceRoot] - The root of the source files, assets and index.html file structure.
 * @property {ProjectType} projectType - Project type.
 * @property {{[key: string]: Targets}} [architect] - Represents a Architect object
 * @property {Targets} [targets] - Represents a Targets object
 *
 * @typedef {object} Targets - Represents a Targets object
 *
 * @property {string} builder - The builder used for this package.
 * @property {Options} [options] - Represents a Options object
 * @property {Options} [configurations] - A map of alternative target options.
 *
 * @typedef {OptionsDef1 & OptionsDef2 & ObjectLike} Options - Represents a Options object
 *
 * @typedef {object} OptionsDef1 - Represents a OptionsDefs object
 *
 * @property {string} [browserTarget] - Target to build.
 * @property {string} [serverTarget] - Server target to use for rendering the app shell.
 * @property {string} [appModuleBundle] - Script that exports the Server AppModule to render. This should be the main JavaScript outputted by the server target. By default we will resolve the outputPath of the serverTarget and find a bundle named 'main' in it (whether or not there's a hash tag).
 * @property {string} [route] - The route to render.
 * @property {string} [staticPath] - The path for static hosted files
 * @property {string} [inputIndexPath] - The input path for the index.html file. By default uses the output index.html of the browser target.
 * @property {string} [outputIndexPath] - The output path of the index.html file. By default will overwrite the input file.
 * @property {string[]} [assets] - List of static application assets.
 * @property {string} [main] - The name of the main entry-point file.
 * @property {string} [polyfills] - The name of the polyfills file.
 * @property {string} [tsConfig] - The name of the TypeScript configuration file.
 * @property {string[]} [scripts] - Global scripts to be included in the build.
 * @property {string[]} [styles] - Global styles to be included in the build.
 * @property {StylePreprocessorOptions} [stylePreprocessorOptions] - Options to pass to style preprocessors.
 * @property {boolean} [optimization] - Enables optimization of the build output.
 * @property {FileReplacement[]} [fileReplacements] - Replace files with other files in the build.
 * @property {string} [outputPath] - Path where output will be placed.
 * @property {string} [resourcesOutputPath] - The path where style resources will be placed, relative to outputPath.
 * @property {boolean} [aot] - Build using Ahead of Time compilation.
 * @property {boolean} [sourceMap] - Output sourcemaps.
 * @property {boolean} [vendorSourceMap] - Resolve vendor packages sourcemaps.
 * @property {boolean} [evalSourceMap] - Output in-file eval sourcemaps.
 * @property {boolean} [vendorChunk] - Use a separate bundle containing only vendor libraries.
 * @property {boolean} [commonChunk] - Use a separate bundle containing code used across multiple bundles.
 * @property {string} [baseHref] - Base url for the application being built.
 * @property {string} [deployUrl] - URL where files will be deployed.
 * @property {boolean} [verbose] - Adds more details to output logging.
 * @property {boolean} [progress] - Log progress to the console while building.
 * @property {string} [i18nFile] - Localization file to use for i18n.
 * @property {string} [i18nFormat] - Format of the localization file specified with --i18n-file.
 * @property {string} [i18nLocale] - Locale to use for i18n.
 * @property {string} [i18nMissingTranslation] - How to handle missing translations for i18n.
 * @property {boolean} [extractCss] - Extract css from global styles onto css files instead of js ones.
 * @property {boolean} [watch] - Run build when files change.
 * @property {OutputHashing} [outputHashing] - Define the output filename cache-busting hashing mode.
 * @property {number} [poll] - Enable and define the file watching poll time period in milliseconds.
 * @property {boolean} [deleteOutputPath] - Delete the output path before building.
 * @property {boolean} [preserveSymlinks] - Do not use the real path when resolving modules.
 * @property {boolean} [extractLicenses] - Extract all licenses in a separate file, in the case of production builds only.
 * @property {boolean} [showCircularDependencies] - Show circular dependency warnings on builds.
 * @property {boolean} [buildOptimizer] - Enables @angular-devkit/build-optimizer optimizations when using the 'aot' option.
 *
 * @typedef {object} OptionsDef2 - defines extra options
 *
 * @property {boolean} [namedChunks] - Use file name for lazy loaded chunks.
 * @property {boolean} [subresourceIntegrity] - Enables the use of subresource integrity validation.
 * @property {boolean} [serviceWorker] - Generates a service worker config for production builds.
 * @property {string} [ngswConfigPath] - Path to ngsw-config.json.
 * @property {boolean} [skipAppShell] - Flag to prevent building an app shell.
 * @property {string} [index] - The name of the index HTML file.
 * @property {boolean} [statsJson] - Generates a 'stats.json' file which can be analyzed using tools such as 'webpack-bundle-analyzer'.
 * @property {boolean} [forkTypeChecker] - Run the TypeScript type checker in a forked process.
 * @property {string[]} [lazyModules] - List of additional NgModule files that will be lazy loaded. Lazy router modules with be discovered automatically.
 * @property {array} [budgets] - Budget thresholds to ensure parts of your application stay within boundaries which you set.
 * @property {boolean} [es5BrowserSupport] - Enables conditionally loaded ES2015 polyfills.
 *
 * @typedef {object} StylePreprocessorOptions - Represents a StylePreprocessorOptions object
 *
 * @property {string[]} [includePaths] - Paths to include. Paths will be resolved to project root.
 *
 * @typedef {FileReplace1 | FileReplace2} FileReplacement - Represents a FileReplacement object
 *
 * @typedef {object} FileReplace1 - Represents a FileReplacement object Type
 *
 * @property {string} src
 * @property {string} replaceWith
 *
 * @typedef {object} FileReplace2 - Represents a FileReplacemen object Type
 *
 * @property {string} replace
 * @property {string} with
 *
 * @typedef {object} Budget - Represents a Budget object
 *
 * @property {Type} type - The type of budget.
 * @property {string} [name] - The name of the bundle.
 * @property {string} [baseline] - The baseline size for comparison.
 * @property {string} [maximumWarning] - The maximum threshold for warning relative to the baseline.
 * @property {string} [maximumError] - The maximum threshold for error relative to the baseline.
 * @property {string} [minimumWarning] - The minimum threshold for warning relative to the baseline.
 * @property {string} [minimumError] - The minimum threshold for error relative to the baseline.
 * @property {string} [warning] - The threshold for warning relative to the baseline (min & max).
 * @property {string} [error] - The threshold for error relative to the baseline (min & max).
 */

/** @type {Workspace} */
const Workspace = {};

/** @enum {string} PackageManage */
const PackageManager = {
  npm: 'npm',
  cnpm: 'cnpm',
  yarn: 'yarn',
  pnpm: 'pnpm',
};

/** @enum {string} ProjectType */
const ProjectType = {
  application: 'application',
  library: 'library',
};

/** @enum {string} OutputHashing */
const OutputHashing = {
  none: 'none',
  all: 'all',
  media: 'media',
  bundles: 'bundles',
};

/** @enum {string} Type */
const Type = {
  all: 'all',
  allScript: 'allScript',
  any: 'any',
  anysScript: 'anyScript',
  bundle: 'bundle',
  initial: 'initial',
};
