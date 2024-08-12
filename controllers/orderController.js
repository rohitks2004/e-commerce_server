const Order = require('../modals/orderModel');
const Cart = require('../modals/cartModal');
const User = require('../modals/userModal');
const Products = require('../modals/productModal');


exports.showOrder = async (req,res)=>{
    const userId = req.user.user_id;
    const {email} =await User.findOne({_id:userId})

    const order =await Order.findOne({email})

    const products = await Promise.all(

        order.products.map(async (product)=>{
            const productDetails = await Products.findOne({id:product.productId})
            // console.log(productDetails)
              return{
                id:productDetails.id,
                title: productDetails.title,
                description:productDetails.description,
                price: productDetails.price,
                image:productDetails.image,
                quantity:product.quantity
            }
        })
    );
    const detailedOrder = {
        name: order.name,
        address: order.address,
        products: products,
        email: order.email,
        orderDate: order.orderDate,
        deliveryDate: order.deliveryDate,
    }
    res.status(200).json(detailedOrder)
}

exports.createOrder = async(req,res)=>{
    const {address} = req.body
    const userId = req.user.user_id;

    const user =await User.findOne({_id:userId});
    const {name,email} = user;

    const userCart = await Cart.findOne({userId});
    const products = userCart.products;

    if(!userCart && !userCart.products.length){
        return res.status(404).json({message:"Cart is empty"})
    }
    try{
        const order = new Order({
            name,
            email,
            address,
            products
        })  
        order.save()
        res.status(200).json("order created");
    }catch(e){
       console.log(e)
    }
}

// const userCart = await Cart.findOne({userId});

//     if(!userCart && !userCart.products.length){
//         return res.status(404).json({message:"Cart is empty"})
//     }

//     try{
//     let subtotal =0;
//     const allproducts =  await Products.find();
//     const products = userCart.products.map((product)=>{

//         const productDetails = allproducts.find((item)=> item.id == product.productId);

//         subtotal += productDetails.price * product.quantity;
//         return {
//             id:productDetails.id,
//             title:productDetails.title,
//             description:productDetails.description,
//             price:productDetails.price,
//             image:productDetails.image,
//             quantity:product.quantity
//         };
//     })
//     res.status(200).json({products,subtotal});
// }catch(e){
//     res.status(500).json({
//         message:"Error in fetching products",
//     })
// }


// let subtotal =0;
//         const allproducts =  await Products.find();
//         products = userCart.products.map((product)=>{
    
//             const productDetails = allproducts.find((item)=> item.id == product.productId);
    
//             subtotal += productDetails.price * product.quantity;
//             return {
//                 id:productDetails.id,
//                 title:productDetails.title,
//                 description:productDetails.description,
//                 price:productDetails.price,
//                 image:productDetails.image,
//                 quantity:product.quantity
//             };
//         })
        // res.status(200).json({products,subtotal});