var express = require('express');
var apiRouter = require('./api/apis');
var app = express();
var port = 6789;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
  });
app.use('/api/v1', apiRouter);
app.get('*',function(req,res){
   res.send("Hello SNA_Express !");
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    createError(404);
  });
app.listen(port, function () {
console.log(`running api server on port ${port}!`);
});

module.exports = app;