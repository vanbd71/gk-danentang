import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from "react-native";
import { FIRESTORE_DB } from "../../FireBaseConfig";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import ListProduct from "../screens/ListProduct";

// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const AddProduct = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const addProduct = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "product"), {
        productImage: image,
        productName: productName,
        productPrice: productPrice,
        productType: productType,
      });
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Success", "Product added successfully!");
      setImage("");
      setProductName("");
      setProductPrice("");
      setProductType("");
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Error", "Failed to add product.");
    }
  };
  // const addProduct = async () => {
  //   if (!image) {
  //     Alert.alert("Error", "Please select an image before adding the product.");
  //     return;
  //   }

  //   try {
  //     const storage = getStorage();
  //     const imageUri = image;

  //     const response = await fetch(imageUri);
  //     const blob = await response.blob();

  //     const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
  //     const imageRef = ref(storage, "images/" + filename);

  //     // Tải hình ảnh lên Firebase Storage
  //     await uploadBytes(imageRef, blob);

  //     // Lấy URL tải về của hình ảnh đã tải lên
  //     const downloadURL = await getDownloadURL(imageRef);

  //     // Lưu sản phẩm vào Firestore
  //     const docRef = await addDoc(collection(FIRESTORE_DB, "product"), {
  //       productImage: downloadURL,
  //       productName: productName,
  //       productPrice: productPrice,
  //       productType: productType,
  //     });

  //     console.log("Document written with ID: ", docRef.id);
  //     Alert.alert("Success", "Product added successfully!");
  //     setImage(null);
  //     setProductName("");
  //     setProductPrice("");
  //     setProductType("");
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //     Alert.alert("Error", "Failed to add product. " + e.message);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Type"
        value={productType}
        onChangeText={setProductType}
      />
      <TouchableOpacity style={styles.addButton} onPress={addProduct}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listButton}
        onPress={() => navigation.navigate("ListProduct")}
      >
        <Text style={styles.listButtonText}>List Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  addButton: {
    padding: 15,
    backgroundColor: "#FFD700",
    borderRadius: 5,
    alignItems: "center",
  },
  listButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  listButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddProduct;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   Button,
// } from "react-native";
// import { FIRESTORE_DB } from "../../FireBaseConfig";
// import { collection, addDoc } from "firebase/firestore";
// import * as ImagePicker from "expo-image-picker";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const Product = ({ navigation }) => {
//   const [image, setImage] = useState(null);
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productType, setProductType] = useState("");

//   // Hàm chọn ảnh
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   // Hàm tải ảnh lên Firebase Storage và lưu URL vào Firestore
//   const addProduct = async () => {
//     if (!image) {
//       Alert.alert("Error", "Please select an image before adding the product.");
//       return;
//     }

//     try {
//       const storage = getStorage();
//       const imageUri = image;

//       // Chuyển ảnh thành blob
//       const response = await fetch(imageUri);
//       const blob = await response.blob();

//       const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
//       const imageRef = ref(storage, `images/${filename}`);

//       // Tải ảnh lên Firebase Storage
//       await uploadBytes(imageRef, blob);

//       // Lấy URL của ảnh sau khi upload
//       const downloadURL = await getDownloadURL(imageRef);

//       // Lưu thông tin sản phẩm vào Firestore
//       const docRef = await addDoc(collection(FIRESTORE_DB, "product"), {
//         productImage: downloadURL,
//         productName: productName,
//         productPrice: productPrice,
//         productType: productType,
//       });

//       console.log("Document written with ID: ", docRef.id);
//       Alert.alert("Success", "Product added successfully!");
//       setImage(null);
//       setProductName("");
//       setProductPrice("");
//       setProductType("");
//     } catch (e) {
//       console.error("Error adding document: ", e);
//       Alert.alert("Error", "Failed to add product. " + e.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={styles.image} />}
//       <TextInput
//         style={styles.input}
//         placeholder="Product Name"
//         value={productName}
//         onChangeText={setProductName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Product Price"
//         value={productPrice}
//         onChangeText={setProductPrice}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Product Type"
//         value={productType}
//         onChangeText={setProductType}
//       />
//       <TouchableOpacity style={styles.addButton} onPress={addProduct}>
//         <Text style={styles.addButtonText}>Add Product</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.listButton}
//         onPress={() => navigation.navigate("ListProduct")}
//       >
//         <Text style={styles.listButtonText}>List Product</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 30,
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginBottom: 10,
//   },
//   addButton: {
//     padding: 15,
//     backgroundColor: "#FFD700",
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   listButton: {
//     marginTop: 10,
//     padding: 15,
//     backgroundColor: "#007bff",
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   addButtonText: {
//     color: "#000",
//     fontWeight: "bold",
//   },
//   listButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default Product;
