export async function localizeObjectWithLingo(objectToTranslate, { sourceLocale, targetLocale }) {
  if (!objectToTranslate || typeof objectToTranslate !== 'object') {
    throw new Error('localizeObjectWithLingo expects an object');
  }
  if (!targetLocale || targetLocale === sourceLocale) return objectToTranslate;

  try {
    const response = await fetch('/api/lingo/localizeObject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        objectToTranslate,
        sourceLocale,
        targetLocale,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}`);
    }

    const json = await response.json();
    return json?.data ?? null;
  } catch {
    // Returning null prevents caching an English fallback and allows retry.
    return null;
  }
}
