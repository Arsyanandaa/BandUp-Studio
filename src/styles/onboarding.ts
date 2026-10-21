import { Background } from "expo-router/build/react-navigation"
import {StyleSheet} from "react-native"


export const onboardingstyles = StyleSheet.create({
  Background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  button: {
    backgroundColor:  "#8E97FD",
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    paddingTop: 100,
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle : {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 8,
  },
  bandGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  paddingHorizontal: 10,
  marginTop: 40,
},
bandBox: {
  width: "47%",
  height: 120,
  backgroundColor: "#0F1B4D",
  borderRadius: 24,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
  borderColor: "#0077FF",
  borderWidth: 1,
},
bandText: {
  fontSize: 40,
  fontWeight: "bold",
  color: "#FFFFFF",
},
bandBoxSelected : {
  backgroundColor : "#9AA2FF",
  borderColor : "#9AA2FF",
},
bandTextSelected : {
  color : "#FFFFFF",
},
nextButton: {
    backgroundColor: "#9AA2FF",
    height: 52,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: "auto",
    marginBottom: 40,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
    backButton: {
    position: "absolute",
    left: 16,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});