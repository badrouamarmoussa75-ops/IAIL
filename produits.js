'use strict';

/* --------------------------------------------------------------------------
 * 1) Donnees de depart : catalogue initial
 * ------------------------------------------------------------------------ */

const produits = [
  { id: 1, nom: 'Clavier', categorie: 'Accessoires', prix: 120, stock: 5 },
  { id: 2, nom: 'Souris', categorie: 'Accessoires', prix: 80, stock: 8 },
  { id: 3, nom: 'Ecran', categorie: 'Informatique', prix: 900, stock: 0 },
  { id: 4, nom: 'Casque', categorie: 'Accessoires', prix: 240, stock: 3 },
];

const enMAD = (montant) => `${montant} MAD`;

/* --------------------------------------------------------------------------
 * 2) Fonctions de la logique metier
 * ------------------------------------------------------------------------ */

function afficherCatalogue(catalogue) {
  console.log('--- Catalogue complet ---');
  catalogue.forEach(({ nom, prix }) => {
    console.log(`- ${nom} : ${enMAD(prix)}`);
  });
}

function produitsDisponibles(catalogue) {
  return catalogue.filter(({ stock }) => stock > 0);
}

function valeurStock(catalogue) {
  return catalogue.reduce((total, { prix, stock }) => total + prix * stock, 0);
}

function produitMoinsCher(catalogue) {
  const disponibles = produitsDisponibles(catalogue);
  if (disponibles.length === 0) {
    return null;
  }
  return disponibles.reduce((moinsCher, produit) =>
    produit.prix < moinsCher.prix ? produit : moinsCher
  );
}

function resumeCatalogue(catalogue) {
  return catalogue.map(({ nom, prix, stock }) => `${nom} - ${prix} MAD - ${stock} unites`);
}

/* --------------------------------------------------------------------------
 * 3) Defi supplementaire
 * ------------------------------------------------------------------------ */

function estValide(produit) {
  if (produit === null || typeof produit !== 'object') {
    return false;
  }
  const { prix, stock } = produit;
  return Number.isFinite(prix) && Number.isFinite(stock) && prix >= 0 && stock >= 0;
}

/* --------------------------------------------------------------------------
 * 4) Programme principal
 * ------------------------------------------------------------------------ */

function programmePrincipal() {
  console.log('===== TP2 - Catalogue de produits =====\n');

  afficherCatalogue(produits);

  const disponibles = produitsDisponibles(produits);
  console.log('\n--- Produits disponibles ---');
  disponibles.forEach(({ nom, stock }) => {
    console.log(`- ${nom} (stock : ${stock})`);
  });
  console.log(`Nombre de produits disponibles : ${disponibles.length}`);

  let valeurTotale = valeurStock(produits);
  console.log(`\nValeur totale du stock : ${enMAD(valeurTotale)}`);

  const moinsCher = produitMoinsCher(produits);
  if (moinsCher !== null) {
    const { nom, prix, stock, categorie } = moinsCher;
    console.log(`\nProduit disponible le moins cher : ${nom} (${categorie}) - ${prix} MAD - ${stock} unites`);
  } else {
    console.log('\nAucun produit disponible');
  }

  console.log('\n--- Resume du catalogue ---');
  resumeCatalogue(produits).forEach((ligne) => console.log(ligne));

  console.log('\n--- Validation des donnees (estValide) ---');
  produits.forEach((produit) => {
    console.log(`- ${produit.nom} : ${estValide(produit) ? 'valide' : 'invalide'}`);
  });
}

/* --------------------------------------------------------------------------
 * 5) Cas de test imposes
 * ------------------------------------------------------------------------ */

function lancerCasDeTest() {
  console.log('\n\n===== Cas de test imposes =====\n');

  const disponibles = produitsDisponibles(produits);
  const ecranPresent = disponibles.some(({ nom }) => nom === 'Ecran');
  console.log('Test 1 - Ecran a stock nul :');
  console.log(`  Disponibles : ${disponibles.map(({ nom }) => nom).join(', ')}`);
  console.log(`  L'Ecran est absent de la liste : ${!ecranPresent} (attendu : true)`);

  const stocksNuls = produits.map((produit) => ({ ...produit, stock: 0 }));
  const minStocksNuls = produitMoinsCher(stocksNuls);
  console.log('\nTest 2 - Tous les stocks a zero :');
  console.log(`  Prix minimal : ${minStocksNuls === null ? 'Aucun produit disponible' : minStocksNuls.nom}`);
  console.log(`  Valeur totale : ${enMAD(valeurStock(stocksNuls))} (attendu : 0 MAD) - aucun plantage`);

  const catalogueVide = [];
  const minCatalogueVide = produitMoinsCher(catalogueVide);
  console.log('\nTest 3 - Catalogue vide :');
  console.log(`  Valeur totale : ${enMAD(valeurStock(catalogueVide))} (attendu : 0 MAD)`);
  console.log(`  Prix minimal : ${minCatalogueVide === null ? 'Aucun produit disponible' : minCatalogueVide.nom}`);

  console.log('\nTest 4 - Verification des donnees (estValide) :');
  console.log(`  { prix: 120, stock: 5 } -> ${estValide({ prix: 120, stock: 5 })} (attendu : true)`);
  console.log(`  { prix: -5, stock: 3 } -> ${estValide({ prix: -5, stock: 3 })} (attendu : false)`);
  console.log(`  { prix: '80', stock: 8 } -> ${estValide({ prix: '80', stock: 8 })} (attendu : false)`);
  console.log(`  { prix: Infinity, stock: 2 } -> ${estValide({ prix: Infinity, stock: 2 })} (attendu : false)`);

  const sourisPlusChere = produits.map((p) => (p.nom === 'Souris' ? { ...p, prix: p.prix + 10 } : p));
  console.log('\nTest 5 - Prix de la Souris augmente de 10 MAD (question 4) :');
  console.log(`  Nouvelle valeur du stock : ${enMAD(valeurStock(sourisPlusChere))} (attendu : 2040 MAD)`);
}

programmePrincipal();
lancerCasDeTest();