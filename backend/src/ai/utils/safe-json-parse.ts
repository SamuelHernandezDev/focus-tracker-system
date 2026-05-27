//backend\src\ai\utils\safe-json-parse.ts
export function safeJsonParse(text: string) {
  try {
    const cleaned = text.replace(/```json|```/g, '').trim();

    return JSON.parse(cleaned);
  } catch {
    throw new Error('JSON parse failed');
  }
}
