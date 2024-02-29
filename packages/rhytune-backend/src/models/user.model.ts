// rhytune-backend/src/models/user.model.ts

import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User as UserInterface, UserModel } from 'rhytune-shared-types';

const UserSchema: Schema = new Schema({
    uuid: { type: String, required: true, unique: true },
    id: { type: String, required: true },
    username: { type: String, required: true },
    githubId: { type: String, required: true },
    email: { type: String, required: true },
    avatarUrl: { type: String },
    isInitialized: { type: Boolean, default: false }, // 新增 isInitialized 字段
});

// Static method to find user by id
UserSchema.statics.findById = function (uuid: string) {
    return this.findOne({ uuid: uuid });
};

// Static method to find user by githubId
UserSchema.statics.findByGithubId = function (githubId: string) {
    return this.findOne({ githubId: githubId });
};

UserSchema.statics.findOrCreate = async function (profile) {
    let user = await this.findOne({ githubId: profile.id });

    if (!user) {
        // 定义 isFullyInitialized 的条件
        const requiredFields = ['username', 'email']; // 根据需要添加更多字段

        // 检查所有必需字段是否都存在
        const isFullyInitialized = requiredFields.every(field => !!profile[field]);

        user = await this.create({
            uuid: uuidv4(),
            id: profile.id,
            username: profile.username || '', // 如果缺少，则提供一个空字符串作为默认值
            githubId: profile.id,
            email: profile.email || '', // 如果缺少，则提供一个空字符串作为默认值
            avatarUrl: profile.avatarUrl || '', // 假设 profile 中可能包含 avatarUrl，如果缺少，则提供一个空字符串作为默认值
            isInitialized: isFullyInitialized // 根据必需字段的存在情况设置
        });
    }

    return user;
};


export default mongoose.model<UserInterface, UserModel>('User', UserSchema);
