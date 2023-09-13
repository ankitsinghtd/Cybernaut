let analysis;
document.getElementById("scan-button").addEventListener('click', async function () {
    const ipadd = document.getElementById('iptoscan').value;
    const loadingContainer = document.getElementById('loading-container');
    const errorMessage = document.getElementById('error-message');

    errorMessage.style.display = 'none';

    if (!ipadd) {
        loadingContainer.style.display = 'none';
        errorMessage.textContent = 'Please enter a IP Address.';
        errorMessage.style.display = 'block';
        return;
    }


    loadingContainer.style.display = 'block';

    const response = await fetch('/ip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ IP: ipadd })
    });

    if (response.ok) {
        analysis = await response.json();
        displayResult(analysis);
        console.log(analysis.data);
    }
    else {
        const errorResponse = await response.json();
        const errorMessageText = errorResponse.error || 'An unknown error occurred.';
        errorMessage.textContent = errorMessageText;
        errorMessage.style.display = 'block';
        loadingContainer.style.display = 'none';
        console.error("Error finding the IP Address");
        return ;
    }

    // Show the hidden tables
    const dnsTable = document.getElementById("dns-records");
    const anchor = document.getElementById('pie-chart');
    const networkTable = document.getElementById("network-statistics");
    const summary = document.getElementById("summary");
    loadingContainer.style.display = 'none';
    dnsTable.classList.remove("hidden");
    networkTable.classList.remove("hidden");
    anchor.scrollIntoView({ behavior: 'smooth' });
    summary.classList.remove("hidden");

    //console.log(analysis.data.attributes);
    const Charting = analysis.data.attributes.last_analysis_stats;
    const malicious = Charting.malicious;
    const harmless = Charting.harmless;
    const suspicious = Charting.suspicious;
    const undetected = Charting.undetected;
    const chartData = {
        labels: ['malicious', 'harmless', 'suspicious', 'undetected'],
        datasets: [{
            data: [malicious, harmless, suspicious, undetected], // Adjust the data values as needed
            backgroundColor: ['#f06', '#f90', '#f33', '#f104'], // Adjust the colors as needed
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

});

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

    const about=result.data.attributes;
    const Net=document.getElementById("net");
    const Cont=document.getElementById("Cont");
    const cty=document.getElementById("cty");
    const Own=document.getElementById("own");
    const loc=document.getElementById("last");
    Net.innerHTML=about.network;
    Cont.innerHTML=about.continent;
    cty.innerHTML=about.country;
    Own.innerHTML=about.as_owner;
    loc.innerHTML=about.regional_internet_registry;

}
