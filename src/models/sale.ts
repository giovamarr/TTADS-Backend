import {model, Schema, Document} from 'mongoose'
import { IProduct } from './product.js';
import { IUser } from './user.js';

export interface ISaleProduct extends Document{
    product: IProduct,
    amount: number,
    salePrice: number,
}

export interface ISale extends Document{
    products: ISaleProduct[];
    user: IUser,
    addres: string;
    totalPrice: number;
    date?: Date;
    state?: string;
};

const SaleSchema = new Schema<ISale>({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        amount: {
            type: String,
            required: true,
        },
        salePrice: {
            type: Number,
            required: true,
        },
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    addres: {
        type: String,
        required: false,
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