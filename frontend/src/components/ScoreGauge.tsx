interface ScoreGaugeProps {
    score: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
}

export default function ScoreGauge({ score, size = 140, strokeWidth = 10, label }: ScoreGaugeProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;
    const offset = circumference - progress;

    const getColor = (s: number) => {
        if (s >= 80) return "#34d399";
        if (s >= 50) return "#fbbf24";
        return "#fb7185";
    };

    const color = getColor(score);

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                   
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth={strokeWidth} />
                  
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: offset,
                            filter: `drop-shadow(0 0 4px ${color}80)`,
                            transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1), stroke 1.5s ease-in-out",
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="syne font-700" style={{ fontSize: size * 0.26, color }}>
                        {score}
                    </span>
                </div>
            </div>
            {label && <span className="mono text-xs font-500 text-muted-foreground">{label}</span>}
        </div>
    );
}
