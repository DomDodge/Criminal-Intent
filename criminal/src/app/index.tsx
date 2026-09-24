import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Index() {
  const { themeColor } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      <ReportCrimeBar />
      <View style={styles.criminalContainer}>
        <CriminalActivity title={"John Wilkes Booth"} description={"Abe Lincoln is in big trouble! "}/>
        <CriminalActivity title={"Nuclear War"} description={"They dun destroyed it"}/>
        <CriminalActivity title={"Ebola Virus"} description={"Oh no! Lego city is in trouble! "}/>
      </View>
    </View>
  );
}

function ReportCrimeBar() {
  const router = useRouter();

  return (
    <View style={styles.topBar}>
      <Text style={styles.bigText}>Criminal Intent</Text>
      <View style={styles.row}>
        <Pressable 
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => router.push('/new_activity')}
        >

          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>

        <Pressable 
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => router.push('/settings')}
        >

          <Ionicons name="cog" size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  )
}

function CriminalActivity({title, description}: {title: string, description: string}) {
  return (
    <View style={styles.activity}>
      <Text style={styles.medText}>{title}</Text>
      <Text>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  activity: {
    display: 'flex'
  },
  medText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  topBar: {
    width: "100%",
    height: 70,
    backgroundColor: "purple",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    color: "white"
  },
  criminalContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
  },
  bigText: {
    color: "white",
    fontSize: 24
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
