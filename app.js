const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from public directory
app.use(express.static('public'));

function getConfig() {
    const config = JSON.parse(fs.readFileSync('/app/config/settings.json', 'utf8'));
    return config;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/config', (req, res) => {
    const config = getConfig();
    res.json({
        ...config,
        timestamp: new Date()
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    console.log('Current config:', getConfig());
});
