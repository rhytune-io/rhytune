import { Document, Model } from 'mongoose';

export interface IUser extends Document {
    id?: string;
    uuid: string;
    username: string;
    githubId: string;
    // Define other fields as necessary
}

export interface IUserModel extends Model<IUser> {
    findByid(id: string): Promise<IUser | null>;
    findOrCreate(profile: any): Promise<IUser>;
    findByGithubId(githubId: string): Promise<IUser | null>;
}
