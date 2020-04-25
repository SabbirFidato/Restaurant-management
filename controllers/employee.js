var express = require('express');
var router = express.Router();

var itemModel = require.main.require('./models/item-model');

var validationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator');


router.get('/', function(req, res){
	if(!req.session.username)
	{
		res.redirect('/metro');
		return;
	}

		itemModel.getItemList(function(result){
		var data = {
		itemList: result,
		errs: []
		};
		//console.log(result);
	res.render('employee/index', data);

	});

});


router.post('/', function(req, res){

	var rules = validationRules.employee.placeOrder;

	var data = {
		fullOrder: req.body.fullOrder,
		bill: req.body.bill,
	};


	var validator = new asyncValidator(rules);

	validator.validate(data, function(errors, fields){
		if(!errors)
		{
			itemModel.placeOrder(req.body.fullOrder, req.body.bill, function(obj){
			
			res.redirect('/employee');

			});
		}
		else
		{

			itemModel.getItemList(function(result){
			var data = {
			itemList: result,
			errs: errors
			};
			res.render('employee/index', data);

		
		});

		}
});

});



router.get('/showorders', function(req, res){

	itemModel.getOrdersList(function(result){

				var data = {
				orderDetails: result
			};

		res.render('employee/orders', data);
	});
});

module.exports = router;