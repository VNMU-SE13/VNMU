// src/utils/translate.js

const translateText = async (text, targetLang) => {
    if (targetLang === "vi") return text;
  
    try {
        const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
      if (!apiKey) throw new Error("Google API key is missing");
  
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            q: text,
            target: targetLang,
            format: "text"
          })
        }
      );
  
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // fallback
    }
  };
  
  export default translateText;
  