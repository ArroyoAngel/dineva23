import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"

export default function (status: number, message: string, data: object, owner: DecodedIdToken){
    const metadata = get_metadata(owner)
    return {
        status,
        message,
        data,
        metadata,
    }
}

function get_metadata (owner: DecodedIdToken) {
    return {
        date: new Date(),
        owner: {
            uid: owner.user_id,
            expireToken: owner.exp,
            email: owner.email,
        }
    }
}