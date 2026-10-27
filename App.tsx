import { View, Text, StyleSheet, ScrollView } from 'react-native';

const etudiants = [
  { id: 1, nom: 'Amine',   note: 16 },
  { id: 2, nom: 'Youssef', note: 8  },
  { id: 3, nom: 'Salma',   note: 14 },
  { id: 4, nom: 'Omar',    note: 12 }
];

const total = etudiants.reduce((s, e) => s + e.note, 0);
const moyenne = total / etudiants.length;

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.ecran}>
      {/* العنوان الرئيسي */}
      <Text style={styles.titre}>Notes des etudiants</Text>
      
      {/* المعدل العام */}
      <Text style={styles.moyenne}>Moyenne : {moyenne}/20</Text>
      
      {/* عرض الطلبة */}
      {etudiants.map((e) => {
        // تحديد النتيجة بناءً على النقطة
        const decision = e.note >= 10 ? 'Admis' : 'Ajourné';
        const couleurNote = e.note >= 10 ? '#008000' : '#CC0000'; // أخضر أو أحمر
        
        return (
          <View key={e.id} style={styles.carteEtudiant}>
            {/* اسم الطالب */}
            <Text style={styles.nomEtudiant}>{e.nom}</Text>
            
            {/* النقطة والحالة تحت الاسم */}
            <View style={styles.ligneInfo}>
              <Text style={styles.texteNote}>Note : {e.note}/20</Text>
              <Text style={[styles.texteDecision, { color: couleurNote }]}>
                {decision}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ecran: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 26, 
    backgroundColor: '#F2F7FD' 
  },
  titre: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#00235C', 
    marginBottom: 10,
    textAlign: 'center'
  },
  moyenne: { 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 25, 
    color: '#003796',
    textAlign: 'center'
  },
  carteEtudiant: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#003796', // خط أزرق جانبي
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // ظل لأندرويد
  },
  nomEtudiant: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00235C',
    marginBottom: 5,
  },
  ligneInfo: {
    flexDirection: 'row', // وضع النقطة والحالة بجانب بعضهما
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  texteNote: {
    fontSize: 16,
    color: '#333333',
  },
  texteDecision: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
