import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { Article, fetchArticle, fetchArticlePromise } from "@/services/readingApi";
import { colors } from "@/styles/home";

export default function Reading() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Muat pertama: async/await
  useEffect(() => {
    const load = async () => {
      try {
        setArticle(await fetchArticle());
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Muat ulang: Promise + then/catch
  const reload = () => {
    setLoading(true);
    setError("");
    fetchArticlePromise()
      .then(setArticle)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
        <Ionicons name="arrow-back" size={26} color={colors.white} />
      </Pressable>

      {loading && <ActivityIndicator size="large" color={colors.primary} style={styles.center} />}
      {!!error && <Text style={styles.error}>Gagal memuat: {error}</Text>}

      {!loading && article && (
        <>
          {article.image && <Image source={{ uri: article.image }} style={styles.image} resizeMode="cover" />}
          <Text style={styles.title}>{article.title}</Text>
          {!!article.description && <Text style={styles.desc}>{article.description}</Text>}
          <Text style={styles.text}>{article.text}</Text>
        </>
      )}

      {!loading && (
        <Pressable onPress={reload} style={styles.button}>
          <Text style={styles.buttonText}>{error ? "Coba lagi" : "Bacaan lain"}</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 56, paddingBottom: 40 },
  back: { marginBottom: 16 },
  center: { marginTop: 80 },
  image: { width: "100%", height: 200, borderRadius: 20, marginBottom: 16 },
  title: { fontFamily: "Poppins_700Bold", fontSize: 24, color: colors.white },
  desc: { fontFamily: "Poppins_400Regular", fontSize: 13, color: colors.muted, marginTop: 4 },
  text: { fontFamily: "Poppins_400Regular", fontSize: 15, lineHeight: 24, color: colors.white, marginTop: 16 },
  error: { fontFamily: "Poppins_400Regular", color: "#FF6B6B", marginTop: 24 },
  button: { backgroundColor: colors.primary, borderRadius: 999, paddingVertical: 14, alignItems: "center", marginTop: 28 },
  buttonText: { fontFamily: "Poppins_600SemiBold", color: colors.white, fontSize: 15 },
});