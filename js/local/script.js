
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
        <button type="button" onclick="">Terminate</button>
      `;
    } else if (selectedOption === "vlsm") {
        dynamicInputsDiv.innerHTML = `
        <label for="ipAddress">Adresse IP :</label>
        <input type="text" id="ipAddress" name="ipAddress" placeholder="Entrez l'adresse IP">
  
        <div id="vlsmInputs">
        <label for="subnet">Poste${i} :</label>
        <input type="text" name="subnet[]" placeholder="Nombre des machines">
        </div>
  
        <button type="button" onclick="addVLSMInput()">+</button>  
        <button type="button" onclick="">Terminate</button>
      `;
    i++
    }// Add additional condition to clear content for "Select method"
    else if (selectedOption === "selectMethod") {
        // Do nothing, leave dynamicInputsDiv empty
    }
}

function addVLSMInput() {
    var vlsmInputsDiv = document.getElementById("vlsmInputs");
    vlsmInputsDiv.innerHTML += `
      <label for="subnet">Poste${i} :</label>
      <input type="text" name="subnet[]" placeholder="Nombre des machines">
      <br>
    `;
    i++;
}
