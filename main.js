let jsonString = "";

function addBlockState() {
	let stateRows = document.getElementById('blockBody').getElementsByTagName("tr")
	let totalStates = stateRows.length
	let stateRow = document.createElement('tr')
	stateRow.id = `state${totalStates+1}`
	stateRow.innerHTML = `<td><input type="text" id="stateName${totalStates+1}"></td>
		<td><input type="text" id="modelName${totalStates+1}"></td>
		<td><input type="text" id="events${totalStates+1}"></td>
		<td><input type="number" id="lightAttenuation${totalStates+1}" style="width: 100%"></td>
		<td><input type="number" min="0" max="15" id="red${totalStates+1}"></td>
		<td><input type="number" min="0" max="15" id="green${totalStates+1}"></td>
		<td><input type="number" min="0" max="15" id="blue${totalStates+1}"></td>
		<td><input type="checkbox" id="opaque${totalStates+1}" checked></td>
		<td><input type="checkbox" id="transparent${totalStates+1}"></td>
		<td><input type="checkbox" id="slabs${totalStates+1}"></td>
		<td><input type="checkbox" id="hidden${totalStates+1}"></td>
		<td><input type="checkbox" id="breaks${totalStates+1}" checked></td>
		<td><input type="checkbox" id="placeOn${totalStates+1}" checked></td>
		<td><input type="checkbox" id="replaces${totalStates+1}" checked></td>
		<td><input type="checkbox" id="walkThrough${totalStates+1}"></td>
		<td><button onclick="removeBlockState(this.parentNode.parentNode)">Remove</button></td>
		<td><button onclick="cloneBlockState(${totalStates+1})" id="cloneButton${totalStates+1}">Clone</button></td>`
	document.getElementById('blockBody').append(stateRow)
}

function cloneBlockState(id) {
	addBlockState()
	let stateRows = document.getElementById('blockBody').getElementsByTagName("tr")
	let totalStates = stateRows.length
	document.getElementById("stateName"+totalStates).value = document.getElementById("stateName"+id).value
	document.getElementById("modelName"+totalStates).value = document.getElementById("modelName"+id).value
	document.getElementById("events"+totalStates).value = document.getElementById("events"+id).value
	document.getElementById("opaque"+totalStates).checked = document.getElementById("opaque"+id).checked
	document.getElementById("transparent"+totalStates).checked = document.getElementById("transparent"+id).checked
	document.getElementById("slabs"+totalStates).checked = document.getElementById("slabs"+id).checked
	document.getElementById("hidden"+totalStates).checked = document.getElementById("hidden"+id).checked
	document.getElementById("lightAttenuation"+totalStates).value = document.getElementById("lightAttenuation"+id).value
	document.getElementById("breaks"+totalStates).checked = document.getElementById("breaks"+id).checked
	document.getElementById("placeOn"+totalStates).checked = document.getElementById("placeOn"+id).checked
	document.getElementById("replaces"+totalStates).checked = document.getElementById("replaces"+id).checked
	document.getElementById("walkThrough"+totalStates).checked = document.getElementById("walkThrough"+id).checked
	document.getElementById("red"+totalStates).value = document.getElementById("red"+id).value
	document.getElementById("green"+totalStates).value = document.getElementById("green"+id).value
	document.getElementById("blue"+totalStates).value = document.getElementById("blue"+id).value
}

