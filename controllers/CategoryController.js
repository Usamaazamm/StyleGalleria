import Category_model from "../models/Category_model.js";
import slugify from "slugify";

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({
                message: 'name is required'
            })
        }
        const existingcategory = await Category_model.findOne({ name });
        if (existingcategory) {
            return res.status(200).send({
                success: true,
                message: "category already exist "
            })
        }
        const Category = await Category_model({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: 'new category craeted',
            Category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in category controller",
        })

    }

}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await Category_model.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "category updated successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in update controller',
            error,
        })

    }
}

export const getCategoryController = async (req, res) => {
    try {
        const category = await Category_model.find({})
        res.status(200).send({
            success: true,
            message: "get all categories successfully",
            category,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while getting all categories',
            error,
        })

    }
}

export const getSingleCategoryController = async (req, res) => {
    try {
        const category = await Category_model.findOne({ slug: res.params.slug })
        res.status(200).send({
            success: true,
            message: 'single category listed',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            messsage: 'error in getting single category',
            error,
        })

    }
}



export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await Category_model.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'deleted category successfully',
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            messsage: 'error in deleted category',
            error,
        })

    }
}

export default createCategoryController;