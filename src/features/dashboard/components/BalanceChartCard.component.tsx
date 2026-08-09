import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import type { BalancePoint } from '../types/dashboard.type'

interface BalanceChartCardProps {
    data: BalancePoint[]
}

const WIDTH = 560
const HEIGHT = 180

export const BalanceChartCardComponent = ({ data }: BalanceChartCardProps) => {
    const values = data.map((point) => point.value)
    const rawMin = Math.min(...values, 0)
    const rawMax = Math.max(...values, 0)
    const padding = Math.max((rawMax - rawMin) * 0.15, 100)
    const MIN_VALUE = Math.floor((rawMin - padding) / 100) * 100
    const MAX_VALUE = Math.ceil((rawMax + padding) / 100) * 100
    const GRID_LINES = Array.from({ length: 5 }, (_, index) => MIN_VALUE + ((MAX_VALUE - MIN_VALUE) * (4 - index)) / 4)

    const stepX = WIDTH / Math.max(data.length - 1, 1)
    const points = data.map((point, index) => ({
        ...point,
        x: index * stepX,
        y: HEIGHT - ((point.value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * HEIGHT,
    }))
    const lastPoint = points[points.length - 1]

    const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`).join(' ')
    const areaPath = `${linePath} L ${lastPoint.x},${HEIGHT} L ${points[0].x},${HEIGHT} Z`

    return (
        <Card className="h-full py-6">
            <CardContent className="space-y-6 px-6">
                <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold">Évolution du solde</h2>
                    <button
                        type="button"
                        className="flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs text-muted-foreground"
                    >
                        6 derniers mois
                        <ChevronDown className="size-3.5" />
                    </button>
                </div>

                <div className="flex gap-3">
                    <div
                        className="flex shrink-0 flex-col justify-between py-1 text-xs text-muted-foreground"
                        style={{ height: HEIGHT }}
                    >
                        {GRID_LINES.map((line) => (
                            <span key={line}>{line.toLocaleString('fr-FR')} €</span>
                        ))}
                    </div>

                    <div className="relative min-w-0 flex-1 border-l pl-3">
                        <div
                            className="absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg bg-slate-900 px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
                            style={{ left: `${(lastPoint.x / WIDTH) * 100}%`, top: `${(lastPoint.y / HEIGHT) * 100}%` }}
                        >
                            <p className="font-medium text-white/70">{lastPoint.label}</p>
                            <p className="font-semibold">{lastPoint.value.toLocaleString('fr-FR')} €</p>
                        </div>

                        <svg
                            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                            preserveAspectRatio="none"
                            className="w-full overflow-visible"
                            style={{ height: HEIGHT }}
                        >
                            <defs>
                                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" className="text-blue-600" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-blue-600" />
                                </linearGradient>
                            </defs>
                            {GRID_LINES.map((line, index) => (
                                <line
                                    key={line}
                                    x1={0}
                                    x2={WIDTH}
                                    y1={(index / (GRID_LINES.length - 1)) * HEIGHT}
                                    y2={(index / (GRID_LINES.length - 1)) * HEIGHT}
                                    stroke="currentColor"
                                    strokeDasharray="4 4"
                                    className="text-border"
                                />
                            ))}
                            <path d={areaPath} fill="url(#balanceGradient)" />
                            <path
                                d={linePath}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-600"
                            />
                            {points.map((point) => (
                                <circle
                                    key={point.label}
                                    cx={point.x}
                                    cy={point.y}
                                    r={point === lastPoint ? 5 : 3.5}
                                    fill="white"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    className="text-blue-600"
                                />
                            ))}
                        </svg>

                        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
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
