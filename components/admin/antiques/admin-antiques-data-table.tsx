'use client'

import React, { useState, useEffect } from 'react'
import AdminDataTable from "@/components/admin/admin-data-table";
import { ColumnDef } from "@tanstack/react-table"
import AdminDataTableExtraActions from "@/components/admin/admin-data-table-extra-actions"
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
  { accessorKey: 'roomTitle', header: 'Room Title' },
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
  const [selectedItems, setSelectedItems] = useState([])
  const [isSyncDatabaseLoading, setIsSyncDatabaseLoading] = useState(false)

  // Sync antiques table from prisma
  useEffect(() => {
    const syncDatabase = async () => {
      try {
        // Run sync
        const hasSelectedItems = Boolean(selectedItems?.length)
        const fetchResults = await fetch(
          '/api/sync/antiques',
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

  const handleUploadImages = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = async () => {
      const { files } = input;
      if (!files?.length) return

      const uploadPromises = Array.from(files).map((file) => {
        const filename = `antiques/${file.name}`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", filename);
        return fetch("/api/upload", {
          method: "POST",
          body: formData,
          headers: { "Access-Control-Allow-Origin": "*" },
        });
      });

      return toast.promise(
        Promise.all(uploadPromises),
        {
          loading: 'Uploading...',
          // @ts-ignore
          success: async (responses) => {
            const dataPromises = responses.map(response => response.json());
            const dataResults = await Promise.all(dataPromises);
            const successfulResults = dataResults.filter(dataResult => dataResult?.success)
            return `Successfully uploaded ${successfulResults.length} images to S3!`
          },
          error: 'Something went wrong while uploading, please try again.',
        }
      );
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
        <AdminDataTableExtraActions
          isSyncDatabaseLoading={isSyncDatabaseLoading}
          handleSyncDatabase={handleSyncDatabase}
          handleUploadImages={handleUploadImages}
        />
      }
    />
  )
}

export default AdminAntiquesDataTable
