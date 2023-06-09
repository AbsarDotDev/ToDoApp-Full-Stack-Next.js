"use client";
import { NewTodo, Todo } from "@/lib/drizzle";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
function TodoItem({ id, task }: Todo) {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [newtask, setNewTask] = useState<Todo | null>({
    id: id,
    task: task,
  });

  const { refresh } = useRouter();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        const body = JSON.stringify({ id: id });
        const res = await fetch("/api/todo", {
          method: "DELETE",
          // headers:{
          //   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          //   'Access-Control-Allow-Origin': '*',
          //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',

          // },
          body,
        });
        setLoading(false);

        refresh();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleUpdate = async (e: any) => {
    setDisabled(true);
    e.preventDefault();
    try {
      if (newtask) {
        const res = await fetch("/api/todo", {
          method: "PUT",
          body: JSON.stringify({
            id: newtask.id,
            task: newtask.task,
          }),
        });
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className="bg-gray-100 py-4 px-4 flex items-center justify-between shadow rounded-lg my-5">
      {/* Circle */}
      <div className="flex items-center gap-x-2">
        {" "}
        <div className="h-3 w-3 bg-secondary rounded-full"></div>
        {/* Task Title */}
        <input
          type="text"
          onChange={(e) => setNewTask({ id, task: e.target.value })}
          value={newtask?.task || ""}
          disabled={disabled}
           className={`py-1 px-2 rounded-md ${disabled?'':'bg-red-100'}`}
        />
        {/* <p className="text-lg font-medium">{task}</p> */}
      </div>
      <div className="flex gap-x-5 items-center">
        {" "}
        {disabled ? (
          <button onClick={() => setDisabled(false)}>
            <Image
              src={"./pencil.svg"}
              width={20}
              height={20}
              alt="L p charh"
            />
          </button>
        ) : (
          <button onClick={handleUpdate}>
            <Image src={"./tick.svg"} width={20} height={20} alt="L p charh" />
          </button>
        )}
       {disabled?( loading? <Loader/>: <button onClick={handleDelete}>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 text-right hover:scale-110 duration-300 
"text-red-600"}`}
            style={{ justifySelf: "end" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
             
          </svg>
        </button>):<></>}
      </div>
    </div>
  );
}

export default TodoItem;
