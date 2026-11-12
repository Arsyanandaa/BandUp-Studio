import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { FadeInUp } from "@/components/home/animations";
import { Item, fetchItems } from "@/services/listeningApi";
import { colors } from "@/styles/home";

export default function Listening() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await fetchItems());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
        <Ionicons name="arrow-back" size={26} color={colors.white} />
      </Pressable>
      <Text style={styles.heading}>Listening</Text>

      {loading && <ActivityIndicator size="large" color={colors.primary} style={styles.center} />}

      {!!error && (
        <View style={styles.center}>
          <Text style={styles.error}>Gagal memuat: {error}</Text>
          <Pressable onPress={load} style={styles.button}>
            <Text style={styles.buttonText}>Coba lagi</Text>
          </Pressable>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <FadeInUp delay={Math.min(index, 8) * 80} style={styles.card}>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </FadeInUp>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 56, paddingHorizontal: 20 },
  back: { marginBottom: 12 },
  heading: { fontFamily: "Poppins_700Bold", fontSize: 28, color: colors.white, marginBottom: 16 },
  center: { marginTop: 80, alignItems: "center" },
  list: { paddingBottom: 40, gap: 12 },
  card: { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 20, padding: 16 },
  subtitle: { fontFamily: "Poppins_400Regular", fontSize: 11, color: colors.muted },
  title: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: colors.white, marginTop: 4 },
  body: { fontFamily: "Poppins_400Regular", fontSize: 13, lineHeight: 20, color: colors.white, opacity: 0.8, marginTop: 8 },
  error: { fontFamily: "Poppins_400Regular", color: "#FF6B6B" },
  button: { backgroundColor: colors.primary, borderRadius: 999, paddingVertical: 12, paddingHorizontal: 28, marginTop: 20 },
  buttonText: { fontFamily: "Poppins_600SemiBold", color: colors.white },
});