/* ==========================================================================
 * TP2 – Défi supplémentaire : écran React Native (prêt pour Expo)
 * Module     : Développement mobile avec React Native – IAIL S5
 * Encadrant  : Pr. OMARI Kamal – FSA Ouarzazate
 * Fichier    : CatalogueScreen.js
 * ==========================================================================
 * Utilisation dans un projet Expo existant :
 *   1. Copier ce fichier dans le dossier du projet (à côté de App.js).
 *   2. Dans App.js, écrire :
 *
 *        import CatalogueScreen from './CatalogueScreen';
 *
 *        export default function App() {
 *          return <CatalogueScreen />;
 *        }
 *
 *   3. Lancer : npx expo start
 *
 * Aucun outil de navigation n'est utilisé : seulement View et Text,
 * comme exigé par l'énoncé du TP.
 * ========================================================================== */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/* Données du catalogue (identiques à produits.js) — jamais modifiées. */
const produits = [
  { id: 1, nom: 'Clavier', categorie: 'Accessoires', prix: 120, stock: 5 },
  { id: 2, nom: 'Souris', categorie: 'Accessoires', prix: 80, stock: 8 },
  { id: 3, nom: 'Écran', categorie: 'Informatique', prix: 900, stock: 0 },
  { id: 4, nom: 'Casque', categorie: 'Accessoires', prix: 240, stock: 3 },
];

/* Logique métier réutilisée : filter() + reduce() (immutabilité respectée). */
const disponibles = produits.filter((produit) => produit.stock > 0);
const valeurTotale = produits.reduce((total, { prix, stock }) => total + prix * stock, 0);

/**
 * Écran simple affichant :
 *   – le titre du catalogue ;
 *   – le nombre de produits disponibles ;
 *   – la valeur totale du stock.
 * Ce composant sera réutilisé plus tard dans le projet Expo du module.
 */
export default function CatalogueScreen() {
  return (
    <View style={styles.conteneur}>
      <Text style={styles.titre}>Catalogue produits – CampusStock</Text>
      <Text style={styles.ligne}>Produits disponibles : {disponibles.length}</Text>
      <Text style={styles.ligne}>Valeur totale du stock : {valeurTotale} MAD</Text>
    </View>
  );
}

/* Styles de l'écran. */
const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  titre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f3640',
    marginBottom: 20,
    textAlign: 'center',
  },
  ligne: {
    fontSize: 16,
    color: '#353b48',
    marginVertical: 4,
  },
});
