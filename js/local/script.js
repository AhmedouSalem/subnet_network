
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
        <button type="button" onclick="collectAndProcessData()">Terminate</button>
      `;
    } else if (selectedOption === "vlsm") {
        i = 1;
        dynamicInputsDiv.innerHTML = `
        <label for="ipAddress">Adresse IP :</label>
        <input type="text" id="ipAddress" name="ipAddress" placeholder="Entrez l'adresse IP">
  
        <div id="vlsmInputs">
        <label for="subnet">Poste${i} :</label>
        <input type="text" name="subnet[]" placeholder="Nombre des machines">
        </div>
  
        <button type="button" onclick="addPostInput()">+</button>  
        <button type="button" onclick="collectAndProcessData()">Terminate</button>
      `;
        i++
    }// Add additional condition to clear content for "Select method"
    else if (selectedOption === "selectMethod") {
        // Do nothing, leave dynamicInputsDiv empty
    }
}

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
        subnettingLogic(ipAddress, subnets);

        // Collect data for Subnetting
        // console.log("Subnetting Data - IP:", ipAddress, "Subnets:", subnets);
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


function subnettingLogic(userIP, numSubnets) {
    // Determine the IP class based on the first octet
    let ipClass;
    const firstOctet = parseInt(userIP.split('.')[0]);
    if (firstOctet >= 1 && firstOctet <= 126) {
        ipClass = 'A';
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        ipClass = 'B';
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        ipClass = 'C';
    } else {
        return "Invalid IP address"; // Handle invalid addresses
    }

    // Calculate the number of bits needed for the subnet
    const bitsNeeded = Math.ceil(Math.log2(numSubnets));

    // Determine the octet to subnet based on IP class
    let octetToSubnet;
    switch (ipClass) {
        case 'A':
            octetToSubnet = 2; // Change in the second octet
            break;
        case 'B':
            octetToSubnet = 3; // Change in the third octet
            break;
        case 'C':
            octetToSubnet = 4; // Change in the fourth octet
            break;
        default:
            return "Invalid IP class";
    }

    // Calculate the new subnet mask
    const subnetMask = calculateSubnetMask(bitsNeeded, octetToSubnet);

    // Output or use the subnetMask as needed
    console.log("Subnet Mask:", subnetMask);

    // Generate and output subnet details
    generateSubnetDetails(userIP, subnetMask, numSubnets);

    // Additional logic or output based on your requirements
}

// Function to calculate the new subnet mask
function calculateSubnetMask(bitsNeeded, octetToSubnet) {
    const subnetMask = [];
    for (let i = 0; i < 4; i++) {
        if (i < octetToSubnet - 1) {
            subnetMask.push(255); // No change before the octet to subnet
        } else if (i === octetToSubnet - 1) {
            // Calculate the subnet mask for the octet where changes occur
            const remainingBits = 8 - (bitsNeeded % 8 || 8); // Ensure a minimum of 1 bit is reserved
            const subnetValue = 256 - Math.pow(2, remainingBits);
            subnetMask.push(subnetValue);
        } else {
            subnetMask.push(0); // Set the remaining octets to 0
        }
    }
    return subnetMask.join('.');
}

// Function to calculate the starting address of a subnet
function calculateSubnetStart(userIP, subnetMask, subnetIndex) {
    const userIPArray = userIP.split('.').map(Number);
    const subnetMaskArray = subnetMask.split('.').map(Number);
    
    const subnetStartArray = [];
    for (let i = 0; i < 4; i++) {
        subnetStartArray.push(userIPArray[i] & subnetMaskArray[i]);
    }

    // Calculate the subnet index offset
    const offset = subnetIndex * calculateSubnetSize(subnetMask);

    // Apply the offset to the last octet
    subnetStartArray[3] += offset;

    // Format the result as a string
    return subnetStartArray.join('.');
}

// Function to calculate the ending address of a subnet
function calculateSubnetEnd(subnetStart, subnetMask) {
    const subnetStartArray = subnetStart.split('.').map(Number);
    const subnetMaskArray = subnetMask.split('.').map(Number);

    const subnetEndArray = [];
    for (let i = 0; i < 4; i++) {
        subnetEndArray.push((subnetStartArray[i] | (~subnetMaskArray[i] & 255)));
    }

    // Format the result as a string
    return subnetEndArray.join('.');
}

// Function to calculate the size of a subnet based on the subnet mask
function calculateSubnetSize(subnetMask) {
    return Math.pow(2, 32 - subnetMask.split('.').map(bitCount).reduce((a, b) => a + b));
}

// Function to count the number of set bits in an octet
function bitCount(octet) {
    let count = 0;
    while (octet) {
        count += octet & 1;
        octet >>= 1;
    }
    return count;
}


// Function to generate subnet details
function generateSubnetDetails(userIP, subnetMask, numSubnets) {
    const subnetDetails = [];
    for (let i = 0; i < numSubnets; i++) {
        const subnetStart = calculateSubnetStart(userIP, subnetMask, i);
        const subnetEnd = calculateSubnetEnd(subnetStart, subnetMask);
        const usableRange = generateUsableRange(subnetStart, subnetEnd);
        subnetDetails.push({
            subnet: i + 1,
            subnetStart,
            subnetMask: subnetMask,
            usableRange,
            broadcastAddress: subnetEnd
        });
    }

    // Output the subnet details
    console.log("Subnet Details:", subnetDetails);
    fillTable(subnetDetails);
}

// Function to generate usable address range for a subnet
function generateUsableRange(subnetStart, subnetEnd) {
    const usableStart = incrementIPAddress(subnetStart);
    const usableEnd = decrementIPAddress(subnetEnd);
    return `${usableStart} to ${usableEnd}`;
}

// Function to increment IP address
function incrementIPAddress(ipAddress) {
    const ipArray = ipAddress.split('.').map(Number);
    for (let i = 3; i >= 0; i--) {
        if (ipArray[i] < 255) {
            ipArray[i]++;
            break;
        } else {
            ipArray[i] = 0;
        }
    }
    return ipArray.join('.');
}

// Function to decrement IP address
function decrementIPAddress(ipAddress) {
    const ipArray = ipAddress.split('.').map(Number);
    for (let i = 3; i >= 0; i--) {
        if (ipArray[i] > 0) {
            ipArray[i]--;
            break;
        } else {
            ipArray[i] = 255;
        }
    }
    return ipArray.join('.');
}


function fillTable(subnetDetails) {
    const dataTable = document.getElementById("data");

    // Réinitialise le contenu du tableau
    dataTable.innerHTML = "";

    // Remplit le tableau avec les données générées
    subnetDetails.forEach((subnet) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${subnet.subnet}</td>
            <td>${subnet.subnetMask}</td>
            <td>${subnet.subnetStart}</td>
            <td>${subnet.usableRange}</td>
            <td>${subnet.broadcastAddress}</td>
        `;
        dataTable.appendChild(row);
    });

    document.querySelector("#networkForm").style.display = "none";
}



