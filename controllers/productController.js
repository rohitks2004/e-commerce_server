const Product = require("../modals/productModal")
const {v4:  uuidv4} = require('uuid')
exports.getproducts = async (req,res)=>{
    try{
        console.log(req.user);
        const products = await Product.find();
        res.send(products);
    }
    catch(err){
        console.log(err);
    }
}
exports.createproduct = async (req,res)=>{
    const {title,description,price,category,rating,image} = req.body;
    const product = new Product({
        id:uuidv4(),
        title,
        description,
        price,
        rating,
        category,
        image 
    })
    try{
        await product.save()
        res.status(200).json('product created succcessfully');
    }
    catch(e){
        console.log(e);
    }
}
exports.updateProduct = async (req,res)=>{
    const id = req.params.id;
    try{ 
        const product = await Product.find({id})
        const {title,description,price,category,image,rating} = product
        console.log(product)
        await Product.updateOne({id},{
            $set:{
                title:(req.body.title || title ),
                description:(req.body.description || description),
                price:(req.body.price || price),
                category:(req.body.category || category),
                image:(req.body.image || image),
                rating:(req.body.rating || rating)
            }
        })
        res.status(200).json('updated')
    }
    catch(e){
        console.log(e)
    }
}
exports.deleteProduct = async(req,res)=>{
    try{
        const id = req.body.id;
        await Product.deleteOne({id})
    }catch(e){
        console.log(e)
    }
}