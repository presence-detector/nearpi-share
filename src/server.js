const express = require('express');
const http = require('http');
const exec = require('child_process');


const app = express();
const server = http.createServer(app);
console.clear();

server.listen(3000, () => {
    console.log('Server is running on port 3000');
    });

app.post('/share', (req, res) => {
    const macAddress = req.query.macAddress;

    if (!macAddress) {
        res.status(400).json({ message: 'macAddress is required' });
        return;
    }

    if (macAddress.length !== 17) {
        res.status(400).json({ message: 'macAddress is invalid' });
        return;
    }

    console.log(macAddress)
    try {
        exec.execSync('./script.sh ' + macAddress);
    } catch (error) {
        console.log(error);
    }
    res.status(200).json({ message: 'OK', macAddress: macAddress });
});