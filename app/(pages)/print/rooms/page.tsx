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
    const [room, setRoom] = useState<string>('')
    const componentRef = useRef(null);

    function getAntiques() {

       

        setLoading(true)
        setError(null)

        fetch(`http://localhost:3000/api/search?r=${room}`)
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
            {room}
            <form
                className="flex justify-center items-center w-full sm:w-1/2 mb-8"
                onSubmit={onSearch}
            >
                <Input
                    type="text"
                    className="px-5 py-1 w-2/3 sm:px-5 sm:py-5 text-zinc-200 bg-zing-800 rounded-full"
                    placeholder="Search"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
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
            <div className="print-room-container"  ref={componentRef}>

                
                {!loading && antiques && antiques.length && antiques.map((antique, index) => (
                    <div key={index} className="page-room">                                                
                    
                        <div className="print-room-desc">

                        <Img className="print-room-image" src={`/antiques/image${antique?.itemNo.replace('0', '')}.png`} />
                        </div>
                        <p className="font-bold">{antique?.itemNo}</p>

                    </div>
                ))}
            </div>
        </Layout>
    );
};
export default PrintAntiques;