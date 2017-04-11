var mongoose= require("mongoose");
 
module.exports=mongoose.model("users",{
		name:String,
		email:String,
		DOB:String,
		dept:String,
		gender:String,
		age:Number});