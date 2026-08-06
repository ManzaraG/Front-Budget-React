import { Card, CardContent } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import type { StatCardData } from '../types/dashboard.type'

interface StatCardProps {
    stat: StatCardData
}

export const StatCardComponent = ({ stat }: StatCardProps) => {
    const { label, value, description, icon: Icon, iconBgClassName, iconColorClassName, valueClassName } = stat

    return (
        <Card className="py-5">
            <CardContent className="flex items-start justify-between px-5">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className={cn('text-2xl font-bold', valueClassName)}>{value}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-xl', iconBgClassName)}>
                    <Icon className={cn('size-5', iconColorClassName)} />
                </div>
            </CardContent>
        </Card>
    )
}
