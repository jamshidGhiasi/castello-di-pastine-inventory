import AdminLayout from "@/components/admin/layout"
import AdminAreasDataTable from "@/components/admin/areas/admin-areas-data-table"
import fetchAreasFromGoogleSheets from "@/utils/fetchAreasFromGoogleSheets";

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Areas Page',
  description: 'An overview of areas.',
}

const AdminAreasListPage = async () => {
  const areas = await fetchAreasFromGoogleSheets()
  return (
    <AdminLayout title="Areas">
      <AdminAreasDataTable data={areas} />
    </AdminLayout>
  )
}

export default AdminAreasListPage
