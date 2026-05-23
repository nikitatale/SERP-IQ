import { AlertTriangleIcon, ClockIcon, ExternalLinkIcon } from "lucide-react";
import ScoreGauge from "./ScoreGauge";
import { Link } from "react-router-dom";

export default function AnalysesCard({ analysis }: { analysis: any }) {
    const getScoreClass = (s: number) => {
        if (s >= 80) return "score-good";
        if (s >= 50) return "score-medium";
        return "score-poor";
    };

    const categories = [
        { label: "SEO", value: analysis.categories?.seo },
        { label: "Perf", value: analysis.categories?.performance },
        { label: "A11y", value: analysis.categories?.accessibility },
        { label: "BP", value: analysis.categories?.bestPractices },
    ];

    return (
        <Link to={`/report/${analysis._id}`} className="glass card-hover rounded-2xl p-5 group block relative overflow-hidden">
           
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(ellipse at top left, rgba(168,85,247,0.05) 0%, transparent 60%)" }}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0 mr-3">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-sm font-500 text-foreground truncate group-hover:text-primary transition-colors syne">
                                {new URL(analysis.url).hostname}
                            </p>
                            <ExternalLinkIcon size={11} className="text-muted-foreground/40 shrink-0 group-hover:text-primary/40 transition-colors" />
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate mono">{analysis.url}</p>
                    </div>

                    {analysis.status === "completed" ? (
                        <ScoreGauge score={analysis.overallScore} size={52} strokeWidth={4} />
                    ) : analysis.status === "processing" ? (
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}>
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                            <AlertTriangleIcon size={16} className="text-danger" />
                        </div>
                    )}
                </div>

                {analysis.status === "completed" && (
                    <>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {categories.map((c) => (
                                <div key={c.label} className="text-center py-2 rounded-lg"
                                    style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                                    <p className={`text-xs font-600 syne ${getScoreClass(c.value)}`}>{c.value}</p>
                                    <p className="text-[9px] text-muted-foreground mono mt-0.5">{c.label}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mono">
                    <ClockIcon size={11} />
                    {new Date(analysis.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
            </div>
        </Link>
    );
}
