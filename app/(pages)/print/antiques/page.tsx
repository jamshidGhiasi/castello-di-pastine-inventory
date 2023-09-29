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
import fetchAntiquesByRange from "@/utils/fetchAntiquesByRange";



const PrintAntiques = () => {
    const componentRef = useRef(null);
    const [antiques, setAntiques] = useState<any[]>([])
    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#f2f2f2/80] backdrop-blur-sm  border-b py-2 px-4 mb-4 w-full flex items-center justify-start'>
                <h1 className='font-bold sm:text-lg '>Enter an range</h1>
            </div>



            <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
            />
            <div ref={componentRef}>


                {/* {antiques && antiques.length && antiques.map((antique, index) => (
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
                ))} */}
            </div>
        </Layout>
    );
};
export default PrintAntiques;
