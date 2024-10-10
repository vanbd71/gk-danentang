import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FireBaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

const ListProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const renderListProduct = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "product"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, "product", id));
      renderListProduct();
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  useEffect(() => {
    renderListProduct();
  }, []);

  // const renderProductItem = ({ item }) => (
  //   <View style={styles.productItem}>
  //     <View style={styles.productDetails}>
  //       <View>
  //         <Image
  //           source={{
  //             uri: item.productImage,
  //           }}
  //           style={styles.productImage}
  //         />
  //       </View>
  //       <View>
  //         <Text style={styles.productName}>{item.productName}</Text>
  //         <Text style={styles.productType}>{item.productType}</Text>
  //         <Text style={styles.productPrice}>{item.productPrice}</Text>
  //       </View>
  //     </View>
  //     <View style={styles.iconsContainer}>
  //       <TouchableOpacity onPress={() => console.log("Edit product", item.id)}>
  //         <MaterialIcons name="edit" size={24} color="black" />
  //       </TouchableOpacity>
  //       <TouchableOpacity onPress={() => deleteProduct(item.id)}>
  //         <MaterialIcons name="delete" size={24} color="red" />
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.productDetails}>
        <View>
          <Image
            source={{
              uri: item.productImage,
            }}
            style={styles.productImage}
          />
        </View>
        <View>
          <Text style={styles.productName}>{item.productName}</Text>
          <Text style={styles.productType}>{item.productType}</Text>
          <Text style={styles.productPrice}>{item.productPrice}</Text>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProduct", { product: item })}
        >
          <MaterialIcons name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteProduct(item.id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
        />
      </View>
      <TouchableOpacity
        style={styles.addProductButton}
        onPress={() => navigation.navigate("AddProduct")}
      >
        <Text style={styles.addProductText}>Add Product</Text>
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
  productImage: {
    width: 60,
    height: 60,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  productDetails: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productType: {
    fontSize: 14,
    color: "#555",
  },
  productPrice: {
    fontSize: 16,
    color: "#E50914",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addProductButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addProductText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ListProduct;
