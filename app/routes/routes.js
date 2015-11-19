var routes = {
  index: function(req, res, options) {
    return res.render('main/index', options);
  },

  portfolio: function(req, res, options) {
    return res.render('main/portfolio', options);
  }
}

module.exports = routes;