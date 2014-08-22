var PagenationView = Backbone.View.extend({
	className : 'paging-container',

	initialize : function(){
		this.render();
		this.listenTo(this.collection,'reset',this.render);
	},

	events : {
		'click a.more-left'   : 'moreLeft',
		'click a.more-right'  : 'moreRight'
/*		'click a.page-button' : 'gotoPage',
		'click a.next'		  : 'nextPage',
		'click a.prev' 		  : 'prevPage',*/
	},

	render : function(){
		var template = $('.tpl_pagenationView').text();
		//Render data for tepmplate
		var current_page = this.collection.current_page;
		var data = {
			current_page : current_page,
			total_pages  : this.collection.total_pages,
			lower_page 	 : (current_page % 4 == 0 ? current_page-3  :  Math.floor(current_page/4) * 4 + 1 || 1),
			higher_page  : (current_page % 4 == 0 ? current_page  	: Math.ceil(current_page/4) * 4 )
		}
		if(data.higher_page > this.collection.total_pages) data.higher_page = this.collection.total_pages;
		//inflate template and append the html
		this.$el.html(_.template(template, data));
	},

	moreLeft : function(e){		
		e.preventDefault();

		//Remove the active class and make sure only the current page has it
		var current_page = this.collection.current_page;
		if(this.$('.page-no.active').length) this.$('.page-no.active').removeClass('active');

		//Shouldnt be less than 1
		if(parseInt(this.$('.page-no').eq(0).text()) < 5) return;

		//decrement pages
		this.$('.page-no').each(function(i,el){
			var $el = $(el);
			var newPageNo = parseInt($el.text()) - 4;
				if(newPageNo === current_page ) $el.addClass('active');
				$el.text(newPageNo);
				$el.attr('href','#foods/'+newPageNo);
		})

		if(this.$('.more-right.disabled').length) this.$('.more-right').removeClass('disabled');

		if(parseInt(this.$('.page-no').eq(0).text()) < 5) {
			if(!this.$('.more-left.disabled').length) this.$('.more-left').addClass('disabled');
		}

	},

	moreRight : function(e){
		e.preventDefault();

		if(this.collection.total_pages - parseInt(this.$('.page-no').eq(0).text()) < 4) return;

		//Remove the active class and make sure only the current page has it
		var current_page = this.collection.current_page;
		if(this.$('.page-no.active').length) this.$('.page-no.active').removeClass('active');

		//Increment pages
		this.$('.page-no').each(function(i,el){
			var $el = $(el);
			var newPageNo = parseInt($el.text()) + 4;
				if(newPageNo === current_page ) $el.addClass('active');
				$el.text(newPageNo);
				$el.attr('href','#foods/'+newPageNo);
		})

		if(this.$('.more-left.disabled').length) this.$('.more-left').removeClass('disabled');

		if(this.collection.total_pages - parseInt(this.$('.page-no').eq(0).text()) < 4) {
			if(!this.$('.more-right.disabled').length) this.$('.more-right').addClass('disabled');
		}
	},
/*
	gotoPage : function(e){
		var $pageButton = $(e.target);
		var pageNo = parseInt($pageButton.text());

		$('.current-page').removeClass('current-page');
		$pageButton.addClass('current-page');

		this.collection.gotoPage(pageNo);
	},

	nextPage : function(e){
		this.collection.gotoNext();
	},

	prevPage : function(e){
		this.collection.gotoPrevious();
	},*/

	close : function(){
		this.remove();
	}
})