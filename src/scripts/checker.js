import axios from 'axios';
import { config } from 'dotenv';

config();

const Api_Key = process.env.Api_key;
function sanitizeInputUrl(inputUrl) {
    let url = inputUrl.trim().toLowerCase();

    // Check if the URL starts with 'http://' or 'https://'
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }

    return url;
}

async function domainReport(mainUrl) {
    const santUrl=sanitizeInputUrl(mainUrl);
    const url=new URL(santUrl);
    const domain=url.host;
    const apiUrl = `https://www.virustotal.com/api/v3/domains/${domain}`;
    
    const options = {
        method: 'GET',
        url: apiUrl,
        headers: {
            'x-apikey': Api_Key,
            accept: 'application/json',
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log(`Error while domain scan: ${err.message}`);
    }
}

export { domainReport };
