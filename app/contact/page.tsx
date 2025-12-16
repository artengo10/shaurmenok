export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-card text-card-foreground p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6">Контакты</h1>
                <div className="space-y-4 text-muted-foreground">
                    <p className="flex items-center gap-2">
                        <span>📍</span>
                        <span> Адрес: ул. Исполкома, 6/2 </span>
                    </p>
                    <p className="flex items-center gap-2">
                        <span>📞</span>
                        <span>Телефон: +7 (969) 625-20-20</span>
                        <span> +7 (831) 2-146-114 </span>
                    </p>
                </div>
            </div>
        </div>
    )
}