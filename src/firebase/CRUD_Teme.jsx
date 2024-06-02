import { firestore } from "../firebase";
import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc,getDoc } from 'firebase/firestore/lite';

export const createTema = async (formData) => {
    const temaRef = collection(firestore, "teme");
    await addDoc(temaRef, formData);
};

export const getTeme = async () => {
    const temaRef = collection(firestore, "teme");
    const snapshot = await getDocs(temaRef);
    const teme = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return teme;
};
export const getTemaByID = async (temaId) => {
    const temaRef = doc(firestore, 'teme', temaId);
    const temaSnapshot = await getDoc(temaRef);
  
    if (!temaSnapshot.exists()) {
      throw new Error('Tema ne postoji.');
    }
  
    return { id: temaSnapshot.id, ...temaSnapshot.data() };
  };

export const updateTema = async (temaId, updatedData) => {
    const temaRef = doc(firestore, "teme", temaId);
    await updateDoc(temaRef, updatedData);
};

export const deleteTema = async (temaId) => {
    const temaRef = doc(firestore, "teme", temaId);
    await deleteDoc(temaRef);
};
