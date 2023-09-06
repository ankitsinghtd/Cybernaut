// Pie Chart
var pieChartCtx = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(pieChartCtx, {
    type: 'pie',
    data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
            data: [30, 50, 20],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Bar Chart 
var barChartCtx = document.getElementById('barChart').getContext('2d');
var barChart = new Chart(barChartCtx, {
    type: 'bar',
    data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
            label: 'Values',
            data: [12, 19, 3],
            backgroundColor: '#36A2EB'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
