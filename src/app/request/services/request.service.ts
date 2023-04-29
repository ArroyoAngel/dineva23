import { Injectable } from '@nestjs/common';
import { QuerySnapshot, getDoc } from 'firebase/firestore';
import { 
    db,
    setDoc, doc, getDocs, collection, deleteDoc, addDoc, uploadBytes, getDownloadURL, storage, ref
 } from '../../../helpers/firebase.config';

import { RequestFirebase } from '../domain/RequestFirebase';
import RequestDto from '../domain/RequestDto';
import Request from '../domain/Request';
import Requester from 'src/app/user/domain/User';

@Injectable()
export class RequestService {
    public async createRequest(payload: RequestDto): Promise<Request>{
        let _payload: any = payload;
        await addDoc(collection(db, 'requests'), payload).then( e=> {
            setDoc(doc(db, 'requests', e.id), { id: e.id }, { merge: true });
            _payload.id = e.id
        });
        
        return _payload;
    }

    protected async getRequesterByUid(uid): Promise<Requester>{
        const requesterSnapshot = await getDoc(doc(db, 'users', uid));
        const requester = requesterSnapshot.data() as Requester;
        return requester;
    }

    public async getRequests(): Promise<Request[]>{
        const querySnapshot: QuerySnapshot<RequestDto> = await getDocs(collection(db, 'requests').withConverter(RequestFirebase));
        const requests: RequestDto[] = await querySnapshot.docs.map((data)=>data.data());
        return await Promise.all(requests.map( async request => {
            const requester = await this.getRequesterByUid(request.requester);
            return { 
                id: '', code: '', description: '', image:'', provider: '', accepted: false, limit: null, detail: '', cardboard: [],
                ...request, requester
            }
        }))
    }

    public async updateRequest(uid: string, payload: RequestDto): Promise<void>{
        await setDoc(doc(db, 'requests', uid), { ...payload }, { merge: true });
    }

    public async deleteRequest(uid: string): Promise<void> {
        await deleteDoc(doc(db, 'requests', uid))
    }

    public async uploadImageUrl(uid: string, file: Express.Multer.File): Promise<string> {
        const storageRef = ref(storage, `request/${uid}/image/${file.originalname}`);
        await uploadBytes(storageRef, file.buffer);
        const url = await getDownloadURL(storageRef);
        return url;
    }

    public async uploadCardboardUrl(uid: string, file: Express.Multer.File): Promise<string> {
        const storageRef = ref(storage, `request/${uid}/cardboard/${file.originalname}`);
        await uploadBytes(storageRef, file.buffer);
        const url = await getDownloadURL(storageRef);
        return url;
    }
}
