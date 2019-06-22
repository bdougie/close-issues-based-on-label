const { Toolkit } = require('actions-toolkit')
const label = process.env.LABEL_NAME

describe('close-an-issue', () => {
  let action, tools

  // Mock Toolkit.run to define `action` so we can call it
  Toolkit.run = jest.fn((actionFn) => { action = actionFn })
  // Load up our entrypoint file
  require('.')

  beforeEach(() => {
    // Create a new Toolkit instance
    tools = new Toolkit()
    // Mock methods on it!
    tools.exit.success = jest.fn()
    tools.exit.failure = jest.fn()
  })

  it('exits successfully', () => {
    action(tools)
    expect(tools.exit.success).toHaveBeenCalled()
  })

  it('exits on failure when date is missing', () => {
    action(tools)
    expect(tools.exit.failure).toHaveBeenCalled()
  })
})
