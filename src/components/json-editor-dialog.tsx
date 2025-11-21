import { useEffect, useRef, useState } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import cvSchema from "@/data/schema.json";
import type { CVData } from "@/types";

interface JsonEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "es";
  onLanguageChange: (lang: "en" | "es") => void;
  cvData: CVData;
  onSave: (data: CVData, language: "en" | "es") => void;
}

export const JsonEditorDialog = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  cvData,
  onSave,
}: JsonEditorDialogProps) => {
  const [jsonValue, setJsonValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hasErrors, setHasErrors] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // Update JSON value when cvData or language changes
  useEffect(() => {
    if (isOpen) {
      setJsonValue(JSON.stringify(cvData, null, 2));
      setError(null);
    }
  }, [cvData, isOpen]);

  const handleEditorWillMount = (monaco: Monaco) => {
    // Configure JSON language features
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "http://myserver/cv-schema.json",
          fileMatch: ["*"],
          schema: cvSchema,
        },
      ],
    });
    monacoRef.current = monaco;
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Listen for validation errors
    monaco.editor.onDidChangeMarkers(() => {
      const markers = monaco.editor.getModelMarkers({});
      const errors = markers.filter((marker: editor.IMarker) => marker.severity === monaco.MarkerSeverity.Error);
      setHasErrors(errors.length > 0);
      
      if (errors.length > 0) {
        const errorMessages = errors.map((e: editor.IMarker) => `Line ${e.startLineNumber}: ${e.message}`).join("; ");
        setError(errorMessages);
      } else {
        setError(null);
      }
    });
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

      onSave(parsed, language);
      setError(null);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument")?.run();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Edit CV Data</h2>
            
            {/* Language Selector */}
            <div className="flex gap-2">
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-3 py-1 text-sm rounded ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange("es")}
                className={`px-3 py-1 text-sm rounded ${
                  language === "es"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Español
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-2 bg-blue-50 border-b border-blue-200">
          <p className="text-sm text-blue-700">
            💡 The editor validates your JSON against the CV schema. Hover over errors for details.
          </p>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="json"
            value={jsonValue}
            onChange={(value) => setJsonValue(value || "")}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            theme="vs-light"
            options={{
              minimap: { enabled: true },
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
            }}
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="px-6 py-3 bg-red-50 border-t border-red-200 max-h-24 overflow-y-auto">
            <p className="text-sm text-red-600">❌ {error}</p>
          </div>
        )}

        {/* Success Indicator */}
        {!hasErrors && jsonValue && !error && (
          <div className="px-6 py-3 bg-green-50 border-t border-green-200">
            <p className="text-sm text-green-600">✅ Valid CV structure</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <button
            onClick={handleFormat}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Format JSON
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={hasErrors}
              className={`px-4 py-2 text-sm text-white rounded ${
                hasErrors
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};