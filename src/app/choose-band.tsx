import { ImageBackground, Text, View, Pressable } from "react-native";
import { onboardingstyles } from "@/styles/onboarding";
import { useState } from "react";

type BandOption = {
  id: string;
  label: string;
};

const bandOptions: BandOption[] = [
  { id: "7.0", label: "7.0+" },
  { id: "6.5", label: "6.5" },
  { id: "6.0", label: "6.0" },
  { id: "5.5", label: "5.5" },
];

const ChooseBandScreen = () => {
  const [selectedBand, setSelectedBand] = useState("");

  const handleSelectBand = (id: string) => {
    setSelectedBand(id);
  };

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
          <Pressable
            key={band.id}
            style={onboardingstyles.bandBox}
            onPress={() => handleSelectBand(band.id)}
          >
            <Text style={onboardingstyles.bandText}>{band.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={onboardingstyles.subtitle}>pilihan: {selectedBand}</Text>
    </ImageBackground>
  );
};

export default ChooseBandScreen;