import { useState } from "react";
import { ReturnButton } from "../components/ReturnButton";
import { CharactersData } from "../data/CharactersData";
import { useParams } from "react-router-dom";

interface personagem
{
  nome: string,
  tipo: string,
  raca: string,
  origem: string,
  descricao: string,
  idade: string | number,
  altura: string | number,
  imagem: string
}

export function CharacterPage() {
    // Resgata informações do localStorage
    const [arrCharacters] = useState<personagem[]>(() => {
        const charactersOnStorage = localStorage.getItem('characters');

        if (charactersOnStorage) {
            return JSON.parse(charactersOnStorage);
        }

        localStorage.setItem('characters', JSON.stringify(CharactersData))
        return CharactersData
    });

    // Resgata nome do personagem na Url
    const characterName = useParams();

    // Filtra as informações atrás do personagem
    const [cardInfo] = arrCharacters.filter(item => item.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /gm, "-").toLowerCase() == String(characterName.characterName).normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /gm, "-").toLowerCase())

    // Monta o array do card
    const [personagem] = useState<personagem>({
        nome:cardInfo.nome,
        tipo:cardInfo.tipo,
        raca:cardInfo.raca,
        origem:cardInfo.origem,
        descricao:cardInfo.descricao,
        idade:cardInfo.idade,
        altura:cardInfo.altura,
        imagem:cardInfo.imagem
    })

    window.scrollTo(0, 0);

    return (
        <main className="min-h-screen flex flex-col justify-center gap-12 min-[455px]:px-5 mx-auto max-w-[1480px]">
            <section className={`flex max-[455px]:flex-1 px-5 justify-around items-center flex-wrap-reverse gap-12 
                min-[455px]:my-12 py-12 min-[455px]:rounded-md border-8 bg-neutral-800
                ${personagem.tipo == 'heroi' ? 'border-emerald-950' : 'border-red-950'}`}
            >
                <div className="flex flex-col gap-8 ">
                    <h1 className="text-4xl sm:text-8xl font-bebas tracking-wide">{personagem.nome}</h1>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-8 w-full sm:w-2/3 justify-between">
                            <p className="min-[455px]:min-w-32"><b>Idade:</b> {personagem.idade}</p>
                            <p className={`min-[455px]:min-w-32 ${personagem.tipo == 'heroi' ? 'text-emerald-200' : 'text-red-200'}`}>
                                {personagem.tipo.replace("heroi", "Herói").replace("vilao", "Vilão")}
                            </p>
                        </div>
                        <div className="flex gap-8 w-full sm:w-2/3 justify-between">
                            <p className="min-[455px]:min-w-32"><b>Altura:</b> {personagem.altura}</p>
                            <p className="min-[455px]:min-w-32"><b>Raça:</b> {personagem.raca}</p>
                        </div>
                        <p className="leading-loose text-justify text-balance"><b>Origem:</b> {personagem.origem}</p> 
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-bebas tracking-wide">Descrição:</h2>
                        <p className="max-w-xl text-justify leading-loose">{personagem.descricao}</p>
                    </div>
                </div>
                <div>
                    <img className={`character-page-character-image rounded-md object-cover ring-4 
                    ${personagem.tipo == 'heroi' ? 'ring-emerald-900 bg-green-50' : 'ring-red-900 bg-red-50'}`} 
                        src={personagem.imagem} 
                        alt={`Imagem de ${personagem.nome}`}
                        width="320px" height="480px"
                        loading="eager"
                    />
                </div>
            </section>
            <ReturnButton route="/" />
        </main>
    )    
}