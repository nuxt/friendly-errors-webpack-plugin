'use strict'

const { colors } = require('../utils/log')
const consola = require('consola')
const readline = require('readline')

class BaseReporter {
  constructor () {
    this.enabled = true
    this.initLevels()
  }

  enable () {
    this.enabled = true
  }

  log () {
    if (this.enabled) {
      consola.log.apply(consola, arguments)
    }
  }

  initLevels () {
    for (const level of Object.keys(colors)) {
      this[level] = (title, message) => {
        if (!this.enabled) return

        if (message === undefined) {
          consola.log(title)
          return
        }
        (consola[level] || consola.log)(message)
      }
    }
  }

  clearConsole () {
    if (this.enabled && process.stdout.isTTY) {
      // Fill screen with blank lines. Then move to 0 (beginning of visible part) and clear it
      const blank = '\n'.repeat(process.stdout.rows)
      console.log(blank)
      readline.cursorTo(process.stdout, 0, 0)
      readline.clearScreenDown(process.stdout)
    }
  }
}

module.exports = BaseReporter
