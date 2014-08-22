var FoodItemsCollectionView = Backbone.View.extend({
	initialize : function(){

		this.render();
		this.renderPagenation();
		this.listenTo(this.collection,'reset',this.renderCollection);
	},

	className : 'foods-view',

	childViews : [],

	render : function(){
		//render template
		var template = $('.tpl_foodItemsCollectionView').text();
		this.$el.append($(template));
		this.renderCollection();
	},

	renderCollection : function(){
		var $container   = this.$el.find('.items'),
			context      = this;
		
		this.childViews.forEach(function(view){ view.close() });
		this.childViews.length=0;	

		var context = this;
		_.each(this.collection.models,function(model){
			var foodItemView = new FoodItemView({model : model})
			context.childViews.push(foodItemView);
			$container.append(foodItemView.$el);
		})
	},

	renderPagenation : function(){
		this.pagenationView = new PagenationView({collection : this.collection});
		this.$el.prepend(this.pagenationView.$el);
	},

	close : function(){
		this.pagenationView.close();
		this.remove();
	}
})