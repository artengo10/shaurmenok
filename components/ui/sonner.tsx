'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            position="bottom-right"
            duration={3000}
            toastOptions={{
                classNames: {
                    // Общие стили для всех уведомлений
                    toast:
                        'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg border-2 rounded-xl p-4 font-sans',
                    title: 'font-semibold text-base',
                    description: 'group-[.toast]:text-muted-foreground text-sm mt-1',
                    actionButton:
                        'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground rounded-md px-3 py-1 text-sm font-medium',
                    cancelButton:
                        'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground rounded-md px-3 py-1 text-sm font-medium',

                    // Стили для разных типов уведомлений
                    success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950',
                    error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950',
                    warning: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950',
                    info: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950',
                },
            }}
            {...props}
        />
    )
}

export { Toaster }