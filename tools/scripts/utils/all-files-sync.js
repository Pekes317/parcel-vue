const fs = require('fs');
const { join } = require('path');

/**
 * Recursively list the path of all Files in a directory
 * @function allFilesSync
 *
 * @param {string} dir
 * @param {string[]} fileList
 *
 * @returns {string[]}
 */
const allFilesSync = (dir, fileList) => {
  let assets = [];
  if (fs.statSync(dir).isDirectory()) {
    assets = fs.readdirSync(dir);
  } else {
    assets = [dir];
  }
  const files = assets.map(asset => {
    const path = asset === dir ? asset : join(dir, asset);
    if (fs.statSync(path).isDirectory()) {
      fileList = [...allFilesSync(path)];
    } else {
      return path;
    }
  });

  if (fileList && Array.isArray(fileList)) {
    return [...fileList, ...files].filter(filePath => filePath && !/(gitkeep)/.test(filePath));
  }

  return [...files].filter(filePath => filePath && !/(gitkeep)/.test(filePath));
};

module.exports = {
  allFilesSync,
};
