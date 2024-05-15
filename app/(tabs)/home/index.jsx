import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import axios from "axios";
import moment from "moment";
import { useRouter } from "expo-router";

const index = () => {
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [todo, setTodo] = useState("");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const [category, setCategory] = useState("All");
  const today = moment().format("MMM Do YYYY");
  const router = useRouter();
  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go Excercising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    {
      id: "4",
      todo: "Go Shopping",
    },
    {
      id: "5",
      todo: "finish assignments",
    },
  ];

  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };
      const url = "http://localhost:3000/todos/66448c1c2a2c48fb4985ed41";
      await axios
        .post(url, todoData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error", error);
        });

      setTodo("");
      setCategory("All");
      setModalOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUserTodos();
  }, [marked, modalOpen]);

  const getUserTodos = async () => {
    try {
      const url = "http://localhost:3000/users/66448c1c2a2c48fb4985ed41/todos";
      const response = await axios.get(url);
      setTodos(response.data.todos);

      //
      const fetchedTodos = response.data.todos || [];
      const pending_Todos = fetchedTodos.filter(
        (todo) => todo.status === "pending"
      );
      //
      const completed_Todos = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );
      setPendingTodos(pending_Todos);
      setCompletedTodos(completed_Todos);
    } catch (error) {
      console.log("error fetching todos", error);
    }
  };
  //
  const markTodoAsCompleted = async (todoId) => {
    setMarked(true);
    try {
      const url = `http://localhost:3000/todos/${todoId}/complete`;

      const response = await axios.patch(url);
      console.log(response.data);
    } catch (error) {
      console.group("Error marking todo", error);
    }
  };
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Personal</Text>
        </Pressable>
        <Pressable>
          <AntDesign
            name="pluscircle"
            size={30}
            color="#007fff"
            onPress={() => setModalOpen(!modalOpen)}
          />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          {todos.length > 0 ? (
            <View>
              {pendingTodos.length > 0 && (
                <Text style={{ fontWeight: "600" }}>Tasks to do! {today}</Text>
              )}
              {pendingTodos?.map((todo, index) => (
                <Pressable
                  onPress={() => {
                    router.push({
                      pathname: "/home/info",
                      params: {
                        id: todo._id,
                        title: todo?.title,
                        category: todo?.category,
                        createdAt: todo?.createdAt,
                        dueDate: todo?.dueDate,
                      },
                    });
                  }}
                  key={index}
                  style={{
                    backgroundColor: "#e0e0e0",
                    padding: 15,
                    borderRadius: 7,
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Entypo
                      onPress={() => markTodoAsCompleted(todo._id)}
                      name="circle"
                      size={18}
                      color="black"
                    />
                    <Text style={{ flex: 1, fontSize: 19 }}>{todo.title}</Text>
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}

              {/**completed todo sections */}
              {completedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Completed Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>

                  {completedTodos?.map((todo, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
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
                          {todo?.title}
                        </Text>
                        <Feather name="flag" size={20} color="gray" />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No tasks for today!, Add a task
              </Text>
              <Pressable
                style={{ marginTop: 15 }}
                onPress={() => setModalOpen(!modalOpen)}
              >
                <AntDesign name="pluscircle" size={30} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onHardwareBackPress={() => setModalOpen(!modalOpen)}
        onBackdropPress={() => setModalOpen(!modalOpen)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a Todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={modalOpen}
        onTouchOutside={() => setModalOpen(!modalOpen)}
      >
        <ModalContent
          style={{
            width: "100%",
            height: 280,
          }}
        >
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input your new todo here..."
              style={{
                padding: 10,
                borderColor: "#e0e0e0",
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <Ionicons name="send" size={24} color="#007FFF" onPress={addTodo} />
          </View>
          <Text> Choose a Category</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <Pressable
              style={{
                borderColor: "#e0e0e0",
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderRadius: 25,
              }}
              onPress={() => setCategory("Work")}
            >
              <Text>Work</Text>
            </Pressable>
            <Pressable
              style={{
                borderColor: "#e0e0e0",
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderRadius: 25,
              }}
              onPress={() => setCategory("Personal")}
            >
              <Text>Personal</Text>
            </Pressable>
            <Pressable
              style={{
                borderColor: "#e0e0e0",
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderRadius: 25,
              }}
              onPress={() => setCategory("WhishList")}
            >
              <Text>WhishList</Text>
            </Pressable>
          </View>
          <Text>Some Suggetions</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {suggestions?.map((todoItem, index) => (
              <Pressable
                onPress={() => setTodo(todoItem.todo)}
                style={{
                  backgroundColor: "#f0f8ff",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 25,
                }}
              >
                <Text style={{ textAlign: "center" }}>{todoItem?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
