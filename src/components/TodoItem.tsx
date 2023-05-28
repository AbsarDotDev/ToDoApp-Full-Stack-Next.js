"use client";
import { NewTodo, Todo } from "@/lib/drizzle";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
function TodoItem({ id, task }: Todo) {
  const [disabled, setDisabled] = useState(true);
  const [newtask, setNewTask] = useState<Todo | null>({
    id: id,
    task: task,
  });

  const { refresh } = useRouter();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      if (id) {
        console.log(id);
        const body = JSON.stringify({ id: id });
        const res = await fetch("http://127.0.0.1:3000/api/todo", {
          method: "DELETE",

          body,
        });
        console.log(res);
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
        />
        {/* <p className="text-lg font-medium">{task}</p> */}
      </div>
      {disabled ? (
        <button onClick={() => setDisabled(false)}>
          <Image src={"./pencil.svg"} width={20} height={20} alt="L p charh" />
        </button>
      ) : (
        <button onClick={handleUpdate}>
                  <Image src={"./tick.svg"} width={20} height={20} alt="L p charh" />

        </button>
      )}
    </div>
  );
}

export default TodoItem;
