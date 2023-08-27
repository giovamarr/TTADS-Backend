import {model, Schema, Document} from 'mongoose'

export interface ICategory extends Document{
    title: string;
    image?: string;
    status?: boolean;
};

const CategorySchema = new Schema<ICategory>({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
      },
})


export default model<ICategory>('Category', CategorySchema)