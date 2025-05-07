import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {data} from "@/data/todo";
import {useState} from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {Inter_500Medium, useFonts} from "@expo-google-fonts/inter";

export default function Index() {
  const [list, setList] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");
  const [loaded, error] = useFonts({Inter_500Medium});

  if (!loaded && error) {
    return null;
  }

  const addTodo = () => {
    const newId = list.length > 0 ? list[0].id + 1 : 1;
    setList((prev) => [{id: newId, title: text, completed: false}, ...prev]);
    setText("");
  };

  const toggleTodo = (id) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? {...item, completed: !item.completed} : item
      )
    );
  };

  const removeTodo = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.todoItem}>
        <Text
          style={[styles.todoText, item.completed && styles.completedText]}
          onPress={() => toggleTodo(item.id)}
        >
          {item.title}
        </Text>
        <Pressable onPress={() => removeTodo(item.id)}>
          <MaterialCommunityIcons
            name="delete-circle"
            size={36}
            color="red"
            selectable={undefined}
          />
        </Pressable>
        <Link style={{marginHorizontal: "auto"}} href="/profile" asChild>
          <Pressable>
            <Text>Profile</Text>
          </Pressable>
        </Link>
        <Pressable onPress={() => removeTodo(item.id)}></Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topCtn}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Add todo"
          placeholderTextColor={"gray"}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </Pressable>
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{flexGrow: 1}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topCtn: {
    flexDirection: "row",
    gap: 20,
    padding: 15,
    pointerEvents: "auto",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    color: "#fff",
    padding: 10,
    width: 100,
    flex: 3,
    fontSize: 18,
    fontFamily: Inter_500Medium,
  },
  addButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    color: "#000",
  },
  text: {
    fontSize: 16,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    padding: 10,
    borderBottomWidth: 1,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    color: "#fff",
    fontFamily: Inter_500Medium,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
