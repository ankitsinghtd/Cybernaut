async function domExtracter(){
    const mainUrl=document.getElementById('urltoscan').value;
    const mainUrlObj=new URL(mainUrl);
    const domain=mainUrlObj.hostname;
    const response1= await fetch('/domain',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({Domain:mainUrl})
    });
    if(response2.ok){
        const report2=await response.json();
        displayReport(report2);
    }
    else{
        console.error("Error finding the domain");
    }
}
function displayReport(report){
    const dataVisualization = document.getElementById('data-visualization');
    dataVisualization.innerHTML = '<pre>' + JSON.stringify(report, null, 2) + '</pre>';
}
document.querySelector('button').addEventListener('click', domExtracter);