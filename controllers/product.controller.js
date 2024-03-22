const Product = require('../models/product.model')

exports.findAll = async(req, res) => {
    console.log('Find all products')

    try{
        const result = await Product.find()
        res.status(200).json({data:result})
    } catch(err) {
        console.log(`Problem in reading products, ${err}`)
    }
}

exports.findOne = async(req, res) => {
    console.log('Find a product')

    const _id = req.params.id

    try{
    const result = await Product.findOne({_id:_id})
    res.status(200).json({data:result})
    }
    catch(err) {
        console.log(`Problem in reading product, ${err}`)
    }
}

exports.create = async(req, res) => {
    console.log('Insert product')

    console.log(req.body)

    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    })

    try{
        const result = await newProduct.save()
        res.status(200).json({data:result})
        console.log('Product saved')
    } catch(err) {
        res.status(400).json({data:err})
        console.log("Problem in saving product")
    }
}

exports.update = async(req, res) => {
    const _id = req.params.id
    console.log('Update product with id: ', _id)

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {
        const result = await Product.findOneAndUpdate(
            {_id: _id}, 
            updateProduct, 
            {new:true}
        )
        res.status(200).json({data:result})
        console.log('Success in updating product with id: ', _id)
    } catch(err) {
        res.status(400).json({data:err})
        console.log('Problem in updating product with id: ', _id)

    }
}

exports.delete = async(req, res) => {
    const _id = req.params.id
    console.log('Delete product: ', _id)

    try{
        const result = await Product.findOneAndDelete({
            _id:_id
        })
        res.status(200).json({data:result})
        console.log('Success in deleting product: ', _id)
    } catch(err) {
        res.status(400).json({data:err})
        console.log('Problem in deleting product: ', _id)
    }
}