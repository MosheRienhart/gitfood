/**
 * GET /
 * Maker Dashboard and Order Dashboard.
 */
exports.maker = function(req, res) {
  res.render('maker', {
    title: 'Maker Dashboard'
  });
};
exports.order = function(req, res) {
  res.render('order', {
    title: 'Order Dashboard'
  });
};