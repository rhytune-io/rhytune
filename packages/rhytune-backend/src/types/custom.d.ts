import { InterfaceUser } from 'rhytune-shared-types';

declare global {
    namespace Express {
        interface User extends IUser { 
            id: string;
        }
    }
}