import { Injectable } from '@nestjs/common';
import { auth, signInWithEmailAndPassword, signOut } from '../../../helpers/firebase.config';
import { adminAuth } from 'src/helpers/firebase.config.admin';

@Injectable()
export class AuthService {
    constructor() {}

    async login(email: string, password: string): Promise<any> {
        console.log(email)
        const session = await signInWithEmailAndPassword(auth, email, password)
        console.log(session)
        return session;
    }

    async logout(signToken: string) {
        const decodedToken = await adminAuth.verifyIdToken(signToken);
        const uid = decodedToken.uid;
        await adminAuth.revokeRefreshTokens(uid);
        await signOut(auth);
        return { message: 'Logout exitoso' };
      }
}
