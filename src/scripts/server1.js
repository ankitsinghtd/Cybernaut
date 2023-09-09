// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../')));

app.post('/domain', async (req, res) => {
    try {
        const mainUrl = req.body.Domain;
        const url = new URL(mainUrl);
        const domain = url.hostname;
        if (!mainUrl) {
            return res.status(400).json();
        }
        console.log("Searching about the domain");
        const record = await checker.domainReport(domain); // Use the function from the module
        res.json(record);
    } catch (err) {
        console.log(`Error in reporting ${err.message}`);
        console.log(err);
        res.status(500).json({ error: "an issue is arising during scan" }); // Send an error response
    }
});

// Listen for incoming requests only if not in a serverless environment
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
}

module.exports = app; // Export the Express.js app
