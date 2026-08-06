import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { useLoginFormHook } from '@/features/auth/login'

export const LoginFormComponent = () => {
    const { loginForm, errorsLoginForm, onSubmitLoginForm, showPassword, setShowPassword, apiLogin } =
        useLoginFormHook()

    return (
        <div className="w-full max-w-sm">
            <div className="mb-8 space-y-2 text-center">
                <h1 className="text-2xl font-bold text-blue-600">Connexion</h1>
                <p className="text-sm text-muted-foreground">
                    Entrez vos identifiants pour accéder à votre budget
                </p>
            </div>

            <form onSubmit={onSubmitLoginForm} className="space-y-4">
                {/* Email */}
                <div className="space-y-1">
                    <div className="relative">
                        <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-blue-500/70" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            className="h-12 rounded-lg border-0 border-l-4 border-blue-600 bg-blue-50/70 pl-10 shadow-none focus-visible:ring-blue-500/40"
                            {...loginForm.register('email')}
                        />
                    </div>
                    {errorsLoginForm.email && (
                        <p className="pl-1 text-xs text-destructive">{errorsLoginForm.email.message}</p>
                    )}
                </div>

                {/* Mot de passe */}
                <div className="space-y-1">
                    <div className="relative">
                        <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-blue-500/70" />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                            className="h-12 rounded-lg border-0 border-l-4 border-blue-600 bg-blue-50/70 pr-10 pl-10 shadow-none focus-visible:ring-blue-500/40"
                            {...loginForm.register('motDePasse')}
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-blue-500/70 hover:text-blue-700"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {errorsLoginForm.motDePasse && (
                        <p className="pl-1 text-xs text-destructive">{errorsLoginForm.motDePasse.message}</p>
                    )}
                </div>

                {/* Se souvenir de moi & Mot de passe oublié */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="rememberMe"
                            checked={loginForm.watch('seSouvenirDeMoi')}
                            onCheckedChange={(checked) =>
                                loginForm.setValue('seSouvenirDeMoi', checked === true)
                            }
                            className="border-blue-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                        />
                        <Label htmlFor="rememberMe" className="cursor-pointer text-sm font-normal text-muted-foreground">
                            Se souvenir de moi
                        </Label>
                    </div>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                        Mot de passe oublié ?
                    </a>
                </div>

                <Button
                    type="submit"
                    disabled={apiLogin.isPending}
                    className="mt-2 h-12 w-full rounded-full bg-blue-600 text-base font-semibold tracking-wide text-white uppercase shadow-lg shadow-blue-600/30 hover:bg-blue-700"
                >
                    {apiLogin.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connexion...
                        </>
                    ) : (
                        'Se connecter'
                    )}
                </Button>
            </form>
        </div>
    )
}
