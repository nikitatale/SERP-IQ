/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

export default function IssueCard({ issue }: { issue: any }) {
    const [expanded, setExpanded] = useState(false);

    const severityClass =
        issue.severity === "critical" ? "severity-critical" :
        issue.severity === "warning" ? "severity-warning" : "severity-info";

    return (
        <div className="glass rounded-xl overflow-hidden card-hover">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-600 uppercase mono tracking-wide shrink-0 ${severityClass}`}>
                        {issue.severity}
                    </span>
                    <span className="text-sm font-500 text-foreground truncate syne">{issue.title}</span>
                </div>
                <div className="text-muted-foreground ml-2 shrink-0">
                    {expanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                </div>
            </button>

            {expanded && (
                <div className="px-4 pb-4 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{issue.description}</p>
                    {issue.recommendation && (
                        <div className="mt-3 p-3 rounded-xl"
                            style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.12)" }}>
                            <p className="mono text-xs text-primary font-500 mb-1">Recommendation</p>
                            <p className="text-xs text-muted-foreground">{issue.recommendation}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
