import { Injectable } from '@nestjs/common';
import { QuerySnapshot } from 'firebase/firestore';
import { 
    db,
    setDoc, doc, getDocs, collection, deleteDoc, addDoc
 } from '../../../helpers/firebase.config';

import { StorehouseFirebase } from '../domain/StorehouseFirebase';
import StorehouseDto from '../domain/StorehouseDto';
import Storehouse from '../domain/Storehouse';

@Injectable()
export class StorehouseService {
    public async createStorehouse(payload: StorehouseDto): Promise<Storehouse>{
        let _payload = payload as Storehouse;
        await addDoc(collection(db, 'storehouses'), payload).then( e=> {
            setDoc(doc(db, 'storehouses', e.id), { id: e.id }, { merge: true });
            _payload.id = e.id
        });
        
        return _payload;
    }

    public async getStorehouses(): Promise<Storehouse[]>{
        const querySnapshot: QuerySnapshot<Storehouse>= await getDocs(collection(db, 'storehouses').withConverter(StorehouseFirebase));
        const storehouses: Storehouse[] = await querySnapshot.docs.map((data)=>data.data());
        return storehouses;
    }

    public async updateStorehouse(uid: string, payload: StorehouseDto): Promise<void>{
        await setDoc(doc(db, 'storehouses', uid), { ...payload }, { merge: true });
    }

    public async deleteStorehouse(uid: string): Promise<void> {
        await deleteDoc(doc(db, 'storehouses', uid))
    }
}
