import { Link } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboardingStyles } from "../styles/onboarding";

// Type untuk satu pilihan durasi belajar
type GoalOption = {
  id: string;
  minutes: number;
  label: string;
};

// Fungsi custom (ada parameter + return) yang membuat array of objects pakai for loop
const buildGoalOptions = (minutesList: number[]): GoalOption[] => {
  const result: GoalOption[] = [];
  for (let i = 0; i < minutesList.length; i++) {
    result.push({
      id: `goal-${minutesList[i]}`,
      minutes: minutesList[i],
      label: `${minutesList[i]} min`,
    });
  }
  return result;
};

const GOAL_OPTIONS = buildGoalOptions([5, 10, 20, 30, 60]);

const DailyGoalScreen = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

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
              Daily Study Goal
            </Text>
            <Text style={[onboardingStyles.screenSubtitle, styles.subtitle]}>
              How much time can you spend today?
            </Text>
          </View>

          <View style={onboardingStyles.optionsContainer}>
            {GOAL_OPTIONS.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.optionButton,
                  selectedGoal === goal.id && styles.optionSelected,
                ]}
                onPress={() => setSelectedGoal(goal.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.optionText}>{goal.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footerContainer}>
            <Link href="/choose-starter" asChild>
              <TouchableOpacity
                disabled={selectedGoal === null}
                // Inline style: tombol Next pudar sampai ada durasi yang dipilih
                style={StyleSheet.flatten([
                  onboardingStyles.nextButton,
                  styles.nextButton,
                  { opacity: selectedGoal === null ? 0.5 : 1 },
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
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
  },
  subtitle: {
    fontSize: 16,
  },
  optionButton: {
    backgroundColor: "#95A4FC", // Light blue/purple color
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionSelected: {
    borderColor: "#ffffff",
    backgroundColor: "#A9B5FF", // Slightly brighter when selected
  },
  optionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  footerContainer: {
    alignItems: "center",
    marginBottom: 20, // Add bottom margin for the next button
  },
  nextButton: {
    paddingVertical: 16,
  },
});

export default DailyGoalScreen;
