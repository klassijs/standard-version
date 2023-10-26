// const stringifyPackage = require('stringify-package')
// const PackageJson = require('@npmcli/package-json')
const detectIndent = require('detect-indent')
// const detectNewline = require('detect-newline')

module.exports.readVersion = function (contents) {
  return JSON.parse(contents).version
}

module.exports.writeVersion = function (contents, version) {
  // const pkgJsonClass = new PackageJson()
  // PackageJson.load('./').then((pkgJson) => {
  // console.log('this is it =======> ', pkgJson.content)
  // })
  const json = JSON.parse(contents)
  const indent = detectIndent(contents).indent
  // const newline = detectNewline(contents)
  json.version = version

  if (json.packages && json.packages['']) {
    // package-lock v2 stores version there too
    json.packages[''].version = version
  }

  // console.log(indent)
  // return stringifyPackage(json, indent, newline)
  const indentedString = JSON.stringify(json, undefined, indent)
  return indentedString.replace('}', '}\n')
}

module.exports.isPrivate = function (contents) {
  return JSON.parse(contents).private
}
