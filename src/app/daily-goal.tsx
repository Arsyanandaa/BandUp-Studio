import { Link, router } from "expo-router";
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

const GOAL_OPTIONS = buildGoalOptions([5, 10, 20, 30]);

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
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <View style={styles.arrowContainer}>
              <View style={styles.arrowShaft} />
              <View style={styles.arrowChevron} />
            </View>
          </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
  title: {
    fontSize: 34,
  },
  subtitle: {
    fontSize: 16,
  },
  optionButton: {
    backgroundColor: "transparent",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: "rgba(149, 164, 252, 0.5)",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  optionSelected: {
    backgroundColor: "#95A4FC",
    borderColor: "#C4CDFF",
    shadowColor: "#8B9FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 12,
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