function removeBlockState(row) {
	let oldRows = document.getElementById('blockBody').getElementsByTagName("tr").length
	let newId = 1
	let id = row.id.slice(5)
	row.remove()
	let stateRows = document.getElementById('blockBody').getElementsByTagName("tr")
	// Update remaining row IDs
	for (let i = 0; i < stateRows.length; i++) {
		stateRows[i].id = `state${i+1}`
	}
	for (let i = 0; i <= oldRows; i++){
		if(document.getElementById("modelName"+i)){
			document.getElementById("stateName"+i).id = "stateName"+newId
			document.getElementById("modelName"+i).id = "modelName"+newId
			document.getElementById("events"+i).id = "events"+newId
			document.getElementById("opaque"+i).id = "opaque"+newId
			document.getElementById("transparent"+i).id = "transparent"+newId
			document.getElementById("slabs"+i).id = "slabs"+newId
			document.getElementById("hidden"+i).id = "hidden"+newId
			document.getElementById("lightAttenuation"+i).id = "lightAttenuation"+newId
			document.getElementById("breaks"+i).id = "breaks"+newId
			document.getElementById("placeOn"+i).id = "placeOn"+newId
			document.getElementById("replaces"+i).id = "replaces"+newId
			document.getElementById("walkThrough"+i).id = "walkThrough"+newId
			document.getElementById("red"+i).id = "red"+newId
			document.getElementById("green"+i).id = "green"+newId
			document.getElementById("blue"+i).id = "blue"+newId
			document.getElementById("cloneButton"+i).setAttribute('onclick', `cloneBlockState(${newId})`);
			document.getElementById("cloneButton"+i).id = "cloneButton"+newId
			newId++
		}
	}
	// Add a new alert if there are no rows remaining
	if (stateRows.length == 0) {addBlockState()}
}

function generateJSON() {
	let blockStates = {};
	let stateCount = document.getElementById('blockBody').getElementsByTagName("tr").length + 1;
	for(i = 1; i < stateCount; i++) {
		let stateName = document.getElementById("stateName"+i).value;
		let modelName = document.getElementById("modelName"+i).value;
		let blockEventsId = document.getElementById("events"+i).value;
		let modelsFolder = document.getElementById("modelsFolder").value;
		modelsFolder = modelsFolder == '' ? '' : modelsFolder + "/";
		let isOpaque = document.getElementById("opaque"+i).checked;
		let isTransparent = document.getElementById("transparent"+i).checked;
		let generateSlabs = document.getElementById("slabs"+i).checked;
		let catalogHidden = document.getElementById("hidden"+i).checked;
		let lightAttenuation = document.getElementById("lightAttenuation"+i).value;
		let canRaycastForBreak = document.getElementById("breaks"+i).checked;
		let canRaycastForPlaceOn = document.getElementById("placeOn"+i).checked;
		let canRaycastForReplace = document.getElementById("replaces"+i).checked;
		let walkThrough = document.getElementById("walkThrough"+i).checked;
		let lightLevelRed = document.getElementById("red"+i).value;
		let lightLevelGreen = document.getElementById("green"+i).value;
		let lightLevelBlue = document.getElementById("blue"+i).value;
		let blockState = {
			modelName: modelsFolder + modelName
		};
		
		if (isOpaque == false) {
			blockState.isOpaque = isOpaque;
		}
		if (isTransparent) {
			blockState.isTransparent = isTransparent;
		}
		if (generateSlabs) {
			blockState.generateSlabs = generateSlabs;
		}
		if (catalogHidden) {
			blockState.catalogHidden = catalogHidden;
		};
		if (lightAttenuation !== '') {
			blockState.lightAttenuation = parseInt(lightAttenuation);
		};
		if (blockEventsId !== '') {
			blockState.blockEventsId = blockEventsId;
		};
		if (canRaycastForBreak == false) {
			blockState.canRaycastForBreak = canRaycastForBreak;
		}
		if (canRaycastForPlaceOn == false) {
			blockState.canRaycastForPlaceOn = canRaycastForPlaceOn;
		}
		if (canRaycastForReplace == false) {
			blockState.canRaycastForReplace = canRaycastForReplace;
		}
		if (walkThrough) {
			blockState.walkThrough = walkThrough;
		};
		if (lightLevelRed !== '') {
			blockState.lightLevelRed = parseInt(lightLevelRed);
		};
		if (lightLevelGreen !== '') {
			blockState.lightLevelGreen = parseInt(lightLevelGreen);
		};
		if (lightLevelBlue !== '') {
			blockState.lightLevelBlue = parseInt(lightLevelBlue);
		};

		blockStates[stateName] = blockState;
	}
	jsonString = JSON.stringify({
		stringId: document.getElementById("modId").value + ":" + document.getElementById("blockId").value,
		blockStates: blockStates
	}, null, 4);

	document.getElementById('generatedCode').innerText = jsonString;
	document.getElementById('copyButton').style.display = "";
	document.getElementById('saveButton').style.display = "";
}

