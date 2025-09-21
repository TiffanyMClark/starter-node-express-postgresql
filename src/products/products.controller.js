function read(req, res, next) {
  res.json({ data: { product_title: "some product title" } });
}
async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}
async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

module.exports = {
  read: [read],
  list: [list],
};
