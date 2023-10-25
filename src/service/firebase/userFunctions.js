// src/firebaseFunctions.js
import {
  getFirestore,
  collection,
  deleteDoc,
  updateDoc,
  setDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore"

import app from "./firebase"

const db = getFirestore(app)



//get UserData
export const fetchUserData = async () => {
  const UserRef = collection(db, "User")
  const UserSnapshot = await getDocs(UserRef)

  const userData = []
  UserSnapshot.forEach((doc) => {
    userData.push({ id: doc.id, ...doc.data() })
  })

  return userData
}
