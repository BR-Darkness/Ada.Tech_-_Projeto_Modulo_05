import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircle, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Personagem } from "../models/hero";
import { addDoc, collection, } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

export function NewCharacterCard() {

    const initialFormData: Personagem = {
        id: "",
        nome: "",
        tipo: "",
        raca: "",
        origem: "",
        descricao: "",
        idade: "",
        altura: "",
        imagem: ""
    };

    const [formData, setFormData] = useState<Personagem>(initialFormData);

    async function addHeroToFirestore(formData: Personagem) {
        try {
            const docRef = await addDoc(collection(db, 'heroes'), formData);
            console.log('Documento adicionado com ID:', docRef.id);
            setFormData(initialFormData);
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar o herói ao Firestore:', error);
            throw error;
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const input = document.getElementById(name);

        if (value != '') {
            input?.classList.add('ring-emerald-600')
            input?.classList.remove('ring-red-600')
            setFormData({ ...formData, [name]: value });
            return
        }

        input?.classList.add('ring-red-600')
        input?.classList.remove('ring-emerald-600')
    }

    const handleImageUrl = (e : ChangeEvent<HTMLInputElement>) => {
        const testImage = new Image();
        const { name, value } = e.target;
        testImage.src = e.target.value;

        //Caso a url da imagem seja válida
        testImage.onload = function() {
            const input = document.getElementById("imagem");
            input?.classList.add('ring-emerald-600')
            input?.classList.remove('ring-red-600')
            setFormData({ ...formData, [name]: value });
        };

        //Caso a url da imagem seja inválida
        testImage.onerror = function() {
            const input = document.getElementById("imagem");
            input?.classList.add('ring-red-600')
            input?.classList.remove('ring-emerald-600')
            setFormData({ ...formData, [name]: '' });
        };
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger
                className="bg-neutral-800 h-full md:min-h-[480px] min-h-24 flex flex-col justify-center items-center rounded-md outline-none
                hover:ring-[1px] hover:ring-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-600"
                title="Adicionar Personagem"
            >
                <PlusCircle size={48} />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50 flex justify-center items-center">
                    <Dialog.Content className="flex flex-col justify-center items-center p-5 w-[640px] bg-neutral-800 rounded-md relative overflow-hidden">
                        <Dialog.Close className="absolute right-0 top-0 bg-neutral-900 ring-[1px] ring-neutral-800 p-1.5 text-slate-400 hover:text-slate-100">
                            <X size={20} />
                        </Dialog.Close>
                        <form className="flex flex-col gap-3 w-full m-auto">
                            <h2 className="font-bebas text-2xl tracking-wide">Adicionar Personagem:</h2>
                            <input onChange={handleInputChange} name="nome" id="nome" type="text" placeholder="Nome do Heroi" className="_default-input" />
                            <select onChange={handleInputChange} name="tipo" id="tipo" className="_default-input text-neutral-400" defaultValue="" required>
                                <option className="bg-neutral-700" value="">Tipo de Personagem</option>
                                <option className="bg-neutral-700" value="heroi">Herói</option>
                                <option className="bg-neutral-700" value="vilao">Vilão</option>
                            </select>
                            <input onChange={handleInputChange} name="raca" id="raca" type="text" placeholder="Raça (Ex: Humano)" title="Raça do Personagem" className="_default-input" />
                            <input onChange={handleInputChange} name="idade" id="idade" type="number" placeholder="Idade" className="_default-input" />
                            <input onChange={handleInputChange} name="altura" id="altura" type="number" placeholder="Altura" className="_default-input" />
                            <input onChange={handleInputChange} name="origem" id="origem" type="text" placeholder="Origem (Hq de origem)" title="Origem do Personagem" className="_default-input" />
                            <textarea onChange={handleInputChange} name="descricao" id="descricao" placeholder="Detalhes do personagem" cols={30} rows={5} className="_default-input resize-none" ></textarea>
                            <input name="imagem" id="imagem" type="url"
                                placeholder="URL da imagem do personagem"
                                onChange={handleImageUrl} 
                                className="_default-input block"
                            />
                            <div className="flex gap-3 mt-3">
                            <Dialog.Close className="w-full"><button type="button"
                                    onClick={() => addHeroToFirestore(formData)}
                                    className={`_details-button w-full mt-3 ${!formData.nome || !formData.tipo || !formData.raca || !formData.idade || !formData.altura || !formData.origem || !formData.descricao || !formData.imagem ? 'bg-red-500 hover:bg-red-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-400'}`}
                                    disabled={!formData.nome || !formData.tipo || !formData.raca || !formData.idade || !formData.altura || !formData.origem || !formData.descricao || !formData.imagem}
                                >
                                Enviar
                            </button></Dialog.Close>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root >
    )
}