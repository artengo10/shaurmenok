'use client'

import {
    Tabs,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'

interface CartTabsProps {
    value: string
    onValueChange: (value: string) => void
}

export default function CartTabs({ value, onValueChange }: CartTabsProps) {
    return (
        <Tabs value={value} onValueChange={onValueChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-lg">
                <TabsTrigger
                    value="delivery"
                    className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                    Доставка
                </TabsTrigger>
                <TabsTrigger
                    value="pickup"
                    className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                    Самовывоз
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}