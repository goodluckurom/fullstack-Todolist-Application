import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Calendar } from "react-native-calendars";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const index = () => {
  const today = moment().format("YYYY-MM-DD");
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);

  const fetchCompleteTodos = async () => {
    try {
      const url = `http://localhost:3000/todos/completed/${selectedDate}`;
      const response = await axios.get(url);

      const completedTodos = response.data.completedTodos;
      setTodos(completedTodos);
    } catch (error) {
      console.log("Error fetcing completed todos", error);
    }
  };
  useEffect(() => {
    fetchCompleteTodos();
  }, [selectedDate]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7CB9E8" },
        }}
      />

      <View
        style={{
          marginTop: 20,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text>Completed Tasks For {selectedDate}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </View>
      {todos?.map((item, index) => (
        <Pressable
          style={{
            backgroundColor: "#E0E0E0",
            padding: 10,
            borderRadius: 7,
            marginVertical: 10,
            marginHorizontal: 10,
          }}
          key={index}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="circle" size={18} color="gray" />
            <Text
              style={{
                flex: 1,
                textDecorationLine: "line-through",
                color: "gray",
              }}
            >
              {item?.title}
            </Text>
            <Feather name="flag" size={20} color="gray" />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
