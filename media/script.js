var worldStatsTable = document.getElementById("world-stats-table")
var html = "";
fetch("https://api.covid19api.com/summary").then((response)=> {
	response.json().then((data)=> {
		renderResults(data.Countries, data.Global)
		document.getElementById("loader").hidden = true;
	})
})
function renderResults(arr, arr2) {

	for(let i = 0; i < arr.length; i++) {
		country = arr[i].Country
		totalConfirmed = arr[i].TotalConfirmed
		deceased = arr[i].TotalDeaths
		recovered = arr[i].TotalRecovered
		active = totalConfirmed - deceased - recovered;
		worldStatsTable.innerHTML += `
				<tr>
					<td class="font-weight-bold"><a href="/country/${sluggify(country)}">${country}</td>
					<td class="text-success">${totalConfirmed}</td>
					<td class="text-warning">${active}</td>
					<td class="text-danger">${deceased}</td>
					<td class="text-success">${recovered}</td>
				</tr>
			`
	}

	$("#total-confirmed").text(arr2.TotalConfirmed)
	$("#total-died").text(arr2.TotalDeaths)
	$("#total-recovered").text(arr2.TotalRecovered)
	$("#total-active").text(arr2.TotalConfirmed - arr2.TotalDeaths - arr2.TotalRecovered)

}

function sluggify(str){
	return str.replace(" ", "-")
}
