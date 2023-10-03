import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios at the top of your file
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../actions/auth";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Card, Button as PaperButton } from "react-native-paper";
import bgImg from "../assets/chat-bg.png";
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    let user = {
      username: email,
      password: password,
    };
    dispatch(login(user))
      .then((response) => {
        if (response.status == "success") {
          navigation.replace("ClubList");
        }
      })
      .catch((error) => {
        //navigation.replace("Login");
      });
  };

  const handleLogin1 = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://staging3.booostr.co/wp-json/chat-api/v1/login",
        {
          username: email, // Replace with the actual email value
          password: password, // Replace with the actual password value
        }
      );

      if (response && response.data) {
        const { data } = response.data;

        if (data) {
          // Token is defined, proceed with storing it and navigating to the next screen
          await AsyncStorage.setItem("user", JSON.stringify(data));
          navigation.navigate("ClubList");
        } else {
          // Token is not provided in the API response
          console.error("API Error: Token is not provided in the response");
          // Handle this case by displaying an error message to the user
          // For example, you can set a message in a variable to show an error alert.
          alert("Login failed. Please check your credentials.");
        }
      } else {
        // Handle the case where the response or response.data is undefined
        console.error("API Error: Response or response.data is undefined");
        // Handle login failure here, show an error message to the user
        alert("Login failed. Please try again later.");
      }
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data.message : error.message
      );
      // Handle login failure here, show an error message to the user
      alert("Login failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const imgProps = Image.resolveAssetSource(bgImg).uri;
  const image = { uri: imgProps };

  return (
    <View style={[styles.top_main]} contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground style={styles.img_top} source={image} resizeMode="cover">
        <View style={styles.container}>
          <View style={styles.logoBox}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Team Chat</Text>
          </View>
          <View style={styles.card}>
            <Text style={[styles.smallText, styles.forText]}>
              Login with your Booostr user account to begin chatting with your
              team in real-time!
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            {isLoading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="medium" color="#00c0ff" />
              </View>
            ) : (
              <PaperButton
                mode="contained"
                style={styles.button}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>Login</Text>
              </PaperButton>
            )}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordMain}
            >
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.BottomText}>
            <Text style={[styles.smallText, styles.ForWidth]}>
              To access Booostr Team Chat for your organization, you need to
              have a Booostr user account. If you do not have a Booostr user
              account but need to connect with a club or nonprofit using Booostr
              Team Chat, you can
              <Text
                style={styles.BlueText}
                onPress={() => Linking.openURL("https://example.com")}
              >
                create a free user account on Booostr.co.
              </Text>
              Desktop chat is also available
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img_top: {
    height: "100%",
  },
  logo: {
    width: 130,
    height: 40,
  },
  smallText: {
    color: "#a9a9a9",
    textAlign: "center",
    marginVertical: 20,
  },
  BottomText: {
    width: "80%",
    alignItems: "center",
  },
  BlueText: {
    color: "#00b0ef",
    textDecorationLine: "underline",
  },
  card: {
    width: "80%",
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  logoBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00b0ef",
    width: "80%",
    padding: 20,
    textAlign: "center",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    textTransform: "capitalize",
    color: "#fff",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#00c0ff",
    borderRadius: 6,
    fontSize: 15,
    backgroundColor: "#e7effc",
    lineHeight: 19,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#515151",
    maxWidth: "100%",
    padding: 13,
  },
  button: {
    width: "100%",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#00c0ff",
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#00c0ff",
    textTransform: "uppercase",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  forgotPasswordMain: {
    color: "#a9a9a9",
    fontSize: 20,
    marginVertical: 15,
  },
  forgotPassword: {
    color: "#a9a9a9",
    fontSize: 18,
  },
  top_main: {
    flex: 1,
  },
  forText: {
    fontSize: 15,
  },
  loader: {
    marginTop: 10,
  },
});

export default LoginScreen;
