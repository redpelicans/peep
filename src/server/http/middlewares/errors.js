export default (err, req, res, next) => {
  if (!err) return next();
  const message = err.message;
  console.log(err.stack);
  res.status(500).json({ message });
}
