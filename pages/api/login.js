import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisgoodb$oy';

const handler = async(req,res) =>{
    if(req.method == 'POST') {
        console.log('in api',req.body)
        let user = await User.findOne({email:req.body.email})
        if(user) {
			const bytes  = CryptoJS.AES.decrypt(user.password, 'secret123');
			let decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
			if(decryptPassword == req.body.password) {
				const data = {
					user: {
					  id: user.id,
					},
				};
				const authtoken = jwt.sign(data, JWT_SECRET);
				const redirectTo = (user.role == 'admin') ? '/admin' : '/checkout';
				res.status(200).json({success:"User login successfully",user:user,token:authtoken,redirectTo:redirectTo});	
			} else {
				res.status(200).json({error:"invalid password"});	
			}
        }
        else {
            res.status(200).json({error:"invalid credentails"});
        }
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);