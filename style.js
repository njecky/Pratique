// Écouteur d'événement pour la soumission du formulaire
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Vérifiez si tous les champs sont remplis
    const nom = document.getElementById('nom').value;
    const telephone = document.getElementById('telephone').value;
    const age = document.getElementById('age').value;
    const activite = document.getElementById('activite').value;
    const quartier = document.getElementById('quartier').value;
    const service = document.getElementById('service').value;
    const canal = document.getElementById('canal').value;
    const avatar = document.getElementById('avatar').files.length;

    if (!nom || !telephone || !age || !activite || !quartier || !service || !canal || !avatar) {
        // Si un champ est vide, affichez la popup
        showPopup("Veuillez remplir tous les champs du formulaire avant de soumettre.");
        return;
    }

    // Validation spécifique pour le champ nom
    if (nom.trim() === '') {
        showPopup("Le champ nom ne peut pas être vide.");
        return;
    } else if (nom.length > 255) {
        showPopup("Le nom ne doit pas dépasser 255 caractères.");
        return;
    }
    // Vérification du champ Téléphone
    if (!telephone) {
        showError("Le champ Téléphone est requis.");
        return;
    }else if (!/^\d+$/.test(telephone)) {
        showError("Le numéro de téléphone doit être un numéro local (chiffres uniquement).");
        return;
    }

    // Validation spécifique pour le champ Âge
    if (!age) {
        showPopup("Le champ âge est requis.");
        return;
    } else if (!Number.isInteger(Number(age))) {
        showPopup("L'âge doit être un entier.");
        return;
    } else if (Number(age) < 18) {
        showPopup("Vous devez avoir au moins 18 ans.");
        return;
    }

     // Validation spécifique pour le champ activité
    if (activite.trim() === '') {
        showPopup("Le champ activité ne peut pas être vide.");
        return;
    } else if (activite.length > 255) {
        showPopup("L'activité ne doit pas dépasser 255 caractères.");
        return;
    }

      // Validation spécifique pour le champ quartier
    if (quartier.trim() === '') {
        showPopup("Le champ quartier ne peut pas être vide.");
        return;
    } else if (quartier.length > 255) {
        showPopup("Le quartier ne doit pas dépasser 255 caractères.");
        return;
    }
    // Validation spécifique pour le champ Service
    const serviceOptions = ['Rejoindre la communauté', 'Voir les catalogues de vania', 'Contacter un super agent', 'Postuler à un poste vacant', 'Accéder aux services payants'];
    if (service === '') {
        showPopup("Veuillez sélectionner un service.");
        return;
    } else if (!serviceOptions.includes(service)) {
        showPopup("Le service sélectionné n'est pas valide.");
        return;
    }

    // Validation spécifique pour le champ canal
    const canalOptions = ['Sur les réseaux sociaux', 'Dans un espace public', 'Par une personne proche', 'Grâce au moteur de recherche'];
    if (canal === '') {
        showPopup("Veuillez sélectionner un canal.");
        return;
    } else if (!canalOptions.includes(canal)) {
        showPopup("Le canal sélectionné n'est pas valide.");
        return;
    }

    // Validation pour le champ Avatar
    if (!avatar) {
        // Afficher l'erreur dans la popup
        showPopup("Veuillez télécharger un avatar.");
        // document.getElementById('popupMessage').textContent = "Veuillez télécharger un avatar.";
        // document.getElementById('popup').style.display = 'flex'; // Afficher la popup
        return; // Arrêter l'exécution si le champ est vide
    }else{
    // Supposons que vous avez ces variables définies
        const allowedExtensions = ['png', 'jpeg', 'jpg'];
        const maxFileSize = 5000000; // 5 Mo en octets

        // Extraire l'extension du fichier
        const avatar = document.getElementById('avatar').files[0]; // Récupérer le premier fichier sélectionné
        // const fileName = avatar.name;
        const fileExtension = avatar.name.split('.').pop().toLowerCase(); // Obtenir l'extension en minuscules
         // Vérifier si l'extension est autorisée
        if (!allowedExtensions.includes(fileExtension)) {
             showPopup("Erreur : L'extension du fichier doit être png, jpeg ou jpg.");
            // document.getElementById('popupMessage').textContent = "Erreur : L'extension du fichier doit être png, jpeg ou jpg.";
            // document.getElementById('popup').style.display = 'flex'; // Afficher la popup
            return; // Arrêter l'exécution si l'extension n'est pas autorisée
        }else{
            // Vérifier la taille du fichier
            if (avatar.size > maxFileSize) {
            // document.getElementById('popupMessage').textContent = "Erreur : La taille du fichier doit être inférieure à 5 Mo.";
            // document.getElementById('popup').style.display = 'flex'; // Afficher la popup
            showPopup("Erreur : La taille du fichier doit être inférieure à 5 Mo.");
            return; // Arrêter l'exécution si la taille dépasse la limite
            }
        }
        // Générer un nom unique pour l'avatar
        const uniqueName = Math.random().toString(36).substring(2, 8) + Date.now().toString(36).substring(2, 8);
        const fileName = uniqueName.slice(0, 100) + '.' + avatar.name.split('.').pop(); // Limiter la longueur à 100 caractères

        // Redimensionner l'image à 110x110 pixels
        const canvas = document.createElement('canvas');
        canvas.width = 110;
        canvas.height = 110;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = URL.createObjectURL(avatar);
        img.onload = function() {
            ctx.drawImage(img, 0, 0, 110, 110);

            // Définir la qualité de l'image (entre 0 et 100)
            const imageQuality = 80;

            // Convertir le canvas en blob et envoyer au serveur
            canvas.toBlob(function(blob) {
                const formData = new FormData();
                formData.append('avatar', blob, fileName);

                // Envoyer les données du formulaire au serveur
                fetch('upload.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data =>{
                     if (data.success) {
                        // Afficher le message de succès dans la popup
                        showPopup('Formulaire soumis avec succès !');
                    } else {
                        showPopup(data.error); // Afficher l'erreur si le téléchargement échoue
                    }
                })
                .catch(error => {
                    console.error('Erreur lors du téléchargement de l\'avatar :', error);
                    showPopup('Erreur lors du téléchargement de l\'avatar.');
                });
            }, 'image/jpeg', imageQuality);
        };

    }

    // // Si tous les champs sont valides, vous pouvez soumettre le formulaire ici
    // alert('Formulaire soumis avec succès !');
    // // Pour soumettre réellement le formulaire, utilisez : this.submit();
});

// Fonction pour afficher la popup
function showPopup(message) {
    document.getElementById('popupMessage').textContent = message; // Mettre à jour le message
    document.getElementById('popup').style.display = 'flex'; // Afficher la popup
}

// Fermer la popup
document.getElementById('closePopup').onclick = function() {
    closePopupAndFocus(); // Appelle la fonction pour fermer la popup et sélectionner le champ "Nom"
}

// Fermer la popup en cliquant à l'extérieur de celle-ci
window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        closePopupAndFocus(); // Appelle la fonction pour fermer la popup et sélectionner le champ "Nom"
    }
}

//Fonction pour masquer la popup et sélectionner le champ "Nom"
function closePopupAndFocus() {
    document.getElementById('popup').style.display = 'none'; // Masque le popup
    document.getElementById('nom').focus(); // Sélectionne le champ "Nom"
}