import Link from "next/link";

export default function Header(){
    return (
        <section className="flex justify-between items-center bg-gray-100 text-black px-7 py-5 font-bold">
            <Link href='/' className="p-2 border rounded px-5">Daisy</Link>
            <div className="flex gap-10">
                <Link href='/projects' className="p-2">Projects</Link>
                <Link href='/about' className="p-2">About</Link>
                <Link href='/contact' className="p-2">Contact</Link>
                <Link href='/demo' className="p-2">Demo</Link>
            </div>
        </section>
    )
}