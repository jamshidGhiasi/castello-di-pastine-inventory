'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export function SelectDemo({areaId}: {areaId: string}) {
  const [value, setValue] = useState("")
  const router = useRouter()

  const handleAreaChange = (value: any) => {
    router.push(`/areas/${value}`)
    setValue(value)
  }
  return (
    <Select value={areaId} onValueChange={handleAreaChange}>
      <SelectTrigger className=" w-full lg:w-4/12 p-6 mb-6 mr-auto rounded-full">
        <SelectValue placeholder="Select an area" />
      </SelectTrigger>
      <SelectContent  >
        <SelectGroup>
          <SelectLabel>Select area</SelectLabel>
          <SelectItem value="villa-ground">Villa Ground</SelectItem>
          <SelectItem value="villa-1st-floor">Villa 1st Floor</SelectItem>
          <SelectItem value="villa-2nd-floor">Villa 2nd Floor</SelectItem>
          <SelectItem value="colonica">Colonica</SelectItem>
          <SelectItem value="other-rooms">Other Rooms</SelectItem>
          <SelectItem value="unassigned">Unassigned</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default SelectDemo