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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Sélectionne la croix et la modale
const closeBtn = document.querySelector(".close");
const modal = document.querySelector(".bground");

// Ajoute un gestionnaire d'événement pour la croix
closeBtn.addEventListener("click", () => {
  console.log("Fermeture de la modale");
  modal.style.display = "none"; // Ferme la modale en la cachant
  document.getElementById("popup").style.display = "block";
});

//*pour les messages de validation*//

let form = document.querySelector("form");
console.log(form);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("verification des champs");

  let formulaireValide = true
  

  let inputPrenom = document.getElementById("first");
  if (!verifierInputText(inputPrenom)) {
    afficherMessageErreur(
      inputPrenom,
      "le champ prénom doit avoir au moins deux caracteres. "
    );
    formulaireValide = false
  } else {
    afficherMessageErreur(inputPrenom);
  }

  let inputNom = document.getElementById("last");
  if (!verifierInputText(inputNom)) {
    afficherMessageErreur(
      inputNom,
      "le champ nom doit avoir au moins deux caracteres. "
    );
    formulaireValide = false
  } else {
    afficherMessageErreur(inputNom);
  }

  let inputEmail = document.getElementById("email");
  if (!verifierInputEmail(inputEmail)) {
    afficherMessageErreur(inputEmail, "Votre Email n'est pas valide."

    );
    formulaireValide = false
  } else {
    afficherMessageErreur(inputEmail);
  }

  let inputBirthDate = document.getElementById("birthdate");
  if (!verifierInputBirthDate(inputBirthDate.value)) {
    afficherMessageErreur(inputBirthDate, "Votre date n'est pas valide."
    );
    formulaireValide = false
  } else {
    afficherMessageErreur(inputBirthDate);
  }

  let inputTournoi = document.getElementById("quantity");
  if (!verifierInputTournoi(inputTournoi)) {
    afficherMessageErreur(inputTournoi, "il doit etre inferieure a 99"
    );
    formulaireValide = false
  } else {
    afficherMessageErreur(inputTournoi);
  }

  let inputBtnRadio = document.querySelectorAll("input[type=radio]");
  if (!verifierInputBtnRadio(inputBtnRadio)) {
    afficherMessageErreurRadio(
      inputBtnRadio,
      "Veuillez cocher une des villes."
    );
    formulaireValide = false
  } else {
    afficherMessageErreurRadio(inputBtnRadio);
  }

  let inputCondition = document.getElementById("checkbox1");

  if (!verifierCondition()) {
    console.log("Conditions non acceptées");
    afficherMessageErreurCheckBox(
      inputCondition,
      "Vous devez accepter les conditions d'utilisation."
    );
    formulaireValide = false
  }

  if (formulaireValide) {
    afficherValidationFormulaire();
  }
  // si formulaire valide = true alors on valide le formulaire sinon on ne le valide pas
  //si formulaire est valide alors je ferme la popup du formulaire et j ouvre une nouvelle popup de confirmation 
  
  console.log("Conditions acceptées");

});

function verifierInputText(input) {
  let valeur = input.value;

  if (valeur.length >= 2) {
    console.log(valeur);
    return true;
  } else {
    console.log("faux");
    return false;
  }
}

function afficherMessageErreur(input, message = "") {
  console.log("condition");
  console.log(input);

  let divParent = input.closest("div");
  console.log(divParent);

  let messageExist = divParent.querySelector("span");
  if (messageExist) {
    messageExist.remove();
  }

  if (!verifierInputText(input)) {
    let messageErreur = document.createElement("span");
    messageErreur.style.color = "red";
    messageErreur.textContent = message;
    divParent.appendChild(messageErreur);
  }
}

function afficherMessageErreurCheckBox(cb, message = "") {
  console.log("condition");
  console.log(cb + "" + message);

  let divParent = cb.closest("div");
  console.log(divParent);

  let messageExist = divParent.querySelector(".messageErreur");
  if (messageExist) {
    messageExist.remove();
  }

  if (!verifierCondition()) {
    let messageErreur = document.createElement("span");
    messageErreur.style.color = "red";
    messageErreur.classList.add("messageErreur");
    messageErreur.textContent = message;
    divParent.appendChild(messageErreur);
  }

  document.getElementById("checkbox1").addEventListener("change", function () {
    afficherMessageErreurCheckBox(checkbox1, "Veuillez accepter les conditions d'utilisation !");
  });
}

