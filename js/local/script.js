
var i = 1;
function loadOptions() {
    var selectedOption = document.getElementById("networkType").value;
    var dynamicInputsDiv = document.getElementById("dynamicInputs");
    var dynamicResult = document.getElementById("dynamicResult");

    // Reset dynamicInputsDiv
    dynamicInputsDiv.innerHTML = "";

    if (selectedOption === "subnetting") {
        dynamicInputsDiv.innerHTML = `
        <label for="ipAddress">Adresse IP :</label>
        <input type="text" id="ipAddress" name="ipAddress" placeholder="Entrez l'adresse IP">
  
        <label for="subnets">Nombre de sous-réseaux :</label>
        <input type="number" id="subnets" name="subnets" placeholder="Entrez le nombre de sous-réseaux">
<<<<<<< HEAD
        <button type="button" onclick="collectAndProcessData()">Terminate</button>
      `;
    } else if (selectedOption === "vlsm") {
        i = 1;
=======
        <button type="button" onclick="">Terminate</button>
      `;
    } else if (selectedOption === "vlsm") {
>>>>>>> 44e57f8df75d9eb117dddd07ed87ff8b903eed5e
        dynamicInputsDiv.innerHTML = `
        <label for="ipAddress">Adresse IP :</label>
        <input type="text" id="ipAddress" name="ipAddress" placeholder="Entrez l'adresse IP">
  
        <div id="vlsmInputs">
        <label for="subnet">Poste${i} :</label>
        <input type="text" name="subnet[]" placeholder="Nombre des machines">
        </div>
  
<<<<<<< HEAD
        <button type="button" onclick="addPostInput()">+</button>  
        <button type="button" onclick="collectAndProcessData()">Terminate</button>
      `;
        i++
=======
        <button type="button" onclick="addVLSMInput()">+</button>  
        <button type="button" onclick="">Terminate</button>
      `;
    i++
>>>>>>> 44e57f8df75d9eb117dddd07ed87ff8b903eed5e
    }// Add additional condition to clear content for "Select method"
    else if (selectedOption === "selectMethod") {
        // Do nothing, leave dynamicInputsDiv empty
    }
}

<<<<<<< HEAD
// ajouter des postes
function addPostInput() {
    var vlsmInputsDiv = document.getElementById("vlsmInputs");
    // Créez un nouveau div pour chaque poste
    var newPostDiv = document.createElement("div");
    newPostDiv.innerHTML = `
        <label for="subnet">Poste${i} :</label>
        <input type="text" name="subnet[]" placeholder="Nombre des machines">
        <br>
    `;

    // Ajoutez le nouveau div à l'élément existant
    vlsmInputsDiv.appendChild(newPostDiv);
    i++;
}

// Récolter les données
function collectAndProcessData() {
    var selectedOption = document.getElementById("networkType").value;
    var ipAddress = document.getElementById("ipAddress").value;

    if (selectedOption === "subnetting") {
        var subnets = document.getElementById("subnets").value;

        // Collect data for Subnetting
        console.log("Subnetting Data - IP:", ipAddress, "Subnets:", subnets);

        // Collect data for Subnetting - Postes
        var postInputs = document.getElementsByName("post[]");
        var postData = [];

        for (var j = 0; j < postInputs.length; j++) {
            postData.push(postInputs[j].value);
        }

        console.log("Subnetting Data - Posts:", postData);

        // Ajoutez ici la logique pour le cas de Subnetting
    } else if (selectedOption === "vlsm") {
        var vlsmInputs = document.getElementsByName("subnet[]");
        var vlsmData = [];

        for (var j = 0; j < vlsmInputs.length; j++) {
            vlsmData.push(vlsmInputs[j].value);
        }

        console.log("VLSM Data - IP:", ipAddress, "Subnets:", vlsmData);

        // Ajoutez ici la logique pour le cas de VLSM
    }
}
=======
function addVLSMInput() {
    var vlsmInputsDiv = document.getElementById("vlsmInputs");
    vlsmInputsDiv.innerHTML += `
      <label for="subnet">Poste${i} :</label>
      <input type="text" name="subnet[]" placeholder="Nombre des machines">
      <br>
    `;
    i++;
}
>>>>>>> 44e57f8df75d9eb117dddd07ed87ff8b903eed5e
