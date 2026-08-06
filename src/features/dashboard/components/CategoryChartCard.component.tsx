import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import type { CategorySpend } from '../types/dashboard.type'

interface CategoryChartCardProps {
    categories: CategorySpend[]
    total: number
}

const SIZE = 160
const STROKE = 26

export const CategoryChartCardComponent = ({ categories, total }: CategoryChartCardProps) => {
    const radius = (SIZE - STROKE) / 2

    let cumulativePercent = 0
    const segments = categories.map((category) => {
        const segment = { ...category, cumulativeBefore: cumulativePercent }
        cumulativePercent += category.percent
        return segment
    })

    return (
        <Card className="h-full py-6">
            <CardContent className="space-y-6 px-6">
                <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold">Dépenses par catégorie</h2>
                    <button
                        type="button"
                        className="flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs text-muted-foreground"
                    >
                        Ce mois-ci
                        <ChevronDown className="size-3.5" />
                    </button>
                </div>

                <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
                        <svg width={SIZE} height={SIZE} className="-rotate-90">
                            {segments.map((segment) => (
                                <circle
                                    key={segment.id}
                                    cx={SIZE / 2}
                                    cy={SIZE / 2}
                                    r={radius}
                                    strokeWidth={STROKE}
                                    fill="none"
                                    stroke="currentColor"
                                    pathLength={100}
                                    strokeDasharray={`${Math.max(segment.percent - 1, 0)} ${100 - segment.percent + 1}`}
                                    strokeDashoffset={-segment.cumulativeBefore}
                                    className={segment.colorClassName}
                                />
                            ))}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-lg font-bold">
                                {total.toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'EUR',
                                    maximumFractionDigits: 0,
                                })}
                            </span>
                            <span className="text-xs text-muted-foreground">Total</span>
                        </div>
                    </div>

                    <ul className="w-full min-w-0 space-y-2.5">
                        {categories.map((category) => (
                            <li key={category.id} className="flex items-center gap-2 text-sm">
                                <span className={`size-2.5 shrink-0 rounded-full ${category.dotClassName}`} />
                                <span className="flex-1 truncate">{category.label}</span>
                                <span className="shrink-0 font-medium">{category.value} €</span>
                                <span className="w-12 shrink-0 text-right text-xs text-muted-foreground">
                                    {category.percent.toFixed(1)} %
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}