function afficherMessageErreurRadio(rb, message = "") {
  console.log("condition");
  console.log(rb);

  // Trouver le conteneur parent des boutons radio
  let divParent = rb[0].closest("div");
  console.log(divParent);
  let messageExist = divParent.querySelector(".messageErreur");
  if (messageExist) {
    messageExist.remove();
  }

  if (!verifierInputBtnRadio(rb)) {
    let messageErreur = document.createElement("span");
    messageErreur.style.color = "red";
    messageErreur.classList.add("messageErreur")
    messageErreur.textContent = message;
    divParent.appendChild(messageErreur);
  }
}

function verifierInputEmail(input) {
  console.log("verifierInputEmail");
  valeur = input.value;
  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (regexEmail.test(valeur)) {
    console.log(valeur);
    return true; // L'email est valide
  } else {
    console.log("Adresse email invalide");
    return false; // L'email est invalide
  }
}
function verifierInputBirthDate(value) {
  if (value === "") {
    console.log("Champ de date vide.");
    return false; // Retourne false si le champ est vide
  }

  console.log("Date saisie :", value);
  return true; // Retourne true si une date est saisie
}

function verifierInputTournoi(input) {
  let valeur = parseInt(input.value); // Convertir la valeur en nombre
  console.log("Valeur entrée : ", valeur); // Afficher la valeur saisie

  if (valeur >= 0 && valeur <= 99) {
    console.log("Conforme"); // Afficher "conforme" si la valeur est valide
    return true; // Retourner true si valide
  } else {
    console.log("Non conforme"); // Afficher "non conforme" si invalide
    return false; // Retourner false si invalide
  }
}

function verifierInputBtnRadio(input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i].checked) {
      console.log("Case radio cochée :", input[i].value);
      return true;
    }
  }

  console.log("case radio non cochée");
  return false; // Aucune case n'est cochée
}

function verifierCondition() {
  let checkbox1 = document.getElementById("checkbox1");
  let checkbox2 = document.getElementById("checkbox2");

  console.log("Checkbox 1 cochée :", checkbox1.checked); // Affiche true ou false
  console.log("Checkbox 2 cochée :", checkbox2.checked); // Affiche true ou false

  if (!checkbox1.checked) {
    console.log("Vous devez accepter les conditions d'utilisation.");
    return false; // Ne pas valider le formulaire si checkbox1 n'est pas cochée
  }

  return true; // Tout est OK
}

function afficherValidationFormulaire() {
  // Sélectionne le conteneur du message
  const messageContainer = document.querySelector("#popup");
 
  // Sélectionne la modale
  const modal = document.querySelector(".bground");

  // Vérifie si les éléments requis existent
  if (!modal || !closeBtn) {
    console.error("La modale ou son bouton de fermeture n'existent pas dans le DOM.");
    return;
  }
  modal.style.display = "none";

    // Affiche le message de succès
    modal.style.display = "none";// Ferme la modale
    messageContainer.textContent = "Formulaire envoyé avec succès !";
    messageContainer.style.color = "black";
    messageContainer.style.display = "block";
  
}


//* si on clique pls fois sur verifier le message d erreur n apparait qu une seule fois
//* si on clique sur verifier alors que le formulaire est bien rempli le message d erreur n apparait pas
//* si on a un message d erreur on corrige l erreur et on clique sur verifier le message erreur disparait

//bonus faire le champ email

//* recuperation du champs nom
// verifier si le contenu a au moins deux caracteres
// afficher message d erreur si c est pas le cas et masquer message si c est bon
// faire meme chose pour champ prenom
// bonus faire une fonction (verifierinputtexte) qui prend en parametre le input et retourne vrai ou faux si le message est bon ou pas
// bonus2 faire une fonction pour afficher le message d erreur au bon endroit (en js)

// monBouton = document.querySelector(".btn-submit");
// monBouton.addEventListener("click", (event) => {
//   event.preventDefault();

//   let inputs = document.querySelectorAll("form input");
//   let messageErreur = document.getElementById("messageErreur");
//   let errorDetected = false;

//   // Boucle pour vérifier chaque input
//   inputs.forEach((input) => {
//     if (input.value === "") {
//       errorDetected = true;
//     }
//   });

//   if (errorDetected) {
//     messageErreur.textContent = "Erreur : certains champs sont vides.";
//   } else {
//     messageErreur.textContent = ""; // Efface le message d'erreur
//     messageConfirmation.textContent = "Merci ! Votre réservation a été reçue.";
//   }
// });
