import { Wallet } from 'lucide-react'
import { LoginFormComponent } from '@/features/auth/login'

export const LoginPage = () => {
    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Panneau de branding */}
            <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-linear-to-br from-blue-500 via-blue-600 to-blue-800 p-12 text-white lg:flex">
                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 800 1000"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <path d="M0 240 C 220 130, 420 360, 800 190 L800 0 L0 0 Z" fill="white" fillOpacity="0.07" />
                    <path d="M0 680 C 260 560, 520 830, 800 680 L800 1000 L0 1000 Z" fill="white" fillOpacity="0.06" />
                    <path d="M0 820 C 260 700, 560 980, 800 820 L800 1000 L0 1000 Z" fill="black" fillOpacity="0.08" />
                    <g stroke="white" strokeOpacity="0.08">
                        <line x1="0" y1="100" x2="800" y2="100" />
                        <line x1="0" y1="200" x2="800" y2="200" />
                        <line x1="100" y1="0" x2="100" y2="1000" />
                        <line x1="220" y1="0" x2="220" y2="1000" />
                    </g>
                </svg>
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 1000" fill="none">
                    <circle cx="700" cy="90" r="36" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
                    <circle cx="70" cy="480" r="5" fill="white" fillOpacity="0.5" />
                    <circle cx="640" cy="860" r="46" fill="white" fillOpacity="0.1" />
                </svg>

                <div className="absolute top-8 left-8 flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
                    <span className="flex size-7 items-center justify-center rounded-full border border-white/60">
                        <Wallet className="size-3.5" />
                    </span>
                    Budget
                </div>

                <div className="relative z-10 max-w-sm space-y-4">
                    <p className="text-white/80">Ravi de vous revoir</p>
                    <h1 className="text-4xl leading-tight font-extrabold">BON RETOUR</h1>
                    <div className="h-1 w-14 rounded-full bg-white/80" />
                    <p className="leading-relaxed text-white/70">
                        Suivez vos dépenses, gérez votre budget et gardez le contrôle de vos finances
                        personnelles, où que vous soyez.
                    </p>
                </div>
            </div>

            {/* Panneau de connexion */}
            <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
                <LoginFormComponent />
            </div>
        </div>
    )
}
