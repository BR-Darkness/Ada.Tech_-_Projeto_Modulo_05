import { ArrowUpRightFromSquare } from "lucide-react";
import { Link } from "react-router-dom";

type Personagem = 
{
    nome: string,
    tipo: string,
    raca: string,
    poderes: string[],
    historia: string,
    idade: string | number,
    altura: string | number,
    imagem: string,
}

type Props = 
{
    personagem: Personagem
}

export function Card({personagem}: Props) {
    return (
        <Link 
            className={`p-5 rounded-md cursor-pointer hover:ring-[1px] focus-visible:ring-2 outline-none ${personagem.tipo == 'heroi' ? 'bg-emerald-900 hover:bg-emerald-800 hover:ring-emerald-600 focus-visible:ring-emerald-600' : ''} ${personagem.tipo == 'vilao' ? 'bg-red-900 hover:bg-red-800 hover:ring-red-600 focus-visible:ring-red-600' : ''}`}
            to={`/details/${personagem.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /gm, "-").toLowerCase()}`}
        >
        <div className="w-full space-y-3">
            <div className="w-full flex justify-between">
                <h2 className="text-2xl font-bebas tracking-wide text-shadow">{personagem.nome}</h2>
                <p className="text-base flex gap-3">{personagem.tipo.replace("heroi", "Herói").replace("vilao", "Vilão")}<span><ArrowUpRightFromSquare size={16} /></span></p>
            </div>
            <img className={`object-contain w-full h-48 rounded-sm ${personagem.tipo == 'heroi' ? 'bg-emerald-950' : ''} ${personagem.tipo == 'vilao' ? 'bg-red-950' : ''} `}
                src={personagem.imagem} alt={`Imagem de ${personagem.nome}`} />
            <p className={`text-center ${personagem.tipo == 'heroi' ? 'text-emerald-200' : ''} ${personagem.tipo == 'vilao' ? 'text-red-200' : ''} `}>Clique para mais informações</p>
        </div>
        </Link>
    );
}