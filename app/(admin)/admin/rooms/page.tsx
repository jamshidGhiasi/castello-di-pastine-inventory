import AdminLayout from "@/components/admin/layout"
import AdminRoomsDataTable from "@/components/admin/rooms/admin-rooms-data-table"
import fetchRoomsFromGoogleSheets from "@/utils/fetchRoomsFromGoogleSheets";

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Rooms Page',
  description: 'An overview of rooms.',
}

const AdminRoomsListPage = async () => {
  const rooms = await fetchRoomsFromGoogleSheets()
  return (
    <AdminLayout title="Rooms">
      <AdminRoomsDataTable data={rooms} />
    </AdminLayout>
  )
}

export default AdminRoomsListPage
