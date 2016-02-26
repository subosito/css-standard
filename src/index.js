import stylelint from 'stylelint'
import standardConfig from 'stylelint-config-standard'
import meow from 'meow'

let defaultOptions = { config: standardConfig }
let blacklistedOptions = ['codeFilename', 'config', 'configFile', 'configBaseDir', 'configOverrides']

export function cssStandard (options) {
  if (isUndefined(options.files)) {
    throw new Error('Please pass a `files` glob or a `code` string, but not both.')
  }

  blacklistedOptions.forEach((key) => {
    delete options[key]
  })

  options = Object.assign({}, options, defaultOptions)
  return stylelint.lint(options)
}

export function cli () {
  const minsOptions = {
    default: { f: 'string' },
    alias: { f: 'formatter' }
  }

  const meowOptions = {
    pkg: '../package.json',
    help: `
      Usage:
        css-standard [FILES] [options]

      Files:
        File(s) or glob(s)

      Options:
        -v, --version     Get css-standard version
        -f, --formatter   specify a formatter: 'json' or 'string'. Default is 'string'
        -s, --syntax      Specify non-standard syntax that should be used to. Options: 'scss'
      `
  }

  const cli = meow(meowOptions, minsOptions)
  const baseOptions = {
    formatter: cli.flags.formatter,
    syntax: cli.flags.syntax
  }

  if (isUndefined(baseOptions.syntax)) {
    delete baseOptions.syntax
  }

  Promise.resolve().then(() => {
    return Object.assign({}, baseOptions, {
      files: cli.input
    })
  }).then((options) => {
    return cssStandard(options)
  }).then((data) => {
    if (!data.output) { return }
    process.stdout.write(data.output)
    if (data.errored) { process.exit(2) }
  }).catch((err) => {
    console.log(err.stack)
    process.exit(err.code || 1)
  })
}

function isUndefined (thing) {
  return (typeof thing === 'undefined')
}

