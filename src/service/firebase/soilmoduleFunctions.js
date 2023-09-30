// src/service/firebase/firebaseFunctions.js
import {
    getFirestore,
    collection,
    setDoc,
    doc,
    query,
    where,
    getDocs,
    serverTimestamp,
} from "firebase/firestore"
import app from "./firebase" // Import your Firebase initialization

const db = getFirestore(app)

// ------------------- Soil Module part

// Define the nutrient data and functions locally
let nutrientsData = []

// Define a variable to keep track of the last used fland_id
let flandSId = 10001

function generateRandomConcentration(op_r_min, op_r_max) {
    return (Math.random() * (op_r_max - op_r_min) + op_r_min).toFixed(3)
}

function calculateScore(concentration, op_r_min, op_r_max) {
    const score = ((concentration - op_r_min) / (op_r_max - op_r_min)) * 4 + 1
    return score.toFixed(3)
}

function calculateSoilQualityRating(nutrientConcentrations) {
    let totalScore = 0

    for (const nutrient of nutrientConcentrations) {
        totalScore += parseFloat(nutrient.score) // Ensure score is parsed as a float
    }

    const soilQualityRating =
        nutrientConcentrations.length > 0
            ? totalScore / nutrientConcentrations.length
            : 0

    return soilQualityRating.toFixed(1)
}

// Function to fetch nutrientsData from a JSON file
async function fetchNutrientsData() {
    try {
        const response = await fetch("/src/nutrients.json") // Replace with the actual path to your JSON file
        if (!response.ok) {
            throw new Error("Failed to fetch nutrientsData")
        }
        nutrientsData = await response.json()
    } catch (error) {
        console.error("Error fetching nutrientsData: ", error)
    }
}

// Call the function to fetch nutrientsData
fetchNutrientsData()

export const addNutrientData = async (fland_name, fland_location) => {
    const nutrientConcentrations = []

    if (!Array.isArray(nutrientsData)) {
        console.error("nutrientsData is not an array")
        return false
    }

    try {
        let fland_id = String(flandSId) // Convert the ID to a string
        const soilRef = collection(db, "Soil")
        const idQuery = query(soilRef, where("fland_id", "==", fland_id))
        let idQuerySnapshot = await getDocs(idQuery)

        while (idQuerySnapshot.size > 0) {
            flandSId++
            fland_id = String(flandSId) // Convert the ID to a string
            idQuerySnapshot = await getDocs(
                query(soilRef, where("fland_id", "==", fland_id))
            )
        }

        // Generate random concentrations for each nutrient
        for (const nutrient of nutrientsData) {
            const concentration = generateRandomConcentration(
                nutrient.op_r_min,
                nutrient.op_r_max
            )
            const score = calculateScore(
                concentration,
                nutrient.op_r_min,
                nutrient.op_r_max
            )

            nutrientConcentrations.push({
                n_id: nutrient.n_id,
                name: nutrient.name,
                function: nutrient.function,
                op_r_min: nutrient.op_r_min,
                op_r_max: nutrient.op_r_max,
                concentration,
                score,
            })
        }

        // Calculate Soil Quality Rating
        const soil_quality = calculateSoilQualityRating(nutrientConcentrations)

        const nutrientCollection = doc(db, "Soil", fland_id)
        await setDoc(nutrientCollection, {
            fland_id, // Include the fland_id in the document
            nutrient: nutrientConcentrations,
            fland_name,
            fland_location,
            soil_quality,
            soil_test_date: serverTimestamp(), // Use Firebase server timestamp
        })

        console.log(soil_quality)

        return true // Return success
    } catch (error) {
        console.error("Error adding nutrients: ", error)
        return false
    }
}

//get soilData
export const fetchSoilData = async () => {
    const soilRef = collection(db, "Soil")
    const soilSnapshot = await getDocs(soilRef)

    const soilData = []
    soilSnapshot.forEach((doc) => {
        soilData.push({ id: doc.id, ...doc.data() })
    })

    return soilData
}
