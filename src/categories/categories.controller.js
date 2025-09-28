const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
async function list(req, res, next) {
  try {
    const data = await categoriesService.list();
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
