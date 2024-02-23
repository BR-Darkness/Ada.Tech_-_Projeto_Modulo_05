import { ArrowUp } from "lucide-react";

export function Footer() {
    return (
        <footer className="mt-8 bg-neutral-800 w-full p-5 flex flex-wrap gap-3 justify-around items-center border-t-[1px] border-neutral-500">
            <p className="font-bebas text-xl tracking-wide">Projeto Final - Módulo 05</p>
            <p className="font-bebas text-xl tracking-wide">Grupo 05</p>
            <a className="fixed right-4 bottom-4 _default-button p-3" href="#"><ArrowUp size={20}/></a>
        </footer>
    )
}