const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

const port = process.env.PORT || 8080;

const checkScopes = jwtAuthz([ 'read:resource' ]);

const jwtCheck = jwt({
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

app.get('/authorized', checkScopes, function (req, res) {
    res.json({ message: 'Response from Secured Backend'});
});

app.listen(port, () => {
    console.log('Running at port ' + port);
});