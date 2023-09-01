import Image from "next/image";

const TopLogo = () => {
    return (
        <div className="mb-4">
            <Image
                className="relative z-10"
                src='/castello-di-pastine-typography.svg'
                width={244.54}
                height={14.21}
                alt=""
            />
        </div>
    )
}

export default TopLogo;