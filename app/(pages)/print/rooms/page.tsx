'use client';

import Layout from "@/components/layout/layout";
import {useEffect, useRef, useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils"
import ReactToPrint from 'react-to-print';
import {Button} from "@/components/ui/button";
import {Check, ChevronRight, ChevronsUpDown, Home, Loader2} from "lucide-react";
import orderBy from 'lodash.orderby'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import S3Img from "@/components/S3Img";
import Link from "next/link";

const pageStyle = `
  @page {
    size: A4;
    margin: 1cm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
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
    const [room, setRoom] = useState("")

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

    function getItems(currentValue: string) {
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/print/rooms/${currentValue}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setAntiques(data)
                })

        } catch (error) {
            console.error(error);
            setAntiques([])
        }
    }

    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 flex items-center justify-between shadow-sm w-full  mx-auto '>
                <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
                    <Link href='/' className='hover:underline'>
                        <Home className='inline-block w-4' />
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/print' className=' hover:underline' >Print</Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/floor-plans' className=' pointer-events-none' >Room</Link>
                </div>
            </div>
            <div className='sticky top-[79px] bg-[#f2f2f2]   border-b py-2 px-4 sm:px-0 mb-4 w-full flex flex-col sm:flex-row items-start sm:items-center  justify-between'>
                <div className="w-full max-w-5xl mx-auto flex  flex-col sm:flex-row justify-between sm:items-center">

                <h1 className='font-bold sm:text-lg mb-2 sm:mb-0  '>Select A Room</h1>
                {rooms &&
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className=" w-full sm:w-1/3 justify-between text-[16px]"
                            >
                                {value
                                  ? rooms.find((room) => room.slug === value)?.title
                                  : "Select a room..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                      
                        <PopoverContent className="w-full h-64 sm:h-96 ">
                            <Command>
                                <CommandInput placeholder="Search rooms..." />
                                <ScrollArea>
                                    <CommandEmpty>No room found.</CommandEmpty>
                                    <CommandGroup>
                                        {orderBy(rooms, 'order').map((room) => {
                                            const hasAntiques = Boolean(room.antiques?.length)
                                            const disabled = !hasAntiques
                                            return (
                                              <CommandItem
                                                className={cn(disabled ? 'text-slate-300' : '')}
                                                disabled={disabled}
                                                key={room.id}
                                                onSelect={(currentValue) => {
                                                  setValue(currentValue === value ? "" : room.slug)
                                                  setAntiques([])
                                                  getItems(room.slug)
                                                  setRoom(room.title)
                                                  setOpen(false)
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === room.slug ? "opacity-100" : "opacity-0"
                                                  )}
                                                />
                                                {room.title}
                                              </CommandItem>
                                            )
                                          })}
                                    </CommandGroup>
                                </ScrollArea>
                            </Command>
                        </PopoverContent>
                    </Popover>
                }
                </div>
            </div>

            <div className="flex flex-col items-center justify-between px-4 sm:p-0 w-full max-w-5xl mx-auto">
                {(antiques && antiques.length > 0) && <ReactToPrint pageStyle={pageStyle} trigger={() => <Button className="mb-4 w-full sm:w-auto ml-auto ">Print</Button>} content={() => componentRef.current} />}
                <div ref={componentRef} className="w-full">
                    <h2 className="text-lg font-bold  mb-4">{room}</h2>
                    {loading && <Loader2 className="mr-2 h-24 w-24 animate-spin" />}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mx-auto  print:grid-cols-4 pb-4">
                        {(antiques && antiques.length > 0) && antiques.map((antique, index) => (
                            <div key={index} >
                                <div className="page-label bg-white border-[2px] shadow-md print:shadow-none print:rounded-none p-4  flex flex-col items-center justify-between   ">


                                    <S3Img
                                        src={`/antiques/image${antique.itemNo.replace('0', '').replace('a','').replace('b','')}.jpg`}
                                        alt={antique.itemNo}
                                        className='mx-auto print:h-[2cm] h-[150px] print:w-auto '

                                    />

                                </div>
                                <p className="font-bold"> {antique?.itemNo}</p>
                                <div className="page-break"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default PrintRooms;
