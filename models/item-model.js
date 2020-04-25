var db = require('./db');
module.exports = {
	getItemList: function(callback){
		var sql = "SELECT * FROM items";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},


	getOrdersList: function(callback){
		var sql = "SELECT * FROM orderlist";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},

	
	getItemDetails: function(id, callback){
		var sql = "SELECT * FROM items WHERE itemid=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},

	
	addNewItem: function(name, price, callback){
		var sql1 = "INSERT INTO items VALUES (null, ?, ?)";

		db.executeQuery(sql1, [name, price], function(result){
			callback(result);
		});
	},



	updateInfo:function(name, price, id, callback){
		var sql = "UPDATE items SET itemname=?, price=? WHERE itemid=?";
		db.executeQuery(sql, [name, price, id], function(result){
			callback(result);

		});
	},


	deleteItem:function(id, callback){
		var sql = "DELETE FROM items WHERE itemid=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);

		});
	},


	placeOrder: function(order, bill, callback){
	var sql1 = "INSERT INTO orderlist VALUES (null, ?, ?)";

	db.executeQuery(sql1, [order, bill], function(result){
	callback(result);
	});
	
	}


};