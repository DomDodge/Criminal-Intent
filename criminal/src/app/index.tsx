import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text>Criminal Intent</Text>
        <Text>+</Text>
      </View>
      <View style={styles.criminalContainer}>
        <CriminalActivity title={"blown bathroom"} description={"They dun destroyed it"}/>
      </View>
    </View>
  );
}

function CriminalActivity({title, description}: {title: string, description: string}) {
  return (
    <View>
      <Text>{title}</Text>
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
  topBar: {
    width: "100%",
    height: 80,
    backgroundColor: "purple",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white"
  },
  criminalContainer: {

  }
});
