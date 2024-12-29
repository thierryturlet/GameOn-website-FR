function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closebtns = document.querySelectorAll(".btnCloseJs")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
} 

// Sélectionne la croix et la modale
const closeBtn = document.querySelector(".close");
const modal = document.querySelector(".bground");


let form = document.querySelector("form");

// Ajoute un gestionnaire d'événement pour la croix
closeBtn.addEventListener("click", () => {
  modal.style.display = "none"; // Ferme la modale en la cachant

  form.reset();
  afficherMessageErreur(inputPrenom)
  afficherMessageErreur(inputNom);
  afficherMessageErreurRadio(inputBtnRadio);
  afficherMessageErreur(inputBirthDate);
  afficherMessageErreurCheckBox(inputCondition);
  afficherMessageErreur(inputEmail);
  afficherMessageErreur(inputTournoi);
});

//ferme le formulaire//
// setupCloseButton()

//*pour les messages de validation*//



let inputPrenom = document.getElementById("first");
let inputNom = document.getElementById("last");
let inputEmail = document.getElementById("email");
let inputBirthDate = document.getElementById("birthdate");
let inputTournoi = document.getElementById("quantity");
let inputBtnRadio = document.querySelectorAll("input[type=radio]");
let inputCondition = document.getElementById("checkbox1");




form.addEventListener("submit", (event) => {
  event.preventDefault();

  let formulaireValide = true;

  if (!verifierInputText(inputPrenom)) {
    afficherMessageErreur(
      inputPrenom,
      "le champ prénom doit avoir au moins deux caracteres. "
    );
    formulaireValide = false;
  } else {
    
    afficherMessageErreur(inputPrenom);
  }

  if (!verifierInputText(inputNom)) {
    afficherMessageErreur(
      inputNom,
      "le champ nom doit avoir au moins deux caracteres. "
    );
    formulaireValide = false;
  } else {
    afficherMessageErreur(inputNom);
  }

  if (!verifierInputEmail(inputEmail)) {
    afficherMessageErreur(inputEmail, "Votre Email n'est pas valide.");
   
    formulaireValide = false;
  } else {
    afficherMessageErreur(inputEmail);
  }

  if (!verifierInputBirthDate(inputBirthDate.value)) {
    afficherMessageErreur(inputBirthDate, "Votre date n'est pas valide.");
    formulaireValide = false;
  } else {
    afficherMessageErreur(inputBirthDate);
  }

  if (!verifierInputTournoi(inputTournoi)) {
    afficherMessageErreur(inputTournoi, "il doit etre inferieure a 99");
    formulaireValide = false;
  } else {
    afficherMessageErreur(inputTournoi);
  }

  if (!verifierInputBtnRadio(inputBtnRadio)) {
    afficherMessageErreurRadio(
      inputBtnRadio,
      "Veuillez cocher une des villes."
    );
    formulaireValide = false;
  } else {
    afficherMessageErreurRadio(inputBtnRadio);
  }

  if (!verifierCondition()) {
    afficherMessageErreurCheckBox(
      inputCondition,
      "Vous devez accepter les conditions d'utilisation."
    );
    formulaireValide = false;
  }

  if (formulaireValide) {
    afficherValidationFormulaire();
  }
});

function verifierInputText(input) {
  let valeur = input.value.trim();

  if (valeur.length >= 2) {
    input.classList.remove("invalid"); // Retire 'invalid' si le champ est valide
    return true;
  } else {
    input.classList.add("invalid"); // Ajoute 'invalid' si le champ est invalide
    return false;
  }
}

function afficherMessageErreur(input, message = "") {
  let divParent = input.closest("div");

  let messageExist = divParent.querySelector("span");
  if (messageExist) {
    messageExist.remove();
  }

  if (message) {
    input.classList.add("invalid"); // Ajouter un contour rouge
    let messageErreur = document.createElement("span");
    messageErreur.style.color = "red";
    messageErreur.textContent = message;
    divParent.appendChild(messageErreur);
  } else {
    input.classList.remove("invalid"); // Retirer le contour rouge
    
  }
}

function afficherMessageErreurCheckBox(cb, message = "") {
  let divParent = cb.closest("div");

  let messageExist = divParent.querySelector(".messageErreur");
  if (messageExist) {
    messageExist.remove();
  }

  if (!verifierCondition()) {
    cb.classList.add("invalid"); // Ajouter un contour rouge
    let messageErreur = document.createElement("span");
    messageErreur.style.color = "red";
    messageErreur.classList.add("messageErreur");
    messageErreur.textContent = message;
    divParent.appendChild(messageErreur);
  }

  document.getElementById("checkbox1").addEventListener("change", function () {
    afficherMessageErreurCheckBox(
      checkbox1,
      "Veuillez accepter les conditions d'utilisation !"
    );
  });
}

