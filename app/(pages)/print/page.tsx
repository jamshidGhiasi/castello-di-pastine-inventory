'use client'
import BottomNavigation from "@/components/bottom-navigation";
import Layout from "@/components/layout.tsx/layout";
import { useRef, useState } from "react";
import Page from "./_component-to-print";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import QRCode from "react-qr-code";

import userSWR from 'swr'
import { Img } from "react-image";
import styles from './print.module.css';

const fetchAntiques = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    return response.json();
}


const Print = () => {
    const componentRef = useRef(null);
   
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const { data, error, isLoading } = userSWR('http://localhost:3000/api/search?q=' + "x", fetchAntiques)
    return (
        <Layout>



            <div>
                
                <button onClick={handlePrint}>Print this out!</button>
                <div ref={componentRef} className="book">
                    <div className={styles.page}>
                        <div className={styles.subpage}>
                            {data && data.map((antique: any) => (
                                <div key={antique.id} className="flex justify-start items-center border border-neutral-500">
                                    <div className="h-20 w-20 p-4">
                                        <Img
                                            src={
                                                [
                                                    `/antiques/image${antique.itemNo.replace('0', '')}.png`,
                                                    `/antiques/image${antique.itemNo.replace('0', '')}-1.png`,
                                                    `/antiques/image${antique.itemNo.replace('0', '')}-2.png`,
                                                ]
                                            }
                                            alt={antique.description}
                                            className='m-auto'
                                        />
                                    </div>
                                    <div className="mr-8">
                                        <QRCode className="w-12 h-12" value={`https://castello-di-pastine.com/${antique.itemNo}-2`} />
                                    </div>
                                    <p className="text-black textsm">{antique.description}</p>
                                    <span className='text-white text-xs bg-gray-500 absolute left-0 bottom-0 w-5/12 py-2 rounded-tr-md'>{antique.itemNo}</span>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

        </Layout>

    )
}

export default Print;

