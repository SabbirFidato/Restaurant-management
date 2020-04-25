module.exports = {

	admin: {
		addNewItem : {
			
			itemName: {required: true, message: 'Missing item name'},
			price: {required: true, message: 'Missing price'}
		},

		updateItem: {
			itemName: {required: true},
			price: {required: true}
		}

	},

	employee: {

		placeOrder : {
			fullOrder: {required: true, message: 'NO ITEM SELECTED'},
			bill: {required: true, message: 'NO BILL'}
		}

	}




};