
import { firestore } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, getDoc, query, where } from 'firebase/firestore/lite';


export const getPredavaci = async () => {
  const predavaciCollection = collection(firestore, 'predavaci');
  const predavaciSnapshot = await getDocs(predavaciCollection);
  return predavaciSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPredavacByID = async (predavacId) => {
  const predavaciRef = doc(firestore, 'predavaci', predavacId);
  const predavacSnapshot = await getDoc(predavaciRef);

  if (!predavacSnapshot.exists()) {
    throw new Error('Predavac ne postoji.');
  }

  return { id: predavacSnapshot.id, ...predavacSnapshot.data() };
};

export const createPredavac = async (predavacData) => {
  const predavaciCollection = collection(firestore, 'predavaci');
  await addDoc(predavaciCollection, predavacData);
  console.log('Predavač uspješno dodan!');

};

export const deletePredavac = async (predavacId) => {
  const predavacRef = doc(firestore, 'predavaci', predavacId);
  await deleteDoc(predavacRef);
};

export const updatePredavac = async (predavacId, updatedPredavacData) => {
  const predavacRef = doc(firestore, 'predavaci', predavacId);
  await updateDoc(predavacRef, updatedPredavacData);
  console.log('Predavač uspješno ažuriran!');
};

export const getPredavaciITeme = async () => {
  const radioniceCollection = collection(firestore, 'radionice');
  const snapshot = await getDocs(radioniceCollection);

  const predavaciTemeMap = new Map();

  snapshot.forEach((dok) => {
    const { predavacId, temaId } = dok.data();
    if (!predavaciTemeMap.has(predavacId)) {
      predavaciTemeMap.set(predavacId, new Set());
    }
    predavaciTemeMap.get(predavacId).add(temaId);
  });

  const predavaciITeme = [];

  const predavaciRef = collection(firestore, 'predavaci');
  const predavaciSnapshot = await getDocs(predavaciRef);

  for (const dok of predavaciSnapshot.docs) {
    const predavacId = dok.id;
    const predavacData = dok.data();
    const teme = [];

    if (predavaciTemeMap.has(predavacId)) {
      const temeSet = predavaciTemeMap.get(predavacId);
      for (const temaId of temeSet) {
        const temaRef = doc(firestore, 'teme', temaId);
        const temaSnapshot = await getDoc(temaRef);
        if (temaSnapshot.exists()) {
          teme.push({ id: temaSnapshot.id, ...temaSnapshot.data() });
        }
      }
    }

    predavaciITeme.push({ predavac: { id: predavacId, ...predavacData }, teme: teme.length > 0 ? teme : [] });
  }

  return predavaciITeme;
};


