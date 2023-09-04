import {model, Schema, Document, Types} from 'mongoose'
import { ICategory } from './Category.js';

export interface IProduct extends Document{
    title: string;
    category: ICategory,
    description?: string;
    price?: string;
    image?: string;
    date?: Date;
    status?: boolean;
};

const ProductSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    image: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
      },
})


export default model<IProduct>('Product', ProductSchema)