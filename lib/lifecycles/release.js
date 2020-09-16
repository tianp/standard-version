const glGot = require('gl-got');

module.exports = async function (args, newVersion, changelogs) {

  const glAuth = {
    url: 'https://gitlab.com/api/v4/',
    token: process.env.GITLAB_RELEASE_TOKEN
  }
  const PROJECT_ID = process.env.CI_PROJECT_ID
  const url = `projects/${PROJECT_ID}/repository/tags`
  const options = {
    token: glAuth.token,
    endpoint: glAuth.url,
    body: {
      tag_name: newVersion,
      ref: newVersion,
      message: 'Release ' + newVersion,
      release_description: changelogs
    }
  }

  await glGot(url, options);

  return resolve();
}