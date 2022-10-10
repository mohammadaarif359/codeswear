import connectDb from '../../middleware/mongoose'
import User from '../../models/User'
var CryptoJS = require("crypto-js");

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		if(req.body.password != req.body.cpassword) {
			res.status(400).json({error:"Password not match"});
		}
		let user = await User.findOne({forgot_token:req.body.forgotToken})
		if(user) {
			user.password = CryptoJS.AES.encrypt(req.body.password, 'secret123').toString()
			user.forgot_token = null
			await user.save();
			res.status(200).json({success:"Password update successfully"});
		} else {
			res.status(400).json({error:"Forgot token not found"});
		}	
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);