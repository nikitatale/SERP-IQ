import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { LogOut, Menu, X, Sun, Moon, LayoutDashboard, SearchCheck, TrendingUp, FileText } from "lucide-react";
import { useState } from "react";

function RankForgeLogo({ size = 22 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 26 L12 10 L18 19 L22 13" stroke="url(#lg1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="22" cy="13" r="3" fill="url(#lg1)"/>
            <defs>
                <linearGradient id="lg1" x1="6" y1="26" x2="22" y2="10" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a855f7"/>
                    <stop offset="1" stopColor="#e879f9"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

export default function Navbar() {
    const user = { name: "John", email: "john@example.com", plan: "PRO" };
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => navigate("/");
    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
        { path: "/analyze", label: "SEO Analyzer", icon: <SearchCheck size={16} /> },
        { path: "/rank-tracker", label: "Rank Tracker", icon: <TrendingUp size={16} /> },
        { path: "/history", label: "Reports", icon: <FileText size={16} /> },
    ];

    return (
        <nav className="fixed top-0 w-full z-50">
            <div className="glass-strong border-b border-border/50 mx-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                     
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <RankForgeLogo size={22} />
                            <div className="flex flex-col leading-none">
                                <span className="syne text-[16px] font-700 font-bold tracking-tight gradient-text">RankForge</span>
                            </div>
                        </Link>

                    
                        {user && (
                            <div className="hidden md:flex items-center gap-0.5">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                                            isActive(link.path)
                                                ? "text-primary bg-primary/8 border border-primary/15"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                        }`}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}

                       
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-all"
                            >
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            </button>

                            {user ? (
                                <>
                                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-border bg-card/60 text-sm backdrop-blur-sm">
                                        <div className="w-6 h-6 rounded-lg gradient-bg flex items-center justify-center text-xs font-bold text-white">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="text-foreground text-[13px] font-medium">{user.name}</span>
                                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-primary/10 text-primary mono">{user.plan}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-muted-foreground hover:text-danger hover:bg-danger/5 transition-all"
                                    >
                                        <LogOut size={14} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                                        Log In
                                    </Link>
                                    <Link to="/register" className="btn-forge px-5 py-2 text-[13px] text-white">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                       
                        <div className="flex items-center gap-2 md:hidden">
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-all"
                            >
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                            <button
                                className="text-muted-foreground hover:text-foreground p-2 hover:bg-muted/60 rounded-lg transition-all"
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

           
            {mobileOpen && (
                <div className="md:hidden glass-strong border-b border-border/50">
                    <div className="px-4 py-3 space-y-1">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-muted/40 border border-border">
                                    <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-sm font-bold text-white">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground syne">{user.name}</div>
                                        <div className="text-xs text-muted-foreground mono">{user.email}</div>
                                    </div>
                                    <span className="ml-auto px-2 py-0.5 rounded-md text-[10px] font-bold uppercase mono bg-primary/10 text-primary">{user.plan}</span>
                                </div>
                                <div className="py-2 space-y-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                                                isActive(link.path)
                                                    ? "bg-primary/8 text-primary border border-primary/15"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                            }`}
                                        >
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                                <button
                                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-danger hover:bg-danger/8 w-full mt-1"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="py-2 space-y-2">
                                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-[13px] font-medium text-foreground text-center rounded-xl hover:bg-muted/60">
                                    Log In
                                </Link>
                                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-forge block px-3 py-2.5 text-[13px] text-white text-center">
                                    Get Started Free
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export { RankForgeLogo };
