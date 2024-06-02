import { collection, getDocs, addDoc, doc,query, where,updateDoc,deleteDoc } from 'firebase/firestore/lite';
import { firestore } from '../firebase';

export const getPrijave = async () => {
  const prijaveCollection = collection(firestore, 'prijave');
  const snapshot = await getDocs(prijaveCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const createPrijava = async (prijavaData) => {
  try {
    const { radionicaId, email } = prijavaData;

    const existingApplications = await getPrijaveByEmailAndRadionicaId(email, radionicaId);
    if (existingApplications.length > 0) {
      return (false);
    }

    const prijaveCollection = collection(firestore, 'prijave');
    await addDoc(prijaveCollection, prijavaData);
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
  return(true);
};


  export const getPrijaveByRadionicaId = async (radionicaId) => {
    const prijaveCollection = collection(firestore, 'prijave');
    const q = query(prijaveCollection, where('radionicaId', '==', radionicaId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  export const getPrijaveByEmail = async (email) => {
    const prijaveCollection = collection(firestore, 'prijave');
    const q = query(prijaveCollection, where('email', '==', email));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  export const updatePrijavaStatus = async (prijavaId, status) => {
    const prijavaDoc = doc(firestore, 'prijave', prijavaId);
    await updateDoc(prijavaDoc, { status });
  };

  export const deletePrijava = async (prijavaId) => {
    const prijavaRef = doc(firestore, "prijave", prijavaId);
    await deleteDoc(prijavaRef);
};

export const getPrijaveByEmailAndRadionicaId = async (email, radionicaId) => {
  const prijaveCollection = collection(firestore, 'prijave');
  const q = query(
    prijaveCollection,
    where('email', '==', email),
    where('radionicaId', '==', radionicaId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};