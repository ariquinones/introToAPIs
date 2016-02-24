console.log($)
var apiKey = '94ce6d7c4ee0427695ac230edc176a00'

var baseUrl = 'http://openstates.org/api/v1/legislators/?apikey='

var fullUrl = baseUrl + apiKey 
var promise = $.getJSON(fullUrl) 
//var legislatorToHTML = function(legislatorObject) {
//	var newString = "<img class='legislatorContainer' src='" + 
//	legislatorObject.photo_url + "'><p class='legislatorName'>" + legislatorObject.full_name + "</p>"
//	return newString
//}


var legislatorInformation = function (legislatorObject) {
	var legislatorString = '<div class="individualLegislator">\
								<span class="fullName">' + legislatorObject.full_name + '</span> \
								<span class="state">State: ' + legislatorObject.state +  '</span>\
								<span class="party">Party: ' + legislatorObject.party + '</span>\
								<span class="chamber">Chamber: ' + legislatorObject.chamber + '</span>\
								<span class="email">Email: ' + legislatorObject.email + '</span>\
								<span class="level">Level: ' + legislatorObject.level + '</span>\
							</div>'
	return legislatorString
}


var handleData = function(jsonData) {
	var htmlString = ''
	for(var i = 0; i < 18; i++) {
		var legislatorObject = jsonData[i]
		htmlString += legislatorInformation(legislatorObject)
	}
	var containerEl = document.querySelector("#container")
	containerEl.innerHTML = htmlString
}
promise.then(handleData)

 
var getDataForDistrict = function(jsonData) {
	var htmlString = ''
	for(var i = 0; i < 18; i++) {
		var legislatorObject = jsonData[i]
		if (district = legislatorObject.district) {
		htmlString += legislatorInformation(legislatorObject)
		}
	}
	var containerEl = document.querySelector("#container")
	containerEl.innerHTML = htmlString
}


var stateCheck = function(keyDown) {
	var findByState = keyDown.srcElement 
	var stateString = ''
	if (keyDown.keyCode === 13) {
		var state = findByState.value 
		console.log(state)
		$.getJSON(fullUrl).then(function(data) {
			var politian = data
			for (var i = 0; i < politian.length; i++) {
				var p = politian[i]
				if (p.state === state) {
					stateString += '<div class="individualLegislator">\
											<span class="fullName">' + p.full_name + '</span> \
											<span class="state">State: ' + p.state +  '</span>\
											<span class="party">Party: ' + p.party + '</span>\
											<span class="chamber">Chamber: ' + p.chamber + '</span>\
											<span class="email">Email: ' + p.email + '</span>\
											<span class="level">Level: ' + p.level + '</span>\
										</div>'
				}
			}
		findByState.value = ''
		var containerEl = document.querySelector("#container")
		containerEl.innerHTML = stateString

		})
	}
}



var stateInputBox = document.querySelector("#stateInput")
stateInputBox.addEventListener("keydown",stateCheck)


var partyCheck = function(keyDown) {
	var findByParty = keyDown.srcElement 
	var partyString = ''
	if (keyDown.keyCode === 13) {
		var party = findByParty.value 
		console.log(party)
		$.getJSON(fullUrl).then(function(data) {
			var politian = data
			for (var i = 0; i < politian.length; i++) {
				var p = politian[i]
				if (p.party === party) {
					partyString += '<div class="individualLegislator">\
											<span class="fullName">' + p.full_name + '</span> \
											<span class="state">State: ' + p.state +  '</span>\
											<span class="party">Party: ' + p.party + '</span>\
											<span class="chamber">Chamber: ' + p.chamber + '</span>\
											<span class="email">Email: ' + p.email + '</span>\
											<span class="level">Level: ' + p.level + '</span>\
										</div>'
				}
			}
		findByParty.value = ''
		var containerEl = document.querySelector("#container")
		containerEl.innerHTML = partyString
		})
	}
}



var partyInputBox = document.querySelector("#partyInput")
partyInputBox.addEventListener("keydown",partyCheck)





