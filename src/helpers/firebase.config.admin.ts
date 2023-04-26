import admin from 'firebase-admin'
const serviceAccount:any = {
  "type": "service_account",
  "project_id": "dineva-25544",
  "private_key_id": "274076ef3e62124ab32f5aa4ff35f406f1bd2e68",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCueYL2pMHBLSkS\nUGPcgYow3e3CS1mEh1QC/7sqXwAUvG5wh6AHbusGcAUyH+u1l4QEj2Y+SrBUhNJN\ncaqHiEzb8foUdesUCx3tWs208xJojboirEuuPXq7/2CzVniwbkHsQQIMV79xwy3s\nzvpynGhT6p23i4fopcJuAQyvYYLHeKQ6fSyEkmX7E21nDl6Obky11KZenLyt/Msp\nGtlDQ0y4q4HyXw3yuUlGR6Lg6HZkqWzC6wy+DiYD74qcEa8ZfHWEZK/NFvujPmee\n6act0q7WuCPLhqW4DkHN6b+QuxKFRhB1p4TxFM4dROR/yWGCz/UUINkv0OQ6TMx3\nkyerZBZRAgMBAAECggEAVyimjtXhYMJRqS91o3sm8KB9HLmNf5InGtRryI/qt3Em\nbpqiC/SR/gZJ4i9mDbIiJjEIr4eaLK6pbDyjJs+lLZ7lAgGiLMIc8iyRZJqlEIv0\nd0vBBsr5nB7ITO6eneyGjCIxhr7zCT6qm4kOPeD6kSk8HqvaehMMXO2zS42XylMb\n3ceSw7HvGqVNparcmveWd5eY+ODzeg4/cF9dZl826Ma8FXl04hwZLg7rWxaIcD2i\n+VKiRZV+99DBtNGnP2hBLogYxVw+xNfEKH4MCqRvGZOCXgPKkwYUFnJsIFXpah+B\nJtmUWGXAekRbDFtS+qbRSiNOCSQVk1fYIbeWLFkPHQKBgQDaATD0SBgLDt16Oii1\nnnqPCeX9/NS9CgXKqxOGrer2cGAHzM/zDLd3aB8xjLD7KdD8i4Gp9gT9/8NAHcnF\nHeo+zWTdsuyCQpEPg2zV8m10Ld9wZuIzSGfmBogbgyzGTtCSdVRU5gbqo062oOht\nPKmsAMmrlEFSgjCGbOmskqaB4wKBgQDM4h+XCWtj7xfJwZJTgvCoGq+e+LJYBfnC\nIKiPkbBHpP8xJJnOm5b/Fhbqh6lb+jelW4ham7+WPoYPydRPqHxil14Y20gx2kvU\nAwreWPz7joeFHRvsU6K0unuyz2IitPxR/6WSUV2fypbHoEoHaIh7cNcsQl0e2ztk\nJFvduzftOwKBgQDTfdJbOlGw8KPmfuOdhniJqeWo6I4OMtn5iswvnSvUFqLjDkwz\nE4QtYCLa9A2CLEglqMWK+DRRob1uxzdGdsYYVTRka79Mg32tGigMytpqmlIo/na1\nn6nEG1QRtMlMPYvUeeTtVBcjrHihbiruRqqoRj9fqD1S6SBgWOq9U6wbVwKBgEoI\nN0P7OlvM7DqSAI6+lLkZk3YNBVx7JEl6RY5DJYBt5WxbflxCqmgYEkXCqXa7zlmo\n3ndnKe5fP0/7LQVvqypw6aZvrgGdkKLWSpoXa6p2UQ/PeeSGQBev/ryY5SwHW9lB\nWBGr5vmzWZJeoAFXS2HXX1j1zfI1Y5uG688ONGI7AoGAX+ED6UR1QwiSzqWjHA4A\nc7cfipfBzPKBgxGZX9hQp2MmGCJ1Fyk1+ZMbytaljAbc4XJcaCGsGPI+FGIMapdt\nmsv+vCgSHeyultRL0C4X5fY8I+wqKV8RSvGRGB2nfYibbzw9DfWJacRT2gHYhdmz\nOS24Focsq/UAiiSOgXU7H8Y=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-j7xe6@dineva-25544.iam.gserviceaccount.com",
  "client_id": "111475796327854338493",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j7xe6%40dineva-25544.iam.gserviceaccount.com"
}


export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const adminAuth = admin.auth()

export function addAdminRole(data) {
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Success! ${data.emial}, has been made an admin`
    }
  })
}