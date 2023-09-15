'use client';
import Layout from "@/components/layout.tsx/layout";
import { use, useEffect, useRef, useState } from "react";
import { convertInputToAntiqueRange } from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { Img } from "react-image";
import ReactToPrint from 'react-to-print';
import QRCode from "react-qr-code";

const PrintAntiques = () => {
    const [antiques, setAntiques] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [range, setRange] = useState<string>('')
    const componentRef = useRef(null);

    function getAntiques() {

        const regex = new RegExp(/^\d+(-\d+)?(?:,\d+(?:-\d+)?)+$/)
        const cleanInput = range.replace(/ /g, '');
        if (!regex.test(cleanInput)) {
            setError("Invalid input")
            return null
        }

        setLoading(true)
        setError(null)

        fetch(`${process.env.VERCEL_URL}/api/search?p=${convertInputToAntiqueRange(range).join(',')}`)
            .then(res => res.json())
            .then(data => {
                setAntiques(data)
                console.log(data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setError(err)
                console.log(err)
            })
    }

    function onSearch(event: React.FormEvent) {
        event.preventDefault()
        setError(null)
        getAntiques()
    }
    return (
        <Layout>
            {range}
            <form
                className="flex justify-center items-center w-full sm:w-1/2 mb-8"
                onSubmit={onSearch}
            >
                <Input
                    type="text"
                    className="px-5 py-1 w-2/3 sm:px-5 sm:py-5 text-zinc-200 bg-zing-800 rounded-full"
                    placeholder="Search"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    onInput={() => setError(null)}
                />
            </form>

            <button onClick={() => getAntiques()}>New</button>
            {loading && <div>Loading...</div>}
            {error !== null && <div>{error}</div>}
                <ReactToPrint
                    trigger={() => <button>Print this out!</button>}
                    content={() => componentRef.current}
                />
            <div  ref={componentRef}>


                {!loading && antiques && antiques.length && antiques.map((antique, index) => (
                    <div key={index} className="page-a4">
                        <Img src={`/antiques/image${antique?.itemNo.replace('0', '')}.png`} />
                        <h3>ITEM NO</h3>
                        <p className="font-bold">{antique?.itemNo}</p>
                        
                        <p className="page-description">{antique?.description}</p>
                        <p className="font-bold">DIMENSIONS:</p>
                        <p className="mb-4">H:{antique?.height} | W:{antique?.height} | D:{antique?.depth}</p>
                        <p className="mb-4"><span className="font-bold">ROOM:</span>{antique?.room?.title}</p>
                        <p className="mb-4"><span className="font-bold">AREA:</span>{antique?.area?.title}</p>
                        <p className="font-bold mb-8">QR Code</p>
                        <QRCode value={`https://castello-di-pastine.com/${antique.itemNo}-2`} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};
export default PrintAntiques;
