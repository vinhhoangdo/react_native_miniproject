import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    loading: false
  };

  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }

  onLogin() {
    const { username, password } = this.state;
    if (username && password){
      const data = {
        "email": username,
        "password": password
      };
      axios.post("https://reqres.in/api/login", data).then(
        (res) => {

          this.setState({
            loading: false
          });
          
          AsyncStorage.setItem("token", res.data.token)
          .then(
            res =>{
              this.props.navigation.navigate("Photos");
            }
          );
          
        },
        (error) => {
          alert("Username or password is wrong");
        }
      );
    }else{
      alert("Enter the username & password")
    }
    
  }

  render() {
    const { username, password, loading } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(value) => this.onChangeHandle("username", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(value) => this.onChangeHandle("password", value)}

          secureTextEntry
        />

        <TouchableOpacity
        activeOpacity={0.8}
          style={{...styles.startBtn,backgroundColor: loading ? "#ddd":"#28ADD7B2"}}
          onPress={() => this.onLogin()}
          disabled={loading}
        >
          <Text style={styles.startText}>{loading? "Đăng nhập..." :"Đăng nhập"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E666A4",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    width: "80%",
    height: 50,
    padding: 10,
    fontSize: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 6,
  },
  startBtn: {
    backgroundColor: "#28ADD7B2",
    width: "100%",
    padding: 15,
    alignItems: "center",
    marginTop: 50,
    position: "absolute",
    bottom: 0,
  },
  startText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
