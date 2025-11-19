import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonSummary = async (lessonContent: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Summarize the following lesson content into 3 key takeaways suitable for a mobile notification:\n\n${lessonContent}`,
    });
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Service unavailable.";
  }
};

export const generateGradingFeedback = async (assignmentTitle: string, submission: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Act as a supportive senior software engineer mentor.
        The assignment is: "${assignmentTitle}".
        The student submitted: "${submission}".
        
        Provide constructive feedback, highlighting 1 strength and 1 area for improvement. 
        Keep it encouraging and under 100 words.
      `,
    });
    return response.text || "Could not generate feedback.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Service unavailable.";
  }
};

export const askTutor = async (question: string, context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Context: ${context}
        
        Student Question: ${question}
        
        Answer the question simply and briefly (max 2 sentences) to help the student understand.
      `,
    });
    return response.text || "I couldn't find an answer to that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tutor is currently offline.";
  }
};