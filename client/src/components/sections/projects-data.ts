import { Code2, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  techCategories: Record<string, string>;
  category: string;
  gradient: string;
  icon: LucideIcon;
  metrics: {
    accuracy: string;
    label: string;
  };
  github: string;
  demo: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    title: "Face Detection System",
    description: "Real-time face recognition and gender classification system using computer vision techniques with SVM classifier and Flask web deployment.",
    tech: ["OpenCV", "SVM", "Flask", "PCA", "GridSearchCV"],
    techCategories: { "Computer Vision": "ml", "Frameworks": "framework", "Deployment": "tools" },
    category: "ML/AI",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    icon: Brain,
    metrics: {
      accuracy: "96.5%",
      label: "Model Accuracy",
    },
    github: "https://github.com/sangamnirala/face-detection",
    demo: "https://face-detection-demo.replit.dev",
    highlights: [
      "Built real-time face recognition and gender classification using computer vision",
      "Performed EDA and preprocessing with face detection, grayscale conversion, normalization, and PCA",
      "Trained and optimized SVM classifier using GridSearchCV for accurate predictions",
      "Deployed as Flask web app for instant image classification",
    ],
  },
  {
    title: "PDF Chatbot",
    description: "Multilingual chatbot using RAG with Gemini AI to query scanned/digital PDFs via Streamlit with hybrid retrieval and chat memory.",
    tech: ["RAG", "Gemini AI", "ChromaDB", "LangChain", "Streamlit"],
    techCategories: { "RAG": "tools", "AI/LLM": "framework", "Streaming": "tools" },
    category: "Full-Stack AI",
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    icon: Code2,
    metrics: {
      accuracy: "92.4%",
      label: "Retrieval Accuracy",
    },
    github: "https://github.com/sangamnirala/pdf-chatbot",
    demo: "https://pdf-chatbot-demo.replit.dev",
    highlights: [
      "Built multilingual chatbot using RAG with Gemini AI for PDF queries",
      "Extracted and chunked text using OCR, PyPDF2, and LangChain with ChromaDB embeddings",
      "Enabled hybrid retrieval with semantic search, keyword match, and re-ranking",
      "Added chat memory for multi-turn conversations using LangChain BufferMemory",
    ],
  },
];
