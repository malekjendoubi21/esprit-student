// Test pour vérifier si l'image de couverture se charge correctement

// Fonction à appeler dans la console du navigateur pour tester l'image
function testCoverImage() {
  const img = new Image();
  img.onload = function() {
    console.log('✅ Image coveracm.jpg chargée avec succès');
    console.log('Dimensions:', this.naturalWidth, 'x', this.naturalHeight);
  };
  img.onerror = function() {
    console.log('❌ Erreur lors du chargement de coveracm.jpg');
    console.log('Vérifiez que le fichier existe dans public/images/club/acm/');
  };
  img.src = '/images/club/acm/coveracm.jpg';
}

// Fonction pour tester tous les chemins possibles
function testAllPaths() {
  const paths = [
    '/images/club/acm/coveracm.jpg',
    './images/club/acm/coveracm.jpg',
    'images/club/acm/coveracm.jpg',
    '/public/images/club/acm/coveracm.jpg'
  ];
  
  paths.forEach(path => {
    const img = new Image();
    img.onload = () => console.log('✅ Chemin valide:', path);
    img.onerror = () => console.log('❌ Chemin invalide:', path);
    img.src = path;
  });
}

// Instructions d'utilisation :
// 1. Ouvrez les outils de développement (F12)
// 2. Allez dans l'onglet Console
// 3. Copiez et collez ces fonctions
// 4. Exécutez : testCoverImage()
// 5. Si ça ne marche pas, exécutez : testAllPaths()

export { testCoverImage, testAllPaths };
