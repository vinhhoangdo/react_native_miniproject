import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-navigation";

export default function Details(props) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <SafeAreaView>
        <Text style={styles.textTitle}>
          {props.navigation.state.params.name}
        </Text>
        </SafeAreaView>
      </View>

      <View style={styles.imgContainer}>
      <Image
              style={styles.images}
              source={{ uri: props.navigation.state.params.img }}
              resizeMode="cover"
            />
      </View>
      <View style={styles.btnContainer}>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => props.navigation.navigate("Photos")}
      >
        <Text style={styles.startText}>Trở lại</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

  },
  title: {
    flex: 1.2,
    backgroundColor: "#E666A4",
    justifyContent: "center",
    alignItems: "center",
  },
  
  textTitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  imgContainer: {
    flex: 7,
    backgroundColor: "red",

  },
  images: {
      height: "100%",
      width: "100%"
  },
  btnContainer: {
    flex: 0.8,
    backgroundColor: "#28ADD7B2",
  },
  startBtn: {
    backgroundColor: "#28ADD7B2",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  startText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
