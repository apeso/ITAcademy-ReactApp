import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc,getDoc } from 'firebase/firestore/lite';
import { firestore } from '../firebase';

export const getOrganizacije = async () => {
  const organizacijeCollection = collection(firestore, 'organizacije');
  const organizacijeSnapshot = await getDocs(organizacijeCollection);
  return organizacijeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getOrganizacijaById = async (organizacijaId) => {
  const organizacijaRef = doc(firestore, 'organizacije', organizacijaId);
  const organizacijaSnapshot = await getDoc(organizacijaRef);

  if (!organizacijaSnapshot.exists()) {
    throw new Error('Organizacija ne postoji.');
  }

  return { id: organizacijaSnapshot.id, ...organizacijaSnapshot.data() };
};

export const createOrganizacije = async ( organizacijeData) => {
  const organizacijeCollection = collection(firestore, 'organizacije');
  await addDoc(organizacijeCollection, organizacijeData);
  console.log('Organizacija uspješno dodana!');

};

export const deleteOrganizacije = async (organizacijeId) => {
  const organizacijeRef = doc(firestore, 'organizacije', organizacijeId);
  await deleteDoc(organizacijeRef);
};

export const updateOrganizacije = async (organizacijeId, updatedOrganizacijeData) => {
  const organizacijeRef = doc(firestore, 'organizacije', organizacijeId);
  await updateDoc(organizacijeRef, updatedOrganizacijeData);
  console.log('Organizacija uspješno ažurirana!');
};