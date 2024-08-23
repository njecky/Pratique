<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Pratique</title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<div class="container">
			<h1>Les informations de contact</h1>
			<form method="post" id="registrationForm" action="#" enctype="multipart/form-data">
				<div class="form-group">
					<label for="nom">Nom :</label>
            		<input type="text" id="nom" name="nom">
        		</div>
		        <div class="form-group">
		            <label for="telephone">Numéro de téléphone :</label>
		            <input type="tel" id="telephone" name="telephone">
		        </div>
		        <div class="form-group">
		            <label for="age">Âge :</label>
		            <input type="number" id="age" name="age">
		        </div>
		        <div class="form-group">
		            <label for="activite">Activité :</label>
		            <input type="text" id="activite" name="activite">
		        </div>
		        <div class="form-group">
		            <label for="quartier">Quartier :</label>
		            <input type="text" id="quartier" name="quartier">
		        </div>
		        <div class="form-group">
		            <label for="service">Service :</label>
		            <select id="service" name="service">
		                <option value="">Sélectionnez un service</option>
		                <option value="Rejoindre la communauté">Rejoindre la comminauté</option>
		                <option value="Voir les catalogues de vania">Voir les catalogues de vania</option>
		                <option value="Contacter un super agent">Contacter un super agent</option>
		                <option value="Postuler à un poste vacant">Postuler à un post vacant</option>
		                <option value="Accéder aux services payants">Accéder aux services payants</option>
		            </select>
		        </div>
		        <div class="form-group">
		            <label for="canal">Canal :</label>
		            <select id="canal" name="canal">
		                <option value="">Sélectionnez un canal</option>
		                <option value="Sur les réseaux sociaux">Sur les réseaux sociaux</option>
		                <option value="Dans un espace public">Dans un espace public</option>
		                <option value="Par une personne proche">Par une personne proche</option>
		                <option value="Grâce au moteur de recherche">Grâce au moteur de recherche</option>
		            </select>
		        </div>
		        <div class="form-group">
		        	<label for="avatar">Avatar :</label>
                <!-- <div id="photoFrame" class="photo-frame">
                    <img id="previewPhoto" src="#" alt="Photo de profil" style="display: none;">
                </div>
                <input type="file" id="avatar" name="avatar" accept="image/*" onchange="previewImage(this)">
            </div> -->
            		<input type="file" id="avatar" name="avatar" accept="image/*" onchange="previewImage(this)">
        		</div>
		        <button type="submit">S'inscrire</button>
		    </form>

		    <!-- Popup -->
		    <div id="popup" class="popup">
		    	<div class="popup-content">
		    		<span class="close" id="closePopup">&times;</span>
		    		<p id="popupMessage"></p>
		    	</div>
		    </div>
		</div>
		<script type="text/javascript" src="style.js"></script>
	</body>
</html>