"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "better-auth";
import { Badge } from "../ui/badge";
import { BadgeCheckIcon } from "lucide-react";

interface UserWithRole extends User {
  role?: string;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date | null;
}

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "emailVerified",
    header: "Status",
    cell: ({ row }) => {
      const emailVerified = row.getValue("emailVerified");
      if (emailVerified) {
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            <BadgeCheckIcon />
            Verified
          </Badge>
        );
      } else {
        return (
          <Badge
            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="destructive"
          >
            Unverified
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "banned",
    header: "Banned",
  },
  {
    accessorKey: "banReason",
    header: "Ban Reason",
  },
  {
    accessorKey: "banExpires",
    header: "Ban Expires",
  },
];
