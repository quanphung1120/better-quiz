import { Button } from "@/components/ui/button";
import { columns } from "@/components/user-management/columns";
import DataPagination from "@/components/user-management/data-pagination";
import { DataTable } from "@/components/user-management/data-table";
import { SearchBox } from "@/components/user-management/search-box";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserManagement({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  // The page is string
  const pageParams = (await searchParams).page;
  const pageSize = 10;

  let currentPage = 1;
  if (pageParams != undefined) {
    currentPage = parseInt(pageParams[0]);
  }

  const { users, total } = await auth.api.listUsers({
    query: {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    },
    headers: await headers(),
  });

  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="container mx-auto py-10 grid gap-4">
      <div className="w-full flex justify-between items-center">
        <div className="w-full md:w-[35%]">
          <SearchBox placeholder="Searching for users..." />
        </div>

        <div className="md:flex justify-end items-center gap-2 hidden">
          <Button variant="outline">Export Users</Button>
          <Button>Add User</Button>
        </div>
      </div>
      <DataTable columns={columns} data={users} />

      <DataPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
