"use client";

import { fetcher } from "@/lib/fetcher";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useSWR from "swr";
import { useState } from "react";
import ArticleCard from "../_components/claims";
import { Input } from "@/components/ui/input";
import BigLoader from "../_components/loading";

export default function Page() {
  const {
    data: newsClaims,
    error,
    mutate,
  } = useSWR("/api/news_claims", fetcher);
  const [globalFilter, setGlobalFilter] = useState("");

  if(newsClaims){
    console.log(JSON.stringify(newsClaims));
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "summary",
      header: "Summary",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "why",
      header: "Reason",
    },
  ];

  const table = useReactTable({
    data: newsClaims || [],
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const rows = table.getRowModel().rows;

  if (!newsClaims) return <BigLoader/>

  return (
    <div>
      <div className="flex items-center justify-center flex-col mt-4">
        <Input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="border max-w-[600px]"
        />
      </div>

      <div className="flex gap-2 m-4 flex-wrap">
        {rows.map((row: any) => (
          <ArticleCard adminMode={true} key={row.id} article={row.original} />
        ))}
      </div>
    </div>
  );
}
