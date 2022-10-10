import connectDb from '../../middleware/mongoose'
import Order from '../../models/Order'
import User from '../../models/User'
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisgoodb$oy';

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		let jwtData = jwt.verify(req.body.token, JWT_SECRET);
		let user = await User.findById(jwtData.user.id)
		let orders = await Order.find({email:user.email})
		res.status(200).json({success:"Order get successfully",data:orders});	
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);