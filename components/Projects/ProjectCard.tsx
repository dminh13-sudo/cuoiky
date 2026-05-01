type CardProps = {
    title: string;
    content: string;
    imageUrl: string;
}

export default function ProjectCard({ title, content, imageUrl }: CardProps) {
    return (
        <section className="w-64 border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex justify-center">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-40 object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                    {content}
                </p>
            </div>
        </section>
    )
}