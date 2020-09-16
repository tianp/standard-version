const checkpoint = require('../checkpoint')
const runExecFile = require('../run-execFile')

module.exports = async function (newVersion, args) {
  if (args.skip.push) return
  await execPush(newVersion, args)
}

async function execPush (newVersion, args) {
  let tagOption
  if (args.sign) {
    tagOption = '-s'
  } else {
    tagOption = '-a'
  }
  checkpoint(args, 'pushing commits & tags %s%s', [args.tagPrefix, newVersion])
  await runExecFile(args, 'git', ['push', '--follow-tags', 'origin', 'HEAD:master'])
}
