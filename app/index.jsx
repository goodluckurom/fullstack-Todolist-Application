import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  // const router = useRouter();
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");
  //       if (!token) {
  //         router.replace("/(authenticate)/login");
  //       } else {
  //         router.replace("/(tabs)/home");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);
  // return <Redirect href="/(authenticate)/login" />;
  return <Redirect href="/(tabs)/home" />;
};

export default index;

const styles = StyleSheet.create({});
