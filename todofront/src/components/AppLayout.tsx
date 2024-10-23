import {Outlet} from "react-router-dom"

export default function AppLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='text-center bg-cyan-900 shadow-md text-white py-5'>
        <h1 className='text-2xl font-bold'>Welcome to Daily Task Report APP</h1>
        </header>
      <main className='flex-grow container mx-auto p-6 bg-gray-300'>
        <Outlet/>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className='text-sm'> &copy; {new Date().getFullYear()} All Rights Reserved</p>
        </footer>
    </div>
  )
}
