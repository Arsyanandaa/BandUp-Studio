import { onboardingstyles } from '@/styles/onboarding'
import { View, Text, ImageBackground } from 'react-native'
import { Alert } from "react-native"
import PrimaryButton from "../components/PrimaryButton"
import { router } from "expo-router";

const WelcomeScreen = () => {
  const handelGetStarted = () => {
    router.push("/choose-band");
  };
  return (
    <ImageBackground
      source={require("../../assets/images/bg-night.jpg")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      
    <View style={onboardingstyles.content}>
      <Text style={onboardingstyles.title}>Welcome to BandUp</Text>
    </View>
    <PrimaryButton
        title="GET STARTED"
        onPress={(handelGetStarted)}
      />
    </ImageBackground>
    
  )
}

export default WelcomeScreen