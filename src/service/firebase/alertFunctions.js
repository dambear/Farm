import {
  getFirestore,
  collection,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"
import app from "./firebase"

const db = getFirestore(app)

// Initialize the ID counter and currentDate globally
let alertSID = 1
let currentDate = getFormattedDate()

export const addMessageData = async () => {
  const recipient = 43434
  const message = "QQQQQQQQQ"
  const alert_type = "QNOUNCEM3NT"
  try {
    // Check if the current date is different from the stored date
    const currentDateNow = getFormattedDate()
    if (currentDateNow !== currentDate) {
      // If it's a new day, reset alertSID to 1 and update the stored date
      alertSID = 1
      currentDate = currentDateNow
    }

    // Generate the alert_id by concatenating the current date and alertSID
    const alert_id = `${currentDate}${alertSID}`

    // Create a Firestore document reference using the generated alert_id
    const alertDocRef = doc(db, "Alert", alert_id)

    // Set the document data with recipient, message, and alert_type
    await setDoc(alertDocRef, {
      alert_id,
      recipient,
      message,
      alert_type,
    })

    // Increment alertSID for the next alert
    alertSID++

    return alert_id // Return the generated alert_id
  } catch (error) {
    console.error("Error adding message: ", error)
    return null
  }
}

export const add2MessageData = async (alertType, recipientInfo, message, messageData) => {
  try {
    // Check if the current date is different from the stored date
    const currentDateNow = getFormattedDate()
    if (currentDateNow !== currentDate) {
      // If it's a new day, reset alertSID to 1 and update the stored date
      alertSID = 1
      currentDate = currentDateNow
    }

    // Generate the alert_id by concatenating the current date and alertSID
    const alert_id = `${currentDate}${alertSID}`

    // Create a Firestore document reference using the generated alert_id
    const alertDocRef = doc(db, "Alert", alert_id)

    // Set the document data with recipient, message, and alert_type
    await setDoc(alertDocRef, {
      alert_id,
      alert_type: alertType,
      recipientInfo,
      message,
      messageData,
      created_at: serverTimestamp(),
    })

    // Increment alertSID for the next alert
    alertSID++

    return alert_id // Return the generated alert_id
  } catch (error) {
    console.error("Error adding message: ", error)
    return null
  }
}

// Helper function to get the current date in YYYYMMDD format
function getFormattedDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}${month}${day}`
}

// get AlertData
export const fetchMessageData = async () => {
  const alertRef = collection(db, "Alert")
  const alertSnapshot = await getDocs(alertRef)

  const alertData = []
  alertSnapshot.forEach((doc) => {
    alertData.push({ id: doc.id, ...doc.data() })
  })

  return alertData
}
