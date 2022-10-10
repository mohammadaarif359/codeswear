import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
var CryptoJS = require("crypto-js");

const handler = async(req,res) =>{
    if(req.method == 'POST') {
        console.log('in api',req.body)
        let u = new User({
            name:req.body.name,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString()
        })   
        await u.save();
        res.status(200).json({success:"User signup successfully"});
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);