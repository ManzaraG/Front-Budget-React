import { Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

interface DashboardHeaderProps {
    selectedMonth: Date
    onSelectedMonthChange: (date: Date) => void
    onAddTransaction: () => void
    canAddTransaction: boolean
}

const MONTH_LABELS = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
]

const YEAR_RANGE = 5

const buildYearOptions = () => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: YEAR_RANGE + 1 }, (_, index) => currentYear - YEAR_RANGE + index)
}

export const DashboardHeaderComponent = ({
    selectedMonth,
    onSelectedMonthChange,
    onAddTransaction,
    canAddTransaction,
}: DashboardHeaderProps) => {
    const yearOptions = buildYearOptions()

    return (
        <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <Select
                    value={String(selectedMonth.getMonth())}
                    onValueChange={(value) =>
                        onSelectedMonthChange(new Date(selectedMonth.getFullYear(), Number(value), 1))
                    }
                >
                    <SelectTrigger className="w-36 text-base font-semibold">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {MONTH_LABELS.map((label, index) => (
                            <SelectItem key={label} value={String(index)}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={String(selectedMonth.getFullYear())}
                    onValueChange={(value) =>
                        onSelectedMonthChange(new Date(Number(value), selectedMonth.getMonth(), 1))
                    }
                >
                    <SelectTrigger className="w-24 text-base font-semibold">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {yearOptions.map((year) => (
                            <SelectItem key={year} value={String(year)}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    onClick={onAddTransaction}
                    disabled={!canAddTransaction}
                    title={!canAddTransaction ? 'Créez un compte avant d’ajouter une transaction' : undefined}
                    className="rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="size-4" />
                    <span className="hidden sm:inline">Ajouter une transaction</span>
                    <span className="sm:hidden">Ajouter</span>
                </Button>
            </div>
        </header>
    )
}
