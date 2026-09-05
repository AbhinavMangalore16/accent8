/**
 * Helper to retrieve TTS engine config based on feature flag:
 * TTS_ENGINE_MODE = "local" (Home Server / Local RTX GPU on http://localhost:8000)
 * TTS_ENGINE_MODE = "cloud" (Modal Cloud GPU)
 */
export function getTtsApiConfig() {
  const mode = (process.env.TTS_ENGINE_MODE || "local").toLowerCase();

  if (mode === "local") {
    const localUrl = process.env.LOCAL_TTS_API_URL || "http://localhost:8000";
    return {
      mode: "local" as const,
      url: localUrl,
      apiKey: process.env.ACCENT8_API_KEY || "",
    };
  }

  // Cloud mode (Modal)
  const cloudUrl =
    process.env.ACCENT8_TTS_API_URL ||
    process.env.ACCENT8_API_URL ||
    process.env.MODAL_API_URL ||
    "https://abhinavm16104--accent8-tts-v0-accent8-serve.modal.run";

  return {
    mode: "cloud" as const,
    url: cloudUrl,
    apiKey: process.env.ACCENT8_API_KEY || "",
  };
}
