///api/news-claims/user/[userId]

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
import ArticleCard from "../../_components/claims";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import PeerModal from "../../_components/peer-modal";
import ClaimFormPage from "../submit-claim/page";
import CombinedAddClaim from "../../_components/combined-add-claim";
import { Input } from "@/components/ui/input";
import BigLoader from "../../_components/loading";

export default function Page() {
  const { user, isLoading } = useAuth();

  const {
    data: newsClaims,
    error,
    mutate,
  } = useSWR(user?.id ? `/api/news_claims/user/${user.id}` : null, fetcher);

  const [globalFilter, setGlobalFilter] = useState("");

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
  if (error) return <div>Error loading claims: {error.message}</div>;

  return (
    <div>
      <div className="flex items-center justify-center">
        <Input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="search-input max-w-[600px]"
        />
      </div>

      <div className="flex gap-2 m-4 flex-wrap" key={Date.now()}>
        {rows.map((row: any) => (
          <ArticleCard key={row.id} userId={user?.id} article={row.original} />
        ))}
      </div>
    </div>
  );
}
