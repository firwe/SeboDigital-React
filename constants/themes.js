import { Platform } from "react-native";

export const CORES = {
  dark: "#0f172a",
  header: "#1e293b",
  bg: "#f8fafc",
  muted: "#64748b",
  accent: "#f59e0b",
  border: "#cbd5e1",
  borderLight: "#e2e8f0",
  white: "#ffffff",
  erroBg: "#fee2e2",
  erroTexto: "#dc2626",
  erroBorda: "#f87171",
};

export const FONTES = {
  display: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
  body: Platform.select({ ios: "System", android: "sans-serif", default: "sans-serif" }),
};