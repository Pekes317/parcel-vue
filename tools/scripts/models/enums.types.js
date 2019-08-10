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

exports.PackageManager = PackageManager;
exports.ProjectType = ProjectType;
exports.OutputHashing = OutputHashing;
exports.Type = Type;
