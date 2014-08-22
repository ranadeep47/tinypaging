Backbone.PagingCollection = Backbone.Collection.extend({

	current_page : null,

	items_per_page : 5,

	total_items : null,

	total_pages : null,

	parse : function(res){
		this.total_items  = parseInt(res.total);
		this.current_page = parseInt(res.current_page);
		this.total_pages  = Math.ceil(this.total_items/this.items_per_page) || 1;
							
		return res.payload;
	},

	gotoPage : function(pageNo){
		this.fetch({data : {page_no : pageNo}, reset : true});
	},

	gotoFirst : function(cb){
		this.gotoPage(1);
	},

	gotoLast : function(){
		this.gotoPage(this.total_pages);
	},

	gotoNext : function(){
		if(this.current_page != this.total_pages) this.gotoPage(this.current_page+1)
	},

	gotoPrevious : function(){
		if(this.current_page != 1) this.gotoPage(this.current_page -1)
	}
})