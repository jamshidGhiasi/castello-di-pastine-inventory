'use client'
import Layout from "@/components/layout.tsx/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { use, useEffect, useState } from "react"
export const PrintAntiques = () => {
    const [printInput, setPrintInput] = useState('')
    useEffect(() => {
        const regex = /^(\s*\d+\s*(-\s*\d+\s*)?)(,\s*\d+\s*(-\s*\d+\s*)?)*$/
        console.log(regex.exec(printInput)?.[0].split(',').map((x) => x.trim()))
    }, [printInput])
    const onInput = (event: React.FormEvent) => {
        event.preventDefault()
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
        </Layout>
    )
}
export default PrintAntiques