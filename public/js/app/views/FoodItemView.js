var FoodItemView = Backbone.View.extend({

	initialize : function(){
		this.render();

		this.listenTo(this.model,'change',this.render);
	},

	className : 'food-item',

	render : function(){
		var template = $('.tpl_foodItemView').text()

		this.$el.html(_.template(template,this.model.toJSON()));
	},

	close : function(){
		this.remove()
	}
})