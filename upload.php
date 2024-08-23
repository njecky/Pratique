<?php
// Dossier où les images seront stockées
$targetDir = "images/";

// Vérifier si le dossier existe, sinon le créer
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0755, true);
}

// Vérifier si un fichier a été téléchargé
if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] == UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['avatar']['tmp_name'];
    $fileName = $_FILES['avatar']['name'];
    $fileSize = $_FILES['avatar']['size'];
    $fileType = $_FILES['avatar']['type'];
    
    // Vérifier l'extension du fichier
    $allowedExtensions = ['png', 'jpeg', 'jpg'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    if (!in_array($fileExtension, $allowedExtensions)) {
        echo json_encode(['error' => 'Extension de fichier non autorisée.']);
        exit;
    }

    // Vérifier la taille du fichier (5 Mo maximum)
    if ($fileSize > 5000000) {
        echo json_encode(['error' => 'La taille du fichier doit être inférieure à 5 Mo.']);
        exit;
    }

    // Générer un nom unique pour le fichier
    $newFileName = uniqid() . '.' . $fileExtension;

    // Déplacer le fichier vers le dossier cible
    $destPath = $targetDir . $newFileName;
    if (move_uploaded_file($fileTmpPath, $destPath)) {
        // Redimensionner l'image si nécessaire
        if ($fileExtension === 'jpeg' || $fileExtension === 'jpg') {
            $originalImage = imagecreatefromjpeg($destPath);
        } elseif ($fileExtension === 'png') {
            $originalImage = imagecreatefrompng($destPath);
        }

        // Redimensionner l'image à 110x110 pixels
        $newWidth = 110;
        $newHeight = 110;
        $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
        imagecopyresampled($resizedImage, $originalImage, 0, 0, 0, 0, $newWidth, $newHeight, imagesx($originalImage), imagesy($originalImage));

        // Enregistrer l'image redimensionnée
        if ($fileExtension === 'jpeg' || $fileExtension === 'jpg') {
            imagejpeg($resizedImage, $destPath, 80); // 80% qualité
        } elseif ($fileExtension === 'png') {
            imagepng($resizedImage, $destPath, 8); // Compression de 0 à 9
        }

        // Libérer la mémoire
        imagedestroy($originalImage);
        imagedestroy($resizedImage);

        // Réponse de succès
        echo json_encode(['success' => 'Avatar téléchargé avec succès!', 'file' => $newFileName]);
    } else {
        echo json_encode(['error' => 'Erreur lors du téléchargement du fichier.']);
    }
} else {
    echo json_encode(['error' => 'Aucun fichier téléchargé ou erreur de téléchargement.']);
}
?>