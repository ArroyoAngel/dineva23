import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import RequestDto from './RequestDto'

export const RequestFirebase: FirestoreDataConverter<RequestDto> = {
    toFirestore(request: RequestDto): DocumentData {
        return {
            code: request.code,
            description: request.description,
            image: request.image,
            provider: request.provider,
            accepted: request.accepted,
            limit: request.limit,
            detail: request.detail,
            cardboard: request.cardboard,
            requester: request.requester,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): RequestDto {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            code: data.code,
            description: data.description,
            image: data.image,
            provider: data.provider,
            accepted: data.accepted,
            limit: data.limit,
            detail: data.detail,
            cardboard: data.cardboard,
            requester: data.requester,
        };
    },
};

export default RequestFirebase