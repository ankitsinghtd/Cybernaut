const apiKey = 'a519dc83b1df196c8f98158434e7da17c0a5a434581acaedbe2daf8a6cc786d5';

document.getElementById("scan-button").addEventListener('click', async function () {
    const baseUrl = document.getElementById("urltoscan").value;
    const baseUrlObj=new URL(baseUrl);
    const domain=baseUrlObj.hostname;
    const analysis = await domainReport(domain);
    displayResult(analysis);

    // Show the hidden tables
    const dnsTable = document.getElementById("dns-records");
    const networkTable = document.getElementById("network-statistics");
    const summary = document.getElementById("summary-box");
    dnsTable.classList.remove("hidden");
    networkTable.classList.remove("hidden");
    summary.classList.remove("hidden");

    // Create and display the pie chart
    console.log(analysis.data.attributes);
    const Charting=analysis.data.attributes.last_analysis_stats;
    const malicious=Charting.malicious;
    const harmless=Charting.harmless;
    const suspicious=Charting.suspicious;
    const undetected=Charting.undetected;
    const chartData = {
        labels: ['malicious','harmless','suspicious','undetected'],
        datasets: [{
            data: [malicious, harmless,suspicious,undetected], // Adjust the data values as needed
            backgroundColor: ['#f06', '#f90', '#f33','#f104'], // Adjust the colors as needed
        }]
    };

    const ctx = document.getElementById("pie-chart").getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: false,
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 16,
                }
            },
        },
    });
    //Summary
    const Sum=document.getElementById("summary");
    if((malicious+suspicious+undetected)>harmless){
        Sum.innerHTML=`The sites is not safe to visit \n malicious:${malicious} || harmless:${harmless} `;
    }
    else{
        Sum.innerHTML=`The site is safe to visit.`
    }
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
    const Dns=result.data.attributes.last_analysis_results;
    const AlienVault=document.getElementById("AV");
    const SP=document.getElementById("SP");
    const BV=document.getElementById("BV");  
    const VX=document.getElementById("VX");
    const GSB=document.getElementById("GSB");
    const MAL=document.getElementById("MAL");
    const SR=document.getElementById("SR");
    const CS=document.getElementById("CS");
    const KAS=document.getElementById("Kas");
    const ET=document.getElementById("ET");
    AlienVault.innerHTML=Dns.AlienVault.category;
    SP.innerHTML=Dns.Sophos.category;
    BV.innerHTML=Dns.Bkav.category;
    VX.innerHTML=Dns["VX Vault"].category;
    GSB.innerHTML=Dns["Google Safebrowsing"].category;
    MAL.innerHTML=Dns.Malwared.category;
    SR.innerHTML=Dns.SOCRadar.category;
    CS.innerHTML=Dns.CrowdSec.category;
    KAS.innerHTML=Dns.Kaspersky.category;
    ET.innerHTML=Dns.EmergingThreats.category;
}
