import { ArrowUpRightFromSquare, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Personagem } from "../models/hero";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConnection";


type Props = 
{
    personagem: Personagem
}

export function Card({personagem}: Props) {
    const navigate = useNavigate();
    let characterUrl = `/details/${personagem.id}`;

    async function deleteHero(id : string){
        const docRef = doc(db, 'heroes', id)
        try {
            await deleteDoc(docRef);
            console.log('Documento excluído com sucesso.');
          } catch (error) {
            console.error('Erro ao excluir o documento:', error);
          }
    }

    return (
        <div className={`p-5 rounded-md hover:ring-[1px] focus-visible:ring-2 outline-none
            ${personagem.tipo == 'heroi' 
            ? 'bg-emerald-900 hover:bg-emerald-800 hover:ring-emerald-600 focus-visible:ring-emerald-600' 
            : 'bg-red-900 hover:bg-red-800 hover:ring-red-600 focus-visible:ring-red-600'}`}
        >
            <div className="w-full flex flex-col justify-around h-full gap-3">
                <div className="w-full flex justify-between">
                    <h2 className="text-2xl font-bebas tracking-wide text-shadow">{personagem.nome}</h2>
                    <p className="text-base flex gap-3">{personagem.tipo.replace("heroi", "Herói").replace("vilao", "Vilão")}</p>
                </div>
                <img 
                    className={`object-contain w-full h-48 rounded-sm 
                    ${personagem.tipo == 'heroi' ? 'bg-emerald-950' : 'bg-red-950'} `} 
                    src={personagem.imagem} alt={`Imagem de ${personagem.nome}`} 
                />
                <h3 className="text-xl font-bebas tracking-wide">Descrição:</h3>
                <p className={`text-justify flex-grow text-sm text-neutral-300`}>{personagem.descricao}</p>
                <div className="flex gap-2">
                    <button 
                        onClick={() => deleteHero(personagem.id)} 
                        className="_delete-button w-1/2 flex items-center gap-2 justify-center">
                        <Trash2 size={16} /> Apagar
                    </button>
                    <button 
                        onClick={() => navigate(characterUrl)} 
                        className="_details-button w-1/2 flex items-center gap-2 justify-center">
                        <ArrowUpRightFromSquare size={16} /> Detalhes
                    </button>
                </div>
            </div>
        </div>
    );
}