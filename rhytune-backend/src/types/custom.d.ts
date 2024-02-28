import { IUser } from '../User';

declare global {
    namespace Express {
        interface User extends IUser { 
            id: string;
        }
    }
}