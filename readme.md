# Caption Generation API

A Node.js server that provides a single API endpoint to generate social media captions using Google's **Gemini API**.

---

## 1. Prerequisites

- **Node.js**: Install Node.js (v18 or newer).  
- **Gemini API Key**: Get an API key from [Google AI Studio](https://aistudio.google.com).

---

## 2. Setup Instructions

1. **Download Files**  
   Save the following files into a new folder:  
   - `index.js`  
   - `package.json`  
   - `.env`

2. **Install Dependencies**  
   Run this in your terminal:  
   ```bash
   npm install
   ```

3. **Add API Key**  
   Open `.env` and replace:
   ```env
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   ```

---

## 3. Running the Server

Start the server with:

```bash
npm start
```

If successful, you should see:

```
Caption generation API server running on http://localhost:3000
```

---

## 4. How to Call the API (For Android App)

- **Endpoint URL:**  
  ```
  http://YOUR_SERVER_IP:3000/generate-captions
  ```
  Replace `YOUR_SERVER_IP` with your server’s IP/domain. Use `localhost` when testing locally.

- **HTTP Method:** `POST`

- **Headers:**  
  ```
  Content-Type: application/json
  ```

- **Request Body (JSON):**  
  Must contain **all 8 keys**:

  ```json
  {
    "business_name": "Justreal_deal",
    "business_category": "Making elegant and trendy jewelry affordable, Discover stunning Korean Earrings at just 99/-",
    "platform_to_post_on": "Instagram",
    "target_persona": "Genz and Millenials Girls + Similar Businesses",
    "language_preference": "Hinglish",
    "memevideoName": "Radhika Apte working 24/7",
    "memevideoContext": "In a movie, Radhika Apte gets so exhausted with her work as a househelp doing 24/7...",
    "memecoreConcepts": "working 24/7;exhausted;doing something unconventional;no social life"
  }
  ```

---

## 5. Example Successful Response (200 OK)

The server returns a JSON array of **4 captions**:

```json
[
  "POV: Your reel went viral and you've been packing orders till 3 AM.",
  "My social life after I launched the 'Everything at 99' sale.",
  "Me, after replying to 'Price?' for the 100th time on a post that has the price.",
  "Socha tha business karke chill karungi, ab 24/7 'dispatched' likh rahi hu."
]
```
