import { useEffect, useRef, useState } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import type { CVData } from "@/types";

interface JsonEditorProps {
  language: "en" | "es";
  onLanguageChange: (lang: "en" | "es") => void;
  cvData: CVData;
  onSave: (data: CVData, language: "en" | "es") => void;
  schema: object;
}

const STORAGE_KEY = "cv-data";

export const JsonEditor = ({
  language,
  onLanguageChange,
  cvData,
  onSave,
  schema,
}: JsonEditorProps) => {
  const [jsonValue, setJsonValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hasErrors, setHasErrors] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // Load from localStorage or use provided cvData
  useEffect(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}-${language}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setJsonValue(JSON.stringify(parsed, null, 2));
      } catch {
        setJsonValue(JSON.stringify(cvData, null, 2));
      }
    } else {
      setJsonValue(JSON.stringify(cvData, null, 2));
    }
    setError(null);
    setIsModified(false);
  }, [cvData, language]);

  const handleEditorWillMount = (monaco: Monaco) => {
    // Configure JSON language features with schema
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "inmemory://model/schema.json",
          fileMatch: ["*"],
          schema: schema,
        },
      ],
    });
    monacoRef.current = monaco;
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Listen for validation errors
    monaco.editor.onDidChangeMarkers(() => {
      const model = editor.getModel();
      if (!model) return;

      const markers = monaco.editor.getModelMarkers({ resource: model.uri });
      const errors = markers.filter(
        (marker: editor.IMarker) => marker.severity === monaco.MarkerSeverity.Error
      );
      setHasErrors(errors.length > 0);

      if (errors.length > 0) {
        const errorMessages = errors
          .map((e: editor.IMarker) => `Line ${e.startLineNumber}: ${e.message}`)
          .join("; ");
        setError(errorMessages);
      } else {
        setError(null);
      }
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    setJsonValue(value || "");
    setIsModified(true);
  };

  const handleSave = () => {
    if (hasErrors) {
      setError("Please fix validation errors before saving");
      return;
    }

    try {
      const parsed = JSON.parse(jsonValue);

      // Basic validation
      if (!parsed.personal || !parsed.sections) {
        setError("Invalid CV structure: missing 'personal' or 'sections'");
        return;
      }

      // Save to localStorage
      localStorage.setItem(`${STORAGE_KEY}-${language}`, JSON.stringify(parsed));

      onSave(parsed, language);
      setError(null);
      setIsModified(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument")?.run();
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset to original data? This will discard all saved changes.")) {
      localStorage.removeItem(`${STORAGE_KEY}-${language}`);
      setJsonValue(JSON.stringify(cvData, null, 2));
      setError(null);
      setIsModified(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-[#252526]">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-200">JSON Editor</h3>

          {/* Language Selector */}
          <div className="flex gap-1">
            <button
              onClick={() => onLanguageChange("en")}
              className={`px-2 py-1 text-xs rounded ${
                language === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange("es")}
              className={`px-2 py-1 text-xs rounded ${
                language === "es"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              ES
            </button>
          </div>

          {isModified && (
            <span className="text-xs text-yellow-400">● Modified</span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleFormat}
            className="px-2 py-1 text-xs text-gray-300 bg-gray-700 rounded hover:bg-gray-600"
            title="Format JSON (Shift+Alt+F)"
          >
            Format
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1 text-xs text-gray-300 bg-gray-700 rounded hover:bg-gray-600"
            title="Reset to original"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={hasErrors || !isModified}
            className={`px-3 py-1 text-xs rounded ${
              hasErrors || !isModified
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            title="Save changes (Ctrl+S)"
          >
            Save
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={jsonValue}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          beforeMount={handleEditorWillMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: false,
            quickSuggestions: true,
            suggest: {
              showProperties: true,
              showValues: true,
            },
            wordWrap: "on",
            wrappingIndent: "indent",
          }}
        />
      </div>

      {/* Status Bar */}
      {error && (
        <div className="px-4 py-2 bg-red-900/50 border-b border-red-800">
          <p className="text-xs text-red-200">❌ {error}</p>
        </div>
      )}

      {!hasErrors && !error && isModified && (
        <div className="px-4 py-2 bg-yellow-900/50 border-b border-yellow-800">
          <p className="text-xs text-yellow-200">⚠️ Unsaved changes</p>
        </div>
      )}

      {!hasErrors && !error && !isModified && jsonValue && (
        <div className="px-4 py-2 bg-green-900/50 border-b border-green-800">
          <p className="text-xs text-green-200">✅ Valid & Saved</p>
        </div>
      )}
    </div>
  );
};