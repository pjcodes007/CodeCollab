import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document {
  username: string;
  email: string;
  githubId: string;      
  accessToken: string;
}


const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    githubId: { type: String, required: true, unique: true }, 
    accessToken: {type:String, required:true}
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
