import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";

const colors = {
  background: "#F3EEFF", // ungu susu
  card: "#FFFFFF",
  border: "#C9B8F0",
  primary: "#9B7EDE",
  primaryDisabled: "#D3C6F2",
  text: "#3B2A63",
  placeholder: "#9A8CB8",
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setIsError(true);
      setMessage("Gagal login: " + error.message);
    } else {
      setIsError(false);
      setMessage("Berhasil! Login berhasil.");
    }
  };

  const inputStyle = {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    color: colors.text,
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 20,
          color: colors.text,
        }}
      >
        Login
      </Text>

      <TextInput placeholder="Email" placeholderTextColor={colors.placeholder} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={inputStyle} />

      <TextInput placeholder="Password" placeholderTextColor={colors.placeholder} value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" style={inputStyle} />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{
          backgroundColor: loading ? colors.primaryDisabled : colors.primary,
          padding: 14,
          borderRadius: 12,
          marginTop: 4,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          {loading ? "Loading..." : "Masuk"}
        </Text>
      </TouchableOpacity>

      {message !== "" && (
        <Text
          style={{
            marginTop: 12,
            textAlign: "center",
            color: isError ? "#C0392B" : "#2E8B57",
          }}
        >
          {message}
        </Text>
      )}

      <TouchableOpacity onPress={() => router.push("/register")} style={{ marginTop: 16 }}>
        <Text style={{ textAlign: "center", color: colors.primary, fontWeight: "500" }}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}
