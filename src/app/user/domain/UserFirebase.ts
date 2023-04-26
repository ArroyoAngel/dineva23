import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import User from './User'

export const UserFirebase: FirestoreDataConverter<User> = {
    toFirestore(User: User): DocumentData {
        return {
            email: User.email,
            name: User.name,
            lastname: User.lastname,
            phone: User.phone,
            age: User.age,
            credential: User.credential,
            gender: User.gender,
            birthdate: User.birthdate,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): User {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            email: data.email,
            name: data.name,
            lastname: data.lastname,
            phone: data.phone,
            age: data.age,
            credential: data.credential,
            gender: data.gender,
            birthdate: data.birthdate,
        };
    },
};

export default UserFirebase