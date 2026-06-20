import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon, ArrowRightIcon, BarChart3Icon, GlobeIcon, TrendingUpIcon, ZapIcon, Sparkles } from "lucide-react";
import AnalysesCard from "../components/AnalysesCard";
import { useApp } from "../context/AppContext";


interface AnalysisSummary {
    _id: string;
    url: string;
    overallScore: number;
    status: string;
    createdAt: string;
    categories: {
        seo: number;
        performance: number;
        accessibility: number;
        bestPractices: number;
    };
}

export default function Dashboard() {

    const {user, api} = useApp();
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [analyses, setAnalyses] = useState<AnalysisSummary[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecent = async () => {
        try {
            const res = await api.get(`/api/analysis/list?limit=6`)
            if(res.data.success){
                setAnalyses(res.data.analyses)
            }
        } catch (err) {
             console.error("Failed to fetch analysis : ", err);
        }

        setLoading(false);
    };

    const handleAnalyze = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (url.trim()) navigate(`/analyze?url=${encodeURIComponent(url)}`);
    };

    const completedAnalyses = analyses.filter((a) => a.status === "completed");
    const avgScore = completedAnalyses.length
        ? Math.round(completedAnalyses.reduce((sum, a) => sum + a.overallScore, 0) / completedAnalyses.length)
        : 0;

    const getScoreClass = (s: number) => {
        if (s >= 80) return "score-good";
        if (s >= 50) return "score-medium";
        return "score-poor";
    };

    useEffect(() => {
        (async () => await fetchRecent())();
    }, []);

    const stats = [
        { label: "Total Scans", value: analyses.length, icon: <GlobeIcon size={18} />, colorClass: "text-primary", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)" },
        { label: "Avg Score", value: avgScore, icon: <TrendingUpIcon size={18} />, colorClass: getScoreClass(avgScore), bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)" },
        { label: "Scans Left", value: user?.plan === "free" ? `${5 - (user?.analysisCount || 0)}` : "∞", icon: <ZapIcon size={18} />, colorClass: "text-accent", bg: "rgba(240,171,252,0.08)", border: "rgba(240,171,252,0.2)" },
    ];

    return (
        <div className="min-h-screen pt-20 bg-background">
           
            <div className="border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="mono text-xs text-muted-foreground uppercase tracking-widest">Dashboard</span>
                            </div>
                            <h1 className="syne text-2xl sm:text-3xl font-700 text-foreground">
                                Hey, <span className="gradient-text inline-flex">{user?.name.split(" ")[0]} &nbsp; <Sparkles className="w-4 h-4"/></span>
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">Analyze any website and track your SEO performance.</p>
                        </div>
                        <div className="hidden sm:block">
                            <span className="tag-pill">{user.plan === "free" ? "Free Plan" : "Pro Plan"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              
                <form onSubmit={handleAnalyze} className="mb-8">
                    <div className="glass rounded-2xl p-1.5 flex items-center gap-2 max-w-2xl border-border/60 transition-all focus-within:border-primary/30 focus-within:shadow-lg" style={{ boxShadow: "0 0 0 0 transparent" }}>
                        <div className="flex items-center gap-3 flex-1 px-3">
                            <SearchIcon size={16} className="text-muted-foreground shrink-0" />
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter a URL to analyze..."
                                className="w-full bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm py-3"
                                id="dashboard-url-input"
                            />
                        </div>
                        <button
                            type="submit"
                            id="dashboard-analyze-btn"
                            className="btn-forge px-5 py-2.5 text-sm text-white flex items-center gap-2 shrink-0"
                        >
                            Get SEO Score
                            <ArrowRightIcon size={14} />
                        </button>
                    </div>
                </form>

               
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {stats.map((s) => (
                        <div key={s.label} className="glass card-hover rounded-2xl p-5 flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                                <span className={s.colorClass}>{s.icon}</span>
                            </div>
                            <div>
                                <p className={`syne text-2xl font-700 ${s.colorClass}`}>{s.value}</p>
                                <p className="mono text-xs text-muted-foreground">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

               
                <div className="neon-line mb-8 opacity-30" />

             
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="syne text-lg font-600 text-foreground">Recent Analyses</h2>
                            <p className="mono text-xs text-muted-foreground mt-0.5">{analyses.length} total scans</p>
                        </div>
                        {analyses.length > 0 && (
                            <Link to="/history" className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors mono">
                                View All <ArrowRightIcon size={12} />
                            </Link>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full border-2 border-primary/20" />
                                <div className="absolute inset-0 w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                            </div>
                            <span className="mono text-xs text-muted-foreground">Loading data...</span>
                        </div>
                    ) : analyses.length === 0 ? (
                        <div className="glass rounded-2xl p-14 text-center">
                            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}>
                                <SearchIcon size={24} className="text-primary" />
                            </div>
                            <h3 className="syne text-lg font-600 text-foreground mb-2">No analyses yet</h3>
                            <p className="text-sm text-muted-foreground">Enter a URL above to run your first SEO analysis.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {analyses.map((a) => (
                                <AnalysesCard key={a._id} analysis={a} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
