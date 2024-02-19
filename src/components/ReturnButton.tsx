import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function ReturnButton(props: {route: string}) {
    return (
        <>
            <Link to={props.route} className="flex flex-col items-center justify-center gap-1 bg-neutral-900 hover:bg-neutral-800 absolute top-8 left-8 p-3 rounded-md border border-neutral-800 shadow-md text-center tracking-normal outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"><ArrowLeftCircle size={48} /> Voltar</Link>
        </>
    )
}