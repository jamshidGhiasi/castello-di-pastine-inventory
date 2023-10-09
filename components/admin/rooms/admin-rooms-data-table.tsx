'use client'

import React, { useState, useEffect } from 'react'
import AdminDataTable from "@/components/admin/admin-data-table";
import { ColumnDef } from "@tanstack/react-table"
import AdminDataTableExtraActions from "@/components/admin/admin-data-table-extra-actions"
import { RoomFromGoogleSheets } from "@/types/Room";
import toast from 'react-hot-toast'

export interface AdminRoomsDataTableProps {
  data: RoomFromGoogleSheets[]
}

export const roomsAdminDataTableColumns: ColumnDef<RoomFromGoogleSheets>[] = [
  // Attributes
  { accessorKey: 'order', header: 'Order' },
  { accessorKey: 'roomId', header: 'Room Id' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'slug', header: 'Slug' },
  // Relations
  { accessorKey: 'areaId', header: 'Area Id' },
  { accessorKey: 'area', header: 'Area' },
]

const AdminRoomsDataTable: React.FC<AdminRoomsDataTableProps> = (props) => {
  const { data } = props

  const [shouldSyncDatabase, setShouldSyncDatabase] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [isSyncDatabaseLoading, setIsSyncDatabaseLoading] = useState(false)

  // Sync rooms table from prisma
  useEffect(() => {
    const syncDatabase = async () => {
      try {
        // Run sync
        const hasSelectedItems = Boolean(selectedItems?.length)
        const fetchResults = await fetch(
          '/api/sync/rooms',
          hasSelectedItems ? { method: 'POST', body: JSON.stringify({ selectedItems }) } : {}
        )
        const syncedResults = await fetchResults.json()
        if (!syncedResults?.length) throw new Error('No items synced to database!')

        // Set success state
        toast.success(`Successfully synced ${syncedResults.length} records to database!`);
      } catch (err) {
        // Set error state
        console.error('Error caught at syncDatabase()', err)
        toast.error('Something went wrong while syncing database, please try again.');
      } finally {
        setShouldSyncDatabase(false)
        setIsSyncDatabaseLoading(false)
      }
    }
    if (shouldSyncDatabase) syncDatabase()
  }, [shouldSyncDatabase])

  // Methods
  const handleSyncDatabase = (options: { selectedItems?: any | [] }) => {
    const { selectedItems = [] } = options
    setShouldSyncDatabase(true)
    setSelectedItems(selectedItems)
    setIsSyncDatabaseLoading(true)
  }

  return (
    <AdminDataTable
      columns={roomsAdminDataTableColumns}
      data={data}
      searchColumnAccessorKey="title"
      extraActions={
        <AdminDataTableExtraActions
          isSyncDatabaseLoading={isSyncDatabaseLoading}
          handleSyncDatabase={handleSyncDatabase}
        />
      }
    />
  )
}

export default AdminRoomsDataTable
