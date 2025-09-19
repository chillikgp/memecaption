import express from "express";
import axios from "axios";
import "dotenv/config";

// Initialize the Express application
const app = express();
// Use the express.json() middleware to parse JSON request bodies
app.use(express.json());

// Get the Gemini API key from environment variables for security
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("FATAL ERROR: GEMINI_API_KEY is not defined in the environment variables.");
  process.exit(1); // Exit if the key is not found
}

// Construct the Gemini API URL
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

// --- This is your baked-in system prompt. It's not exposed to the client. ---
const SYSTEM_PROMPT = `You are a sharp and creative meme-writer for Indian small businesses. Your task is to generate 4 short, single-line captions for a 9:16 meme video, based on the provided business and meme context. The captions must feel like they are written by the small business owner — authentic, witty, and relatable. When brainstorming, look beyond the meme's mood to its literal physical action, searching for a clever business-related metaphor (e.g., a stamping action could represent applying watermarks).
Generate a diverse set of 4 captions, drawing from the following categories:

1. Small-Business Frustrations (The Grind): The daily struggles. Examples: unrealistic deadlines, "simple" last-minute changes, budget negotiations, COD stress.
2. Customer-Side Fun (The Quirks): Funny and relatable customer behavior. Examples: unrealistic ‘simple’ requests, excitement after seeing the final results.
3. Small-Business Wins (The Glory): The moments that make it all worth it. Examples: approving designs in one go, on-time payments, leaving a 5-star review.
4. The Unfiltered Truth (The Rant): The raw, edgy, and personal side of being an entrepreneur. These are the blunt thoughts you'd share with a friend. Examples: questioning the choice to leave a 9-to-5 job, the "I did this to myself" feeling, sarcastic comments on the "glamour" of being your own boss.

Rules:
1. Set the Scene, Don't State the Punchline (Most Important Rule): Your caption's job is to describe a relatable situation. The meme video/audio itself is the reaction or the punchline. Therefore, do NOT repeat the dialogue from the meme in your caption.
2. One-Liners Only: Captions must be a single, concise line.
3. Include one "POV:" caption.
4. Include one "Unfiltered Truth" caption from "The Rant" category.
5. Natural Hinglish: Use Hinglish where it flows naturally.
6. Tone: Switch between witty, sarcastic (in a friendly way), and celebratory. Keep it raw and punchy.
7. Absolutely No Fluff: Avoid long sentences, ellipses (...), or generic corporate language.
8. No Emojis: Unless the user explicitly asks for them.
9. Format: Output must be a JSON array of strings.`;

// Define the API endpoint that the Android app will call
app.post("/generate-captions", async (req, res) => {
  try {
    // --- Input Validation ---
    const requiredFields = ["business_name", "business_category", "platform_to_post_on", "target_persona", "language_preference", "memevideoName", "memevideoContext", "memecoreConcepts"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        // If a required field is missing, send a 400 Bad Request error
        return res.status(400).json({
          error: `Missing required field: ${field}`,
        });
      }
    }

    // Format the user input from the request body into a single string for the prompt
    const userPrompt = JSON.stringify(req.body, null, 2);

    // --- Prepare the payload for the Gemini API ---
    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 1.0, // Higher temperature for more creative/varied responses
        topP: 0.95,
      },
    };

    // --- Call the Gemini API ---
    const geminiResponse = await axios.post(GEMINI_API_URL, payload);

    // --- Process and send the response ---
    // Extract the generated text which should be a JSON string
    const generatedText = geminiResponse.data.candidates[0].content.parts[0].text;

    // Parse the JSON string into a JavaScript array
    const captions = JSON.parse(generatedText);

    // Send the array of captions back to the Android app
    res.status(200).json(captions);
  } catch (error) {
    // --- Error Handling ---
    console.error("Error calling Gemini API:", error.response ? error.response.data : error.message);
    res.status(500).json({
      error: "An error occurred while generating captions.",
    });
  }
});

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Caption generation API server running on http://localhost:${PORT}`);
});