function afficherMessageErreurRadio(rb, message = "") {
  // Trouver le conteneur parent des boutons radio
  let divParent = rb[0].closest("div");

  let messageExist = divParent.querySelector(".messageErreur");
  if (messageExist) {
    messageExist.remove();
  }

  if (!verifierInputBtnRadio(rb)) {
    let messageErreur = document.createElement("span");
    messageErreur.style.color = "red";
    messageErreur.classList.add("messageErreur");
    messageErreur.textContent = message;
    divParent.appendChild(messageErreur);
  }
}

function verifierInputEmail(input) {
  valeur = input.value;

  let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (regexEmail.test(valeur)) {
    return true; // L'email est valide
  } else {
    afficherMessageErreur(input, "adresse email invalide");

    return false; // L'email est invalide
  }
}

function verifierInputBirthDate(value) {
  if (value === "") {
    document.getElementById("birthdate").classList.add("invalid");
    return false; // Retourne false si le champ est vide
  }

  return true; // Retourne true si une date est saisie
}

function verifierInputTournoi(input) {
  let valeur = parseInt(input.value); // Convertir la valeur en nombre

  if (valeur >= 0 && valeur <= 99) {
    input.classList.remove("invalid");

    return true; // Retourner true si valide
  } else {
    input.classList.add("invalid"); // Ajouter un contour rouge

    return false; // Retourner false si invalide
  }
}

function verifierInputBtnRadio(input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i].checked) {
      return true;
    }
  }

  return false; // Aucune case n'est cochée
}

function verifierCondition() {
  let checkbox1 = document.getElementById("checkbox1");
  let checkbox2 = document.getElementById("checkbox2");

  if (!checkbox1.checked) {
    return false; // Ne pas valider le formulaire si checkbox1 n'est pas cochée
  }

  return true; // Tout est OK
}

function afficherValidationFormulaire() {
  // Sélectionne le conteneur du message

  // Sélectionne la modale
  const modal = document.querySelector(".bground");

  // Vérifie si les éléments requis existent
  if (!modal || !closeBtn) {
    return false;
  } else {
    form.reset(); //vide le formulaire
    modal.style.display = "none";
    const messageContainer = document.querySelector("#popup");
    messageContainer.style.color = "white";
    messageContainer.style.display = "block";
    // Affiche le message de succès
    messageContainer.querySelector("p").textContent =
      "Merci pour votre inscription";
  }
}

// Fonction pour fermer la popup de confirmation
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

closebtns.forEach((btn) => btn.addEventListener("click", () => {
  closePopup();

})
);


inputPrenom.addEventListener("blur", (e) => {
  if (verifierInputText(e.target)) {
    afficherMessageErreur(e.target); // Supprime le message d'erreur si valide
  } else {
    afficherMessageErreur(
      e.target,
      "Le champ prénom doit avoir au moins deux caractères."
    );
  }
});

inputNom.addEventListener("blur", (e) => {
  if (verifierInputText(e.target)) {
    afficherMessageErreur(e.target); // Supprime le message d'erreur si valide
  } else {
    afficherMessageErreur(
      e.target,
      "Le champ nom doit avoir au moins deux caractères."
    );
  }
});

inputEmail.addEventListener("blur", (e) => {
  if (verifierInputEmail(e.target)) {
    afficherMessageErreur(e.target); // Supprime le message d'erreur si valide
  } else {
    afficherMessageErreur(e.target, "Votre email n'est pas valide.");
  }
});

inputBirthDate.addEventListener("blur", (e) => {
  if (verifierInputBirthDate(e.target.value)) {
    afficherMessageErreur(e.target); // Supprime le message d'erreur si valide
  } else {
    afficherMessageErreur(e.target, "Votre date n'est pas valide.");
  }
});

inputTournoi.addEventListener("blur", (e) => {
  if (verifierInputTournoi(e.target)) {
    afficherMessageErreur(e.target); // Supprime le message d'erreur si valide
  } else {
    afficherMessageErreur(
      e.target,
      "Le nombre doit être compris entre 0 et 99."
    );
  }
});

inputBtnRadio.forEach((radio) => {
  radio.addEventListener("click", (e) => {
    afficherMessageErreurRadio(inputBtnRadio);
  });
});


 
