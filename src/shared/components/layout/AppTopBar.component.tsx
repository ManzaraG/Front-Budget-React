import { Bell, Moon, Search, Sun } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useTheme } from './ThemeProvider'

interface AppTopBarProps {
    title: string
    searchQuery?: string
    onSearchChange?: (value: string) => void
    searchPlaceholder?: string
    notificationCount?: number
}

export const AppTopBarComponent = ({
    title,
    searchQuery,
    onSearchChange,
    searchPlaceholder = 'Rechercher...',
    notificationCount = 0,
}: AppTopBarProps) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="flex items-center gap-4 border-b bg-card px-6 py-3.5">
            <h1 className="shrink-0 text-[15px] font-medium text-foreground">{title}</h1>

            {onSearchChange && (
                <div className="relative mx-auto w-full max-w-xl">
                    <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        value={searchQuery ?? ''}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder={searchPlaceholder}
                        aria-label={searchPlaceholder}
                        className="h-10 rounded-full border-none bg-muted/50 pl-10 shadow-none focus-visible:ring-ring/40"
                    />
                </div>
            )}

            <div className="ml-auto flex shrink-0 items-center gap-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    title={theme === 'dark' ? 'Passer en clair' : 'Passer en sombre'}
                    className="rounded-full text-muted-foreground"
                >
                    {theme === 'dark' ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
                </Button>

                <Button type="button" variant="ghost" size="icon" title="Notifications" className="relative rounded-full text-muted-foreground">
                    <Bell className="size-4.5" />
                    {notificationCount > 0 && (
                        <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-semibold text-white">
                            {notificationCount}
                        </span>
                    )}
                </Button>
            </div>
        </div>
    )
}
