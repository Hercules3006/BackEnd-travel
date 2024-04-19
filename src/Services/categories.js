import categoriesModel from '../Models/categories.js';
import { model, Types } from 'mongoose';

const categories = model('categories', categoriesModel);

const categoriesService = {
    getAllCategories: () => {
        try {
            return categories.find();
        }
        catch (err) {
            return null;
        }
    },

    getCategoryById: (id) => {
        try {
            return categories.findById(id);
        }
        catch (err) {
            return null;
        }
    },
    createCategory: (category) => {
        try {
            return categories.create(category);
        }
        catch (err) {
            return null;
        }
    },
    updateCategory: (id, category) => {
        try {
            return categories.findByIdAndUpdate(id, category);
        }
        catch (err) {
            return null;
        }
    },
    deleteCategory: (id) => {
        try {
            return categories.findByIdAndDelete(id);
        }
        catch (err) {
            return null;
        }
    }
}

export default categoriesService;