import { Timestamp } from "firebase/firestore";

export interface Account {
    id: string;
    email: string;
    password: string;
    role: Roles;
}

export type Roles = 'admin' | 'operator' | 'client'

export default Account