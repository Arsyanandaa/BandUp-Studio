import { onboardingstyles } from "@/styles/onboarding-band";
import { View, Text, ImageBackground, Image } from 'react-native'
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
      <Text style={onboardingstyles.title}>Selamat datang di BandUp</Text>
      <Text style={onboardingstyles. subTitle}>Tingkatkan kemampuan IELTS anda, satu misi demi satu misi. Taklukkan tantangan, kumpulkan karakter, dan raih skor target anda.</Text>

      <Image
        source={require("../../assets/images/welcome-birds.png")}
        style={onboardingstyles.welcomeImage}
        resizeMode="contain"/>
    </View>
    <PrimaryButton
        title="GET STARTED"
        onPress={(handelGetStarted)}
      />
    </ImageBackground>
    
  )
}

export default WelcomeScreen