// src/firebaseFunctions.js
import { getFirestore, collection, setDoc, query, where, getDocs, doc } from 'firebase/firestore';

import app from './firebase';



const db = getFirestore(app);




//add farmer
let farmSID = 101; // Initialize the ID counter

export const addFarmer = async (first_name, last_name, contact_number, age) => {
  try {
    // Check if the ID is available, incrementing until a unique ID is found
    let farmer_id = String(farmSID); // Convert the ID to a string
    const farmerRef = collection(db, 'Farmer');
    const idQuery = query(farmerRef, where('farmer_id', '==', farmer_id));
    let idQuerySnapshot = await getDocs(idQuery);

    while (idQuerySnapshot.size > 0) {
      farmSID++;
      farmer_id = String(farmSID); // Convert the ID to a string
      idQuerySnapshot = await getDocs(query(farmerRef, where('farmer_id', '==', farmer_id)));
    }

    // Set the document with the specified ID
    const farmerDocRef = doc(db, 'Farmer', farmer_id);

    await setDoc(farmerDocRef, {
      farmer_id,
      first_name,
      last_name,
      contact_number,
      age,
    });

    // Increment the counter for the next ID
    farmSID++;

    return farmer_id; // Return the generated ID
  } catch (error) {
    console.error('Error adding farmer: ', error);
    return null;
  }
};




//get FarmerData
export const fetchFarmerData = async () => {
  const farmerRef = collection(db, 'Farmer');
  const farmerSnapshot = await getDocs(farmerRef);
  
  const farmerData = [];
  farmerSnapshot.forEach((doc) => {
    farmerData.push({ id: doc.id, ...doc.data() });
  });

  return farmerData;
};