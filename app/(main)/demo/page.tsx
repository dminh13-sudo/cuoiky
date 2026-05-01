import DemoCounter from "@/components/Demo/DemoCounter";

export default function page() {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center  bg-white'>
            <div>
                <h2 className='text-3xl text-black'>Trang Demo nè</h2>
                <DemoCounter />
            </div>
        </div>
    )
}