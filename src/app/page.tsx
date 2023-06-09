import AddTodo from '@/components/Addtodo'
import TodoList from '@/components/TodoList'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='bg-gradient-to-tr from-primary to-secondary h-screen
    flex flex-col justify-center items-center '>
      <div className='px-6 py-8  rounded-xl bg-gradient-to-br from-[#D9D9D9]/50 to-[#D9D9D9]/60  backdrop-blur-xl w-full max-w-md'>
        {/* Todo List */}
        {/* @ts-ignore */}
        <TodoList />
        {/* Add Todo */}
        <AddTodo />

        {/* Bar */}
        <div className='w-1/2 h-1.5 bg-black/80 rounded mx-auto mt-6 '></div>
      </div>
      <div className='mt-[100px]'> <h1 className='text-4xl text-white'>Made By Absar Ali</h1></div>
    </main>
  )
}
