import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/user-context";
import { onboardingStyles } from "../styles/onboarding";

const YourNameScreen = () => {
  const { name: savedName, setName } = useUser();
  const [name, setNameInput] = useState(savedName || "");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/rest-day" as any);
    }
  };

  const handleNext = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    // Simpan nama ke context secara sinkron untuk page selanjutnya
    setName(trimmedName);

    // Navigasi ke page berikutnya (juga menyertakan route params sebagai opsi sinkron ganda)
    router.push({
      pathname: "/" as any,
      params: { name: trimmedName },
    });
  };

  const isButtonEnabled = name.trim().length > 0;

  return (
    <ImageBackground
      source={require("../../assets/images/bg-night.jpg")}
      resizeMode="cover"
      style={onboardingStyles.background}
    >
      <SafeAreaView style={onboardingStyles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.contentContainer}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <View style={styles.arrowContainer}>
                <View style={styles.arrowShaft} />
                <View style={styles.arrowChevron} />
              </View>
            </TouchableOpacity>

            {/* Main Section */}
            <View style={styles.mainSection}>
              {/* Mascot + Question Row */}
              <View style={styles.promptRow}>
                <Image
                  source={require("../../assets/images/owl-scholar.png")}
                  style={styles.owlImage}
                  resizeMode="contain"
                />
                <Text style={styles.promptText}>
                  Apa panggilan untuk Anda?
                </Text>
              </View>

              {/* Input Pill */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setNameInput}
                  placeholder="Masukkan nama"
                  placeholderTextColor="rgba(0, 0, 0, 0.35)"
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={isButtonEnabled ? handleNext : undefined}
                />
              </View>
            </View>

            {/* Footer Button */}
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={[
                  onboardingStyles.nextButton,
                  styles.nextButton,
                  { opacity: isButtonEnabled ? 1 : 0.5 },
                ]}
                onPress={handleNext}
                disabled={!isButtonEnabled}
                activeOpacity={0.8}
              >
                <Text style={onboardingStyles.nextButtonText}>
                  Selanjutnya
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  arrowContainer: {
    width: 24,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowShaft: {
    position: "absolute",
    width: 20,
    height: 3.5,
    backgroundColor: "#ffffff",
    borderRadius: 3,
    right: 0,
  },
  arrowChevron: {
    position: "absolute",
    left: 0,
    width: 12,
    height: 12,
    borderLeftWidth: 3.5,
    borderBottomWidth: 3.5,
    borderColor: "#ffffff",
    transform: [{ rotate: "45deg" }],
  },
  mainSection: {
    width: "100%",
    paddingTop: 40,
    alignItems: "center",
  },
  promptRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 32,
    gap: 14,
  },
  owlImage: {
    width: 72,
    height: 72,
  },
  promptText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    flexShrink: 1,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    height: 52,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 18,
    backgroundColor: "#95A4FC",
  },
});

export default YourNameScreen;

