// Vì dùng useEffect, useState nên phải khai báo use client | mặc định component thì nên khai báo use client nhé!

'use client'
import { useEffect, useState } from "react"

export default function DemoCounter() {
    const [count, setCount] = useState(0)

    // Cách dùng useEffect
    // 1. Chạy 1 lần khi Mount: useEffect(() => { ... }, []) (mảng rỗng).
    // 2. Chạy khi State/Props thay đổi: useEffect(() => { ... }, [data]) (chạy khi data thay đổi).
    
    // Bro này sẽ có tác dụng khi biến mảng rỗng, dựa vào cách sồ 1 á
    useEffect(()=>{
        alert(`Cách số 1: ${count}`)
    }, [])

    
    // Bro này sẽ có tác dụng khi biến count thay đổi, dựa vào cách sồ 2 á
    useEffect(()=>{
        alert(`Cách số 2: ${count}`)
    }, [count])


    return (
        <div>
            <div className="text-5xl text-black font-bold">
                Tập đếm nha: {count}
            </div>
            <div className="text-5xl text-black font-bold mt-5 text-center flex gap-2">
                <button onClick={()=> setCount(count + 1)} className="w-15 h-15 bg-green-500 flex justify-center items-center cursor-pointer rounded">+</button>
                <button onClick={()=> setCount(count - 1)} className="w-15 h-15 bg-green-500 flex justify-center items-center cursor-pointer rounded">-</button>
            </div>
        </div>
    )
}