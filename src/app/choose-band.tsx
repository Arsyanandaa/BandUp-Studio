import { ImageBackground, Text, View } from 'react-native'
import { onboardingstyles } from '@/styles/onboarding'

type BandOption = {
  id: string;
  label: string;
};

const bandOptions: BandOption[] = [
  { id: "5.5", label: "5.5" },
  { id: "6.0", label: "6.0" },
  { id: "6.5", label: "6.5" },
  { id: "7.0", label: "7.0+" },
]

const ChooseBandScreen = () => {
  return (
    <ImageBackground
    source={require("../../assets/images/bg-night.jpg")}
    resizeMode="cover"
    style={onboardingstyles.Background}
    >
        
    <View style={onboardingstyles.header}>
      <Text style={onboardingstyles.heading}>Choose your Target Band</Text>
      <Text style={onboardingstyles.subtitle}>
        Set your goal, you can change it later.
      </Text>
    </View>
    <View style={onboardingstyles.bandGrid}>
  {bandOptions.map((band) => (
    <View key={band.id} style={onboardingstyles.bandBox}>
      <Text style={onboardingstyles.bandText}>{band.label}</Text>
    </View>
  ))}
</View>
    </ImageBackground>

  )
}

export default ChooseBandScreen