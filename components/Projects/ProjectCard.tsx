type CardProps = {
    title: string;
    content: string;
    imageUrl: string;
}

export default function ProjectCard({ title, content, imageUrl }: CardProps) {
    return (
        <section className="w-64 border border-lux-line rounded-xl overflow-hidden bg-lux-card">
            <div className="flex justify-center">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-40 object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-lux-text mb-1">
                    {title}
                </h3>
                <p className="text-sm text-lux-muted leading-relaxed">
                    {content}
                </p>
            </div>
        </section>
    )
}