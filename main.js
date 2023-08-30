// Validation form inputs before submitting data
function validationForm() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let adresse = document.getElementById("adresse").value;
    let email = document.getElementById("email").value;

    if (name === "") {
        alert("Name is required");
        return false;
    }

    if (age === "") {
        alert("Age is required");
        return false;
    } else if (age < 1) {
        alert("Age must not be zero or less than zero");
        return false;
    }

    if (adresse === "") {
        alert("Adresse is required");
        return false;
    }

    if (email === "") {
        alert("Email is required");
        return false;
    } else if (!email.includes("@")) {  // Corrected this condition
        alert("Invalid email address");
        return false;
    }
    return true;
}

// Function to show data to local storage
function showData() {
    let peopleList;
    if (localStorage.getItem("peopleList") === null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    let html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";  
        html += "<td>" + element.age + "</td>";   
        html += "<td>" + element.adresse + "</td>";  
        html += "<td>" + element.email + "</td>";  
        html += '<td> <button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += '<td> <button onclick="deleteData(' + index + ')" class="btn btn-danger m-2">Delete</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Corrected the event listener for document load
window.onload = showData;

// Function to add data to local storage
function AddData() {
    // If form is validated
    if (validationForm()) {
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let adresse = document.getElementById("adresse").value;
        let email = document.getElementById("email").value;

        let peopleList;
        if (localStorage.getItem("peopleList") === null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        peopleList.push({
            name: name,
            age: age,
            adresse: adresse,  
            email: email      
        });

        localStorage.setItem('peopleList', JSON.stringify(peopleList));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("adresse").value = "";
        document.getElementById("email").value = "";
    }
}


// Function to delete Data from local storage
function deleteData(index) {
    let peopleList;
    if (localStorage.getItem("peopleList") === null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//Function to update/edit data in local storage
function updateData(index){
    //submit button will hide and Update button will show for updating of Data in local storage
 document.getElementById("submit").style.display = "none";
 document.getElementById("update").style.display = "block";

 let peopleList;
 if (localStorage.getItem("peopleList") === null) {
     peopleList = [];
 } else {
     peopleList = JSON.parse(localStorage.getItem("peopleList"));
 }
 document.getElementById("name").value = peopleList[index].name;
 document.getElementById("age").value = peopleList[index].age;
 document.getElementById("adresse").value = peopleList[index].adresse;
 document.getElementById("email").value = peopleList[index].email;

 document.querySelector("#update").onclick = function(){
    if(validationForm() === true){
        peopleList[index].name = document.getElementById("name").value;
        peopleList[index].age = document.getElementById("age").value;
        peopleList[index].adresse = document.getElementById("adresse").value;
        peopleList[index].email = document.getElementById("email").value;

        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("adresse").value = "";
        document.getElementById("email").value = "";


        //Update button will hide and Submit button will show 
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
    }
 }
}