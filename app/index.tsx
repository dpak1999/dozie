import { useOAuth } from "@clerk/clerk-expo";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Index() {
  const { startOAuthFlow: appleOAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { top } = useSafeAreaInsets();

  const handleAppleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await appleOAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await googleOAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openLink = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.loginLogo}
          source={require("@/assets/images/icon-orange.png")}
        />
        <Text style={styles.logoText}>D O Z I E</Text>
      </View>
      <Image
        style={styles.bannerImage}
        source={require("@/assets/images/login.png")}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAppleOAuth}>
          <Ionicons name="logo-apple" size={24} />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoogleOAuth}>
          <Ionicons name="logo-google" size={24} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="mail" size={24} />
          <Text style={styles.buttonText}>Continue with email</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          By continuing, you agree to Dozie's{" "}
          <Text
            style={[styles.link]}
            onPress={() =>
              openLink(
                "https://www.placeholderpayments.com/legal/terms-of-service.html"
              )
            }
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            style={[styles.link]}
            onPress={() =>
              openLink("https://www.placeholder.vc/privacy-policy ")
            }
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  logoText: {
    fontSize: 28,
    color: Colors.primary,
    fontWeight: "bold",
    opacity: 0.9,
  },
  loginLogo: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },
  bannerImage: {
    height: 280,
    resizeMode: "contain",
    alignSelf: "center",
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 6,
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
  },
});
