import express from 'express';
import { Ollama } from "@langchain/ollama";

const router = express.Router();

console.log("chatbot.js loaded");

const normalModel = new Ollama({
    model: "llama3.2:3b",
    baseUrl: "http://localhost:11434",
});

router.post("/chat", async (req, res) => {
    try {
        const { messageInput } = req.body;
        const response = await normalModel.invoke(messageInput);

        res.json({ replay: response });

        console.log("Server Response: ", response);
    } catch (error) {
        console.error("Error in chatbot: ", error);
        res.status(500).json({ error: "The error message is: " + error.message });
    }

});

export default router;
