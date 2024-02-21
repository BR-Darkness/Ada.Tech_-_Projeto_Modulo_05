import { ReturnButton } from "../components/ReturnButton";
import { CharactersData } from "../data/CharactersData";
import { useParams } from "react-router-dom";

export function CharacterPage() {
    const characterName = useParams();
    let character : string | undefined = '';
    character = characterName.characterName;

    const [personagem] = 
    CharactersData.filter(CharactersData => CharactersData.nome.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "").replace(/ /gm, "-")
    .toLowerCase() == ((character) ? character : ''));

    window.scrollTo(0, 0);

    return (
        <main className="min-h-screen flex flex-col justify-center gap-12 min-[455px]:px-5 mx-auto max-w-[1480px]">
            <section className={`flex justify-around items-center flex-wrap-reverse gap-12 
                min-[455px]:my-12 py-12 px-5 min-[455px]:rounded-md border-8 bg-neutral-800
                ${personagem.tipo == 'heroi' ? 'border-emerald-950' : 'border-red-950'}`}
            >
                <div className="flex flex-col gap-8">
                    <h1 className="text-4xl sm:text-8xl font-bebas tracking-wide">{personagem.nome}</h1>
                    <p className="leading-loose text-sm text-justify text-balance "><b>Origem:</b> {personagem.origem}</p>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-8 w-full sm:w-2/3 justify-between">
                            <p><b>Idade:</b> {personagem.idade}</p>
                            <p className={` ${personagem.tipo == 'heroi' ? 'text-emerald-200' : 'text-red-200'}`}>
                                {personagem.tipo.replace("heroi", "Herói").replace("vilao", "Vilão")}
                            </p>
                        </div>
                        <div className="flex gap-8 w-full sm:w-2/3 justify-between">
                            <p><b>Altura:</b> {personagem.altura}</p>
                            <p>{personagem.raca}</p>
                        </div>
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