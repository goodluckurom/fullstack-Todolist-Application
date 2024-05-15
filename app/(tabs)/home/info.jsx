import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons, Entypo } from "@expo/vector-icons";

import { useLocalSearchParams, useRouter } from "expo-router";

const info = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => {
            router.replace("/home");
          }}
        />
        <Text style={{ fontSize: 17, fontWeight: "600" }}>{params?.title}</Text>
        {/* <Ionicons name="md-arrow-back" size={24} color="black" /> */}
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          Category - {params?.category}
        </Text>
      </View>

      <View style={{ marginTop: 50 }} />
      <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <AntDesign name="plus" size={24} color="#7CB9E8" />
        <Text style={{ color: "#7CB9E8", fontSize: 16, fontWeight: "500" }}>
          Add a subtask
        </Text>
      </Pressable>

      <View
        style={{
          marginTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text>Due Date</Text>
          </View>
          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>{params?.dueDate}</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Ionicons name="time-sharp" size={24} color="gray" />
            <Text>Time and Reminder</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Feather name="repeat" size={24} color="black" />
            <Text>Repeat Task</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <SimpleLineIcons name="note" size={24} color="black" />
            <Text>Notes</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>Not Added</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default info;

const styles = StyleSheet.create({});
