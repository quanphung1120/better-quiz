import { columns } from "@/components/user-management/columns";
import { DataTable } from "@/components/user-management/data-table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserManagementPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const { users } = await auth.api.listUsers({
    query: {
      limit: 100,
    },
    headers: await headers(),
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
