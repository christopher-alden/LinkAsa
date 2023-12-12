import { admin } from "./firebaseAdmin"; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password, username, role, status } = req.body;
  console.log("stats" + status)
  if (!email || !password || !username || !role || !status) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const userRecord = await admin.auth().createUser({ email, password });
    await admin.auth().setCustomUserClaims(userRecord.uid, { role, status });
    await admin.firestore().collection('users').doc(userRecord.uid).set({ username, email, role, status });

    res.status(200).json({ uid: userRecord.uid });
  } catch (error) {
    console.error('Firebase Admin Error', error);
    res.status(500).json({ error: error.message });
  }
}
