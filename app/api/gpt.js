import axios from 'axios'

const OPEN_AI_KEY = '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'
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
                    "Authorization": `Bearer ${OPEN_AI_KEY}`,
                    "Content-Type": 'application/json'
                }
            }
        )
        return response.data.choices?.[0]?.message.content

    } catch(error){
        console.log('Error: '+error)
    }
}