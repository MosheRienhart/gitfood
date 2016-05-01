/**
 * GET /
 * Maker Dashboard and Order Dashboard.
 */
exports.maker = function(req, res) {
  res.render('maker', {
    title: 'Maker Dashboard'
  });
};
exports.maker_2 = function(req, res) {
  res.render('maker_2', {
    title: 'Maker Dashboard'
  });
};
exports.maker_3 = function(req, res) {
  res.render('maker_3', {
    title: 'Maker Dashboard'
  });
};
exports.order = function(req, res) {
  res.render('order', {
    title: 'Order Dashboard'
  });
};
exports.order_2 = function(req, res) {
  res.render('order_2', {
    title: 'Order Dashboard'
  });
};
exports.order_3= function(req, res) {
  res.render('order_3', {
    title: 'Order Dashboard'
  });
};

exports.moxtra= function(req, res) {
  res.render('moxtra', {
    title: 'Moxtra Connection'
  });
};