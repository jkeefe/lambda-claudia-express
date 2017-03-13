var express = require('express');
var app = express();

app.get(/^\/?helloworld/i, function (req, res, next) {
    
    // do stuff here
    
});

// app.listen(3000) // <-- comment this line out from your app
module.exports = app; // export your app so aws-serverless-express can use it
