import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon, GlobeIcon, FileSearchIcon, BrainIcon, CheckCircleIcon, AlertCircle, Loader2, ArrowRightIcon } from "lucide-react";

const STEPS = [
    { icon: <GlobeIcon size={18} />, label: "Connecting to browser", desc: "Creating cloud browser session..." },
    { icon: <FileSearchIcon size={18} />, label: "Scanning website", desc: "Extracting meta tags, links, images..." },
    { icon: <BrainIcon size={18} />, label: "AI Analysis", desc: "Gemini is analyzing your SEO data..." },
    { icon: <CheckCircleIcon size={18} />, label: "Report Ready", desc: "Your SEO report is complete!" },
];

export default function Analyze() {
    const [url, setUrl] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const navigate = useNavigate();

    const handleAnalyze = async (submitUrl?: string) => {
        const targetUrl = submitUrl || url;
        if (!targetUrl.trim()) return;
        setError("");
        setAnalyzing(true);
        setCurrentStep(0);
        setTimeout(() => setCurrentStep(1), 1000);
        setTimeout(() => setCurrentStep(2), 3000);
        setTimeout(() => setCurrentStep(3), 6000);
        setTimeout(() => { setAnalyzing(false); navigate(`/report/id123`); }, 8000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAnalyze();
    };

    useEffect(() => {
        const prefillUrl = searchParams.get("url");
        if (prefillUrl) {
            setUrl(prefillUrl);
            setTimeout(() => handleAnalyze(prefillUrl), 500);
        }
        return () => { if (pollRef.current) clearInterval(pollRef.current); };
    }, []);

    return (
        <div className="min-h-screen pt-20 bg-background">
            <div className="border-b border-border bg-card/50 backdrop-blur-sm text-center">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <span className="mono text-xs text-muted-foreground uppercase tracking-widest">SEO Analyzer</span>
                    <h1 className="syne text-2xl sm:text-3xl font-700 text-foreground mt-1">
                        Run Your <span className="gradient-text">Free SEO Audit</span>
                    </h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-16">
                {!analyzing ? (
                    <div>
                        <div className="text-center mb-10">
                            <p className="text-muted-foreground text-sm">Enter any website URL to get a comprehensive AI-powered SEO audit report.</p>
                        </div>

                        {error && (
                            <div className="mb-6 px-4 py-3 rounded-xl severity-critical text-sm flex items-center gap-2">
                                <AlertCircle size={16} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="glass rounded-2xl p-1.5 flex items-center gap-2 border-border/60 focus-within:border-primary/30 transition-all">
                                <div className="flex items-center gap-2.5 flex-1 px-3">
                                    <SearchIcon size={16} className="text-muted-foreground shrink-0" />
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="Enter website URL (e.g. example.com)"
                                        className="w-full bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm py-3"
                                        id="analyze-url-input"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    type="submit"
                                    id="analyze-submit-btn"
                                    className="btn-forge px-5 py-2.5 text-sm text-white flex items-center gap-2 shrink-0"
                                >
                                    Run Free Audit
                                    <ArrowRightIcon size={14} />
                                </button>
                            </div>
                        </form>

                        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
                            <span className="mono text-xs text-muted-foreground">Try:</span>
                            {["github.com", "stripe.com", "vercel.com"].map((ex) => (
                                <button
                                    key={ex}
                                    onClick={() => setUrl(ex)}
                                    className="mono text-xs text-primary hover:text-accent transition-colors px-2.5 py-1 rounded-lg hover:bg-primary/5 border border-primary/10 hover:border-primary/20"
                                >
                                    {ex}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-center mb-12">
                            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 animate-float">
                                <BrainIcon size={28} className="text-white" />
                            </div>
                            <h2 className="syne text-2xl font-700 text-foreground mb-2">Analyzing Your Site</h2>
                            <div className="flex justify-center items-center gap-2 text-muted-foreground">
                                <Loader2 size={14} className="text-primary animate-spin shrink-0" />
                                <span className="mono text-sm truncate max-w-[280px]">{url}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {STEPS.map((step, i) => {
                                const isComplete = i < currentStep;
                                const isCurrent = i === currentStep;
                                const isPending = i > currentStep;

                                return (
                                    <div
                                        key={step.label}
                                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                                            isCurrent
                                                ? "glass border-primary/25 shadow-sm"
                                                : isComplete
                                                ? "glass opacity-70"
                                                : "glass opacity-30"
                                        }`}
                                        style={isCurrent ? { boxShadow: "0 0 20px rgba(168,85,247,0.08)" } : {}}
                                    >
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                                            isComplete
                                                ? "text-success"
                                                : isCurrent
                                                ? "text-white gradient-bg"
                                                : "text-muted-foreground"
                                        }`}
                                            style={isComplete ? { background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)" }
                                                : isPending ? { background: "var(--muted)", border: "1px solid var(--border)" } : {}}
                                        >
                                            {isComplete ? <CheckCircleIcon size={16} /> : step.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-500 syne ${isPending ? "text-muted-foreground" : "text-foreground"}`}>{step.label}</p>
                                            <p className="mono text-xs text-muted-foreground">{step.desc}</p>
                                        </div>
                                        {isCurrent && (
                                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="text-center mt-8">
                            <p className="mono text-xs text-muted-foreground/50">This may take 15–30 seconds depending on the website.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
