const { Toolkit } = require('actions-toolkit')
const label = process.env.LABEL_NAME
// pinnedIssues is still in developer preview
const headers = {"Accept": "application/vnd.github.elektra-preview"}

const mutation = `mutation ($input: UnpinIssueInput!) {
  unpinIssue(input: $input) {
    issue {
      title
    }
  }
}`

const query = `query ($owner: String!, $repo: String!) {
  repository (owner: $owner, name: $repo) {
    pinnedIssues (first: 3) {
      totalCount
      nodes {
        issue {
          title
          number
          labels (first: 5) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}`

async function labelMatchedIssue (tools, owner, repo, label) {
   const data = await tools.github.graphql(query, {owner, repo})
   const labelList = data.repository.pinnedIssues.nodes.map((n) => {
     return {id: n.id, labels: n.labels.nodes}
   })
   return labelList.select(l => l === label)
}

async function unpinIssue (tools, id) {
  // use pinned flag to choose pin or unpin mutation
  const input = { issueId: id, clientMutationId: "top5 unPinned" }
  const variables = {input: input, headers: headers}
  const action = tools.context.payload.action

  return tools.github.graphql(mutation, variables)
}

async function closeIssue () {
}

// Run your GitHub Action!
Toolkit.run(async tools => {
  const action = tools.context.payload.action
  const repo = tools.context.payload.repo
  const owner = tools.context.payload.owner.login

  try {
    const issueId = labelMatchedIssue(tools, owner, repo, label)
    const pinResults = await pinIssue(tools, issueId)
    const closeResults = await closeIssue(tools, issueId)
  } catch (err) {
    tools.log.error(`An error occurred while pinning the issue.`)
    tools.log.error(err)

    // The error might have more details
    if (err.errors) tools.log.error(err.errors)

    // Exit with a failing status
    tools.exit.failure()
  }

  tools.exit.success('We did it!')
})
