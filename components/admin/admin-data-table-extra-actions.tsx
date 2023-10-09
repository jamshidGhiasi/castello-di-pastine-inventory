'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import toast from 'react-hot-toast'
import { Table } from "@tanstack/react-table";

export interface AdminAntiquesDataTableExtraActionsProps {
  handleSyncDatabase: ({ selectedItems }: { selectedItems?: any }) => void
  handleUploadImages?: () => void
  isSyncDatabaseLoading?: boolean
  table?: Table<any>
}

const AdminAntiquesDataTableExtraActions: React.FC<AdminAntiquesDataTableExtraActionsProps> = (props) => {
  const { handleUploadImages, handleSyncDatabase, isSyncDatabaseLoading, table } = props

  const selectedRows = table?.getFilteredSelectedRowModel?.()?.rows
  const selectedItems = selectedRows?.map(({ original }) => original) || []
  const hasSelectedItems = Boolean(selectedItems?.length)

  const router = useRouter()
  const handleRefresh = () => {
    router.refresh()
    toast.success('Successfully refreshed Google Sheets data!')
  }

  return (
    <div className="flex justify-between gap-1">
      {handleUploadImages && <Button onClick={handleUploadImages}>Upload Images</Button>}
      <Button onClick={handleRefresh}>Sync Google Sheets</Button>
      <Button onClick={() => handleSyncDatabase({ selectedItems })} disabled={isSyncDatabaseLoading}>
        {isSyncDatabaseLoading ?
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Syncing...
          </>
          : (
            hasSelectedItems ? `Sync ${selectedItems.length} item(s) to Database` : 'Sync Database'
          )
        }
      </Button>
    </div>
  )
}

export default AdminAntiquesDataTableExtraActions
