var FoodItems = Backbone.PagingCollection.extend({

	model : FoodItem,

	url   : '/foods',
	
	initalize : function(){
		
	}
})

//foodItems.comparator = 'propname' will sort the collection with that property