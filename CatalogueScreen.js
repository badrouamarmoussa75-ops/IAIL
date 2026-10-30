import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';


const produits = [
  { id: 1, nom: 'Clavier', categorie: 'Accessoires', prix: 120, stock: 5 },
  { id: 2, nom: 'Souris', categorie: 'Accessoires', prix: 80, stock: 8 },
  { id: 3, nom: 'Écran', categorie: 'Informatique', prix: 900, stock: 0 },
  { id: 4, nom: 'Casque', categorie: 'Accessoires', prix: 240, stock: 3 },
];


const valeurTotale = produits.reduce((total, { prix, stock }) => total + prix * stock, 0);
const disponibles = produits.filter((produit) => produit.stock > 0);

export default function CatalogueScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        
        <Text style={styles.titre}>Catalogue des produits</Text>
        <Text style={styles.sousTitre}>Valeur totale : {valeurTotale} MAD</Text>

        
        {produits.map((produit) => {
          
          const estDisponible = produit.stock > 0;

          return (
            <View key={produit.id} style={styles.card}>
              
              <View style={styles.cardBorder} />
              
              <View style={styles.cardContent}>
                <View style={styles.leftSection}>
                  <Text style={styles.nomProduit}>{produit.nom}</Text>
                  <Text style={[
                    styles.statut, 
                    estDisponible ? styles.statutDispo : styles.statutIndispo
                  ]}>
                    {estDisponible ? 'En stock' : 'Rupture'}
                  </Text>
                </View>
                
                <View style={styles.rightSection}>
                  <Text style={styles.prix}>{produit.prix} MAD</Text>
                  <Text style={styles.stock}>({produit.stock} unités)</Text>
                </View>
              </View>
            </View>
          );
        })}

        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f9', 
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  titre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0b2e59', 
    marginBottom: 8,
    marginTop: 20,
  },
  sousTitre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0047ab', 
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardBorder: {
    width: 8,
    backgroundColor: '#0b2e59',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
  },
  nomProduit: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0b2e59',
    marginBottom: 6,
  },
  statut: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statutDispo: {
    color: '#1e8e3e', 
  },
  statutIndispo: {
    color: '#d93025', 
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  prix: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  stock: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});
