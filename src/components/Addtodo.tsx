"use client"
import React, { useState, useTransition } from 'react'
import Image from "next/image"
import { NewTodo } from '@/lib/drizzle'
import { useRouter } from "next/navigation";
import Loader from './Loader';

const AddTodo = () => {
    const [loading, setLoading] = useState(false);

    const [task, setTask] = useState<NewTodo | null>(null);
    const { refresh } = useRouter();


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (task) {
                const res = await fetch("/api/todo", {
                    method: "POST",
                    body: JSON.stringify({
                        task: task.task
                    }),

                })
                setLoading(false);

                refresh();
                setTask(null)
                console.log(task.task)
            }
        } catch (error) {
            console.log("error")
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='w-full flex gap-x-3'>
                <input
                    onChange={(e) => setTask({ task: e.target.value })}
                    value={task?.task || ''}
                    className='rounded-full w-full py-3.5 px-5 border focus:outline-secondary' type="text" required/>
             <button type='submit' className='p-4 shrink-0 rounded-full bg-gradient-to-b from-primary to-secondary' >
             { loading?<Loader/>:   <Image src={"/vector.png"} width={20} height={20} alt='vector' />}   
                </button>
            </form>
        </div>
    )
}

export default AddTodo