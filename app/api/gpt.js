import axios from 'axios'

const SECRET = 'secret'
const URL = 'https://api.openai.com/v1/chat/completions'

export const sendMessageToGPT = async(messages) => {
    try{
        const response = await axios.post(
            URL,
            {
                model: "gpt-4.1",
                messages: messages,
                temperature: 0.7,
            },
            {
                header:{
                    "Authorization": `Bearer ${SECRET}`,
                    "Content-Type": 'application/json'
                }
            }
        )
        return response.data.choices?.[0]?.message.content

    } catch(error){
        console.log('Error: '+error)
    }
}