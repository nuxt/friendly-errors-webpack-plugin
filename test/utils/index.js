const stripAnsi = require('strip-ansi');

module.exports = {
  captureLogs: async (output, callback) => {
    output.log = jest.fn();
    output.clearConsole = jest.fn();
    const logs = [];

    await callback();

    for(const args of output.log.mock.calls) {
        logs.push(stripAnsi(args.join(' ')).trim());
    }
    return logs;
  }
}