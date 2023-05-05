import { Category } from '../interfaces/category';

export interface Products {
    title: string;
    imageCover: string;
    description: string;
    price: string;
    _id: string;
    ratingsAverage: string;
    category: Category;
}