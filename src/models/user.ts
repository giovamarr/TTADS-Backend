import {model, Schema, Document} from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    role: string;
    comparePassword: (password: string) => Promise<Boolean>;
    status?: boolean;
};

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'client'
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
      },
})

UserSchema.pre<IUser>('save', async function (next){
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})

UserSchema.methods.comparePassword = async function(
    password: string
  ): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
  };



export default model<IUser>('User', UserSchema)