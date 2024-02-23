import { ArrowUp } from "lucide-react";

export function Footer() {
    return (
        <footer className="mt-8 bg-neutral-800 w-full p-5 flex justify-around items-center border-t-[1px] border-neutral-500">
            <p className="font-bebas text-xl tracking-wide">Alunos</p>
            <p>Vitor Galindo de Oliveira</p>
            <p>João Lucas Mota</p>
            <p>Lucas Justino</p>
            <p>Victor Callegari</p>
            <p>Laiane</p>
            <a className="fixed right-4 bottom-4 _default-button p-3" href="#"><ArrowUp size={20}/></a>
        </footer>
    )
}