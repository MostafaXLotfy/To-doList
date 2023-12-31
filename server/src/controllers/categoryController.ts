import { Request, Response } from "express";
import { Category } from "../models/categoryModel";
import { Todo } from "../models/todoModel";
// get

export const getCategories = async (req: Request, res: Response) => {
    const userID = (req as any).user?._id
    const page = parseInt(req.query.page as string) || 0
    const ELEMENTS_PER_PAGE = 4
    try {
        const [totalDocuments, categories] = await Promise.all([
            Category.countDocuments({ userID }),
            Category
                .find({ userID })
                .skip(page * ELEMENTS_PER_PAGE)
                .limit(ELEMENTS_PER_PAGE)]
        )
        const totalPages = Math.ceil(totalDocuments / ELEMENTS_PER_PAGE)
        res.status(200).json({totalPages, categories});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "couldn't fetch the document" });
    }
};


//post
export const addCategory = async (req: Request, res: Response) => {
    const category = req.body;
    category.userID = (req as any).user?._id
    try {
        const result = await Category.create(category);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "couldn't insert the document" });
    }
};

export //delete
    const deleteCategory = async (req: Request, res: Response) => {
        const ID = req.params.ID;
        try {
            const result = await Promise.all([
                Category.findByIdAndDelete(ID),
                Todo.deleteMany({categoryID: ID})
            ]);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Couldn't delete the document" });
        }
    };

//patch
export const updateCateogry = async (req: Request, res: Response) => {
    const ID = req.params.ID;
    const updates = req.body;
    try {
        const result = await Category.findByIdAndUpdate(ID, updates);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't update the document" });
    }
};
