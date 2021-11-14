import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from "react-native";
export default function Photos(props) {

  useEffect(() => {
    const backAction = () => {
      return BackHandler.exitApp();
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [photo, setPhoto] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getListPhoto();
    return () => {};
  }, []);

  getListPhoto = () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/photos";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((resJson) => {
        setPhoto(resJson);
        setmasterData(resJson);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => setisLoading(false));
  };
  renderItem = ({item,index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Details", {
            name: item.title,
            img: item.url,
          })
        }
      >
        {index % 2 == 1 ? (
          <View style={styles.item1}>
            <Image
              style={styles.images}
              source={{ uri: item.url }}
              resizeMode="contain"
            />
            <View style={styles.wrapText}>
              <Text>{item.title}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.item2}>
            <Image
              style={styles.images}
              source={{ uri: item.url }}
              resizeMode="contain"
            />
            <View style={styles.wrapText}>
              <Text>{item.title}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase():''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1 ;
      });
      setPhoto(newData);
      setSearch(text);
    }else {
      setPhoto(masterData);
      setSearch(text);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Danh sách hình ảnh</Text>
      </View>
      <View style={styles.inputContainer}>
       <TextInput
       style={styles.textInput}
       placeholder="Tìm kiếm ..."
       value={search}
       underlineColorAndroid = "transparent"
       onChangeText={(text) => searchFilter(text)}
       />
       </View>

       <View style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator animating size="large" />
      ) : (
        <FlatList
          
          style={styles.listPhoto}
          data={photo}
          renderItem={renderItem}
          keyExtractor={(item) => `key=${item.id}`}
        />
      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    flex: 1,
    backgroundColor: "#E666A4",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer:{
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
  },
  textTitle: {
    fontSize: 20,
    color: "white",
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
    width: "80%",
    
    height: 50,
    fontSize: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 5,
  },
  listContainer: {
    flex: 5,
  },
  listPhoto: {
    flex: 1,
    width: "100%",
  },
  item1: {
    flexDirection: "row",

    padding: 10,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.25,
    backgroundColor: "#E7F4FD",
  },
  item2: {
    flexDirection: "row",

    padding: 10,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.25,
    backgroundColor: "#F7F7F7",
  },

  images: {
    height: 80,
    width: 80,
    borderRadius: 160,
  },
  wrapText: {
    flex: 1,
    marginTop: 16,
    marginLeft: 8,
  },
});
