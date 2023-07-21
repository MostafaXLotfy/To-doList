import { Collection, Db, ObjectId } from "mongodb";
import { getDB } from "../db";
import { Category } from "../types/category";

let db:Db
export const initCategoriesService = () =>{
    db = getDB();

}

export const getCategories = async () => {
  const collection: Collection<Category> = db.collection("categories");
  const categories = collection.find().toArray();
  return categories;
};

export const getCategoryByID = async (ID: string) => {
  const collection: Collection<Category> = db.collection("categories");
  const category =  collection.findOne({
    _id: new ObjectId(ID),
  });
  return category;
};

export const deleteCategoryByID = async (ID: string) => {
  const collection: Collection<Category> = db.collection("categories");
  const result =  collection.deleteOne({ _id: new ObjectId(ID) });
  return result;
};

export const updateCategory = async (ID: string, updates: Category) => {
  const collection: Collection<Category> = db.collection("categories");
  const result =  collection.updateOne(
    { _id: new ObjectId(ID) },
    { $set: updates }
  );
  return result;
};

export const addCategory = async (category: Category) => {
  const collection: Collection<Category> = db.collection("categories");
  const result =  collection.insertOne(category);
  return result;
};
