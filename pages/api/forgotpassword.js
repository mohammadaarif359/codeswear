import connectDb from '../../middleware/mongoose'
import User from '../../models/User'
var nodemailer = require("nodemailer");

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		let user = await User.findOne({email:req.body.email})
		if(user) {
			let forgot_token =  (Math.random() + 1).toString(36).substring(2);
			user.forgot_token = forgot_token
			await user.save();
			let transporter = nodemailer.createTransport({
			  host: 'smtp.mailtrap.io',
			  port: 587,
			  secure: false, // true for 465, false for other ports
			  auth: {
				user: '2519d192195eee', // generated ethereal user
				pass: '87cebf85791250', // generated ethereal password
			  },
			});

			// send mail with defined transport object
			let info = await transporter.sendMail({
			  from: '<aarif@technoscore.net>', // sender address
			  to: req.body.email, // list of receivers
			  subject: 'Reset Password', // Subject line
			  //text: "Hello world?", // plain text body
			  //html: '<b>Test</b>', // html body
			  html: `<p>Plese click the below link to reset your password</p><center><a href="http://localhost:3000/reset?forgot_token=${forgot_token}"><button type="button">Reset Password</button></a></center>`, // html body
			});
			if (info.messageId) {
			  res.status(200).json({success:"Password reset link send"});
			} else {
			  res.status(500).json({error: 'please try later'});
			}
		} else {
			res.status(400).json({error:"User not found"});
		}	
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);