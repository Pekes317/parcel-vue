/// <reference path="./workspace.type.js" />
/**
 * Represents a Bundler Options object
 * @typedef {object} BundlerOptions
 *
 * @property {string[]} assets - A list of Static Assets
 * @property {ObjectLike} bundleOpts - Parcel Bundler Options
 * @property {string} entryFile - The Entry File to start the Bundling
 * @property {boolean} hasStatic - Flag for Static Hosting
 * @property {number} port - Port to run the development server on
 * @property {boolean} prod - Flag for Prod
 * @property {string} static - Path for the Statice Hosting Files
 * @property {string} type - The type of Project to bundler
 * @property {boolean} universal - Flag for Universl/SSR for Vue
 */
