import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import chatbotRouter from './routes/chatbot.js';
import os from 'os';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT;

function getLocalIPv4() {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        const addrs = nets[name] || [];
        for (const addr of addrs) {
            if (addr && addr.family === 'IPv4' && !addr.internal) {
                return addr.address;
            }
        }
    }
    return undefined;
}

const HOSTNAME = process.env.HOSTNAME || getLocalIPv4() || '0.0.0.0';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', chatbotRouter);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));

});

app.listen(PORT, HOSTNAME, () => {
    const lanIp = getLocalIPv4();
    console.log(`Server is running:`);
    console.log(`  Local:   http://localhost:${PORT}`);
    if (lanIp) {
        console.log(`  Network: http://${lanIp}:${PORT}`);
    } else {
        console.log(`  Listening on ${HOSTNAME}:${PORT}`);
    }
});