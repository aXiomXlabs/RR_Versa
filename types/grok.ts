export interface GrokMessage {
  role: "user" | "assistant"
  content: string
}

export interface GrokResponse {
  response: string
}

export interface GrokError {
  error: string
}
