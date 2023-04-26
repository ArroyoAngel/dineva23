import { Injectable } from '@nestjs/common';
import { 
    db,
    addDoc, setDoc, doc, getDocs, collection, deleteDoc,
    storage, ref, uploadBytes, getDownloadURL
 } from '../../../helpers/firebase.config';

import { QuerySnapshot } from 'firebase/firestore';
import User from '../domain/User';
import UserFirebase from '../domain/UserFirebase';
import { UserDto } from '../domain/UserDto';

@Injectable()
export class UserService {
    constructor(){}

    async createUser(payload: User): Promise<User>{
        await addDoc(collection(db, 'users'), payload).then( e=> {
            setDoc(doc(db, 'users', e.id), { id: e.id }, { merge: true });
            payload.id = e.id
        });
        return payload;
    }

    public async getUsers(): Promise<User[]>{
        const querySnapshot: QuerySnapshot<User>= await getDocs(collection(db, 'users').withConverter(UserFirebase));
        const Users: User[] = await querySnapshot.docs.map((data)=>data.data());
        return Users;
    }

    public async updateUser(uid: string, payload: UserDto): Promise<void>{
        await setDoc(doc(db, 'users', uid), { ...payload }, { merge: true });
    }

    public async deleteUser(uid: string): Promise<void> {
        await deleteDoc(doc(db, 'users', uid))
    }
    
    public async uploadPhotoUrl(uid: string, file: Express.Multer.File): Promise<string> {
        const storageRef = ref(storage, `users/photoProfile/${uid}/${file.originalname}`);
        await uploadBytes(storageRef, file.buffer);
        const url = await getDownloadURL(storageRef);
        return url;
    }
}
