export interface GlossaryTerm {
  term: string;
  abbreviation?: string;
  definition: string;
  category: "ML" | "MLOps" | "Framework" | "Tools" | "Concept" | "Deployment";
  examples?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Machine Learning",
    abbreviation: "ML",
    definition: "A subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.",
    category: "Concept",
    examples: ["Image recognition", "Recommendation systems", "Fraud detection"],
  },
  {
    term: "Deep Learning",
    definition: "A subset of machine learning using neural networks with multiple layers to learn hierarchical representations of data.",
    category: "ML",
    examples: ["Convolutional Neural Networks (CNNs)", "Recurrent Neural Networks (RNNs)", "Transformers"],
  },
  {
    term: "Neural Network",
    definition: "A computing system inspired by biological neural networks that comprise interconnected nodes (neurons) organized in layers.",
    category: "ML",
    examples: ["Feedforward networks", "Convolutional networks", "Recurrent networks"],
  },
  {
    term: "Convolutional Neural Network",
    abbreviation: "CNN",
    definition: "A deep learning architecture optimized for processing grid-like data, particularly effective for image processing tasks.",
    category: "ML",
    examples: ["Image classification", "Object detection", "Face recognition"],
  },
  {
    term: "Recurrent Neural Network",
    abbreviation: "RNN",
    definition: "A neural network architecture designed for sequential data with connections forming directed cycles, enabling it to process sequences.",
    category: "ML",
    examples: ["LSTM", "GRU", "Time series prediction"],
  },
  {
    term: "Long Short-Term Memory",
    abbreviation: "LSTM",
    definition: "A type of RNN capable of learning long-term dependencies through memory cells, addressing the vanishing gradient problem.",
    category: "ML",
    examples: ["Language modeling", "Machine translation", "Speech recognition"],
  },
  {
    term: "Computer Vision",
    definition: "A field of AI that enables computers to interpret and analyze visual information from images and videos.",
    category: "ML",
    examples: ["Face detection", "Object recognition", "Semantic segmentation"],
  },
  {
    term: "Natural Language Processing",
    abbreviation: "NLP",
    definition: "A field of AI focused on enabling computers to understand, interpret, and generate human language meaningfully.",
    category: "ML",
    examples: ["Text classification", "Named entity recognition", "Machine translation"],
  },
  {
    term: "Retrieval-Augmented Generation",
    abbreviation: "RAG",
    definition: "A technique that augments language models by retrieving relevant documents/data before generation, improving factuality and context awareness.",
    category: "Concept",
    examples: ["PDF chatbots", "Question answering systems", "Knowledge base search"],
  },
  {
    term: "Support Vector Machine",
    abbreviation: "SVM",
    definition: "A supervised learning algorithm that finds the optimal hyperplane to separate classes with maximum margin in feature space.",
    category: "ML",
    examples: ["Binary classification", "Multi-class classification", "Regression"],
  },
  {
    term: "Principal Component Analysis",
    abbreviation: "PCA",
    definition: "A dimensionality reduction technique that identifies principal components (directions of maximum variance) in high-dimensional data.",
    category: "ML",
    examples: ["Feature extraction", "Data visualization", "Noise reduction"],
  },
  {
    term: "Machine Learning Operations",
    abbreviation: "MLOps",
    definition: "A set of practices that combines ML, DevOps, and data engineering to streamline the deployment and maintenance of ML models in production.",
    category: "MLOps",
    examples: ["Model versioning", "Continuous integration", "Model monitoring"],
  },
  {
    term: "Model Deployment",
    definition: "The process of taking a trained ML model and making it available for predictions in a production environment.",
    category: "Deployment",
    examples: ["API endpoints", "Cloud services", "Edge devices"],
  },
  {
    term: "Docker",
    definition: "A containerization platform that packages applications and dependencies into standardized units (containers) for consistent deployment.",
    category: "Tools",
    examples: ["Container images", "Docker Compose", "Kubernetes orchestration"],
  },
  {
    term: "Kubernetes",
    abbreviation: "K8s",
    definition: "An open-source orchestration platform for automating deployment, scaling, and management of containerized applications.",
    category: "Deployment",
    examples: ["Pod management", "Service discovery", "Load balancing"],
  },
  {
    term: "TensorFlow",
    definition: "An open-source machine learning framework developed by Google for building and training neural networks at scale.",
    category: "Framework",
    examples: ["Keras API", "TensorFlow Lite", "TensorFlow Serving"],
  },
  {
    term: "PyTorch",
    definition: "An open-source machine learning framework that emphasizes dynamic computation graphs and ease of use for research and production.",
    category: "Framework",
    examples: ["Neural network modules", "Automatic differentiation", "Distributed training"],
  },
  {
    term: "Scikit-learn",
    definition: "A Python library providing simple and efficient tools for data analysis and machine learning with a consistent API.",
    category: "Framework",
    examples: ["Classification", "Clustering", "Feature engineering"],
  },
  {
    term: "Flask",
    definition: "A lightweight Python web framework for building web applications and APIs with minimal overhead.",
    category: "Framework",
    examples: ["RESTful APIs", "Web servers", "Microservices"],
  },
  {
    term: "FastAPI",
    definition: "A modern, fast Python web framework for building APIs with automatic validation and interactive API documentation.",
    category: "Framework",
    examples: ["High-performance APIs", "Async operations", "WebSocket support"],
  },
  {
    term: "Streamlit",
    definition: "A Python library for rapidly building and sharing data applications and dashboards with minimal front-end expertise.",
    category: "Framework",
    examples: ["Data dashboards", "ML demos", "Interactive visualizations"],
  },
  {
    term: "LangChain",
    definition: "A framework for developing applications powered by large language models with modular components and chains.",
    category: "Framework",
    examples: ["RAG pipelines", "Prompt management", "Memory systems"],
  },
  {
    term: "ChromaDB",
    definition: "A vector database designed for storing and retrieving embeddings, commonly used in RAG and semantic search applications.",
    category: "Tools",
    examples: ["Semantic search", "Vector storage", "Embedding management"],
  },
  {
    term: "Feature Engineering",
    definition: "The process of selecting, transforming, and creating features from raw data to improve ML model performance.",
    category: "Concept",
    examples: ["Normalization", "Encoding", "Feature scaling"],
  },
  {
    term: "Model Training",
    definition: "The process of feeding data to an ML algorithm to learn patterns and adjust model parameters for optimal performance.",
    category: "Concept",
    examples: ["Supervised learning", "Unsupervised learning", "Transfer learning"],
  },
  {
    term: "Hyperparameter Tuning",
    definition: "The process of optimizing model hyperparameters (non-learnable settings) to improve generalization and performance.",
    category: "Concept",
    examples: ["Grid search", "Random search", "Bayesian optimization"],
  },
  {
    term: "Cross-Validation",
    definition: "A statistical technique for assessing ML model performance by partitioning data into subsets for training and testing.",
    category: "Concept",
    examples: ["K-fold CV", "Stratified CV", "Time series CV"],
  },
  {
    term: "API",
    abbreviation: "API",
    definition: "Application Programming Interface - a set of protocols and tools for building software applications that communicate with services.",
    category: "Tools",
    examples: ["REST API", "GraphQL", "Webhook"],
  },
  {
    term: "REST API",
    abbreviation: "REST",
    definition: "Representational State Transfer - an architectural style for designing networked applications using standard HTTP methods.",
    category: "Tools",
    examples: ["GET/POST requests", "JSON responses", "Stateless communication"],
  },
  {
    term: "Git",
    definition: "A distributed version control system for tracking changes in code and collaborating with other developers.",
    category: "Tools",
    examples: ["Commits", "Branches", "Pull requests"],
  },
  {
    term: "Google Cloud Platform",
    abbreviation: "GCP",
    definition: "Google's cloud computing platform providing infrastructure, services, and tools for building and deploying applications.",
    category: "Deployment",
    examples: ["Compute Engine", "Cloud Run", "BigQuery"],
  },
  {
    term: "Cloud Run",
    definition: "A Google Cloud service for running containerized applications serverlessly, scaling automatically based on demand.",
    category: "Deployment",
    examples: ["API deployment", "Microservices", "Scheduled jobs"],
  },
  {
    term: "Accuracy",
    definition: "A metric measuring the proportion of correct predictions out of total predictions in classification tasks.",
    category: "Concept",
    examples: ["Classification evaluation", "Model performance", "Baseline comparison"],
  },
  {
    term: "Precision and Recall",
    definition: "Precision measures correct positive predictions; Recall measures coverage of actual positives. Trade-off depends on use case.",
    category: "Concept",
    examples: ["Fraud detection", "Medical diagnosis", "Information retrieval"],
  },
];

export function getTermByName(name: string): GlossaryTerm | undefined {
  return glossaryTerms.find(
    (t) => t.term.toLowerCase() === name.toLowerCase() || t.abbreviation?.toLowerCase() === name.toLowerCase()
  );
}

export function getTermsByCategory(category: GlossaryTerm["category"]): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.category === category);
}

export const glossaryCategories = [
  { id: "ML", label: "Machine Learning" },
  { id: "MLOps", label: "MLOps & DevOps" },
  { id: "Framework", label: "Frameworks & Libraries" },
  { id: "Tools", label: "Tools & Platforms" },
  { id: "Concept", label: "Core Concepts" },
  { id: "Deployment", label: "Deployment & Infrastructure" },
];
