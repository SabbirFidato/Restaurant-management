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
			itemList: result
		};
		res.render('admin/index', data);
	});

});





router.get('/create', function(req, res){

			var data = {
				errs: []
			};
			res.render('admin/createnew/create', data);
		});




router.post('/create', function(req, res){

	var rules = validationRules.admin.addNewItem;

	var data = {
		itemName: req.body.name,
		price: req.body.price,
	};


	var validator = new asyncValidator(rules);

	validator.validate(data, function(errors, fields){
		if(!errors)
		{
			itemModel.addNewItem(req.body.name, req.body.price, function(obj){
			
			res.redirect('/admin');

			});
		}
		else
		{
			res.render('admin/createnew/create', {errs: errors});

		}
	});

});


router.get('/update/:itemid', function(req, res){
	var id = req.params.itemid;
	itemModel.getItemDetails(id, function(result){

				var data = {
				itemDetails: result, 
				errs: []
			};

		res.render('admin/update/update', data);
	});
});




router.post('/update/:itemid', function(req, res){

	var rules = validationRules.admin.updateItem;

	var data = {
		itemName: req.body.iname,
		price: req.body.price,
	};


	var validator = new asyncValidator(rules);
	//var id = req.params.itemid;

	validator.validate(data, function(errors, fields){
		if(!errors)
		{
			itemModel.updateInfo(req.body.iname, req.body.price, req.body.itemId, function(obj){
			
			res.redirect('/admin');

			});
		}
		else
		{
			res.render('admin/update/update', {itemDetails:data, errs: errors});

		}
	});



});



router.get('/delete/:itemid', function(req, res){
	var id = req.params.itemid;
	itemModel.getItemDetails(id, function(result){

				var data = {
				itemDetails: result, 
				errs: []
			};

		res.render('admin/delete/delete', data);
	});
});




router.post('/delete/:itemid', function(req, res){

	
	var id = req.params.itemid;

			itemModel.deleteItem(id, function(obj){
			
			res.redirect('/admin');

			});		
});






module.exports = router;