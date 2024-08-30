import slugify from "slugify";
import product_model from "../models/product_model.js"
import fs from 'fs';

export const createProductsController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !name:
                return res.status(500).send({ error: 'name is required' })
            case !category:
                return res.status(500).send({ error: ' category is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required and less then 10mb' })
        }

        const Products = new product_model({ ...req.fields, slug: slugify(name) })
        if (photo) {
            Products.photo.data = fs.readFileSync(photo.path)
            Products.photo.contentType = photo.type
            await Products.save();
            res.status(201).send({
                success: true,
                message: 'products save successfully',
                Products,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in product controller',
            error,
        })

    }
}
export const getProductsController = async (req, res) => {
    try {
        const product = await product_model.find({}).select('-photo').populate('category').limit(12).sort({ createdat: -1 })
        res.status(200).send({
            success: true,
            message: 'get all products successfully',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while get all products ',
            error: error.message,
        })

    }
}
export const singleProductsController = async (req, res) => {
    try {
        const product = await product_model.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'get single product successfully',
            product,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while getting single product ',
            error: error.message,
        })

    }
}
export const photoProductsController = async (req, res) => {
    try {
        const product = await product_model.findById(req.params.pid).select('photo')
        if (product.photo.data)
            res.set("contentType", product.photo.contentType)
        return res.status(200).send(product.photo.data);

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while fetching photo",
            error,
        })

    }
}


export const deleteProductsController = async (req, res) => {
    try {
        await product_model.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: 'product deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in deleting controller',
            error,

        })

    }
}


export const updateProductsController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !name:
                return res.status(500).send({ error: 'name is required' })
            case !category:
                return res.status(500).send({ error: ' category is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required and less then 10mb' })
        }
        const Product = await product_model.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true })
        if (photo) {
            Product.photo.data = fs.readFileSync(photo.path)
            Product.photo.contentType = photo.type
        }
        await Product.save();
        res.status(200).send({
            success: true,
            message: 'products update successfully',
            Product,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in update product controller',
            error,
        })
    }
}

export const filterProductController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const product = await product_model.find(args)
        res.status(200).send({
            success: true,
            message: 'filter product successfully',
            product
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in filter ",
            error,
        })

    }
}

export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await product_model
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
};
