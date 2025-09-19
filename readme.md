Caption Generation API
This is a Node.js server that provides a single API endpoint to generate social media captions using Google's Gemini API.

1. Prerequisites
   Node.js: Make sure you have Node.js (version 18 or newer) installed on your system or server.

Gemini API Key: Get an API key from Google AI Studio.

2. Setup Instructions
   Download Files: Save all the provided files (index.js, package.json, .env) into a new folder on your server.

Install Dependencies: Open a terminal or command prompt in that folder and run the following command. This will install Express, Axios, and other necessary libraries.

npm install

Add API Key: Open the .env file and replace "YOUR_GEMINI_API_KEY" with your actual Gemini API key.

3. Running the Server
   To start the API server, run this command in your terminal:

npm start

You should see the message: Caption generation API server running on http://localhost:3000. Your API is now live and ready to be called.

How Your Android App Should Call the API
Your Android developer needs to make a POST request to this server.

Endpoint URL: http://YOUR_SERVER_IP:3000/generate-captions
(Replace YOUR_SERVER_IP with the IP address or domain of where you are hosting this Node.js app. If testing on the same machine, you can use localhost)

HTTP Method: POST

Headers:

Content-Type: application/json

Request Body (JSON): The body must contain all 8 keys.

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

Successful Response (HTTP 200 OK): The app will receive a JSON array of 4 strings.

[
"POV: Your reel went viral and you've been packing orders till 3 AM.",
"My social life after I launched the 'Everything at 99' sale.",
"Me, after replying to 'Price?' for the 100th time on a post that has the price.",
"Socha tha business karke chill karungi, ab 24/7 'dispatched' likh rahi hu."
]