function saveJSON() {
	const blob = new Blob([jsonString], { type: "application/json" });
	const link = document.createElement("a");
	link.href = window.URL.createObjectURL(blob);
	link.download = "block_" + document.getElementById("blockId").value + ".json";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function copyJSON() {
	navigator.clipboard.writeText(jsonString)
}

function openImportModal() {
	document.getElementById('importModal').style.display='';
}

function importJSON() {
	let importedJSON = '';
	if (document.getElementById('importJSON').value == '') {return} else {importedJSON = JSON.parse(document.getElementById('importJSON').value)};
	let currentRows = document.getElementById('blockBody').getElementsByTagName("tr").length;
	let modelsFolder = false
	if (document.getElementById("stateName"+currentRows).value !== '') {currentRows++};
	document.getElementById('modId').value = importedJSON.stringId.split(':')[0];
	document.getElementById('blockId').value = importedJSON.stringId.split(':')[1];
	Object.entries(importedJSON.blockStates).forEach(([name, state]) => {
		if (!document.getElementById("stateName"+currentRows)) {addBlockState()}
		if (state.modelName.split('/').length > 1) {
			document.getElementById("modelsFolder").value = state.modelName.split('/')[0]
			document.getElementById("modelName"+currentRows).value = state.modelName.split('/').slice(1).join('/')
		} else {
			document.getElementById("modelName"+currentRows).value = state.modelName
		}
		document.getElementById("stateName"+currentRows).value = name
		if (typeof state.blockEventsId !== 'undefined') {
			document.getElementById("events"+currentRows).value = state.blockEventsId;
		};
		if (typeof state.isOpaque !== 'undefined') {
			document.getElementById("opaque"+currentRows).checked = state.isOpaque;
		};
		if (typeof state.isTransparent !== 'undefined') {
			document.getElementById("transparent"+currentRows).checked = state.isTransparent;
		};
		if (typeof state.generateSlabs !== 'undefined') {
			document.getElementById("slabs"+currentRows).checked = state.generateSlabs;
		};
		if (typeof state.catalogHidden !== 'undefined') {
			document.getElementById("hidden"+currentRows).checked = state.catalogHidden;
		};
		if (typeof state.lightAttenuation !== 'undefined') {
			document.getElementById("lightAttenuation"+currentRows).value = state.lightAttenuation;
		};
		if (typeof state.canRaycastForBreak !== 'undefined') {
			document.getElementById("breaks"+currentRows).checked = state.canRaycastForBreak;
		};
		if (typeof state.canRaycastForPlaceOn !== 'undefined') {
			document.getElementById("placeOn"+currentRows).checked = state.canRaycastForPlaceOn;
		};
		if (typeof state.canRaycastForReplace !== 'undefined') {
			document.getElementById("replaces"+currentRows).checked = state.canRaycastForReplace;
		};
		if (typeof state.walkThrough !== 'undefined') {
			document.getElementById("walkThrough"+currentRows).checked = state.walkThrough;
		};
		if (typeof state.lightLevelRed !== 'undefined') {
			document.getElementById("red"+currentRows).value = state.lightLevelRed;
		};
		if (typeof state.lightLevelGreen !== 'undefined') {
			document.getElementById("green"+currentRows).value = state.lightLevelGreen;
		};
		if (typeof state.lightLevelBlue !== 'undefined') {
			document.getElementById("blue"+currentRows).value = state.lightLevelBlue;
		};
		currentRows++;
	})
	document.getElementById('importModal').style.display='none'
}