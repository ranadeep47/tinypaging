Router = Backbone.Router.extend({

	initialize : function(){
		
	},

	routes : {
		'' : 'home',

		'foods' : 'showFoodItems',

		'foods/:pageNo' : 'showFoodItems'
 	},

	init : function(){
		//Get home page template and inflate it
		
	},

	home : function(){
		TinyOwl.container.html($('.tmp_init').text());
	},

	showFoodItems : function(pageNo){
		pageNo  = parseInt(pageNo);
		if(!isNaN(pageNo)) {
			//Paged with a page no
			if(!TinyOwl.foods){
				TinyOwl.foods 	  = new FoodItems;
				TinyOwl.foods.fetch({
					data : {page_no : pageNo},
					success : function(collection) {
						TinyOwl.foodsView = new FoodItemsCollectionView({collection : collection});
						TinyOwl.container.append(TinyOwl.foodsView.$el);
					}
				})
			}

			else TinyOwl.foods.gotoPage(pageNo);	

		}
		else {
			//Default, first page;
			//Create collection, fetch , render , redner pagination
			TinyOwl.foods 		= new FoodItems;
			TinyOwl.foods.fetch({
				success : function(collection){
					TinyOwl.foodsView   = new FoodItemsCollectionView({collection : collection});
					TinyOwl.container.append(TinyOwl.foodsView.$el);
				}
			})
			
		}


	}


})

