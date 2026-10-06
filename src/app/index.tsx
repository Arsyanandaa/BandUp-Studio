import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { onboardingStyles } from "../styles/onboarding";

const WelcomeScreen = () => {
  return (
    <ImageBackground
     source={require("../../assets/images/bg-night.jpg")}
     resizeMode="cover"
     style={onboardingStyles.background}>

    <View style={onboardingStyles.content}>
      <Text style={[onboardingStyles.title, styles.title]}>Welcome to BandUp</Text>

      <Link href="/daily-goal" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Link>
    </View>
    </ImageBackground>
   
  );  
};

const styles = StyleSheet.create({
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 100,
  },
  button: {
    backgroundColor: '#95A4FC',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 50,
    marginHorizontal: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  }
});

export default WelcomeScreen;
