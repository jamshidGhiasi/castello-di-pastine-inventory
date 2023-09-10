'use client'
import AntiqueItem from "@/components/antique-item"
import Layout from "@/components/layout.tsx/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { use, useEffect, useState } from "react"
import userSWR from 'swr'

function convertRangeToArray(range: string) {
    let res = []
    let [start, end] = range.split('-')
    if (end) {
        for (let i = parseInt(start); i <= parseInt(end); i++) {
            res.push(i)
        }
    } else {
        res.push(parseInt(start))
    }

    return res

}

const fetchAntiques = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    return response.json();
}

export const PrintAntiques = () => {
    const [printInput, setPrintInput] = useState('')
    const [printOutput, setPrintOutput] = useState('')
    const [antiques, setAntiques] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const regex = /^(\s*\d+\s*(-\s*\d+\s*)?)(,\s*\d+\s*(-\s*\d+\s*)?)*$/
        console.log(regex.exec(printInput)?.[0].split(',').map((x) => x.trim()))
    }, [printInput])





    useEffect(() => {
        
        console.log(printOutput)
        console.log('http://localhost:3000/api/search?p=' + printOutput)
         fetch('http://localhost:3000/api/search?p=' +  printOutput)
         .then((res) => res.json())
            .then((data) => {
                setIsLoading(true)
                setAntiques(data)
                console.log(data)
            })

       
    }, [printOutput])

    const onInput = async (event: React.FormEvent) => {
        event.preventDefault()
        const output = printInput.split(',').map((x) => {
            if (x.includes('-')) {
                return convertRangeToArray(x).map((y) => y.toString().trim().padStart(4, '0'))
            } else return x.trim().padStart(4, '0')
        }).flat();
        const unique = new Set(output)
        console.log(Array.from(unique).sort().join(','))
        
        setPrintOutput(Array.from(unique).sort().join(','))

    }

    return (
        <Layout>
            <Link href={'/print'} className="flex justify-start items-center mb-8">
                <ChevronLeft />Back
            </Link>
            <div>
                <h1>Print Antiques</h1>
            </div>
            <div className="flex justify-center items-center w-full sm:w-1/2 mb-8">
                <form
                    className="flex justify-center items-center w-full sm:w-1/2 mb-8"
                    onSubmit={onInput}
                >
                    <Input
                        type="text"
                        className="px-5 py-1 w-2/3 sm:px-5 sm:py-5 text-zinc-200 bg-zing-800 rounded-full"
                        placeholder="Search"
                        value={printInput}
                        onChange={(e) => setPrintInput(e.target.value)}
                    />
                    <Button>Search</Button>
                </form>
            </div>

            {isLoading && <p>Loading...</p>}
            {!isLoading && antiques && antiques.length === 0 && <p>No data found!</p>}
            {!isLoading && antiques && antiques.length > 0 &&
                <div className=" grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 content-stretch">
                    {antiques &&
                        antiques.map((antique: any) =>
                        (
                            <div key={antique.id} className="bg-white flex flex-col  items-center justify-center rounded-md overflow-hidden h-[150px]">
                                <AntiqueItem
                                    description={antique.description}
                                    image={
                                        [
                                            `/antiques/image${antique.itemNo.replace('0', '')}.png`,
                                            `/antiques/image${antique.itemNo.replace('0', '')}-1.png`,
                                            `/antiques/image${antique.itemNo.replace('0', '')}-2.png`,
                                        ]
                                    }
                                    qr=""
                                    itemNo={antique.itemNo}
                                    height={antique.height}
                                    width={antique.white}
                                    depth={antique.depth}
                                    area={antique.areaId}
                                    room={antique.roomId}
                                />
                            </div>
                        )
                        )
                    }
                </div>
            }

        </Layout>
    )
}
export default PrintAntiques