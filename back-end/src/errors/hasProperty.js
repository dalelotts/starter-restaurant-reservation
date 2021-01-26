function hasProperty(property) {
  const result = function (data = {}) {
    const value = data[property];
    if (value) {
      return data;
    }
    const error = new Error(`A '${property}' property is required.`);
    error.status = 400;
    throw error;
  };
  Object.defineProperty(result, "name", {
    value: `hasProperty${property.toUpperCase()}`,
    writable: false,
  });
  Object.defineProperty(result, "__filename", {
    value: __filename,
    writable: false,
  });
  return result;
}

module.exports = hasProperty;
