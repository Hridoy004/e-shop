const product = require('../schemas/products');

const getProduct = async (req, res) => {
    const productList = await product.find();
    if(!productList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productList);
}

const products = async (req, res) => {
    const items = new product({
        name: req.body.name, 
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    items.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
}



module.exports = {
    getProduct: getProduct,
    products: products
};
