// user.interface.ts

export interface User {
    id: string;
    uuid: string;
    username: string;
    githubId: string;
    // Define other fields as necessary
}

export interface UserModel {
    findByid(id: string): Promise<User | null>;
    findOrCreate(profile: any): Promise<User>;
    findByGithubId(githubId: string): Promise<User | null>;
}