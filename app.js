var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/time/:dateval',function(request,response,next){
    var dateval = request.params.dateval;
    
    var dateFormat = {
        year :'numeric',
        month: 'long',
        day: 'numeric',
    }
    
    if(isNaN(dateval)){
        var naturaldate = new Date(dateval);
        naturaldate = naturaldate.toLocaleDateString('en-us',dateFormat);
        var unixdate = new Date(dateval).getTime()/1000;
    }
    else{
        var unixdate = dateval;
        var naturaldate = new Date(dateval*1000);
        naturaldate = naturaldate.toLocaleDateString('en-us',dateFormat);
    }
    
    response.json({unix: unixdate, natural: naturaldate});
})

app.listen(3000,function(){
    console.log("server is running....");
})