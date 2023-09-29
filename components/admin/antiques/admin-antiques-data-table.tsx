'use client'

import React, { useState, useEffect } from 'react'
import AdminDataTable from "@/components/admin/admin-data-table";
import { ColumnDef } from "@tanstack/react-table"
import AdminAntiquesDataTableExtraActions from "@/components/admin/antiques/admin-antiques-data-table-extra-actions";
import { AntiqueFromGoogleSheets } from "@/types/Antique";
import toast from 'react-hot-toast'

export interface AdminAntiquesDataTableProps {
  data: AntiqueFromGoogleSheets[]
}

export const antiquesAdminDataTableColumns: ColumnDef<AntiqueFromGoogleSheets>[] = [
  // Attributes
  { accessorKey: 'itemNo', header: 'Item No' },
  {
    accessorKey: 'description', header: 'Description',
    cell: ({ row }) => {

      return <div className='w-64'><p className=' text-xs truncate hover:text-clip'>{row.getValue('description')}</p></div>
    }

  },
  { accessorKey: 'lot', header: 'Lot' },
  { accessorKey: 'warehouseLocation', header: 'Warehouse Location' },
  // Relations
  { accessorKey: 'room', header: 'Room' },
  { accessorKey: 'roomId', header: 'Room Id' },
  { accessorKey: 'area', header: 'Area' },
  { accessorKey: 'areaId', header: 'Area Id' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'categoryId', header: 'Category Id' },
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

  const handleUploadImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return

      const antiqueId = prompt("Please enter the antique ID:", "");
      if (!antiqueId) return

      const filename = `antiques/image${antiqueId}.png`;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", filename)
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          headers: { "Access-Control-Allow-Origin": "*" },
        });
        const data = await response.json();

        if (data.success) return toast.success('Successfully uploaded image to S3!');
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong while uploading, please try again.');
      }
    };

    // Trigger input
    input.click();
  };

  return (
    <AdminDataTable
      columns={antiquesAdminDataTableColumns}
      data={data}
      searchColumnAccessorKey="description"
      extraActions={
        <AdminAntiquesDataTableExtraActions
          isSyncDatabaseLoading={isSyncDatabaseLoading}
          handleSyncDatabase={handleSyncDatabase}
          handleUploadImage={handleUploadImage}
        />
      }
    />
  )
}

export default AdminAntiquesDataTable
