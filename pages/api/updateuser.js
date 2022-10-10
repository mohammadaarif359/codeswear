import connectDb from '../../middleware/mongoose'
import User from '../../models/User'
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisgoodb$oy';

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		let jwtData = jwt.verify(req.body.token, JWT_SECRET);
		let user = await User.findOneAndUpdate({_id:jwtData.user.id},{name:req.body.name,phone:req.body.phone,address:req.body.address,pincode:req.body.pincode})
		if(user) {
			res.status(200).json({success:"User update successfully",data:user});	
		} else {
			res.status(400).json({error:"User not found"});
		}	
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);