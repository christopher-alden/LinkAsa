import { useState, useEffect } from 'react';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    doc, 
    deleteDoc, 
    onSnapshot, 
    Firestore, 
    DocumentData,
    getDoc,
    getDocs,
    setDoc
} from 'firebase/firestore';

interface UseCrudProps {
    db: Firestore;
    collectionName: string;
    transformDoc?: (doc: any) => any;
}

const useCrud = ({ db, collectionName, transformDoc }: UseCrudProps) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchAndTransformDocuments = (docs) => {
        return transformDoc ? docs.map(doc => transformDoc(doc)) : docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const createDocument = async (data: DocumentData) => {
        setLoading(true);
        try {
            await addDoc(collection(db, collectionName), data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const updateDocument = async (id: string, data: DocumentData) => {
        setLoading(true);
        try {
            // console.log(id)
            // console.log(data)
            const documentRef = doc(db, collectionName, id);
            await updateDoc(documentRef, data);
            setLoading(false);
            return { success:true, error:false }; 
        } catch (err) {
            setError(err as Error);
            setLoading(false);
            return { success: false, error: err };
        }
    };
    

    const deleteDocument = async (id: string) => {
        setLoading(true);
        try {
            const documentRef = doc(db, collectionName, id);
            await deleteDoc(documentRef);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const getDocumentById = async (id: string) => {
        setLoading(true);
        try {
            const documentRef = doc(db, collectionName, id);
            const documentSnap = await getDoc(documentRef);
            if (documentSnap.exists()) {
                setLoading(false);
                return transformDoc ? transformDoc(documentSnap) : { id: documentSnap.id, ...documentSnap.data() };
            } else {
                setLoading(false);
                console.log("No such document!");
                return null;
            }
        } catch (err) {
            setError(err as Error);
            setLoading(false);
            return null;
        }
    };
    const createOrUpdateDocument = async (id: string, data: DocumentData) => {
        setLoading(true);
        try {
          const documentRef = doc(db, collectionName, id);
          await setDoc(documentRef, data, { merge: true }); // Using merge option
          setLoading(false);
          return { success: true, error: false };
        } catch (err) {
          setError(err as Error);
          setLoading(false);
          return { success: false, error: err };
        }
      };
      

    useEffect(() => {
        if (!collectionName) return;

        setLoading(true);
        const unsubscribe = onSnapshot(collection(db, collectionName),
            (snapshot) => {
                try {
                    const transformedDocs = fetchAndTransformDocuments(snapshot.docs);
                    setDocuments(transformedDocs);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                setError(err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [db, collectionName]);

    return { documents, createDocument, updateDocument, createOrUpdateDocument, deleteDocument, getDocumentById, loading, error };
};

export default useCrud;
