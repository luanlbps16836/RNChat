import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "../configs/firebase.config";

const NewChatScreen = () => {
  const navigation = useNavigation();

  const user = useSelector((state) => state.user.user);
  const [addChat, setAddChat] = useState("");

  const createNewChat = async () => {
    let id = `${Date.now()}`;

    const _doc = {
      _id: id,
      user: user,
      chatName: addChat,
    };

    if (addChat != "") {
      setDoc(doc(firestoreDB, "chats", id), _doc)
        .then(() => {
          setAddChat("");
          navigation.replace("HomeScreen");
        })
        .catch((err) => alert("Error :", err.message));
    }
  };

  return (
    <View className="flex-1">
      <View className="w-full bg-primary px-4 py-6 flex-[0.25]">
        <View className="flex-row items-center justify-between w-full px-4 py-12">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={32} color={"#fbfbfb"} />
          </TouchableOpacity>
          <View className="flex-row items-center justify-center space-x-3">
            <Image
              source={{ uri: user?.profilePic }}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
        <View className="w-full px-4 py-4">
          <View className="w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 space-x-3">
            <Ionicons name="chatbubbles" size={24} color={"#777"} />
            <TextInput
              className="flex-1 text-lg text-primaryText -mt-3 h-12 w-full"
              placeholder="Create a chat"
              placeholderTextColor={"#999"}
              value={addChat}
              onChangeText={(text) => setAddChat(text)}
            />
            <TouchableOpacity onPress={createNewChat}>
              <FontAwesome name="send" size={24} color={"#777"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewChatScreen;