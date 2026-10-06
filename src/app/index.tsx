import { View, Text, ImageBackground,  } from "react-native";
import { onboardingStyles } from "../styles/onboarding";

const WelcomeScreen = () => {
  return (
    <ImageBackground
     source={require("../../assets/images/bg-night.jpg")}
     resizeMode="cover"
     style={onboardingStyles.background}>

    <View style={onboardingStyles.content}>
      <Text style={onboardingStyles.title}>Welcome to BandUp</Text>


    </View>
    </ImageBackground>
   
  );  
};


export default WelcomeScreen;
