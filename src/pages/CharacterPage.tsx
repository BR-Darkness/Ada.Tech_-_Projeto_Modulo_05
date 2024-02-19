import { useParams } from "react-router-dom";
import { CharactersData } from "../data/CharactersData";
import { ReturnButton } from "../components/ReturnButton";

export function CharacterPage() {
    let character : string | undefined = '';
    const characterName = useParams();
    character = characterName.characterName;
    window.scrollTo(0, 0);

    let personagem = CharactersData.filter(CharactersData => CharactersData.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /gm, "-").toLowerCase() == ((character) ? character : ''));

    return (
        <>
            <main className="mx-auto max-w-[1480px] min-[455px]:my-12 gap-12 px-5 flex flex-col">
                <section className={`flex justify-around items-center flex-wrap-reverse gap-12 my-12 py-12 px-5 rounded-md border-8 bg-neutral-800
                    ${personagem[0].tipo == 'heroi' && 'border-emerald-950'} ${personagem[0].tipo == 'vilao' && 'border-red-950'}`}>
                    <div className="flex flex-col gap-8">
                        <h1 className="text-4xl sm:text-8xl font-bebas tracking-wide">{personagem[0].nome}</h1>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-8 w-full sm:w-2/3 justify-between">
                                <p>{personagem[0].raca}</p>
                                <p className={` ${personagem[0].tipo == 'heroi' && 'text-emerald-200'} ${personagem[0].tipo == 'vilao' && 'text-red-200'} `}>{personagem[0].tipo.replace("heroi", "Herói").replace("vilao", "Vilão")}</p>
                            </div>
                            <div className="flex gap-8 w-full sm:w-2/3 justify-between">
                                <p><b>Idade:</b> {personagem[0].idade}</p>
                                <p><b>Altura:</b> {personagem[0].altura}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h2 className="text-2xl font-bebas tracking-wide">Poderes:</h2>
                            <ul className="pl-6 list-disc space-y-3">
                                {personagem[0].poderes.map(poder => {
                                    return <li key={poder}>{poder}</li>
                                })}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h2 className="text-2xl font-bebas tracking-wide">História:</h2>
                            <p className="max-w-xl text-justify leading-loose">{personagem[0].historia}</p>
                        </div>
                    </div>
                    <div>
                        <img className={`character-page-character-image rounded-md object-cover ring-4 ${personagem[0].tipo == 'heroi' ? 'ring-emerald-900 bg-green-50' : ''} ${personagem[0].tipo == 'vilao' ? 'ring-red-900 bg-red-50' : ''}`} 
                            src={personagem[0].imagem} 
                            alt={`Imagem de ${personagem[0].nome}`}
                            width="320px" height="480px"
                            loading="eager"
                            />
                    </div>
                </section>
                <ReturnButton route="/#" />
            </main>
        </>
    )    
}