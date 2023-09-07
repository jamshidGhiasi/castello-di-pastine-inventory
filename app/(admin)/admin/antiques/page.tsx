import AdminLayout from "@/components/admin/layout"
import AdminAntiquesDataTable from "@/components/admin/antiques/admin-antiques-data-table"
import fetchAntiquesFromGoogleSheets from "@/utils/fetchAntiquesFromGoogleSheets";

export const metadata = {
  title: 'Admin Antiques Page',
  description: 'An overview of antiques.',
}

const AdminAntiquesListPage = async () => {
  const antiques = await fetchAntiquesFromGoogleSheets()

  return (
    <AdminLayout>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Antiques
        </h1>

        <AdminAntiquesDataTable data={antiques} />
      </div>
    </AdminLayout>
  )
}

export default AdminAntiquesListPage
