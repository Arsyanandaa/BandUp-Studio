import ActivityCard, { Activity } from "@/components/home/ActivityCard";
import HomeHeader from "@/components/home/HomeHeader";
import ProgressCard from "@/components/home/ProgressCard";
import StreakBadge from "@/components/home/StreakBadge";
import WeeklyStreak, { DayStatus, WeekDay } from "@/components/home/WeeklyStreak";
import { homeAssets } from "@/constants/homeAssets";
import { useUser } from "@/context/user-context";
import { homeStyles as s } from "@/styles/home";
import { router } from "expo-router";
import { useState } from "react"; // BARU
import { FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"; // BARU: tambah Text, TouchableOpacity
import { supabase } from "../../lib/supabase"; // BARU

const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// Mock data: nanti ganti dari state/penyimpanan lokal
const REST_DAYS = [5, 6]; // indeks hari: Mo=0 ... Su=6
const COMPLETED_OFFSETS = [1, 2, 3, 4]; // berapa hari lalu user selesai belajar

const dateKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

const addDays = (d: Date, n: number) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
};

const weekdayIndex = (d: Date) => (d.getDay() + 6) % 7;

function buildWeek(today: Date, completed: Set<string>): WeekDay[] {
  const monday = addDays(today, -weekdayIndex(today));
  return DAY_LABELS.map((label, i) => {
    const date = addDays(monday, i);
    let status: DayStatus = "pending";
    if (completed.has(dateKey(date))) status = "done";
    else if (dateKey(date) === dateKey(today)) status = "today";
    else if (REST_DAYS.includes(i)) status = "rest";
    return { label, status };
  });
}

function calcStreak(today: Date, completed: Set<string>) {
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const date = addDays(today, -i);
    if (completed.has(dateKey(date))) streak++;
    else if (REST_DAYS.includes(weekdayIndex(date))) continue;
    else if (i === 0) continue;
    else break;
  }
  return streak;
}

const ACTIVITIES: Activity[] = [
  { id: "1", image: homeAssets.cards.focusReading, category: "Focus", title: "Reading", duration: "10 MIN" },
  { id: "2", image: homeAssets.cards.happinessListening, category: "Happiness", title: "Listening", duration: "10 MIN" },
  { id: "3", image: homeAssets.cards.focusReading, category: "Focus", title: "Speaking", duration: "10 MIN" },
];

export default function Home() {
  const { name } = useUser();
  const [signingOut, setSigningOut] = useState(false); // BARU
  const today = new Date();
  const completed = new Set(COMPLETED_OFFSETS.map((n) => dateKey(addDays(today, -n))));
  const week = buildWeek(today, completed);
  const streak = calcStreak(today, completed);

  // BARU: fungsi sign out
  const handleSignOut = async () => {
    setSigningOut(true);
    const { error } = await supabase.auth.signOut();
    setSigningOut(false);

    if (error) {
      console.log("Gagal keluar:", error.message);
    }
  };

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <Image source={homeAssets.background} style={s.background} resizeMode="cover" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContent}>
        <HomeHeader name={name || "Zoe"} />
        <ProgressCard percent={91} totalLabel="Total belajar" totalValue="6 jam 20 menit" details={["10 jam lagi", "3 jam 40 menit"]} />
        <View style={s.streakRow}>
          <WeeklyStreak days={week} streakText={`${streak} days`} />
          <StreakBadge count={streak} onPress={() => router.push({ pathname: "/streak" as any, params: { count: String(streak), days: week.map((d) => d.status).join(",") } })} />
        </View>
        <FlatList
          horizontal
          data={ACTIVITIES}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <ActivityCard {...item} index={index} onPress={item.title === "Reading" ? () => router.push("/reading" as any) : item.title === "Listening" ? () => router.push("/listening" as any) : undefined} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.activityList}
        />

        {/* BARU: tombol keluar */}
        <TouchableOpacity
          onPress={handleSignOut}
          disabled={signingOut}
          style={{
            marginTop: 24,
            marginHorizontal: 24,
            padding: 14,
            borderRadius: 12,
            backgroundColor: signingOut ? "#D3C6F2" : "#9B7EDE",
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>{signingOut ? "Loading..." : "Keluar"}</Text>
        </TouchableOpacity>
        {/* BARU: tombol ke notes */}
        <TouchableOpacity
          onPress={() => router.push("/notes" as any)}
          style={{
            marginTop: 24,
            marginHorizontal: 24,
            padding: 14,
            borderRadius: 12,
            backgroundColor: "#9B7EDE",
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>Buka Notes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
