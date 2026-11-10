import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';

// ====================== 1. تعريف النمط ======================
type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

type StatutType = 'Complet' | 'Presque complet' | 'Ouvert';

// ====================== 2. البيانات الإجبارية ======================
const evenements: Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25 },
  { id: 'E02', titre: 'Conférence IA', categorie: 'Conférence', capacite: 70, inscrits: 52 },
  { id: 'E03', titre: 'Sécurité mobile', categorie: 'Atelier', capacite: 20, inscrits: 17 },
  { id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits: 9 },
  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits: 49 },
  { id: 'E06', titre: 'Découverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24 },
];

// ====================== 3. المنطق البرمجي ======================
function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}

function statutEvenement(e: Evenement): StatutType {
  const r = placesRestantes(e);
  if (r === 0) return 'Complet';
  if (r >= 1 && r <= 3) return 'Presque complet';
  return 'Ouvert';
}

// ====================== 4. المكونات الفرعية ======================

// --- BadgeEtat ---
type BadgeProps = { statut: StatutType };
function BadgeEtat({ statut }: BadgeProps) {
  let bgColor = '#D6F5E7'; // Ouvert (vert clair)
  if (statut === 'Complet') bgColor = '#FFE5E5'; // Rouge clair
  if (statut === 'Presque complet') bgColor = '#FFEAD5'; // Orange clair

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text style={styles.texteBadge}>{statut}</Text>
    </View>
  );
}

// --- BlocStatistique ---
type StatProps = { libelle: string; valeur: number };
function BlocStatistique({ libelle, valeur }: StatProps) {
  return (
    <View style={styles.blocStat}>
      <Text style={styles.valeurStat}>{valeur}</Text>
      <Text style={styles.libelleStat}>{libelle}</Text>
    </View>
  );
}

// --- CarteEvenement ---
type CarteProps = { evenement: Evenement };
function CarteEvenement({ evenement }: CarteProps) {
  const r = placesRestantes(evenement);
  const statut = statutEvenement(evenement);

  return (
    <View style={styles.carte}>
      <View style={styles.enteteCarte}>
        <Text style={styles.titreCarte}>{evenement.titre}</Text>
        <BadgeEtat statut={statut} />
      </View>
      <Text style={styles.info}>Catégorie : {evenement.categorie}</Text>
      <Text style={styles.info}>{r} places libres</Text>
    </View>
  );
}

// ====================== 5. المكون الرئيسي ======================
export default function App() {
  // Mode d'affichage : 'tous' ou 'ateliers'
  const mode: 'tous' | 'ateliers' = 'tous';
  //const mode: 'tous' | 'ateliers' = 'ateliers';

  // --- الحسابات الإحصائية ---
  const nombreTotal = evenements.length;
  const nombreComplets = evenements.filter(e => placesRestantes(e) === 0).length;
  const nombreDisponibles = evenements.filter(e => placesRestantes(e) > 0).length;
  const totalPlacesLibres = evenements.reduce((acc, e) => acc + placesRestantes(e), 0);

  // --- الفلترة حسب الوضع ---
  const donneesAffichees =
    mode === 'tous'
      ? evenements
      : evenements.filter(e => e.categorie === 'Atelier' && placesRestantes(e) > 0);

  return (
    <SafeAreaView style={styles.root}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.titre}>CampusAgenda</Text>
        <Text style={styles.sousTitre}>Événements du campus</Text>
      </View>

      {/* Blocs statistiques */}
      <View style={styles.resume}>
        <BlocStatistique libelle="Total" valeur={nombreTotal} />
        <BlocStatistique libelle="Complets" valeur={nombreComplets} />
        <BlocStatistique libelle="Disponibles" valeur={nombreDisponibles} />
        <BlocStatistique libelle="Places libres" valeur={totalPlacesLibres} />
      </View>

      {/* Titre du mode actif */}
      <Text style={styles.titreSection}>
        {mode === 'tous' ? 'Tous les événements' : 'Ateliers disponibles'}
      </Text>

      {/* Liste des événements */}
      <FlatList
        data={donneesAffichees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CarteEvenement evenement={item} />}
        ListEmptyComponent={
          <Text style={styles.vide}>Aucun événement à afficher.</Text>
        }
        contentContainerStyle={styles.liste}
      />
    </SafeAreaView>
  );
}

// ====================== 6. الأنماط ======================
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F7FD',
  },
  header: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  titre: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#00235C',
  },
  sousTitre: {
    color: '#4C5360',
    marginTop: 4,
    fontSize: 14,
  },
  resume: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  blocStat: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#DCEBFF',
    marginHorizontal: 3,
    alignItems: 'center',
  },
  valeurStat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00235C',
  },
  libelleStat: {
    fontSize: 10,
    color: '#4C5360',
    marginTop: 2,
    textAlign: 'center',
  },
  titreSection: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00235C',
    paddingHorizontal: 18,
    marginBottom: 8,
    marginTop: 8,
  },
  liste: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  carte: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D8E6F8',
  },
  enteteCarte: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  titreCarte: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#00235C',
    flexShrink: 1,
  },
  info: {
    color: '#3D4A5C',
    marginTop: 2,
    fontSize: 13,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  texteBadge: {
    fontSize: 11,
    color: '#00235C',
    fontWeight: 'bold',
  },
  vide: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 15,
  },
});
