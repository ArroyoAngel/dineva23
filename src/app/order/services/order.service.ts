import { Injectable } from '@nestjs/common';
import { QuerySnapshot, getDoc } from 'firebase/firestore';
import { 
    db,
    setDoc, doc, getDocs, collection, deleteDoc, addDoc
 } from '../../../helpers/firebase.config';

import { OrderFirebase } from '../domain/OrderFirebase';
import OrderDto from '../domain/OrderDto';
import Order from '../domain/Order';
import Requester from 'src/app/user/domain/User';

@Injectable()
export class OrderService {
    public async createOrder(payload: OrderDto): Promise<Order>{
        let _payload: any = payload;
        await addDoc(collection(db, 'orders'), payload).then( e=> {
            setDoc(doc(db, 'orders', e.id), { id: e.id }, { merge: true });
            _payload.id = e.id
        });
        
        return _payload;
    }

    protected async getRequesterByUid(uid): Promise<Requester>{
        const requesterSnapshot = await getDoc(doc(db, 'users', uid));
        const requester = requesterSnapshot.data() as Requester;
        return requester;
    }

    public async getOrders(): Promise<Order[]>{
        const querySnapshot: QuerySnapshot<Order> = await getDocs(collection(db, 'orders').withConverter(OrderFirebase));
        const orders: Order[] = await querySnapshot.docs.map((data)=>data.data());
        return orders;
    }

    public async updateOrder(uid: string, payload: OrderDto): Promise<void>{
        await setDoc(doc(db, 'orders', uid), { ...payload }, { merge: true });
    }

    public async deleteOrder(uid: string): Promise<void> {
        await deleteDoc(doc(db, 'orders', uid))
    }
}
