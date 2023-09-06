import {model, Schema, Document} from 'mongoose'
import { IProduct } from './product.js';
import { IUser } from './user.js';

export interface ISaleProduct extends Document{
    product: IProduct,
    quantity: number,
    price: number,
}

export interface ISale extends Document{
    products: ISaleProduct[];
    user: IUser,
    totalPrice: number;
    date?: Date;
    state?: string;
};

const SaleSchema = new Schema<ISale>({
    products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    totalPrice: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    state: {
        type: String,
        required: true,
        default: '-',
      },
})


export default model<ISale>('Sale', SaleSchema)