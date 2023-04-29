import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import Order from './Order'

export const OrderFirebase: FirestoreDataConverter<Order> = {
    toFirestore(order: Order): DocumentData {
        return {
            code: order.name,
            name: order.name,
            phone: order.phone,
            address: order.address,
            departament: order.departament,
            detail: order.detail,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): Order {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            name: data.name,
            phone: data.phone,
            address: data.address,
            departament: data.departament,
            detail: data.detail,
        };
    },
};

export default OrderFirebase