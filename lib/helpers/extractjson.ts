export function extractJSON(rawText: string): string | null {
  if (!rawText || typeof rawText !== "string") return null;
  rawText = rawText.trim();

  try {
    JSON.parse(rawText);
    return rawText;
  } catch { }

  const stack: string[] = [];
  let startIdx = -1;

  for (let i = 0; i < rawText.length; i++) {
    const char = rawText[i];
    if (char === "{" || char === "[") {
      if (stack.length === 0) startIdx = i;
      stack.push(char);
    } else if (char === "}" || char === "]") {
      const last = stack.pop();
      if (!last) continue;
      if (stack.length === 0 && startIdx !== -1) {
        return rawText.slice(startIdx, i + 1);
      }
    }
  }
  return null;
}
