'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import toast from 'react-hot-toast'

export interface AdminAntiquesDataTableExtraActionsProps {
  handleSyncDatabase: () => void
  handleUploadImages: () => void
  isSyncDatabaseLoading?: boolean
}

const AdminAntiquesDataTableExtraActions: React.FC<AdminAntiquesDataTableExtraActionsProps> = (props) => {
  const { handleUploadImages, handleSyncDatabase, isSyncDatabaseLoading } = props

  const router = useRouter()
  const handleRefresh = () => {
    router.refresh()
    toast.success('Successfully refreshed Google Sheets data!')
  }

  return (
    <div className="flex justify-between gap-1">
      <Button onClick={handleUploadImages}>Upload Images</Button>
      <Button onClick={handleRefresh}>Sync Google Sheets</Button>
      <Button onClick={handleSyncDatabase} disabled={isSyncDatabaseLoading}>
        {isSyncDatabaseLoading ?
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Syncing...
          </>
          : 'Sync Database'
        }
      </Button>
    </div>
  )
}

export default AdminAntiquesDataTableExtraActions
