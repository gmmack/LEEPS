// Where'd It Go?
// Gavin Mack
// Programming problem 1 for LEEPS lab application

var userSelect;
var userValue = 0;
var stochasticValue = Math.random();
var profit = 0;
var interval = 1000;
var changeStochasticIntervalId = 0;
var calculateProfitIntervalId = 0;
var updateIntervalId = 0;
var timeIntervalId = 0;
var totalProfit = 0;
var profitdata = [];
var userdata = [];
var curprofitdata = [];
var stochasticdata = [];
var time;
var firstPass = true;
var startPressed = false;

//X-axis and y-axis options taken from
//www.jqueryflottutorial.com
var options = {  
    legend: {  
        show: true,  
        margin: 10,  
        backgroundOpacity: 0.5  
    },  
    points: {  
        show: true,  
        radius: 1  
    },  
    lines: {  
        show: true,
        lineWidth: 1.2,
        fill: true
    },
    xaxis: {
        mode: "time",
        tickSize: [2, "second"],
        tickFormatter: function (v, axis) {
            var date = new Date(v);
 
            if (date.getSeconds() % 20 == 0) {
                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
 
                return hours + ":" + minutes + ":" + seconds;
            } else {
                return "";
            }
        },
        axisLabel: "Time",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 10
    },
    yaxis: {
        min: 0,
		tickSize: [1],
        tickFormatter: function (v, axis) {
            if (v % 10 ===0) {
                return v;
            } else {
                return "";
            }
        },
        axisLabel: "Profit",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 6
    }
};

//creates a listener for when you press a key
window.onkeyup = keyup;
var inputTextValue;

function keyup(e) {
    //setting your input text to the global Javascript Variable for every key press
    inputTextValue = e.target.value;

    //listens for you to press the ENTER key, at which point userSelected is set to w/e value is in the box
    if (e.keyCode === 13) {
        if(!isNaN(userSelect.value) && userSelect.value >= 0 && userSelect.value < 1) {
            userValue = userSelect.value;
            console.log(userValue);
			//alert(userValue);
        }else {
            alert("Invalid input, enter a number [0,1)");
            console.log("Invalid input, enter a number [0,1)");
        }
    }
}

var setTime = function() {
	time = new Date().getTime();
};
var updateTime = function() {
	time += interval;
};

var createProfitDataPoint = function(y) {
	var x = time;
	var tmp = [x,y];
	profitdata.push(tmp);
};
var createUserDataPoint = function(y) {
	var x = time;
	var tmp = [x,y];
	userdata.push(tmp);
};
var createStochasticDataPoint = function(y) {
	var x = time;
	var tmp = [x,y];
	stochasticdata.push(tmp);
};
var createCurrentProfitDataPoint = function(y) {
	var x = time;
	var tmp = [x,y];
	curprofitdata.push(tmp);
};

var changeStochastic = function() {
    stochasticValue = Math.random();
};

var calculateProfit = function() {
    profit = (1 - Math.pow(userValue - stochasticValue, 2));
    $("#show_profit span").html(profit);
	totalProfit += profit;
	createProfitDataPoint(totalProfit);
	createUserDataPoint(userValue);
	createStochasticDataPoint(stochasticValue);
	createCurrentProfitDataPoint(profit);
};

$(document).ready(function () {
	userSelect = document.getElementById('userSelectID');
	userSelect.defaultValue = "0";
	//Starts random process
	document.getElementById('btn1').onclick = function() {
		if(!startPressed) {
			startPressed = true;
			changeStochasticIntervalId = setInterval(changeStochastic, interval);
			//console.log(changeStochasticIntervalId);
			calculateProfitIntervalId = setInterval(calculateProfit, interval);
			//console.log(calculateProfitIntervalId);
			if(firstPass)setTime();
			firstPass = false;
			timeIntervalId = setInterval(updateTime, interval);
			update();
		}
	};
	//Stop random process
	document.getElementById('btn2').onclick = function() {
		startPressed = false;
		clearInterval(changeStochasticIntervalId);
		clearInterval(calculateProfitIntervalId);
		clearInterval(timeIntervalId);
		clearTimeout(updateIntervalId);
	};
	//Reset random process
	document.getElementById('btn3').onclick = function() {
		startPressed = false;
		for(var i=0; i<4000; i++){
			clearInterval(i);
			clearTimeout(i);
		}
		totalProfit = 0;
		profitdata = [];
		userdata = [];
		stochasticdata = [];
		curprofitdata = [];
		profitdataset = [
		    { label: "Total Profit", data: profitdata}
		];
		otherdataset = [
			{ label: "User Value", data: userdata},
			{ label: "Stochastic Value", data: stochasticdata},
			{ label: "Current Profit", data: curprofitdata}
		];
		firstPass = true;
		$.plot($("#flot-placeholder"), profitdataset, options);
		$.plot($("#flot-placeholder2"), otherdataset, options);
	};

	//Displays profit value
	$("#show_profit span").html(profit);
	
	var profitdataset = [
		{ label: "Total Profit", data: profitdata}
	];
	var otherdataset = [
		{ label: "User Value", data: userdata},
		{ label: "Stochastic Value", data: stochasticdata},
		{ label: "Current Profit", data: curprofitdata}
	];
	
	function update() {
		$.plot($("#flot-placeholder"), profitdataset, options);
		$.plot($("#flot-placeholder2"), otherdataset, options);
		updateIntervalId = setTimeout(update,interval);
		
	}
	
    $.plot($("#flot-placeholder"), profitdataset, options);
	$.plot($("#flot-placeholder2"), otherdataset, options);
});


