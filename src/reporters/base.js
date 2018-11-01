'use strict'

const { colors, titles, formatTitle, formatText } = require('../utils/log')
const chalk = require('chalk')
const stringWidth = require('string-width')
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
      console.log.apply(console, arguments)
    }
  }

  initLevels () {
    for (const level of Object.keys(colors)) {
      this[level] = (title, message) => {
        if (this.enabled) {
          if (!message) {
            message = title
            title = titles[level]
          }
          const titleFormatted = formatTitle(level, title)
          let messageFormatted = formatText(level, message)
          if (process.env.NODE_ENV !== 'test') {
            messageFormatted = this.appendTimestamp(titleFormatted, messageFormatted)
          }
          this.log(titleFormatted, messageFormatted)
          this.log()
        }
      }
    }
  }

  appendTimestamp (title, message) {
    // Make timestamp appear at the end of the line
    const line = `${title} ${message}`
    const dateString = chalk.grey(new Date().toLocaleTimeString())
    let logSpace = process.stdout.columns - stringWidth(line) - stringWidth(dateString)
    if (logSpace <= 0) {
      logSpace = 10
    }
    return `${message}${' '.repeat(logSpace)}${dateString}`
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
