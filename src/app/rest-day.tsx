import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboardingStyles } from "../styles/onboarding";

// Daftar hari istirahat
type DayOption = {
  id: string;
  label: string;
  fullName: string;
};

const DAYS: DayOption[] = [
  { id: "sen", label: "Sen", fullName: "Senin" },
  { id: "sel", label: "Sel", fullName: "Selasa" },
  { id: "rab", label: "Rab", fullName: "Rabu" },
  { id: "kam", label: "Kam", fullName: "Kamis" },
  { id: "jum", label: "Jum", fullName: "Jumat" },
  { id: "sab", label: "Sab", fullName: "Sabtu" },
  { id: "ming", label: "Ming", fullName: "Minggu" },
];

const MAX_REST_DAYS = 2;

const RestDayScreen = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) => {
      if (prev.includes(dayId)) {
        // Deselect
        return prev.filter((d) => d !== dayId);
      }
      if (prev.length >= MAX_REST_DAYS) {
        // Sudah maksimal, tidak bisa tambah
        return prev;
      }
      return [...prev, dayId];
    });
  };

  // Nama hari yang dipilih untuk ditampilkan
  const selectedDayNames = DAYS.filter((d) => selectedDays.includes(d.id))
    .map((d) => d.fullName)
    .join(", ");

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
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <View style={styles.arrowContainer}>
              <View style={styles.arrowShaft} />
              <View style={styles.arrowChevron} />
            </View>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Pilih Hari Istirahatmu</Text>
          </View>

          {/* Day Selector */}
          <View style={styles.daysGrid}>
            {DAYS.map((day) => {
              const isSelected = selectedDays.includes(day.id);
              return (
                <TouchableOpacity
                  key={day.id}
                  style={[
                    styles.dayButton,
                    isSelected && styles.dayButtonSelected,
                  ]}
                  onPress={() => toggleDay(day.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {day.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Hint */}
          <Text style={styles.hint}>
            Kamu bisa memilih 0-2 hari istirahat dalam seminggu
          </Text>

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCount}>{selectedDays.length} hari</Text>
            <Text style={styles.summaryDays}>
              {selectedDays.length === 0
                ? "Tidak ada hari istirahat"
                : `Hari istirahat : ${selectedDayNames}`}
            </Text>
          </View>

          {/* Streak Info Card */}
          <View style={styles.infoCard}>
            <Image
              source={require("../../assets/images/ice-icon.png")}
              style={styles.iceIcon}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              Streak mu akan hidup aman{"\n"}meskipun kamu istirahat
            </Text>
          </View>

          {/* Next Button */}
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={[
                onboardingStyles.nextButton,
                styles.nextButton,
                { opacity: 1 },
              ]}
              onPress={() => router.push("/")}
            >
              <Text style={onboardingStyles.nextButtonText}>Selanjutnya</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
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
  headerContainer: {
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    lineHeight: 38,
  },
  // --- Day selector ---
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(149, 164, 252, 0.6)",
    backgroundColor: "transparent",
    minWidth: 68,
    alignItems: "center",
  },
  dayButtonSelected: {
    backgroundColor: "#95A4FC",
    borderColor: "#C4CDFF",
    shadowColor: "#8B9FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 10,
  },
  dayText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#b0bfff",
  },
  dayTextSelected: {
    color: "#ffffff",
  },
  // --- Hint ---
  hint: {
    fontSize: 13,
    color: "#b0bfff",
    textAlign: "center",
    marginBottom: 24,
  },
  // --- Summary Card ---
  summaryCard: {
    borderWidth: 2,
    borderColor: "rgba(149, 164, 252, 0.5)",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  summaryCount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  summaryDays: {
    fontSize: 14,
    color: "#b0bfff",
    textAlign: "center",
  },
  // --- Ice Info Card ---
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(149, 164, 252, 0.5)",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 16,
  },
  iceIcon: {
    width: 52,
    height: 52,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#dce3ff",
    lineHeight: 22,
  },
  // --- Footer ---
  footerContainer: {
    alignItems: "center",
  },
  nextButton: {
    paddingVertical: 18,
    backgroundColor: "#95A4FC",
  },
});

export default RestDayScreen;
