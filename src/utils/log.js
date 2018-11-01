'use strict'

const chalk = require('chalk')

const colors = {
  success: 'green',
  info: 'blue',
  note: 'white',
  warning: 'yellow',
  error: 'red'
}

const titles = {
  success: 'SUCCESS',
  info: 'INFO',
  note: 'NOTE',
  warning: 'WARN',
  error: 'ERROR'
}

function bgColor (level) {
  const color = textColor(level)
  return 'bg' + capitalizeFirstLetter(color)
}

function textColor (level) {
  return colors[level.toLowerCase()] || 'red'
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatTitle (severity, message) {
  return chalk[bgColor(severity)].black('', message, '')
}

function formatText (severity, message) {
  return chalk[textColor(severity)](message)
}

module.exports = {
  colors,
  titles,
  formatText,
  formatTitle
}
