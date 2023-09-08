const apiKey = 'a519dc83b1df196c8f98158434e7da17c0a5a434581acaedbe2daf8a6cc786d5';

document.getElementById("scan-button").addEventListener('click', async function () {
    const baseUrl = document.getElementById("urltoscan").value;
    const analysis = await domainReport(baseUrl);
    displayResult(analysis);

    // Show the hidden tables
    const dnsTable = document.getElementById("dns-records");
    const networkTable = document.getElementById("network-statistics");
    const summary = document.getElementById("summary-box");
    dnsTable.classList.remove("hidden");
    networkTable.classList.remove("hidden");
    summary.classList.remove("hidden");

    // Create and display the pie chart
    const chartData = {
        labels: ['Category A', 'Category B', 'Category C'],
        datasets: [{
            data: [25, 35, 40], // Adjust the data values as needed
            backgroundColor: ['#f06', '#f90', '#f33'], // Adjust the colors as needed
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
