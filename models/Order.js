const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    email: {
		type:String,
		required:true
	},
	orderId: {
		type:String,
		required:true
	},
	tansactionId: {
		type:String,
		default:""
	},
	products: {
		type:Object,
		required:true
	},
    amount : {
        type:Number,
        required:true
    },
    status : {
        type:String,
        default:'Pending',
        required:true
    },
	paymentInfo: {
		type:String,
		default:''
	},
	address:{
		type:String,
		required:true
	}
},{
    timestamps:true
})

mongoose.models = {}
export default mongoose.model('Order',orderSchema);