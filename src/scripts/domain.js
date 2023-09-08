const apiKey = 'a519dc83b1df196c8f98158434e7da17c0a5a434581acaedbe2daf8a6cc786d5';

document.getElementById("scan-button").addEventListener('click', async function () {
    const baseUrl = document.getElementById("urltoscan").value;
    const analysis = await domainReport(baseUrl);
    displayResult(analysis);
});

async function domainReport(domain){
    const apiUrl=`https://www.virustotal.com/api/v3/domains/${domain}`;
    options={
        method:'GET',
        headers:{
            'x-apikey':apiKey,
            accept:'application/json'
        }
    };
    try{
        const response=await fetch(apiUrl,options);
        return response.json();
    }
    catch(err){
        console.log(`Error while domain scan: ${err.status} and ${err.message}`);
    }
}

async function displayResult(result) {
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = JSON.stringify(result.data);
}
