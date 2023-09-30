import AdminLayout from "@/components/admin/layout"
import AdminAntiquesDataTable from "@/components/admin/antiques/admin-antiques-data-table"
import fetchAntiquesFromGoogleSheets from "@/utils/fetchAntiquesFromGoogleSheets";

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Antiques Page',
  description: 'An overview of antiques.',
}

const AdminAntiquesListPage = async () => {
  const antiques = await fetchAntiquesFromGoogleSheets()

  return (
    <AdminLayout title="Antiques">
      <AdminAntiquesDataTable data={antiques} />
    </AdminLayout>
  )
}

export default AdminAntiquesListPage
