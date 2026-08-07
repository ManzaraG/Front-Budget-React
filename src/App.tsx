import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/lib/queryClient'
import { AuthLayout, RequireAuth } from '@/shared/components/layout'
import { Toaster } from '@/shared/components/ui'
import { LoginPage, RegisterPage, DashboardPage } from '@/pages'

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>

                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<DashboardPage />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
            <Toaster />
        </QueryClientProvider>
    )
}

export default App
