/**
 * Point d'accès unique aux variables d'environnement VITE_*.
 */

if (!import.meta.env.VITE_API_BASE_URL) {
    console.warn('[env] VITE_API_BASE_URL est manquant : les appels API échoueront.')
}

export const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
    appName: import.meta.env.VITE_APP_NAME ?? 'Budget',
} as const
