import { StyleSheet } from "react-native";

// External styles: dipakai bersama oleh index, daily-goal, dan choose-starter
export const onboardingStyles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {},
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "flex-start",
    marginBottom: 40,
  },
  screenTitle: {
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  screenSubtitle: {
    color: "#e0e0e0",
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: "#95A4FC",
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
});
