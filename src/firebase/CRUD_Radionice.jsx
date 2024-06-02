import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc,getDoc ,query, where} from 'firebase/firestore/lite';
import { firestore } from '../firebase';

export const getRadionice = async () => {
  const radioniceCollection = collection(firestore, 'radionice');
  const radioniceSnapshot = await getDocs(radioniceCollection);
  return radioniceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const getRadionicaById = async (radionicaId) => {
  const radionicaRef = doc(firestore, 'radionice', radionicaId);
  const radionicaDoc = await getDoc(radionicaRef);

  if (radionicaDoc.exists()) {
    return { id: radionicaDoc.id, ...radionicaDoc.data() };
  } else {
    console.log("No such radionica!");
    return null;
  }
};

export const createRadionica = async (radionicaData) => {
  const radioniceCollection = collection(firestore, 'radionice');
  await addDoc(radioniceCollection, radionicaData);
};

export const deleteRadionica = async (radionicaId) => {
  const radionicaRef = doc(firestore, 'radionice', radionicaId);
  await deleteDoc(radionicaRef);
};

export const updateRadionica = async (radionicaId, updatedRadionicaData) => {
  const radionicaRef = doc(firestore, 'radionice', radionicaId);
  await updateDoc(radionicaRef, updatedRadionicaData);
};

export const getTemaIdPoPredavacu = async (predavacId) => {
  const radioniceCollection = collection(firestore, 'radionice');
  
  const q = query(radioniceCollection, where('predavacId', '==', predavacId));
  
  const snapshot = await getDocs(q);
  
  return snapshot.size;
};