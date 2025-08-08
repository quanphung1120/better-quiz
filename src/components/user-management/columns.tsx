"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "better-auth";
import { Badge } from "../ui/badge";
import { BanIcon } from "lucide-react";
import { Button } from "../ui/button";

interface UserWithRole extends User {
  role?: string;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date | null;
}

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "emailVerified",
  //   header: "Verified",
  //   cell: ({ row }) => {
  //     const emailVerified = row.getValue("emailVerified");

  //     if (emailVerified) {
  //       return (
  //         <Badge
  //           variant="secondary"
  //           className="bg-blue-500 text-white dark:bg-blue-600"
  //         >
  //           <BadgeCheckIcon />
  //         </Badge>
  //       );
  //     } else {
  //       return (
  //         <Badge
  //           className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
  //           variant="destructive"
  //         >
  //           Unverified
  //         </Badge>
  //       );
  //     }
  //   },
  // },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const value = row.getValue("role") as string;
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      return <div>{capitalized}</div>;
    },
  },
  {
    accessorKey: "banned",
    header: "Banned",
    cell: ({ row }) => {
      const banned = row.getValue("banned");
      if (banned) {
        return (
          <Badge
            variant="destructive"
            className="h-5 min-w-5 rounded-full px-1"
          >
            Banned
          </Badge>
        );
      } else {
        return (
          <Badge variant="default" className="h-5 min-w-5 rounded-full px-1">
            Normal
          </Badge>
        );
      }
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const banned = row.getValue("banned");

      if (banned) {
        return null;
      }

      return (
        <div className="flex gap-2">
          <Button variant="destructive" size="sm">
            <BanIcon className="size-3" />
            Ban
          </Button>
        </div>
      );
    },
  },
];
