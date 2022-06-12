const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { config } = require("./config");

const app = express();

// body parser
app.use(bodyParser.json());

app.post("/api/auth/token", function(req, res) {
  const { email, username, name } = req.body;
  const token = jwt.sign({ sub: username, email, name }, config.authJwtSecret);
  res.json({ access_token: token });
});

app.get("/api/auth/token/authorizer", function(request, response, next){
const {access_token} = request.query;
    try{
            const decoded = jwt.verify(access_token, config.authJwtSecret);
            response.json({ message: "The access Token is valid", username: decoded.sub })
        }catch(err){
            next(err);
        }
});

const server = app.listen(5000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
