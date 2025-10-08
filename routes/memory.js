import express from 'express';


const router = express.Router();

router.post("/memory", async (req, res) =>{
    try {
        const { userMessage } = req.body;


    } catch (error) {
        console.error("Error saving user message: ", error);
        res.status(500).json({ error: "The error message is: " + error.message });
    }

});

export default router;