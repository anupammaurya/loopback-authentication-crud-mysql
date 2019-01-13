'use strict';
module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/', function(req, res) {
    res.render('index', {
      loginFailed: false,
    });
  });

  router.get('/projects', function(req, res) {
    res.render('projects');
  });

  router.post('/login', function(req, res) {
    console.log('res', res);
    var email = req.body.email;
    var password = req.body.password;

    app.models.User.login({
      email: email,
      password: password,
    }, 'user', function(err, token) {
      if (err)
        return res.render('index', {
          email: email,
          password: password,
          loginFailed: true,
        });

      token = token.toJSON();

      res.render('projects', {
        username: token.user.username,
        accessToken: token.id,
      });
    });
  });

  // router.get('/logout', function(req, res) {
  //   var AccessToken = app.models.AccessToken;
  //   var token = new AccessToken({id: req.query['access_token']});
  //   console.log('destory')
  //   console.log(token)
  //   token.destroy();

  //   res.redirect('/');
  // });

  router.get('/logout', function(req, res) {
    console.log('----------------logout ------------');
    app.models.User.logout(() => {
      var AccessToken = app.models.AccessToken;
      var token = new AccessToken({
        id: req.query['access_token'],
      });

      console.log('----------------------------------   destory');
      console.log(token);
      token.destroy();

      res.redirect('/');
    });
  });

  app.use(router);
};
