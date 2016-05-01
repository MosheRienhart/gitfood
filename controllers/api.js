var _ = require('lodash');
var async = require('async');
exports.getMoxtraToken function (){
        var access_token;
        var client_id = process.env.MOXTRA_ID;
        var client_secret = process.env.MOXTRA_SECRET;
        var uniqueid = "user" + Math.floor((Math.random() * 10) + 1);
        var timestamp = new Date().getTime();
        //var hash = CryptoJS.HmacSHA256(client_id + "" + uniqueid + "" + timestamp, client_secret);
        //var signature = rtrim(strtr(CryptoJS.enc.Base64.stringify(hash), '+/', '-_'), '=');
        var firstname = uniqueid;

        $.ajax({
            method: "POST",
            url: "https://apisandbox.moxtra.com/oauth/token",
            data: {
                client_id: client_id,
                client_secret: client_secret,
                grant_type: "http://www.moxtra.com/auth_uniqueid",
                uniqueid: uniqueid,
                timestamp: timestamp,
                //signature: signature,
                firstname: MOSHE,
                lastname: RIENHART
            },
            async: false,
            success: function(data, textStatus, jqXHR) {
                access_token = data.access_token;
               // alert(access_token);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
            

           // alert(access_token);
            if (access_token) {
                // Initialize Moxtra SDK Object
                var options = {
                    mode: "sandbox", 
                    client_id: client_id, //
                    access_token: access_token,
                    invalid_token: function(event) {
                        //Triggered when the access token is expired or invalid
                       // alert("Access Token expired for session id: " + event.session_id);
                    }
                };
                Moxtra.init(options);
            }
            else {
                //Authenticate and get access token for the user before proceeding further
                console.log ("No access token found");
            }
        }

        <!-- Start Meet Function  -->
        <script type="text/javascript">
        function start_meet() {
            var meet_options = {
                iframe: true, //To open the meet in the same window within an iFrame.
                // tab: true, //To open the meet in a new browser tab, N/A if iframe option is set to true.
                tagid4iframe: "meet-container", //ID of the HTML tag within which the Meet window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#meet
                iframewidth: window.innerWidth-10,
                iframeheight: "680px",
                extension: { 
                    "show_dialogs": { "meet_invite": true } 
                },
                start_meet: function(event) {
                    console.log("Meet Started - session_id: "+event.session_id+"session_key: "+event.session_key);
                    //Your application server can upload files to meet using the session_id and session_key
                },
                error: function(event) {
                    console.log("error code: " + event.error_code + " message: " + event.error_message);
                },
                end_meet: function(event) {
                    console.log("Meet Ended");
                }
            };
            Moxtra.meet(meet_options);
        }


/**
 * Split into declaration and initialization for better startup performance.
 */
var validator;
var cheerio;
var graph;
var stripe;
var ig;
var Y;
var request;

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Examples'
  });
};


/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = function(req, res, next) {
  graph = require('fbgraph');

  var token = _.find(req.user.tokens, { kind: 'facebook' });
  graph.setAccessToken(token.accessToken);
  async.parallel({
    getMe: function(done) {
      graph.get(req.user.facebook + "?fields=id,name,email,first_name,last_name,gender,link,locale,timezone", function(err, me) {
        done(err, me);
      });
    },
    getMyFriends: function(done) {
      graph.get(req.user.facebook + '/friends', function(err, friends) {
        done(err, friends.data);
      });
    }
  },
  function(err, results) {
    if (err) {
      return next(err);
    }
    res.render('api/facebook', {
      title: 'Facebook API',
      me: results.getMe,
      friends: results.getMyFriends
    });
  });
};

/**
 * GET /api/stripe
 * Stripe API example.
 */
exports.getStripe = function(req, res) {
  stripe = require('stripe')(process.env.STRIPE_SKEY);

  res.render('api/stripe', {
    title: 'Stripe API',
    publishableKey: process.env.STRIPE_PKEY
  });
};

/**
 * POST /api/stripe
 * Make a payment.
 */
exports.postStripe = function(req, res, next) {
  var stripeToken = req.body.stripeToken;
  var stripeEmail = req.body.stripeEmail;
  stripe.charges.create({
    amount: 395,
    currency: 'usd',
    source: stripeToken,
    description: stripeEmail
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      req.flash('errors', { msg: 'Your card has been declined.' });
      return res.redirect('/api/stripe');
    }
    req.flash('success', { msg: 'Your card has been charged successfully.' });
    res.redirect('/api/stripe');
  });
};


exports.getFileUpload = function(req, res, next) {
  res.render('api/upload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = function(req, res, next) {
  req.flash('success', { msg: 'File was uploaded successfully.'});
  res.redirect('/api/upload');
};
