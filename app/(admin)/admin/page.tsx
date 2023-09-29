import AdminLayout from "@/components/admin/layout"
import AdminAntiquesDataTable from "@/components/admin/antiques/admin-antiques-data-table"
import fetchAntiquesFromGoogleSheets from "@/utils/fetchAntiquesFromGoogleSheets";
import Link from "next/link";
import { Home, User } from "lucide-react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/auth-options";
import UserAccount from "@/components/admin/admin-user-account";

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Antiques Page',
  description: 'An overview of antiques.',
}

const AdminAntiquesListPage = async () => {
  const antiques = await fetchAntiquesFromGoogleSheets()
  return (
    <AdminLayout>
      <div>
      <div className="flex justify-between ">
        <Link href={'/'} className="flex justify-start items-center mb-8">
          <Home className="w-6 h-6 cursor-pointer mr-2" />
          Home
        </Link>
        <UserAccount />
      </div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Antiques
        </h1>

        <AdminAntiquesDataTable data={antiques} />
      </div>
    </AdminLayout>
  )
}

export default AdminAntiquesListPage
