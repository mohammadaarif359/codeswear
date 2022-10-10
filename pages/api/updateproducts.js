import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		console.log('req body update',req.body);
        for(let i=0;i<req.body.length;i++) {
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
            /*let p = new Product({
                title:req.body[i].title,
                slug:req.body[i].slug,
                desc:req.body[i].desc,
                img:req.body[i].img,
                category:req.body[i].category,
                size:req.body[i].size,
                color:req.body[i].color,
                price:req.body[i].price,
                availableQty:req.body[i].availableQty    
            })
            await p.save();*/
        }
        res.status(200).json({success:"Product updated successfully"});
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);