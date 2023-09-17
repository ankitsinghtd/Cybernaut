let analysis;
document.getElementById("scan-button").addEventListener('click', async function () {
    const mainUrl = document.getElementById('urltoscan').value;
    const loadingContainer = document.getElementById('loading-container');
    const errorMessage = document.getElementById('error-message');

    errorMessage.style.display = 'none';

    if (!mainUrl) {
        loadingContainer.style.display = 'none';
        errorMessage.textContent = 'Please enter a valid URL.';
        errorMessage.style.display = 'block';
        return;
    }


    loadingContainer.style.display = 'block';

    const response = await fetch('/domain', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Domain: mainUrl })
    });

    if (response.ok) {
        analysis = await response.json();
        displayResult(analysis);
    }
    else {
        const errorResponse = await response.json();
        const errorMessageText = errorResponse.error || 'An unknown error occurred.';
        errorMessage.textContent = errorMessageText;
        errorMessage.style.display = 'block';
        loadingContainer.style.display = 'none';
        console.error("Error finding the domain");
        return ;
    }

    // Show the hidden tables
    const dnsTable = document.getElementById("dns-records");
    const anchor = document.getElementById('pie-chart');
    const networkTable = document.getElementById("network-statistics");
    const summary = document.getElementById("summary");
    const popularityrank = document.getElementById("popularityrank");
    loadingContainer.style.display = 'none';
    dnsTable.classList.remove("hidden");
    networkTable.classList.remove("hidden");
    anchor.scrollIntoView({ behavior: 'smooth' });
    summary.classList.remove("hidden");
    //popularityrank.classList.remove("hidden");

    // Create and display the pie chart
    //console.log(analysis.data.attributes);
    const Charting = analysis.data.attributes.last_analysis_stats;
    const malicious = Charting.malicious;
    const harmless = Charting.harmless;
    const suspicious = Charting.suspicious;
    const undetected = Charting.undetected;
    const chartData = {
        labels: ['malicious', 'harmless', 'suspicious', 'undetected'],
        datasets: [{
            data: [malicious, harmless, suspicious, undetected],
            backgroundColor: ['#f06', '#f90', '#f33', '#f104'],
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
    const Sum = document.getElementById("summary");
    if ((malicious + suspicious + undetected) > harmless) {
        Sum.innerHTML = `The sites is not safe to visit \n malicious:${malicious} || harmless:${harmless} `;
    }
    else {
        Sum.innerHTML = `The site is safe to visit.`
    }
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
    const Reg=document.getElementById("reg");
    const Cdate=document.getElementById("Cdate");
    const pop=document.getElementById("Pop");
    const type=document.getElementById("type");
    const last=document.getElementById("last");
    Reg.innerHTML=about.registrar;
    const timestamp = about.creation_date;
    const date = new Date(timestamp * 1000);
    Cdate.innerHTML=date;
    if(about.popularity_ranks["Cisco Umbrella"])
    {
        pop.innerHTML=about.popularity_ranks["Cisco Umbrella"].rank;
    }
    else pop.innerHTML="unranked";
    type.innerHTML=about.categories["Forcepoint ThreatSeeker"];
    const la = about.last_analysis_date;
    const ladate = new Date(la * 1000);
    last.innerHTML=ladate;

}
