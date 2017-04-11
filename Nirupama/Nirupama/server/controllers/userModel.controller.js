var Users=require("../models/model_User.js")

module.exports.createAUser=function(req,res){
	var user = new Users(req.body);
	user.save(function(err,result){
	res.json(result);
	})
}

module.exports.updateAUser=function(req,res){
	console.log(req.body);
	Users.update({_id:req.body._id},req.body,null,function(err,response){
	res.send("updated the user");
	});
}

module.exports.deleteAUser=function(req,res){
	Users.remove({_id:req.params._id},function(err,removed){
	console.log("removed from database");
	res.send("removed the user");
	});
	
}

module.exports.getAllUsers=function(req,res){
	Users.find({},function(err,result){
	res.json(result);
	});
}