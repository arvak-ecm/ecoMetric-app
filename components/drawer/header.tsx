import { View, Image, StyleSheet, Text } from "react-native";

export default function HeaderDrawer() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.jpg")} />
      <Text style={styles.title}>EcoMetric</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    backgroundColor: "#021520",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
  },
  logo: {
    height: 130,
    width: 130,
    borderRadius: 999,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 8,
  },
});
