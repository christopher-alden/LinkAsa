import admin from 'firebase-admin';

const formatPrivateKey = (key: string | undefined) => {
  if (typeof key === 'undefined') {
    throw new Error('Firebase private key is undefined.');
  }
  return key.replace(/\\n/g, "\n");
}

export const createFirebaseAdminApp = (params:any) => {
  if (!admin.apps.length) {
    const privateKey = formatPrivateKey(params.privateKey);
    const cert = admin.credential.cert({
      projectId: params.projectId,
      clientEmail: params.clientEmail,
      privateKey,
    });

    admin.initializeApp({
      credential: cert,
      storageBucket: params.storageBucket,
    });
  }
  return admin;
};

const params = {
  projectId: "linkasa-d28fc",
  clientEmail: "firebase-adminsdk-fi9zs@linkasa-d28fc.iam.gserviceaccount.com",
  storageBucket: "linkasa-d28fc.appspot.com",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC8EnFim6gdaUJz\nHupyppGx+RGbxanfqnADYDYIM+OFvZvBO26+cbWb0v3Q8IkZIX7gHkzNiMmYI9wk\nuuOx8dIIsKgtCsg1PspnPXhWfZYOS7ugcNeKlSHWB+E7BwdzkZbqohqstMS2+KSq\nUxpvF0KVBqm2HTpDjrkIvuXCEyhmsEqFa8iIIqHAYOU1O3iZ1p+jJ5zIM6vbajWI\nb7kjC2lr0feh5/q7a6XbitPAEpyuhftbdX2Zg1Fl0nzhr17zGizByYVY7eGQKbBT\ngJxvtitSpydTPlRdJL5KQJJuP/sxf3CZrx3+8kr6C796PIBep36JawwStrOwkmQ8\noyViAKO5AgMBAAECggEAFvb/jmVoZVL9kLYVNbO+NaeurUE5KX0T2W2tm1nOrf2F\nn9ZEgw+6d9EPOiys6PsslWxNv4k06JV0Y63IcOmQ1ovPtVRMNyg4KdwZLiJ+qLc5\nrXEp+JuWOp7Ss1T75XJBJdxuemlGXftFjCDCqQ8Di9P49Cpke2xZjsZUotqZA9TM\nZZT8uzqQ8nmG3Kr25+qoq+wT2W0T7dEwb/7jS6qFuAwfzHzYls9OY95M9g4tidfT\nspIvD10yIoUhPO8+/NlQgRwQoKSJ4TB6A7UZxD0MojnEJn033HE3Zc0GrG11kCpS\nAxxtLBdu01UUZrHcmnk36ppXf9J0PgOjlFG0toBUOwKBgQDd9+QnWFTpCEyfW8lr\n1acppagD0YBA7q6XhbPDB/563tXEgUSLioSq9uvED85P6Id/PqPy1q9lDHvNxqXZ\nZuOAiYXg69xgsWGJSVTtTqKWetRUby12lHCISxJDpQccMI9q3E+yxYyG/YVAS5lS\n8EQOxCrCAHk0nDWG7l902ZzmGwKBgQDY6CUrndb2Bs6zJyu3rT8Z54eBoHlgXxPO\nNrUjXqrOYe5/Nk6YKky3xb6wWNFTJ52qb/bew+hE16iePqywbWGsB7/JtCks34nI\nDja0msnRChlZh1TBAPzlt6M/fwyQtELjCGQpCUwUi3Wx0EZE2miK40P3BRwc3woK\nE7rFdq6KuwKBgQCjvmzmwXjR97dej72E+TW5uWS6fGAahnjxekZkB4+pYJ1duuav\n8d1wqXq/RdGyjRz3t2QGjm0RJCZoZLSQLiCB//FtPVFzWydSuXAXJ701OSNNrj5h\njZt+T7MHh8Q4/XGvKRr6DFVgd8FG7v4KewgZxIiuWN8Q+nNaOJrefnIKJQKBgQDV\nCoXfpiLI+HyyZ8m/mTC+D7L/NY+hgSDhzMfy2ntnQ7bNSZi+SeWaJmYZrNLEGsf3\n7AqMV9zdKPhbnPFeQ8DIB8Buqz457cDVNmiy0MliQMoPLiWnf4HlWo3DwtSjl/mO\nJeLCj3gjQaqyn/80h1Rg/cD2cRVgogypQyGR6vSaGwKBgQC9/Az1BB5+0IyVAl3w\naX3iK7OmepifpIUCwbXb15pKdEOuy1/3kpqzOnfqpzH4A822SKqGX9OaOaUdOhNc\noVd8IZl+UQn0K1UEYjz/AsuRIqVJyB94YNLTQx6OD3p75tA9Np6rz4UjOjjJO2hC\nAMIx1JZXN9sqk9hwsXS5srdmHw==\n-----END PRIVATE KEY-----\n",
};

const firebaseAdmin = createFirebaseAdminApp(params);

const adminDb = firebaseAdmin.firestore();
const adminAuth = firebaseAdmin.auth();

export { adminDb, adminAuth, firebaseAdmin as admin };
