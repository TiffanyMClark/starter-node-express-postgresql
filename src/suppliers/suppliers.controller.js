const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function supplierExists(req, res, next) {
  const supplier = await suppliersService.read(req.params.supplierId);
  if (supplier) {
    res.locals.supplier = supplier;
    return next();
  }
  next({ status: 404, message: `Supplier cannot be found.` });
}

async function create(req, res) {
  const data = await suppliersService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };
  const data = await suppliersService.update(updatedSupplier);
  res.json({ data });
}

async function destroy(req, res) {
  const { supplier } = res.locals;
  await suppliersService.delete(supplier.supplier_id);
  res.sendStatus(204);
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(supplierExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(supplierExists), asyncErrorBoundary(destroy)],
};
