'use client'

import React, { useState, useEffect } from 'react'
import AdminDataTable from "@/components/admin/admin-data-table";
import { ColumnDef } from "@tanstack/react-table"
import AdminAntiquesDataTableExtraActions, {
  AdminAntiquesDataTableExtraActionsProps
} from "@/components/admin/antiques/admin-antiques-data-table-extra-actions";
import { AntiqueFromGoogleSheets } from "@/types/antique";
import toast from 'react-hot-toast'

export interface AdminAntiquesDataTableProps extends AdminAntiquesDataTableExtraActionsProps {
  data: AntiqueFromGoogleSheets[]
}

export const antiquesAdminDataTableColumns: ColumnDef<AntiqueFromGoogleSheets>[] = [
  // Attributes
  { accessorKey: 'itemNo', header: 'Item No' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'lot', header: 'Lot' },
  { accessorKey: 'warehouseLocation', header: 'Warehouse Location' },
  // Relations
  { accessorKey: 'room', header: 'Room' },
  { accessorKey: 'area', header: 'Area' },
  { accessorKey: 'category', header: 'Category' },
]

const AdminAntiquesDataTable: React.FC<AdminAntiquesDataTableProps> = (props) => {
  const { data } = props

  const [shouldSyncDatabase, setShouldSyncDatabase] = useState(false)
  const [isSyncDatabaseLoading, setIsSyncDatabaseLoading] = useState(false)

  // Sync antiques table from prisma
  useEffect(() => {
    const syncDatabase = async () => {
      try {
        // Run sync
        const fetchResults = await fetch('/api/sync/antiques')
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
      columns={antiquesAdminDataTableColumns}
      data={data}
      searchColumnAccessorKey="description"
      extraActions={
        <AdminAntiquesDataTableExtraActions
          isSyncDatabaseLoading={isSyncDatabaseLoading}
          handleSyncDatabase={handleSyncDatabase}
        />
      }
    />
  )
}

export default AdminAntiquesDataTable
