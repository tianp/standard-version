const glGot = require('gl-got');

module.exports = async function (newVersion, changelogs) {

  const glAuth = {
    url: 'https://gitlab.com/api/v4/',
    token: process.env.GITLAB_RELEASE_TOKEN
  }
  const PROJECT_ID = process.env.CI_PROJECT_ID
  const url = `projects/${PROJECT_ID}/releases`

  newVersion = 'v' + newVersion

  const options = {
    token: glAuth.token,
    endpoint: glAuth.url,
    body: {
      name: newVersion,
      tag_name: newVersion,
      ref: newVersion,
      description: changelogs
    }
  }

  await glGot(url, options);

  return resolve();
}