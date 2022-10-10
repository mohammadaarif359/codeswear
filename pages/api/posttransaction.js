import Order from '../../models/Order'
import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'
//import PaytmChecksum from '../../PaytmChecksum'
 
const handler = async(req,res) =>{
	// check patym checksum
	/*var paytmChecksum = '';
	var patymParams = {}
	
	const received_data = req.body;
	for (var key in received_data) {
		if(key == 'CHECKSUMHASH'){
		  paytmChecksum = received_data[key]	
		} else {
		  patymParams = received_data[key]	
		}
	}
	var isVerifySignature = PaytmChecksum.verifySignature(patymParams, process.env.NEXT_PUBLIC_PAYTM_MKEY, paytmChecksum);
	if (!isVerifySignature) {
		console.log("Checksum Matched");
		return res.status(500).json({"error":"paytm checksum not match"})
	}*/
	// order data set
	let order = await Order.findOne({orderId:req.body.ORDERID});
	if(order) {
		let status;
		if(req.body.STATUS == 'TXN_SUCCESS') {
			status = 'success';
		} else if(req.body.STATUS == 'PENDING') {
			status = 'pending';
		} else {
			status = 'failed';
		}
		order.status = status;
		order.tansactionId = req.body.TXN_TOKEN;
		order.paymentInfo = JSON.stringify(req.body);
		await order.save();
		// set available qty
		if(status == 'success') {
			let products = order.products
			for(let item in products) {
				await Product.findOneAndUpdate({slug:item},{$inc: {availableQty:-products[item].qty}})
			}
		}
		res.status(200).json({ success:"Order payment successfully",orderId:order._id })
	} else {
		res.status(200).json({ error: 'order not found' })
	}
}
export default connectDb(handler);
