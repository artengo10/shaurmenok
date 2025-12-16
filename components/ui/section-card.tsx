import { cn } from '@/lib/utils'

interface SectionCardProps {
    children: React.ReactNode
    className?: string
}

export default function SectionCard({ children, className }: SectionCardProps) {
    return (
        <div className={cn(
            "max-w-4xl mx-auto bg-card text-card-foreground p-8 rounded-lg shadow-md",
            className
        )}>
            {children}
        </div>
    )
}