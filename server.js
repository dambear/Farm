const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const SemaphoreSMS = require("semaphore-ph-api")
const cors = require("cors") // Import the cors package
const jwt = require("jsonwebtoken") // Import the jwt package;

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors()) // Enable CORS for all routes

const semaphoreClient = new SemaphoreSMS({
  apiKey: "171fad0747a57d9fe0137c2b0df026fd",
  version: "api/v4",
  host: process.env.SEMAPHORE_HOST || "https://api.semaphore.co/",
})

app.get("/", (req, res) => {
  res.send("Hello, world Backend!")
})

app.post("/send-message", async (req, res) => {
  try {
    const { number, message } = req.body

    const response = await semaphoreClient.sendMessage(
      {
        number,
        message,
        sender_name: "Farmwise",
      },
      (error, result) => {
        if (error) {
          console.error("Error sending message:", error)
          res.status(500).json({ error: "Error sending message" })
        } else {
          console.log("Message sent successfully:", result)
          res.json(result)
        }
      }
    )
  } catch (error) {
    console.error("Error sending message:", error)
    res.status(500).json({ error: "Error sending message" })
  }
})

app.post("/generate-token", async (req, res) => {
  try {
    // Get the user_id from the request body
    const { username } = req.body

    // Generate a JWT token
    const token = await signToken(username)

    res.json({ token })
  } catch (error) {
    console.error("Error generating token:", error)
    res.status(500).json({ error: "Error generating token" })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

async function signToken(username) {
  try {
    return jwt.sign({ username: username }, "bastapapasok", {
      expiresIn: "1h",
    })
  } catch (err) {
    console.error("[jwt signing error]", err)
    throw new TokenExpiredError("An error occurred while signing a token.")
  }
}
