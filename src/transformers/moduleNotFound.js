'use strict';

const TYPE = 'module-not-found';

function isModuleNotFoundError (e) {
  const webpackError = e.webpackError || {};
  return webpackError.dependencies && webpackError.dependencies.length &&
    (e.type === TYPE ||
     e.name === 'ModuleNotFoundError' &&
     e.message.indexOf('Module not found') === 0);
}

function transform(error) {
  const webpackError = error.webpackError;
  if (isModuleNotFoundError(error)) {
    const module = webpackError.dependencies[0].request;
    return Object.assign({}, error, {
      message: `Module not found ${module}`,
      type: TYPE,
      severity: 900,
      module,
    });
  }

  return error;
}

module.exports = transform;