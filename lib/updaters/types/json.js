const detectIndent = require('detect-indent')

module.exports.readVersion = function (contents) {
  return JSON.parse(contents).version
}

module.exports.writeVersion = function (contents, version) {
  const json = JSON.parse(contents)
  const indent = detectIndent(contents).indent
  json.version = version

  if (json.packages && json.packages['']) {
    // package-lock v2 stores version there too
    json.packages[''].version = version
  }

  const indentedString = JSON.stringify(json, undefined, indent)
  return indentedString.replace('}', '}\n')
}

module.exports.isPrivate = function (contents) {
  return JSON.parse(contents).private
}
