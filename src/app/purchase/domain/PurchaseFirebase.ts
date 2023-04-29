import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import PurchaseDto from './PurchaseDto'

export const PurchaseFirebase: FirestoreDataConverter<PurchaseDto> = {
    toFirestore(purchase: PurchaseDto): DocumentData {
        return {
            name: purchase.name,
            provider: purchase.provider,
            detail: purchase.detail,
            alias: purchase.alias,
            document: purchase.document,
            storehouse: purchase.storehouse,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): PurchaseDto {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            name: data.name,
            provider: data.provider,
            detail: data.detail,
            alias: data.alias,
            document: data.document,
            storehouse: data.storehouse,
        };
    },
};

export default PurchaseFirebase