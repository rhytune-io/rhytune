import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    id?: string;
    uuid: string;
    username: string;
    githubId: string;
    // Define other fields as necessary
}

const UserSchema: Schema = new Schema({
    uuid: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    githubId: { type: String, required: true },
    // Define other fields as necessary
});

// Static method to find user by id
UserSchema.statics.findByid = function (uuid: string) {
    return this.findOne({ uuid: uuid });
};

interface UserModel extends Model<IUser> {
    findByid(id: string): Promise<IUser>;
}

const User: UserModel = mongoose.model<IUser, UserModel>('User', UserSchema);

export default User;
