const TIME_INTERVAL = 0.002;
var howManyTimesGenerated = 0;
var myChart;

function resizeCanvas(){ //resize the canvas based on window size
    var canvas = document.getElementById("myChart");
    canvas.width = window.innerWidth * 0.65;
    canvas.height = window.innerHeight * 0.9;
}

function generateRandom(min = -1, max = 1){ //generate a random decimal between -1 and 1
    let difference = max - min;
    let rand = Math.random();
    rand = rand * difference;
    rand = rand + min;
    return rand;
}

function normalRandom(){ //generate a random decimal from a normal distribution of size x. its not perfect
    x = 10;
    res = 0;
    for(let i=0;i<x;i++){
        res += generateRandom(-1,1);
    }
    return(res/x)
}

function generateData(sP,eRoR,eAV){
    
    priceData = new Array;
    priceData[0] = sP;

    for(let i=1;i<howLong;i++){
        priceData[i] = priceData[i-1] * Math.exp((eRoR - eAV**2 / 2) * TIME_INTERVAL + eAV * normalRandom() * Math.sqrt(TIME_INTERVAL));
        priceData[i] = priceData[i].toFixed(2);
    }
    return (priceData);
}

function generateChart(){

    howManyTimesGenerated += 1;   
    if(howManyTimesGenerated>1){ // if this isnt the first chart generated, "destroy" the previous one (removes the ghost lines)
        myChart.destroy();  
    }

    resizeCanvas();

    howMany = Number(document.getElementById("howMany").value);
    howLong = Number(document.getElementById("howLong").value) + 1;
    sP = Number(document.getElementById("sP").value);
    eRoR = Number(document.getElementById("eRoR").value);
    eAV = Number(document.getElementById("eAV").value);
    drawPointsCheck = document.getElementById("drawPointsCheck").checked;

    let pointRadius;
    if(drawPointsCheck){
        pointRadius = 3;
    }else{
        pointRadius = 0;
    }

    datasets = new Array;

    var r,g,b;
    for(let i=0;i<howMany;i++){  
        if(howMany>1){ // if only 1 graph is generated, make it black. otherwise randomise colors
            r = Math.round(Math.random() * 255);
            g = Math.round(Math.random() * 255);
            b = Math.round(Math.random() * 255);
        }else{
            r = g = b = 0;
        }

        datasets[i] = {  // generate and add new datasets to the array
            label: i+1,
            data: generateData(sP,eRoR,eAV),
            fill: false,
            borderColor: 'rgba(' + r + ', ' + g + ", " + b + ')',
            tension: 0.1
        }; 
    }

    const LABELS = Array.from(Array(howLong).keys());
    const CTX = document.getElementById('myChart').getContext('2d');
    const CONFIG = {
        type: 'line',
        data: {
            labels: LABELS,
            datasets: datasets
        },
        options: {
            maintainAspectRatio: true,
            responsive: false,
            tension: 0,
            parsing: false,
            normalized: true,
            spanGaps: true,
            animation: false,

            elements: {
                point: {
                    radius: pointRadius
                }
            }
        }       
    }
    myChart = new Chart(CTX, CONFIG);
}