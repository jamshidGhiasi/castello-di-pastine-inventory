'use client'

import React from 'react'
import AdminDataTable from "@/components/admin/admin-data-table";
import { ColumnDef } from "@tanstack/react-table"

// TODO@Joel: Export to common types
export interface Antique {
  itemNo?: string;
  lot?: string;
  category?: string;
  description?: string;
  image?: string;
  height?: string;
  width?: string;
  depth?: string;
  warehouseLocation?: string;
  room?: string;
  area?: string;
  areaId?: string;
  categoryId?: string;
  roomId?: string;
  floor?: string;
  building?: string;
  qrCodeUrl?: string;
  roomLocation?: string;
  otherNotes?: string;
  vladamirNotes?: string;
  wipeFrame?: string;
  wipePicture?: string;
  cleanPicture?: string;
  varnishPicture?: string;
  varnishFrame?: string;
  restoreFrame?: string;
  restorePicture?: string;
}

export interface AdminAntiquesDataTableProps {
  data: Antique[]
}

export const antiquesAdminDataTableColumns: ColumnDef<Antique>[] = [
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

  return (
    <AdminDataTable columns={antiquesAdminDataTableColumns} data={data} searchColumnAccessorKey="description" />
  )
}

export default AdminAntiquesDataTable
