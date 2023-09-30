'use client'

import React, { useState, useEffect } from 'react'
import AdminDataTable from "@/components/admin/admin-data-table";
import { ColumnDef } from "@tanstack/react-table"
import AdminAreasDataTableExtraActions from "@/components/admin/areas/admin-areas-data-table-extra-actions";
import { AreaFromGoogleSheets } from "@/types/Area";
import toast from 'react-hot-toast'

export interface AdminAreasDataTableProps {
  data: AreaFromGoogleSheets[]
}

export const areasAdminDataTableColumns: ColumnDef<AreaFromGoogleSheets>[] = [
  // Attributes
  { accessorKey: 'order', header: 'Order' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'slug', header: 'Slug' },
  // Relations
  { accessorKey: 'area-id', header: 'Area Id' },
]

const AdminAreasDataTable: React.FC<AdminAreasDataTableProps> = (props) => {
  const { data } = props

  const [shouldSyncDatabase, setShouldSyncDatabase] = useState(false)
  const [isSyncDatabaseLoading, setIsSyncDatabaseLoading] = useState(false)

  // Sync areas table from prisma
  useEffect(() => {
    const syncDatabase = async () => {
      try {
        // Run sync
        const fetchResults = await fetch('/api/sync/areas')
        const syncedItems = await fetchResults.json()

        if (!syncedItems?.length) throw new Error('No items synced to database!')

        // Set success state
        toast.success(`Successfully synced ${syncedItems.length} records to database!`);
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
  const handleSyncDatabase = () => {
    setShouldSyncDatabase(true)
    setIsSyncDatabaseLoading(true)
  }

  return (
    <AdminDataTable
      columns={areasAdminDataTableColumns}
      data={data}
      searchColumnAccessorKey="description"
      extraActions={
        <AdminAreasDataTableExtraActions
          isSyncDatabaseLoading={isSyncDatabaseLoading}
          handleSyncDatabase={handleSyncDatabase}
        />
      }
    />
  )
}

export default AdminAreasDataTable
