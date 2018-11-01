const expect = require('expect')
const EventEmitter = require('events')
const Stats = require('webpack/lib/Stats')
const { captureReports } = require('../../utils')
EventEmitter.prototype.plugin = EventEmitter.prototype.on

const FriendlyErrorsPlugin = require('../../../index')

const notifierPlugin = new FriendlyErrorsPlugin()
const mockCompiler = new EventEmitter()
const reporter = notifierPlugin.reporter

mockCompiler.hooks = {
  done: {
    tap (name, handler) {
      mockCompiler.plugin('done', handler)
    }
  },
  invalid: {
    tap (name, handler) {
      mockCompiler.plugin('invalid', handler)
    }
  }
}
notifierPlugin.apply(mockCompiler)

it('friendlyErrors : capture invalid message', async () => {
  const logs = await captureReports(reporter, () => mockCompiler.emit('invalid'))
  expect(logs).toEqual([
    'WAIT  Compiling...',
    ''
  ])
})

it('friendlyErrors : capture compilation without errors', async () => {
  const stats = successfulCompilationStats()
  const logs = await captureReports(reporter, () => mockCompiler.emit('done', stats))
  expect(logs).toEqual([
    'DONE  Compiled successfully in 100ms',
    ''
  ])
})

it('friendlyErrors : default clearConsole option', () => {
  const plugin = new FriendlyErrorsPlugin()
  expect(plugin.shouldClearConsole).toBeTruthy()
})

it('friendlyErrors : clearConsole option', () => {
  const plugin = new FriendlyErrorsPlugin({ clearConsole: false })
  expect(plugin.shouldClearConsole).toBeFalsy()
})

function successfulCompilationStats () {
  const compilation = {
    errors: [],
    warnings: [],
    children: []
  }
  const stats = new Stats(compilation)
  stats.startTime = 0
  stats.endTime = 100
  return stats
}
