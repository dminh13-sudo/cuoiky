import ProjectCard from "@/components/Projects/ProjectCard";

// Data mẫu nè
const projects = [
    {
        title: "ChatGPT",
        imageUrl: "https://westmountflorist.com/cdn/shop/articles/freya-ingva-6P9JgFe3f9Q-unsplash.jpg?v=1725909146&width=2048",
        content: "Mô hình ngôn ngữ lớn được phát triển bởi OpenAI, hỗ trợ hội thoại tự nhiên, lập trình và nhiều tác vụ phức tạp.",
    },
    {
        title: "Figma",
        imageUrl: "https://westmountflorist.com/cdn/shop/articles/freya-ingva-6P9JgFe3f9Q-unsplash.jpg?v=1725909146&width=2048",
        content: "Công cụ thiết kế UI/UX trên nền web, cho phép cộng tác thời gian thực và tạo prototype tương tác.",
    },
    {
        title: "Vercel",
        imageUrl: "https://westmountflorist.com/cdn/shop/articles/freya-ingva-6P9JgFe3f9Q-unsplash.jpg?v=1725909146&width=2048",
        content: "Nền tảng deploy ứng dụng frontend hiện đại, tích hợp CI/CD tự động với GitHub và tối ưu cho Next.js.",
    },
];

export default function page() {
    return (
        <div className='h-screen flex flex-col justify-center items-center gap-8 bg-white'>
            <h2 className='text-3xl text-black'>Trang project nè</h2>
            <div className="flex gap-4">
                {projects.map((item, index) => (
                    <ProjectCard key={index} imageUrl={item.imageUrl} title={item.title} content={item.content} />
                ))}
            </div>
        </div>
    )
}