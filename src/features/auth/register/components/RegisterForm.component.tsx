import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { useRegisterFormHook } from '@/features/auth/register'

export const RegisterFormComponent = () => {
    const {
        registerForm,
        errorsRegisterForm,
        onSubmitRegisterForm,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        apiRegister,
    } = useRegisterFormHook()

    return (
        <div className="w-full max-w-sm">
            <div className="mb-8 space-y-2 text-center">
                <h1 className="text-2xl font-bold text-blue-600">Créer un compte</h1>
                <p className="text-sm text-muted-foreground">
                    Inscrivez-vous pour commencer à gérer votre budget
                </p>
            </div>

            <form onSubmit={onSubmitRegisterForm} className="space-y-4">
                {/* Prénom & Nom */}
                <div className="flex gap-3">
                    <div className="flex-1 space-y-1">
                        <div className="relative">
                            <User className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-blue-500/70" />
                            <Input
                                id="prenom"
                                type="text"
                                placeholder="Prénom"
                                autoComplete="given-name"
                                className="h-12 rounded-lg border-0 border-l-4 border-blue-600 bg-blue-50/70 pl-10 shadow-none focus-visible:ring-blue-500/40"
                                {...registerForm.register('prenom')}
                            />
                        </div>
                        {errorsRegisterForm.prenom && (
                            <p className="pl-1 text-xs text-destructive">{errorsRegisterForm.prenom.message}</p>
                        )}
                    </div>

                    <div className="flex-1 space-y-1">
                        <div className="relative">
                            <User className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-blue-500/70" />
                            <Input
                                id="nom"
                                type="text"
                                placeholder="Nom"
                                autoComplete="family-name"
                                className="h-12 rounded-lg border-0 border-l-4 border-blue-600 bg-blue-50/70 pl-10 shadow-none focus-visible:ring-blue-500/40"
                                {...registerForm.register('nom')}
                            />
                        </div>
                        {errorsRegisterForm.nom && (
                            <p className="pl-1 text-xs text-destructive">{errorsRegisterForm.nom.message}</p>
                        )}
                    </div>
                </div>

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
                            {...registerForm.register('email')}
                        />
                    </div>
                    {errorsRegisterForm.email && (
                        <p className="pl-1 text-xs text-destructive">{errorsRegisterForm.email.message}</p>
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
                            autoComplete="new-password"
                            className="h-12 rounded-lg border-0 border-l-4 border-blue-600 bg-blue-50/70 pr-10 pl-10 shadow-none focus-visible:ring-blue-500/40"
                            {...registerForm.register('motDePasse')}
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
                    {errorsRegisterForm.motDePasse && (
                        <p className="pl-1 text-xs text-destructive">{errorsRegisterForm.motDePasse.message}</p>
                    )}
                </div>

                {/* Confirmation mot de passe */}
                <div className="space-y-1">
                    <div className="relative">
                        <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-blue-500/70" />
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirmer le mot de passe"
                            autoComplete="new-password"
                            className="h-12 rounded-lg border-0 border-l-4 border-blue-600 bg-blue-50/70 pr-10 pl-10 shadow-none focus-visible:ring-blue-500/40"
                            {...registerForm.register('confirmationMotDePasse')}
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-blue-500/70 hover:text-blue-700"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {errorsRegisterForm.confirmationMotDePasse && (
                        <p className="pl-1 text-xs text-destructive">
                            {errorsRegisterForm.confirmationMotDePasse.message}
                        </p>
                    )}
                </div>

                {/* Acceptation des conditions */}
                <div className="space-y-1 pt-1">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="accepteConditions"
                            checked={registerForm.watch('accepteConditions')}
                            onCheckedChange={(checked) =>
                                registerForm.setValue('accepteConditions', checked === true)
                            }
                            className="border-blue-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                        />
                        <Label
                            htmlFor="accepteConditions"
                            className="cursor-pointer text-sm font-normal text-muted-foreground"
                        >
                            J'accepte les conditions d'utilisation
                        </Label>
                    </div>
                    {errorsRegisterForm.accepteConditions && (
                        <p className="pl-1 text-xs text-destructive">
                            {errorsRegisterForm.accepteConditions.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={apiRegister.isPending}
                    className="mt-2 h-12 w-full rounded-full bg-blue-600 text-base font-semibold tracking-wide text-white uppercase shadow-lg shadow-blue-600/30 hover:bg-blue-700"
                >
                    {apiRegister.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Création...
                        </>
                    ) : (
                        'Créer mon compte'
                    )}
                </Button>

                <p className="pt-2 text-center text-sm text-muted-foreground">
                    Déjà un compte ?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Se connecter
                    </Link>
                </p>
            </form>
        </div>
    )
}
