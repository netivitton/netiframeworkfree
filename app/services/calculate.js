exports.getPage = (page, limit) => {

  if (!limit) {
    limit = 15;
  }
  let offset = page * limit;
  return [limit, offset];
};

module.exports;
