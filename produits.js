// =========================================================
// TP2 : Catalogue de produits - Logique métier JavaScript
// Module : Développement mobile - IAIL S5
// =========================================================

// 1. Données de départ
const produits = [
  { id: 1, nom: 'Clavier', categorie: 'Accessoires',  prix: 120, stock: 5 },
  { id: 2, nom: 'Souris',  categorie: 'Accessoires',  prix: 80,  stock: 8 },
  { id: 3, nom: 'Écran',   categorie: 'Informatique', prix: 900, stock: 0 },
  { id: 4, nom: 'Casque',  categorie: 'Accessoires',  prix: 240, stock: 3 }
];

// 2. Fonctions de la logique métier

// --- Formatage (testable indépendamment) ---
function formaterLigneProduit({ nom, prix }) {
  return `- ${nom} : ${prix} MAD`;
}

function formaterResumeProduit({ nom, prix, stock }) {
  return `${nom} - ${prix} MAD - ${stock} unités`;
}

// --- Affichage du catalogue ---
function afficherCatalogue(liste) {
  if (!Array.isArray(liste) || liste.length === 0) {
    console.log('--- Catalogue vide ---');
    return;
  }
  console.log('--- Catalogue complet ---');
  liste.map(formaterLigneProduit).forEach(ligne => console.log(ligne));
}

// --- Produits disponibles (stock > 0) ---
function getProduitsDisponibles(liste) {
  if (!Array.isArray(liste)) return [];
  return liste.filter(p => p.stock > 0);
}

// --- Valeur totale du stock ---
function calculerValeurStock(liste) {
  if (!Array.isArray(liste)) return 0;
  return liste.reduce((total, p) => total + p.prix * p.stock, 0);
}

// --- Produit disponible le moins cher ---
function getProduitMoinsCher(liste) {
  const dispo = getProduitsDisponibles(liste);
  if (dispo.length === 0) return null;
  return dispo.reduce((min, p) => (p.prix < min.prix ? p : min));
}

// --- Résumé du catalogue ---
function getResumeCatalogue(liste) {
  if (!Array.isArray(liste)) return [];
  return liste.map(formaterResumeProduit);
}

// 3. Défi supplémentaire : Validation d'un produit
function estValide(p) {
  if (!p || typeof p !== 'object' || Array.isArray(p)) return false;
  const { id, nom, categorie, prix, stock } = p;
  return (
    id != null &&
    typeof nom === 'string' && nom.trim() !== '' &&
    typeof categorie === 'string' && categorie.trim() !== '' &&
    Number.isFinite(prix) && prix >= 0 &&
    Number.isInteger(stock) && stock >= 0
  );
}

// 4. Exécution principale
function executer() {
  console.log('=== TP2 - Catalogue CampusStock ===\n');

  // Affichage du catalogue
  afficherCatalogue(produits);

  // Produits disponibles
  const disponibles = getProduitsDisponibles(produits);
  console.log(`\nProduits disponibles (${disponibles.length}) :`);
  disponibles.forEach(p => console.log(`- ${p.nom} (stock: ${p.stock})`));

  // Valeur totale du stock
  const total = calculerValeurStock(produits);
  console.log(`\nValeur totale du stock : ${total} MAD`);

  // Produit le moins cher (avec déstructuration)
  const moinsCher = getProduitMoinsCher(produits);
  if (moinsCher) {
    const { nom, prix, stock, categorie } = moinsCher;
    console.log(`\nProduit le moins cher : ${nom} (${categorie}) - ${prix} MAD (${stock} en stock)`);
  } else {
    console.log('\nAucun produit disponible.');
  }

  // Résumé
  console.log('\n--- Résumé ---');
  getResumeCatalogue(produits).forEach(ligne => console.log(ligne));

  // Validation
  console.log('\n--- Validation des données ---');
  produits.forEach(p => {
    console.log(`- ${p.nom} : ${estValide(p) ? 'Valide' : 'Invalide'}`);
  });
}

// 5. Cas de test
function tester() {
  console.log('\n=== Tests des cas particuliers ===\n');

  // Test 1 : Tous les stocks à zéro
  const stocksNuls = produits.map(p => ({ ...p, stock: 0 }));
  console.log('Test 1 (Tous stocks à 0) :');
  console.log(' Valeur stock :', calculerValeurStock(stocksNuls), 'MAD');
  console.log(' Produit min :', getProduitMoinsCher(stocksNuls) ? 'Trouvé' : 'Aucun produit disponible');

  // Test 2 : Catalogue vide
  console.log('\nTest 2 (Catalogue vide) :');
  console.log(' Valeur stock :', calculerValeurStock([]), 'MAD');
  console.log(' Produit min :', getProduitMoinsCher([]) ? 'Trouvé' : 'Aucun produit disponible');

  // Test 3 : Entrées invalides (null, undefined)
  console.log('\nTest 3 (Entrées non-tableaux) :');
  console.log(' calculerValeurStock(null)  :', calculerValeurStock(null));
  console.log(' getProduitsDisponibles()   :', getProduitsDisponibles().length, 'produits');
  console.log(' getProduitMoinsCher(null)  :', getProduitMoinsCher(null));

  // Test 4 : Validation de données invalides
  console.log('\nTest 4 (Validation) :');
  const cas = [
    null,
    undefined,
    {},
    [],
    { nom: 'X', prix: -10, stock: 5 },
    { nom: 'X', prix: 10, stock: -1 },
    { nom: 'X', prix: NaN, stock: 5 },
    { nom: 'X', prix: 10, stock: 2.5 },
    { nom: 'X', prix: Infinity, stock: 5 },
    { id: 1, nom: 'X', categorie: 'C', prix: 10, stock: 5 }
  ];
  cas.forEach((c, i) => {
    console.log(` Cas ${i + 1} : ${estValide(c)}`);
  });

  // Test 5 : Égalité de prix (stabilité du reduce)
  console.log('\nTest 5 (Prix égaux) :');
  const egaux = [
    { id: 1, nom: 'A', categorie: 'C', prix: 100, stock: 1 },
    { id: 2, nom: 'B', categorie: 'C', prix: 100, stock: 1 }
  ];
  console.log(' Min :', getProduitMoinsCher(egaux)?.nom, '(doit être A)');

  // Test 6 : Valeur du stock attendue
  console.log('\nTest 6 (Valeur stock attendue = 1960) :');
  console.log(' Valeur :', calculerValeurStock(produits), 'MAD');
}

// Lancement du programme
executer();
tester();
