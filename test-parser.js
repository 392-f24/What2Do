// test-parser.js
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file
config({ path: resolve(__dirname, '.env') });

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
console.log('API Key loaded:', apiKey ? 'Yes' : 'No');

const TEST_CONTENT = `
Visit Paris for an unforgettable weekend! Start your day at the Eiffel Tower at 9 AM, 
then head to the Louvre Museum around 2 PM. Spend your evening at a café in Montmartre. 
The next day, explore Notre Dame Cathedral in the morning and take a Seine River cruise in the afternoon.
`;

async function testGPTOnly() {
  try {
    if (!apiKey) {
      throw new Error('API Key not found in environment variables');
    }

    console.log('Making API request...');
    
    // Modified prompt to ensure JSON response
    const prompt = `Convert this travel article into a structured itinerary. Return ONLY a JSON object with this exact structure, no other text:
    {
      "tripName": "string",
      "itinerary": [
        {
          "day": "string",
          "location": "string",
          "description": "string with newline characters"
        }
      ]
    }
    
    Article content: "${TEST_CONTENT}"`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: 0.7,
        max_tokens: 1000
        // Removed response_format parameter
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`API Error: ${JSON.stringify(data.error || data, null, 2)}`);
    }
    
    console.log('\nRaw Response:', JSON.stringify(data, null, 2));

    // Parse the response content as JSON
    try {
      const parsedContent = JSON.parse(data.choices[0].message.content);
      console.log('\nParsed Itinerary:', JSON.stringify(parsedContent, null, 2));
    } catch (parseError) {
      console.error('Error parsing response as JSON:', data.choices[0].message.content);
      throw parseError;
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testGPTOnly();