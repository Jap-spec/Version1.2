const ageInput = document.getElementById("age");
const ageError = document.getElementById("ageError");
const stratumSelect = document.getElementById("stratum");
const stratumError = document.getElementById("stratumError");
const loginForm = document.getElementById("loginForm");

ageInput.addEventListener("input", function() {
    validateAge();
});

stratumSelect.addEventListener("change", function() {
    validateStratum();
});

function validateAge() {
    const age = ageInput.value;
    if (age === "") {
        showError(ageError, "Por favor, ingresa tu edad.");
    } else if (isNaN(age) || age < 18 || age > 100 || !Number.isInteger(Number(age))) {
        showError(ageError, "Ten en cuenta que debes ser mayor de edad");
    } else {
        hideError(ageError);
    }
}

function validateStratum() {
    if (stratumSelect.value === "") {
        showError(stratumError, "Por favor, seleccione el estrato al cual pertenece.");
    } else {
        hideError(stratumError);
    }
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = "block";
}

function hideError(element) {
    element.textContent = "";
    element.style.display = "none";
}

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    validateAge();
    validateStratum();
    
    if (!ageError.textContent && !stratumError.textContent) {
        window.location.href = "P_Multidimencional.html"; 
    }
});

function showModal(message) {
    var modal = document.getElementById("myModal");
    var modalMessage = document.getElementById("modal-message");
    modalMessage.textContent = message;
    modal.style.display = "block";
    
    var closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
