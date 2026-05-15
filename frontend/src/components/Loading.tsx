export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
            <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
            <span className="mono text-xs text-muted-foreground animate-pulse">Forging...</span>
        </div>
    );
}
