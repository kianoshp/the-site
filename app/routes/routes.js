var routes = {
  index: function(req, res, options) {
    return res.render('main/index', options);
  },

  showcase: function(req, res, options) {
    return res.render('main/showcase_template', options);
  }
}

module.exports = routes;