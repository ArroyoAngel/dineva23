export interface User {
    id: string;
    name: string;
    lastname: string;
    phone: string;
    age: number;
    credential: string;
    gender: Gender;
    birthdate: Date;
    email: string;
}

export default User

export type Gender = 'male' | 'female' | 'other';