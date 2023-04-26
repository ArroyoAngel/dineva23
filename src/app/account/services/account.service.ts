import { Injectable } from '@nestjs/common';
import admin  from '../../../helpers/firebase.config.admin';
import { User } from 'firebase/auth';
import { QuerySnapshot } from 'firebase/firestore';
import { 
    db,
    auth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail,
    setDoc, doc, getDocs, collection, deleteDoc
 } from '../../../helpers/firebase.config';

import Account, { Roles } from '../domain/Account';
import { AccountFirebase } from '../domain/AccountFirebase';
import AccountDto from '../domain/AccountDto';

@Injectable()
export class AccountService {
    public async createAccount(payload: Account): Promise<User>{
        const { email, password }  = payload;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        const { uid } = userCredential.user;
        await this.addAccountToStore(payload, uid);
        await this.setCustomerClaims(uid, userCredential.user, payload.role);
        
        return userCredential.user;
    }

    protected async addAccountToStore(payload: Account, uid: string): Promise<void> {
        delete payload.password;
        await setDoc(doc(db, 'accounts', uid), { ...payload, id: uid }, { merge: true });
    }

    protected async setCustomerClaims(uid: string, user: User, role: Roles): Promise<void>{
        await admin.auth().setCustomUserClaims(uid, { role });
        await user.getIdToken(true);
    }

    public async getAccounts(): Promise<Account[]>{
        const querySnapshot: QuerySnapshot<Account>= await getDocs(collection(db, 'accounts').withConverter(AccountFirebase));
        const accounts: Account[] = await querySnapshot.docs.map((data)=>data.data());
        return accounts;
    }

    public async updateAccount(uid: string, payload: AccountDto): Promise<void>{
        await setDoc(doc(db, 'accounts', uid), { ...payload }, { merge: true });
    }

    public async deleteAccount(uid: string): Promise<void> {
        await deleteDoc(doc(db, 'coleccion1', uid))
    }

    public async enabledAccount(disabled: boolean, uid: string){
        await admin.auth().updateUser(uid, { disabled })
    }

    public async resetPassword(email: string): Promise<void>{
        console.log(email)
        await sendPasswordResetEmail(auth, email);
    }
}
