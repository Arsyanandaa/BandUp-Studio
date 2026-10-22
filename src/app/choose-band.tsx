import { onboardingstyles } from "@/styles/onboarding-band";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";

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
  const insets = useSafeAreaInsets();

  const handleSelectBand = (id: string) => {
    setSelectedBand(id);
  };

  const handleNext = () => {
    if (!selectedBand) return;
    router.push("/daily-goal");
  };
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  useEffect(() => {
    console.log("Di Pilih : ", selectedBand);
  }, [selectedBand]);

  return (
    <ImageBackground source={require("../../assets/images/bg-night.jpg")} resizeMode="cover" style={onboardingstyles.Background}>
      <View style={onboardingstyles.header}>
        <Text style={onboardingstyles.heading}>Choose your Target Band</Text>
        <Text style={onboardingstyles.subtitle}>Set your goal, you can change it later.</Text>
      </View>

      <View style={onboardingstyles.bandGrid}>
        {bandOptions.map((band) => {
          const isSelected = selectedBand === band.id;

          return (
            <Pressable key={band.id} style={[onboardingstyles.bandBox, isSelected && onboardingstyles.bandBoxSelected]} onPress={() => handleSelectBand(band.id)}>
              <Text style={[onboardingstyles.bandText, isSelected && onboardingstyles.bandTextSelected]}>{band.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={onboardingstyles.subtitle}>pilihan : {selectedBand}</Text>

      <View style={{ marginTop: "auto", marginBottom: 4 }}>
        <PrimaryButton title="Selanjutnya" onPress={handleNext} />
      </View>

      <Pressable style={[onboardingstyles.backButton, { marginTop: insets.top + 8 }]} onPress={handleBack} hitSlop={12}>
        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
      </Pressable>
    </ImageBackground>
  );
};

export default ChooseBandScreen;
