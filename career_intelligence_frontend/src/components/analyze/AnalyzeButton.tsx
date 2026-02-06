type Props = {
    loading: boolean;
    onClick: () => void;
}

export default function AnalyzeButton({ loading, onClick }: Props) {
    return (
        <div className="mt-10">
            <button
                onClick={onClick}
                disabled={loading}
                className="
            px-6 py-3 rounded-md font-medium
            bg-black text-white
            dark:bg-white dark:text-black
            hover:opacity-90
            transition
            disabled:opacity-50
          "
            >
                {loading ? "Analyzing your profile..." : "Analyze My Readiness"}
            </button>
        </div>
    );
}