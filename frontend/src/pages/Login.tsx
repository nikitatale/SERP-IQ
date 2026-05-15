import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader2, User2Icon, ArrowRightIcon, EyeIcon, EyeOffIcon } from "lucide-react";

function RankForgeLogo({ size = 22 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 26 L12 10 L18 19 L22 13" stroke="url(#lgl1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="22" cy="13" r="3" fill="url(#lgl1)"/>
            <defs>
                <linearGradient id="lgl1" x1="6" y1="26" x2="22" y2="10" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a855f7"/>
                    <stop offset="1" stopColor="#e879f9"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

export default function Login({ state }: { state: string }) {
    const [isLoginState, setIsLoginState] = useState(state === "login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen flex items-stretch">
        
            <div className="hidden lg:flex flex-col justify-between w-2/5 p-10 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #07070d 0%, #0e0e1a 100%)", borderRight: "1px solid var(--border)" }}>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-80 h-80 rounded-full opacity-30"
                        style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.5) 0%, transparent 70%)", filter: "blur(60px)" }}
                    />
                    <div className="absolute bottom-[10%] right-[-10%] w-60 h-60 rounded-full opacity-20"
                        style={{ background: "radial-gradient(ellipse, rgba(240,171,252,0.5) 0%, transparent 70%)", filter: "blur(80px)" }}
                    />
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                </div>

                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-2.5">
                        <RankForgeLogo size={24} />
                        <span className="syne text-xl font-700 gradient-text">RankForge</span>
                    </Link>
                </div>

                <div className="relative z-10">
                    <blockquote className="text-2xl syne font-600 text-white/90 leading-snug mb-4">
                        "Forge your path<br/>to the top of<br/><span className="gradient-text">search rankings</span>"
                    </blockquote>
                    <p className="text-sm text-white/40 mono">AI-Powered SEO Engine</p>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    {[85, 92, 78, 95, 88].map((score, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div className="w-6 rounded-full" style={{ height: `${score * 0.5}px`, background: `rgba(168,85,247,${0.3 + i * 0.1})` }} />
                            <span className="mono text-[9px] text-white/30">{score}</span>
                        </div>
                    ))}
                    <span className="mono text-xs text-white/30 ml-2">SEO Scores</span>
                </div>
            </div>

           
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
                <div className="w-full max-w-sm">
                 
                    <div className="lg:hidden text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2.5">
                            <RankForgeLogo size={22} />
                            <span className="syne text-xl font-700 gradient-text">RankForge</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="syne text-2xl font-700 text-foreground mb-1">
                            {isLoginState ? "Welcome back" : "Create account"}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {isLoginState ? "Sign in to your RankForge account" : "Start forging your rankings today"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLoginState && (
                            <div>
                                <label className="inline-flex text-xs font-500 text-muted-foreground mb-1.5 mono uppercase tracking-wide">
                                <User2Icon size={12} className="text-muted-foreground" />
                                </label>
                                <div className="relative">
                                  
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your full name"
                                        className="input-forge pl-10"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-500 text-muted-foreground mb-1.5 mono uppercase tracking-wide inline-flex">
                               <Mail size={12} className="text-muted-foreground" />
                            </label>
                            <div className="relative">
                        
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="input-forge pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-500 text-muted-foreground mb-1.5 mono uppercase tracking-wide inline-flex">
                               <Lock size={12} className="text-muted-foreground" />
                            </label>
                            <div className="relative">
                               
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input-forge pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            id="login-submit-btn"
                            className="btn-forge w-full py-3 text-sm text-white flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <>
                                    {isLoginState ? "Sign In" : "Create Account"}
                                    <ArrowRightIcon size={14} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            {isLoginState ? "New to RankForge?" : "Already have an account?"}
                            <button
                                onClick={() => setIsLoginState((prev) => !prev)}
                                className="text-primary hover:text-accent font-500 pl-1.5 transition-colors"
                            >
                                {isLoginState ? "Create account" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
