const { GoogleGenAI } = require('@google/genai');

const apiKey = 'AIzaSyBLfWGJhkOMM4haQBEBKNfBiXtL07phbJk';
const ai = new GoogleGenAI({ apiKey });

async function listModels() {
  try {
    console.log('🔍 API anahtarınız için kullanılabilir modeller:\n');
    
    // Test different model names
    const modelsToTest = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-2.0-flash-exp',
      'gemini-2.5-flash-latest',
      'models/gemini-pro',
      'models/gemini-1.5-pro',
      'models/gemini-1.5-flash',
    ];

    for (const modelName of modelsToTest) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: 'Hi'
        });
        console.log(`✅ ${modelName} - ÇALIŞIYOR!`);
      } catch (error) {
        console.log(`❌ ${modelName} - Çalışmıyor (${error.message.substring(0, 50)}...)`);
      }
    }
  } catch (error) {
    console.error('Hata:', error);
  }
}

listModels();
