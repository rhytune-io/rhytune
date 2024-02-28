import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser, IUserModel } from './user.interface';

const UserSchema: Schema = new Schema({
    uuid: { type: String, required: true, unique: true },
    id: { type: String, required: true },
    username: { type: String, required: true },
    githubId: { type: String, required: true },
    // 其他字段...
});

// Static method to find user by id
UserSchema.statics.findByid = function (uuid: string) {
    return this.findOne({ uuid: uuid });
};

// Static method to find user by githubId
UserSchema.statics.findByGithubId = function (githubId: string) {
    return this.findOne({ githubId: githubId });
};

UserSchema.statics.findOrCreate = async function (profile) {
    let user = await this.findOne({ githubId: profile.id });

    if (!user) {
        // 如果用户不存在，创建一个新用户
        user = await this.create({
            uuid: uuidv4(),
            id: profile.id,
            username: profile.username,
            githubId: profile.id
        });
    }

    return user;
};

export default mongoose.model<IUser, IUserModel>('User', UserSchema);
