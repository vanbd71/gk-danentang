// app/screens/EditProduct.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { FIRESTORE_DB } from "../../FireBaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const EditProduct = ({ route, navigation }) => {
  const { product } = route.params;
  const [productName, setProductName] = useState(product.productName);
  const [productPrice, setProductPrice] = useState(product.productPrice);
  const [productType, setProductType] = useState(product.productType);

  const updateProduct = async () => {
    try {
      const productRef = doc(FIRESTORE_DB, "product", product.id);
      await updateDoc(productRef, {
        productName,
        productPrice,
        productType,
      });
      // Alert.alert("Success", "Product updated successfully!");
      alert("Success", "Product updated successfully!");
      navigation.navigate("ListProduct");
    } catch (error) {
      console.error("Error updating product: ", error);
      alert("Error", "Failed to update product.");
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Update Product" onPress={updateProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default EditProduct;
