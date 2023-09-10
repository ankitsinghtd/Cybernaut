import axios from 'axios';
import { config } from 'dotenv';

config();

const Api_Key = process.env.Api_key;

async function domainReport(domain) {
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
