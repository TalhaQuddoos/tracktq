

fetch("https://api.covid19api.com/country/"+country_name).then((response)=> {
			response.json().then((data)=> {
				plot(data);
				document.getElementById("loader").hidden = true;
			})
		})

function plotTotalCases(data) {
	var ctx = document.getElementById('chart-total-cases').getContext('2d');
	var chart = new Chart(ctx, {
	    type: 'pie',
	    data: {
	        labels: ['Active', 'Deceased', 'Recovered'],
	        datasets: [{
	            label: 'Total Cases',
	            backgroundColor: [
	            	'#db5a58',
	            	'rgba(0, 0, 0, 0.5)',
	            	'#8acf7e',
	            	],
	            // borderColor: 'rgb(255, 99, 132)',
	            data: data
	        }]
	    },

	    // Configuration options go here
	    options: {}
	});
	
}

function plotTodaysCases(data) {
	var ctx = document.getElementById('chart-todays-cases').getContext('2d');
	var chart = new Chart(ctx, {
	    type: 'doughnut',
	    data: {
	        labels: ['New Cases', 'Deaths', 'Recovered'],
	        datasets: [{
	            label: 'Total Cases',
	            backgroundColor: [
	            	'#db5a58',
	            	'rgba(0, 0, 0, 0.5)',
	            	'#8acf7e',
	            	],
	            // borderColor: 'rgb(255, 99, 132)',
	            data: data
	        }]
	    },

	    // Configuration options go here
	    options: {}
	});
	
}


function plotLastWeekData(data) {
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	var ctx = document.getElementById('chart-last-week').getContext('2d');
	var chart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: data.map(item => `${new Date(item.Date).getDate()} ${months[new Date(item.Date).getMonth()]}`),
	        datasets: [{
	            label: 'Total Confirmed Cases',
	            // backgroundColor: '#db5a58',
	            borderColor: 'rgb(255, 99, 132)',
	            data: data.map(item => item.Confirmed)
	        }]
	    },

	    options: {}
	});
}

function plotCompleteHistory(data) {
	var ctx = document.getElementById('chart-total-history').getContext('2d');
	var chart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: data.map(item=> ''),
	        datasets: [{
	            label: 'Total Confirmed Cases',
	            // backgroundColor: '#db5a58',
	            borderColor: 'rgb(255, 99, 132)',
	            data: data.map(item => item.Confirmed)
	        }]
	    },

	    options: {}
	});
}

function plotNewCasesHistory(data) {
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	var ctx = document.getElementById('chart-new-cases-history').getContext('2d');
	var chart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        // labels: data.map(item=> months[new Date(item.Date).getMonth()]),
	        labels: data.map(item => formatDate(item.Date)),
	        datasets: [{
	            label: 'New Cases',
	            backgroundColor: '#ececec',
	            borderColor: 'rgb(255, 99, 132)',
	            data: data.map((item, index) => item.Confirmed - data[index > 1 ? index - 1 : 0].Confirmed)
	        }]
	    },

	    options: {}
	});	
}

function formatDate(date) {
	date = new Date(date);
	var month = date.getMonth() + 1
	if(month < 10) {
		month = `0${month}`
	}
	return `${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}/${month}/${date.getFullYear()}`
}
function covidHistory(data) {
	var a =  data.map(item => `<tr><th>${formatDate(item.Date)}</th><td>${item.Confirmed}</td><td>${item.Deaths}</td><td>${item.Recovered}</td><td>${item.Active}</td><td></tr>\n`).join("")

	var b = document.getElementById("covid-history")

	b.innerHTML += a;


}

function getFirstCase(data) {
	for(x of data) {
		if(x.Confirmed != 0) {
			return [x.Date, x.Confirmed];
		}
	}
}
function plot(data){
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	// Update name and  flag, and description
	var a = document.getElementsByClassName("country");
	for( b of a ){
		b.innerText = data[0].Country;
	}
	// document.getElementsByClassName("country").innerText = data[0].Country;
	document.getElementById("flag").src = `https://www.flagcdn.com/192x144/${data[0].CountryCode.toLowerCase()}.png`;
	var firstCaseEl = document.createElement("li")
	var firstCaseDate = getFirstCase(data)[0];
	firstCaseEl.innerHTML = `First case was reported on ${months[new Date(firstCaseDate).getMonth()]} ${new Date(firstCaseDate).getDate()}, ${new Date(firstCaseDate).getFullYear()}.`
	document.getElementById("description").appendChild(firstCaseEl)



	// Total
	const total = data[data.length-1]
	plotTotalCases([total.Active, total.Deaths, total.Recovered])	

	document.getElementById("total-cases-count").innerHTML = total.Confirmed;

	// Today's
	const casesToday = data.slice(-2, data.length)
	plotTodaysCases([
		casesToday[1].Active - casesToday[0].Active,
		casesToday[1].Deaths - casesToday[0].Deaths,
		casesToday[1].Recovered - casesToday[0].Recovered
		]);

	const lastWeekData = data.slice(-7, data.length);
	plotLastWeekData(lastWeekData)

	plotNewCasesHistory(data)
	plotCompleteHistory(data)
	covidHistory(data)


}

