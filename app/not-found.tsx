import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-8'>
      <h2 className='text-3xl'>Ỏ Trang này hong có tồn tại ùi! Tiếc ha :3</h2>
      <div><Link className='bg-white text-black p-4' href="/">Quay lại trang chủ</Link></div>
    </div>
  )
}