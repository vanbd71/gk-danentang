import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FIREBASE_AUTH } from "../../FireBaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("window");

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      alert("Dang nhap thanh cong!");
      console.log("Dang nhap thanh cong");
      navigation.replace("ListProduct");
      // navigation.navigate("ListProduct");
    } catch (err) {
      console.log("sign in fail" + err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>
        SHOP<Text style={{ color: "#FFD700" }}> DUCVAN</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.btnSignIn} onPress={signIn}>
          <Text
            style={styles.btnTextSignIn}
            // onPress={() => navigation.navigate("ListProduct")}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpText}>
          I don't have an account,{" "}
          <Text style={styles.signUpLink}>sign up here</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 398,
    height: 186,
    marginLeft: 16,
    marginTop: height / 4,
  },
  input: {
    width: "90%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  btnSignIn: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: "#FFD700",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  btnSignUp: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: "#FFD700",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 16,
  },
  btnTextSignIn: {
    color: "#000",
    fontWeight: "bold",
  },
  btnTextSignUp: {
    color: "#000",
    fontWeight: "bold",
  },
  logoText: {
    textAlign: "center",
    marginLeft: -35,
    marginBottom: 50,
    paddingHorizontal: 10,
    color: "#E50914",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
    fontFamily: "sans-serif",
  },
  signUpText: {
    textAlign: "center",
    marginTop: 20,
    color: "#000",
  },
  signUpLink: {
    color: "#FFD700",
    fontWeight: "bold",
  },
});

export default SignIn;
