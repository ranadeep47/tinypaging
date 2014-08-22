var TinyOwl = {
	version 	: '0.0.0',
	init		: function(){
					Backbone.history.start();
				  },
}

$(document).ready(function(){
	TinyOwl.container = $('.container');
	TinyOwl.router = new Router;
	TinyOwl.init();
})