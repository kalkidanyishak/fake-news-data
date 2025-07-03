"use client";

import useSWR from "swr";
import AddTodoForm from "./form";
import { deleteTodo } from "@/app/todos/actions";
import BigLoader from "@/app/(main)/_components/loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TodosPage() {
  const { data: todos, error, mutate } = useSWR("/api/todos", fetcher);

  if (error) return <div>Failed to load todos</div>;
  if (!todos) return <BigLoader/>




  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Todos</h1>
      <AddTodoForm mutate={mutate} />

      <ul className="space-y-2">
        {todos.map((todo: any) => (
          <li key={todo.id} className="flex justify-between items-center">
            <span>{todo.title}</span>
            <button
              className="text-red-600"
              onClick={() => deleteTodo(todo.id).then(() => mutate())}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
