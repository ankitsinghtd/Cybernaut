const express = require('express');
const path = require('path');
const checker = require("./checker.js"); // Import the entire module
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../')));

app.post('/domain', async (req, res) => {
    try {
        const mainUrl = req.body.Domain;
        const url = new URL(mainUrl);
        const domain = url.hostname ;
        if (!mainUrl) {
            return res.status(400).json();
        }
        console.log("Searching about the domain");
        const record = await checker.domainReport(domain); // Use the function from the module
        res.json(record);
    } catch (err) {
        console.log(`Error in reporting ${err.message}`);
        console.log(err);
        res.status(500).json({ error: "an issues is arising during scan" }); // Send an error response
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
