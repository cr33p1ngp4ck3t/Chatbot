// import axios from 'axios';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {

//     try {
//       const response = await axios.post('https://api.nexusmind.tech/v1/chat/completions', {
//         messages: [{
//           "role": user, 
//           "content": [
//             {"role":"user", "content":""},
//             {"role":"assistant", "content":""},
//           ]}],
//         model: "gpt-4o"
//       }, {
//         headers: {
//           Authorization: `Bearer nxdevtest`,
//         },
//       });

//       res.status(200).json({ botResponse: response.data.response });
//     } catch (error) {
//       res.status(500).json({ 'Chatbot API request failed' : error });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }