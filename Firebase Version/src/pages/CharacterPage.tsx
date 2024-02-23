import { doc, getDoc } from "firebase/firestore";
import { ReturnButton } from "../components/ReturnButton";
import { useParams } from "react-router-dom";
import { db } from "../services/firebaseConnection";
import { useEffect, useState } from "react";
import { Personagem } from "../models/hero";

export function CharacterPage() {
    const { characterId } = useParams();
    const [personagem, setPersonagem] = useState<Personagem | null>(null);

    useEffect(() => {
        async function fetchCharacter() {
            console.log(characterId)
            try {
                if (!characterId) {
                    console.error("ID do personagem não especificado.");
                    return;
                }

                const heroData = await getHeroById(characterId);
                if (heroData) {
                    setPersonagem(heroData);
                } else {
                    console.log("Personagem não encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar personagem:", error);
            }
        }
        fetchCharacter();
    }, [characterId]);

    async function getHeroById(heroId: string) {
        try {
            const heroDocRef = doc(db, "heroes", heroId);
            if (!heroDocRef) {
                console.error("Referência do documento não foi criada corretamente.");
                return null;
            }
            
            const heroDocSnapshot = await getDoc(heroDocRef);
            if (heroDocSnapshot.exists()) {
                return heroDocSnapshot.data() as Personagem;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar herói por ID:", error);
            throw error;
        }
    }

    window.scrollTo(0, 0);

    if (!personagem) {
        return <div>Carregando...</div>;
    }

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
            <ReturnButton route="/home" />
        </main>
    )    
}