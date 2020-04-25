var db = require('./db');
module.exports = {
	validateUser: function(username, password, callback){
		var sql = "SELECT * FROM users WHERE username=? AND password=?";
		var sqlParam = [username, password];
		db.executeQuery(sql, sqlParam, function(result){
				callback(result[0]);
			
		});
	}
};
