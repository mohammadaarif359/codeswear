import Order from '../../models/Order'
import connectDb from '../../middleware/mongoose'
 
const handler = async(req,res) =>{
	//if(req.method == 'POST') {
		let order = await Order.findOne().sort({deliveredAt:-1});
		let activities = [];
		if(order) {
			console.log('order id',order._id)
			activities = [
			  {
				time: new Date(order.deliveredAt).toLocaleString(),
				color: "secondary.main",
				text: "Order delivered at"
			  },
			  {
				time: new Date(order.paidAt).toLocaleString(),
				color: "success.main",
				text: "Order paid at"
			  },
			  {
				time: new Date(order.createdAt).toLocaleString(),
				color: "secondary.main",
				text: "Order created at",
			  },
			];
		}
		let currentYear = new Date().getFullYear();
		let saleDate = new Date(currentYear+'-01-01');
		
		let sales = await Order.aggregate([
			{$match: {
				"createdAt": { $gte: saleDate},
			}},
			{$group: {
				_id: {$month: "$createdAt"}, 
				count: {$sum: 1} 
			}}
		]);
		console.log('orders sales',sales)
		let deliveries = await Order.aggregate([
			{$match: {
				"createdAt": { $gte: saleDate},
				"deliveredAt": {$ne: null}
			}},
			{$group: {
				_id: {$month: "$createdAt"}, 
				count: {$sum: 1} 
			}}
		]);
		console.log('orders delivery',deliveries)
		
		let saleData = [0,0,0,0,0,0,0,0,0,0,0,0];
		sales.map((sale)=>{
			saleData[sale._id] = sale.count;
		})
		let deliveryData = [0,0,0,0,0,0,0,0,0,0,0,0];
		deliveries.map((deliver)=>{
			deliveryData[deliver._id] = deliver.count;
		})
		return res.status(200).json({ success: 'dashboard dat get succesfully',activities,saleData,deliveryData,currentYear})
 	/*} else {
		return res.status(500).json({ error: 'method not found' })
	}*/
	
}
export default connectDb(handler);