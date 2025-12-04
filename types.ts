export interface Message {
  role: 'user' | 'model';
  content: string;
}

export enum SupportedLanguage {
  PYTHON = "Python",
  JAVASCRIPT = "JavaScript",
  TYPESCRIPT = "TypeScript",
  JAVA = "Java",
  CPP = "C++",
  C = "C",
  CSHARP = "C#",
  GO = "Go",
  RUST = "Rust",
  KOTLIN = "Kotlin",
  SWIFT = "Swift",
  PHP = "PHP",
  SQL = "SQL",
  HTML_CSS = "HTML/CSS",
  DART = "Dart",
  OTHER = "Other"
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  response: string | null;
}
