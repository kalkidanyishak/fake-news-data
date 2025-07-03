"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTodo } from "@/app/todos/actions";

export default function AddTodoForm({ mutate }: { mutate: () => void }) {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          await createTodo(title);
          setTitle("");
          mutate();
        });
      }}
      className="flex space-x-2"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo..."
        className="border px-2 py-1 rounded w-full"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add
      </button>
    </form>
  );
}
