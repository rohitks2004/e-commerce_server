const Cart = require('../modals/cartModal')
const Products = require('../modals/productModal')

exports.showCart = async (req,res)=>{
    const userId = req.user.user_id;
    const userCart = await Cart.findOne({userId});

    if(!userCart && !userCart.products.length){
        return res.status(404).json({message:"Cart is empty"})
    }

    try{
    let subtotal =0;
    const allproducts =  await Products.find();
    const products = userCart.products.map((product)=>{

        const productDetails = allproducts.find((item)=> item.id == product.productId);

        subtotal += productDetails.price * product.quantity;
        return {
            id:productDetails.id,
            title:productDetails.title,
            description:productDetails.description,
            price:productDetails.price,
            image:productDetails.image,
            quantity:product.quantity
        };
    })
    res.status(200).json({products,subtotal});
}catch(e){
    res.status(500).json({
        message:"Error in fetching products",
    })
}
}

exports.addToCart = async(req,res)=>{
    const userId = req.user.user_id;
    const {productId,quantity} = req.body;
    const userCart = await Cart.findOne({userId});
    // console.log(userCart)
    if(!userCart){
        const userCart = new Cart({
            userId:userId,
            products:[
                {
                    productId,
                    quantity,
                }
            ],
        })
        try{
            await userCart.save();
            res.status(200).json("new cart created")
        }catch(e){
            console.log(e)
        }
    }
    else{
        const products = userCart.products;
        const existing_product =products.find((product)=>product.productId == productId);

        if(existing_product){
            existing_product.quantity = quantity;
        }
        else{
            products.push({
                productId,
                quantity
            })
        }
        try{
            await userCart.save();
            res.status(200).json("product added to cart")
        }catch(e){
            console.log(e)
        }
    }   
}

exports.removefromcart=async(req,res)=>{
    const userId=req.user.user_id;
    // const {productId} = req.body;
    const productId = req.params.id
    console.log(req.params)
    const userCart=await Cart.findOne({userId})
    if(!userCart){
        return res.status(404).json("cart not found")
    }else{
        const cartitems=userCart.products;
        if(!cartitems){
            res.status(200).json("No items in cart")
        }
        else{
            if(!cartitems.find((item)=>productId==item.productId)){
                res.status(200).json("product not found in cart")
            }
            const updatedCartitems=cartitems.filter((product)=>productId!=product.productId)
            userCart.products = updatedCartitems;
            await userCart.save();
            res.status(200).json("item removed from cart")
        }
    }
}