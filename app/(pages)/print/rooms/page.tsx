'use client';
import Layout from "@/components/layout/layout";
import { use, useEffect, useRef, useState } from "react";
import { convertInputToAntiqueRange } from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { Img } from "react-image";
import ReactToPrint from 'react-to-print';
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast'
import { Loader2 } from "lucide-react";
import RoomSelector from "@/components/print/room-selector";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import exp from "constants"

const pageStyle = `
  @page {
    size: 57mm 32mm;
    margin: 0;
  }
  @media print {
    .page-label {
        width: 57mm !important;
        height: 32mm !important;
    }
  }
`;
const PrintRooms = () => {
    const [antiques, setAntiques] = useState<any[]>()
    const [rooms, setRooms] = useState<any[]>()
    const [loading, setLoading] = useState(false)
    const [range, setRange] = useState<string>()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const componentRef = useRef(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/print/rooms`)
                const data = await result.json();
                setRooms(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRooms()
    }, [])

    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#f2f2f2/80] backdrop-blur-sm  border-b py-2 px-4 mb-4 w-full flex flex-col sm:flex-row items-center justify-between'>
                <h1 className='font-bold sm:text-lg '>Select A Room</h1>

            </div>
            hi

            <div className="flex flex-col items-center justify-between px-4 sm:p-0">
                {rooms &&

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-auto justify-between"
                            >
                                {value
                                    ? rooms.find((framework) => framework.slug === value)?.title
                                    : "Select a room..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search rooms..." />
                                <CommandEmpty>No room found.</CommandEmpty>
                                <CommandGroup>
                                    {rooms.map((item) => (
                                        <CommandItem
                                            key={item.id}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                console.log(currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === item.title ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {item.slug}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                }

            </div>
        </Layout>
    );
};
export default PrintRooms;
