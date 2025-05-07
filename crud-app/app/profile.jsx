import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // or expo-image-picker
import {Picker} from "@react-native-picker/picker";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState(new Date());
  const [anniversary, setAnniversary] = useState(new Date());
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false);

  const genderOptions = [
    {id: "1", label: "Male", value: "male"},
    {id: "2", label: "Female", value: "female"},
    {id: "3", label: "Other", value: "other"},
  ];

  const pickImage = () => {
    ImagePicker.launchImageLibrary({mediaType: "photo"}, (response) => {
      if (!response.didCancel && response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profileImage ? {uri: profileImage} : ""}
          style={styles.profileImage}
        />
        <Text style={styles.editText}>Edit Photo</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <Text style={styles.label}>Gender</Text>
      <RadioGroup
        radioButtons={genderOptions}
        onPress={(radioButtonsArray) => {
          const selected = radioButtonsArray.find((rb) => rb.selected);
          setGender(selected.value);
        }}
        layout="row"
      />

      <Text style={styles.label}>Company</Text>
      <Picker
        selectedValue={company}
        onValueChange={(itemValue) => setCompany(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select a company" value="" />
        <Picker.Item label="Google" value="google" />
        <Picker.Item label="Apple" value="apple" />
        <Picker.Item label="Microsoft" value="microsoft" />
      </Picker>

      <TextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <Button
        title={dob.toDateString()}
        onPress={() => setShowDobPicker(true)}
      />
      {showDobPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDobPicker(Platform.OS === "ios");
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Anniversary</Text>
      <Button
        title={anniversary.toDateString()}
        onPress={() => setShowAnniversaryPicker(true)}
      />
      {showAnniversaryPicker && (
        <DateTimePicker
          value={anniversary}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowAnniversaryPicker(Platform.OS === "ios");
            if (selectedDate) setAnniversary(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 20},
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#ccc",
  },
  editText: {textAlign: "center", color: "blue", marginBottom: 20},
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  label: {marginTop: 10, fontWeight: "bold"},
});
