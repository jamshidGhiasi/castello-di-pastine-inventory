'use client'

export default function Print({ items} : { items: any[]}) {
    return (
        <div>
            {JSON.stringify(items[0])}
        </div>
    )
}