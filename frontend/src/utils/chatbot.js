import { GoogleGenerativeAI } from "@google/generative-ai";
// import config from "../../config.json";
const API_KEY = process.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
    throw new Error("API key is not defined. Please set the VITE_GOOGLE_API_KEY environment variable.");
}
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const chatBot = async (question) => {
    try {

        const result = await model.generateContent(question);
        const text = await result.response.text();

        // Remove unwanted characters like asterisks (*) and hashtags (#)
        const processedResponse = text
            .replace(/[*#]/g, "")
            .replace(/<[^>]*>/g, "");


        return processedResponse;
    } catch (error) {
        console.error("Error generating content:", error);

        throw error;
    }
};

export default chatBot;