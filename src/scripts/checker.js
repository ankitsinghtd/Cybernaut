import axios from 'axios';
import { config } from 'dotenv';

config();

const Api_Key = process.env.Api_key;
function sanitizeInputUrl(inputUrl) {
    let url = inputUrl.trim().toLowerCase();

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
async function IPchecker(ipadd){

    const options = {
    method: 'GET',
    url: `https://www.virustotal.com/api/v3/ip_addresses/${ipadd}`,
    headers: {
        accept: 'application/json',
        'x-apikey': Api_Key,
    }
    };

    try {
        const response = await axios.request(options);
        const responseData = response.data;

        if (!responseData) {
            console.error('Empty response data');
            throw new Error('Empty response data');
        }

        return responseData;
    } catch (error) {
        console.error('Error in IPchecker:', error.message);
        throw error; 
    }
}
export { 
    domainReport ,
    IPchecker
}
