var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://randalvance.auth0.com/.well-known/jwks.json'
    }),
    audience: 'resume-builder-api',
    issuer: 'https://randalvance.auth0.com/',
    algorithms: ['RS256']
});

app.use(cors());
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.json({ message: 'Response from Secured Backend'});
});

app.listen(port, () => {
    console.log('Running at port ' + port);
});