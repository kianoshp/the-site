var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mailer = require('nodemailer');
var router = require('./app/routes/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, '/app/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: {}}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text) {
        res.send(text);
    });
});

app.get('/new', function(req, res) {
  router.index(req, res, 
  {
    pageTitle: 'Cielo Concepts Inc.'
  })
});

app.get('/showcase', function(req, res) {
  router.showcase(req, res, {
    showcaseTitle: 'New title'
  });
});

app.get('/privacy', function(req, res) {
  fs.readFile(__dirname + '/app/privacy-policy.html', 'utf8', function(err, text) {
    res.send(text);
  });

});

app.post('/email', function(req, res) {
    var returnObj = {
        result: 'sent'
    };

    var gmailTransport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info@cieloconcepts.com',
            pass: 'Mic!elo74'
        }
    });

    gmailTransport.sendMail({
        to: 'Cielo Concepts Inc <info@cieloconcepts.com>',
        subject: 'Inquiry from ' + req.body.name,
        html: req.body.message + '<br/><br/>contact number: ' + req.body.phone + '<br/>contact email: ' + req.body.email
    }, function(err, info) {
        if (err) {
            returnObj.result = 'fail';
            res.send(returnObj);
        }

        gmailTransport.sendMail({
            from: 'Cielo Concepts Inc <info@cieloconcepts.com>',
            to: req.body.email,
            subject: 'Thank you for your inquiry',
            html: 'Dear ' + req.body.name + ',<br/><br/><p>Thank you for your inquiry to Cielo Concepts Inc. We have receive the following message:</p><blockquote>' + req.body.message + '</blockquote><p>Someone will be in touch in with you shortly.</p> <p>Sincerely, </p><br/><p>Kianosh Pourian</p><p>CEO and Founder</p>' 
        }, function(err, info) {
            console.log(info);
            if (err) {
                returnObj.result = 'fail';
            }

            res.send(returnObj);
        })
    });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('500', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', {
        message: err.message,
        error: {}
    });
});


// module.exports = app;

app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
