const express = require('express');
const { StreamChat } = require('stream-chat');
const cors = require('cors');


// Stream credentials
const apiKey = 'kuuuk3c7qeym';
const apiSecret = 'gputcgs7ub74vzdrmdk9w6a5ucj3jzpdzz9kayp737pvm4jgz3mx6e9qbykn3xnk';

const serverClient = StreamChat.getInstance(apiKey, apiSecret);
const app = express();
app.use(express.json());
app.use(cors());
// Endpoint to generate a token for a given user ID
app.post('/get-token', (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const token = serverClient.createToken(userId);
        return res.json({ token });
    } catch (error) {
        console.error('Error generating token:', error);
        return res.status(500).json({ error: 'Failed to generate token' });
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
