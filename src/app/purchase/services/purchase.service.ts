import { Injectable } from '@nestjs/common';
import { QuerySnapshot, getDoc } from 'firebase/firestore';
import { 
    db,
    setDoc, doc, getDocs, collection, deleteDoc, addDoc, ref, uploadBytes, getDownloadURL, storage
 } from '../../../helpers/firebase.config';

import { PurchaseFirebase } from '../domain/PurchaseFirebase';
import PurchaseDto from '../domain/PurchaseDto';
import Purchase from '../domain/Purchase';
import Storehouse from 'src/app/storehouse/domain/Storehouse';

@Injectable()
export class PurchaseService {
    public async createPurchase(payload: PurchaseDto): Promise<Purchase>{
        let _payload: any = payload;
        await addDoc(collection(db, 'purchases'), payload).then( e=> {
            setDoc(doc(db, 'purchases', e.id), { id: e.id }, { merge: true });
            _payload.id = e.id
        });
        
        return _payload;
    }

    protected async getStorehouseByUid(uid): Promise<Storehouse>{
        const storehouseSnapshot = await getDoc(doc(db, 'storehouses', uid));
        const storehouse = storehouseSnapshot.data() as Storehouse;
        return storehouse;
    }

    public async getPurchases(): Promise<Purchase[]>{
        const querySnapshot: QuerySnapshot<PurchaseDto> = await getDocs(collection(db, 'purchases').withConverter(PurchaseFirebase));
        const purchases: PurchaseDto[] = await querySnapshot.docs.map((data)=>data.data());

        return await Promise.all(purchases.map( async purchase => {
            const storehouse = await this.getStorehouseByUid(purchase.storehouse);
            return { id: '', name: '', provider: '', detail: '', alias: '', document: '',
                ...purchase, storehouse
            }
        }))
    }

    public async updatePurchase(uid: string, payload: PurchaseDto): Promise<void>{
        await setDoc(doc(db, 'purchases', uid), { ...payload }, { merge: true });
    }

    public async deletePurchase(uid: string): Promise<void> {
        await deleteDoc(doc(db, 'purchases', uid))
    }

    public async uploadExcelFile(uid: string, file: Express.Multer.File): Promise<string> {
        const storageRef = ref(storage, `purchase/${uid}/${file.originalname}`);
        await uploadBytes(storageRef, file.buffer);
        const url = await getDownloadURL(storageRef);
        return url;
    }
}
