'use strict'

const { colors, clearConsole } = require('../utils/log')
const consola = require('consola')

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
    if (this.enabled) {
      clearConsole()
    }
  }
}

module.exports = BaseReporter
