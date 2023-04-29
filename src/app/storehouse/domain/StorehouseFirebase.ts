import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import Storehouse from './Storehouse'

export const StorehouseFirebase: FirestoreDataConverter<Storehouse> = {
    toFirestore(storehouse: Storehouse): DocumentData {
        return {
            name: storehouse.name,
            address: storehouse.address,
            phone: storehouse.phone,
            description: storehouse.description,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): Storehouse {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            name: data.name,
            address: data.address,
            phone: data.phone,
            description: data.description,
        };
    },
};

export default StorehouseFirebase