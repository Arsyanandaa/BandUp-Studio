import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboardingStyles } from "../styles/onboarding";

// Type untuk satu karakter starter
type Starter = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

// Array of objects, ditaruh di luar komponen supaya tidak dibuat ulang tiap render
const STARTERS: Starter[] = [
  {
    id: "owl",
    title: "Owl Scholar",
    subtitle: "+10% XP in Reading",
    image: require("../../assets/images/owl-scholar.png"),
  },
  {
    id: "cat",
    title: "Ninja Cat",
    subtitle: "+15s Speaking Timer",
    image: require("../../assets/images/ninja-cat.png"),
  },
  {
    id: "fox",
    title: "Robo Fox",
    subtitle: "1 Extra Life per day",
    image: require("../../assets/images/robo-fox.png"),
  },
];

// Fungsi custom: cek apakah starter ini yang sedang dipilih
const isStarterSelected = (
  selectedId: string | null,
  starterId: string,
): boolean => selectedId === starterId;

const ChooseStarterScreen = () => {
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null);

  return (
    <ImageBackground
      source={require("../../assets/images/bg-night.jpg")}
      resizeMode="cover"
      style={onboardingStyles.background}
    >
      <SafeAreaView style={onboardingStyles.safeArea}>
        <ScrollView
          contentContainerStyle={[onboardingStyles.container, styles.container]}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={onboardingStyles.headerContainer}>
            <Text style={[onboardingStyles.screenTitle, styles.title]}>
              Choose your{"\n"}Starter
            </Text>
            <Text style={[onboardingStyles.screenSubtitle, styles.subtitle]}>
              Set your goal, you can change it later.
            </Text>
          </View>

          <View style={onboardingStyles.optionsContainer}>
            {STARTERS.map((starter) => {
              const isSelected = isStarterSelected(selectedStarter, starter.id);
              return (
                <TouchableOpacity
                  key={starter.id}
                  style={[styles.card, isSelected && styles.cardSelected]}
                  onPress={() => setSelectedStarter(starter.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={starter.image}
                      style={styles.cardImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{starter.title}</Text>
                    <Text style={styles.cardSubtitle}>{starter.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footerContainer}>
            <Link href="/" asChild>
              <TouchableOpacity
                disabled={selectedStarter === null}
                // Inline style: tombol Next pudar sampai ada starter yang dipilih
                style={StyleSheet.flatten([
                  onboardingStyles.nextButton,
                  styles.nextButton,
                  { opacity: selectedStarter === null ? 0.5 : 1 },
                ])}
              >
                <Text style={onboardingStyles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

// Style khusus layar ini (yang dipakai bersama sudah dipindah ke styles/onboarding.ts)
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 14,
  },
  card: {
    backgroundColor: "#95A4FC", // Light blue/purple color
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: "100%",
    height: 110,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#ffffff",
    backgroundColor: "#A9B5FF", // Slightly brighter when selected
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 80, // Offset for the image width to keep text centered visually
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#E0E7FF", // Slightly muted white/blue
    fontWeight: "500",
  },
  footerContainer: {
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 18,
  },
});

export default ChooseStarterScreen;
