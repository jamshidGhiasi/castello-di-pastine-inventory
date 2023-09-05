'use client'
import BottomNavigation from "@/components/bottom-navigation";
import Layout from "@/components/layout.tsx/layout";
import { useRef } from "react";
import Page from "./_component-to-print";
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const Print = () => {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Layout>



            <div>
                <Page ref={componentRef} />
                <button onClick={handlePrint}>Print this out!</button>
            </div>
            
        </Layout>

    )
}

export default Print;

