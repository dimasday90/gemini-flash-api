const { GoogleGenAI } = require("@google/genai")
const dotenv = require("dotenv")
const fs = require("fs")
const express = require("express")
const multer = require("multer")
const path = require("path")

dotenv.config()
const app = express()
app.use(express.json())

const PORT = process.env.PORT

/// Initialize Gemini AI
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY)
const modelStr = "gemini-2.5-flash"
const thinkingBudget = 0
const temperature = 1

/// setting multer config to store temporary files when understanding image/audio/document
const upload = multer({ dest: "uploads/" })

// setting for handling file with multer. For Gemini API, required to use base64 format
const fileToGenerativePart = (filePath, mimeTye) => ({
  inlineData: {
    data: fs.readFileSync(filePath).toString("base64"),
    mimeType: mimeTye
  }
})

/// endpoint for generate text with gemini api
app.post("/generate-text", async (req, res) => {
  const { prompt } = req.body
  try {
    let result = await genAI?.models?.generateContent({
      model: modelStr,
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: thinkingBudget
        },
        temperature: temperature,
      },
    })
    res.status(200).json({ output: result.text })
  } catch (error) {
    res.status(500).json({ errMessage: error.message })
  }
})

/// endpoint to understand image with gemini api
// setting method post to receive image (required) and prompt (optional)
app.post("/generate-from-image", upload.single("image"), async (req, res) => {
  const prompt = req?.body?.prompt || "Describe the image"
  const filePath = req?.file?.path
  const mimeType = req?.file?.mimetype
  try {
    const imagePart = fileToGenerativePart(filePath, mimeType)
    let result = await genAI?.models?.generateContent({
      model: modelStr,
      contents: [
        imagePart,
        { text: prompt },
      ],
      config: {
        thinkingConfig: {
          thinkingBudget: thinkingBudget
        },
        temperature: temperature,
      },
    })
    res.status(200).json({ output: result.text })
  } catch (error) {
    res.status(500).json({ errMessage: error.message })
  } finally {
    fs.unlinkSync(filePath)
  }
})

/// endpoint to understand document with gemini api
// setting method post to receive document (required) and prompt (optional)
app.post("/generate-from-document", upload.single("document"), async (req, res) => {
  const prompt = req?.body?.prompt || "Analyze this document:"
  const filePath = req?.file?.path
  const mimeType = req?.file?.mimetype
  try {
    const documentPart = fileToGenerativePart(filePath, mimeType)
    let result = await genAI?.models?.generateContent({
      model: modelStr,
      contents: [
        documentPart,
        { text: prompt },
      ],
      config: {
        thinkingConfig: {
          thinkingBudget: thinkingBudget
        },
        temperature: temperature,
      },
    })
    res.status(200).json({ output: result.text })
  } catch (error) {
    res.status(500).json({ errMessage: error.message })
  } finally {
    fs.unlinkSync(filePath)
  }
})

/// endpoint to understand audio with gemini api
// setting method post to receive image (required) and prompt (optional)
app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
  const prompt = req?.body?.prompt || "Transcribe or analyze following audio:"
  const filePath = req?.file?.path
  const mimeType = req?.file?.mimetype
  try {
    const audioPart = fileToGenerativePart(filePath, mimeType)
    let result = await genAI?.models?.generateContent({
      model: modelStr,
      contents: [
        audioPart,
        { text: prompt },
      ],
      config: {
        thinkingConfig: {
          thinkingBudget: thinkingBudget
        },
        temperature: temperature,
      },
    })
    res.status(200).json({ output: result.text })
  } catch (error) {
    res.status(500).json({ errMessage: error.message })
  } finally {
    fs.unlinkSync(filePath)
  }
})

app.listen(PORT, () => {
  console.log(`Welcome to my Gemini-Flash-API project, running on ${PORT}`)
  console.log(`Check available endpoints and simple documentation in README.md`)
})