import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import Account from './Account'

export const AccountFirebase: FirestoreDataConverter<Account> = {
    toFirestore(account: Account): DocumentData {
        return {
            email: account.email,
            password: account.password,
            role: account.role,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): Account {
        const data = snapshot.data(options);
        const { creationTime, lastSignInTime } = data.metadata;
        return {
            id: snapshot.id,
            email: data.email,
            password: data.password,
            role: data.role,
        };
    },
};

export default AccountFirebase