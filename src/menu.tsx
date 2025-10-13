
export const Menu = ({
  language, setLanguage
}: { language: string; setLanguage: (lang: string) => void }) => {

  return (
    <div className="flex justify-center gap-4 py-1 bg-[#3c3c3c]">
      <button
        onClick={() => setLanguage("en")}
        className={`size-6 grid place-content-center text-white text-sm rounded ${
          language === "en"
            ? "bg-[#4b4b4b]"
            : "bg-[#303030] hover:bg-[#4d4d4d]"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("es")}
        className={`size-6 grid place-content-center text-white text-sm rounded ${
          language === "es"
            ? "bg-[#4b4b4b]"
            : "bg-[#303030] hover:bg-[#4d4d4d]"
        }`}
      >
        ES
      </button>
    </div>
  );
};
