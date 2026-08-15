import { useState } from 'react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { formatCurrency } from '@/shared/lib/currency'
import type { MonthlyFlow } from '../types/dashboard.type'

interface AnalyticsChartCardProps {
    data: MonthlyFlow[]
}

const WIDTH = 560
const HEIGHT = 200
const BAR_MAX_WIDTH = 20
const BAR_GAP = 3
const GRID_STEPS = 4
const NICE_STEPS = [50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000, 100000]

interface Hovered {
    index: number
    series: 'revenus' | 'depenses'
}

const roundedTopRectPath = (x: number, y: number, width: number, height: number, radius: number) => {
    if (height <= 0) return ''
    const r = Math.min(radius, width / 2, height)
    return `M ${x},${y + height} L ${x},${y + r} Q ${x},${y} ${x + r},${y} L ${x + width - r},${y} Q ${x + width},${y} ${x + width},${y + r} L ${x + width},${y + height} Z`
}

// Choisit un pas d'axe "rond" (50, 100, 200, 250, 500, 1000…) plutôt qu'une simple division brute.
const pickNiceStep = (maxValue: number, divisions: number) => {
    const rawStep = maxValue / divisions
    return NICE_STEPS.find((step) => step >= rawStep) ?? Math.ceil(rawStep / 10000) * 10000
}

export const AnalyticsChartCardComponent = ({ data }: AnalyticsChartCardProps) => {
    const [hovered, setHovered] = useState<Hovered | null>(null)

    const maxValue = Math.max(1, ...data.flatMap((point) => [point.revenus, point.depenses]))
    const step = pickNiceStep(maxValue, GRID_STEPS)
    const niceMax = step * GRID_STEPS
    const gridValues = Array.from({ length: GRID_STEPS + 1 }, (_, index) => step * (GRID_STEPS - index))

    const slotWidth = WIDTH / Math.max(data.length, 1)
    const barWidth = Math.min(BAR_MAX_WIDTH, slotWidth * 0.28)
    const valueToY = (value: number) => HEIGHT - (value / niceMax) * HEIGHT

    const summary = data
        .map((point) => `${point.label}: ${formatCurrency(point.revenus)} de revenus, ${formatCurrency(point.depenses)} de dépenses`)
        .join(' ; ')

    return (
        <Card className="py-6">
            <CardContent className="space-y-6 px-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">Revenus &amp; dépenses</h2>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <span className="size-2.5 rounded-full bg-emerald-500" />
                            Revenus
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="size-2.5 rounded-full bg-red-500" />
                            Dépenses
                        </span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div
                        className="flex shrink-0 flex-col justify-between py-1 text-xs text-muted-foreground"
                        style={{ height: HEIGHT }}
                    >
                        {gridValues.map((line) => (
                            <span key={line}>{formatCurrency(line)}</span>
                        ))}
                    </div>

                    <div className="relative min-w-0 flex-1 border-l pl-3">
                        {hovered && (
                            <div
                                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg bg-slate-900 px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
                                style={{
                                    left: `${((hovered.index * slotWidth + slotWidth / 2) / WIDTH) * 100}%`,
                                    top: `${(valueToY(data[hovered.index][hovered.series]) / HEIGHT) * 100}%`,
                                }}
                            >
                                <p className="font-medium text-white/70">
                                    {hovered.series === 'revenus' ? 'Revenus' : 'Dépenses'} · {data[hovered.index].label}
                                </p>
                                <p className="font-semibold">{formatCurrency(data[hovered.index][hovered.series])}</p>
                            </div>
                        )}

                        <svg
                            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                            preserveAspectRatio="none"
                            className="w-full overflow-visible"
                            style={{ height: HEIGHT }}
                            role="img"
                            aria-label={`Revenus et dépenses des 6 derniers mois. ${summary}`}
                        >
                            {gridValues.map((line, index) => (
                                <line
                                    key={line}
                                    x1={0}
                                    x2={WIDTH}
                                    y1={(index / GRID_STEPS) * HEIGHT}
                                    y2={(index / GRID_STEPS) * HEIGHT}
                                    stroke="currentColor"
                                    className="text-border"
                                />
                            ))}

                            {data.map((point, index) => {
                                const centerX = index * slotWidth + slotWidth / 2
                                const revenusX = centerX - barWidth - BAR_GAP / 2
                                const depensesX = centerX + BAR_GAP / 2
                                const revenusY = valueToY(point.revenus)
                                const depensesY = valueToY(point.depenses)

                                return (
                                    <g key={point.label}>
                                        <path
                                            d={roundedTopRectPath(revenusX, revenusY, barWidth, HEIGHT - revenusY, 4)}
                                            className="fill-emerald-500"
                                        />
                                        <path
                                            d={roundedTopRectPath(depensesX, depensesY, barWidth, HEIGHT - depensesY, 4)}
                                            className="fill-red-500"
                                        />
                                        <rect
                                            x={centerX - slotWidth / 2}
                                            y={0}
                                            width={slotWidth / 2}
                                            height={HEIGHT}
                                            fill="transparent"
                                            onMouseEnter={() => setHovered({ index, series: 'revenus' })}
                                            onMouseLeave={() => setHovered(null)}
                                        />
                                        <rect
                                            x={centerX}
                                            y={0}
                                            width={slotWidth / 2}
                                            height={HEIGHT}
                                            fill="transparent"
                                            onMouseEnter={() => setHovered({ index, series: 'depenses' })}
                                            onMouseLeave={() => setHovered(null)}
                                        />
                                    </g>
                                )
                            })}
                        </svg>

                        <div
                            className="mt-2 grid text-center text-xs text-muted-foreground"
                            style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
                        >
                            {data.map((point) => (
                                <span key={point.label}>{point.label.split(' ')[0]}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
