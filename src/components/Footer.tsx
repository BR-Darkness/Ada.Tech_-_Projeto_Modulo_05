import { ArrowUp } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-neutral-800 w-full p-5 flex justify-around items-center border-t-[1px] border-neutral-500">
            <p className="font-bebas text-xl tracking-wide">Aula 04</p>
            <p>Vitor Galindo de Oliveira</p>
            <a className="fixed right-4 bottom-4 _default-button" href="#"><ArrowUp /></a>
        </footer>
    )
}