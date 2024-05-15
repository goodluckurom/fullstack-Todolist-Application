import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");
  //       if (token) {
  //         router.replace("/(tabs)/home");
  //       } else {
  //         router.replace("/(authenticate)/login");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    const url = "http://localhost:3000/login";
    axios
      .post(url, user)
      .then((response) => {
        const token = response.data.token;
        console.log("token:>>", token);
        Alert.alert("Login successfull");

        //stores the token in the async storage
        AsyncStorage.setItem("authToken", token);
        router.replace("/(tabs)/home");
      })
      .catch((error) => {
        Alert.alert(error);
        console.log("Error logging in", error);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#0066b2" }}>
          TODO-LIST TRACKER
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            Login to your account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#e0e0e0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 17 : 17,
              }}
              placeholder="Enter your email address..."
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#e0e0e0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="gray"
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 17 : 17,
              }}
              placeholder="Enter your password..."
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>
          <View style={{ marginTop: 60 }} />
          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#6699CC",
              padding: 15,
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
              Don't have an account?{" "}
              <Text style={{ color: "#007FFF" }}> Sign up</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
