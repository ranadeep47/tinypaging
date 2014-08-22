var express = require('express'),
	morgan  = require('morgan'),
	config 	= require('./config');

var app = express();

app.use(morgan(':method :url :status :req["Content-Type"] :response-time',{ skip : function(req,res) { return res.statusCode < 400 || req.url.search('favicon') > -1 }}));
app.use(express.static(__dirname+"/public"));

//Sample data
var data = [];
for(var i=1;i<100;++i){
	data.push({title : "Data row " + i});
}

//Routing
app.listen(config.port,config.host);

//Routes
app.get('/',function(req,res){
	res.sendfile(__dirname+"/public/index.html");
});

app.get('/foods',function(req,res){
	if(req.query.page_no) var page_no = req.query.page_no;
	else page_no = 1;

	res.json({
		payload 	 : data.slice((page_no-1) * 5, page_no * 5),
		total 		 : data.length,
		current_page : page_no 
	});
});

