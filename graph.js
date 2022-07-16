var timeInterval = 0.002;
var howManyTimesGenerated = 0;
var myChart;

function resizeCanvas(){
    var canvas = document.getElementById("myChart");
    canvas.width = window.innerWidth * 0.65;
    canvas.height = window.innerHeight * 0.9;
}

function generateRandom(min = -1, max = 1){
    let difference = max - min;
    let rand = Math.random();
    rand = rand * difference;
    rand = rand + min;
    return rand;
}

function normalRand(){
    x = 10;
    res = 0;
    for(ii=0;ii<x;ii++){
        res += generateRandom(-1,1);
    }
    return(res/x)
}

function generateData(sP,eRoR,eAV){

    data = {}
    data[0] = sP

    for(i=1;i<howLong;i++){
        data[i] = data[i-1] * Math.exp((eRoR - eAV**2 / 2) * timeInterval + eAV * normalRand() * Math.sqrt(timeInterval));
        data[i] = data[i].toFixed(2);
    }
    
    dataArray = new Array;
    for(i=0;i<howLong;i++){
        dataArray[i] = Object.values(data)[i];
    }

    return (dataArray);
}

function generateChart(){
    myChart;
    
    howManyTimesGenerated += 1;
    if(howManyTimesGenerated>1){
        myChart.destroy();  
    }

    resizeCanvas();

    howMany = Number(document.getElementById("howMany").value);
    howLong = Number(document.getElementById("howLong").value) + 1;
    sP = Number(document.getElementById("sP").value);
    eRoR = Number(document.getElementById("eRoR").value);
    eAV = Number(document.getElementById("eAV").value);

    datasets = new Array;

    for(n=0;n<howMany;n++){
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);

        datasets[n] = {
            label: "Line " + (Number(n+1)).toString(),
            data: generateData(sP,eRoR,eAV),
            fill: false,
            borderColor: 'rgba(' + r + ', ' + g + ", " + b + ')',
            tension: 0.1
        }; 
    }

    const labels = Array.from(Array(howLong).keys());
    const ctx = document.getElementById('myChart').getContext('2d');
    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            maintainAspectRatio: true,
            responsive: false,
            tension: 0
        }
    }
    
    myChart = new Chart(ctx, config);
}

