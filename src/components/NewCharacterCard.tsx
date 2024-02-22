import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircle, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Personagem } from "../models/hero";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
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


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        // if (String(e.target.value) == '') return
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger
                className="bg-neutral-800 h-full min-h-24 flex flex-col justify-center items-center rounded-md outline-none
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
                            <input onChange={handleInputChange} name="nome" type="text" placeholder="Nome do Heroi" className="_default-input" />
                            <select onChange={handleSelectChange} name="tipo" className="_default-input text-neutral-400" defaultValue="" required>
                                <option className="bg-neutral-700" value="">Tipo de Personagem</option>
                                <option className="bg-neutral-700" value="heroi">Herói</option>
                                <option className="bg-neutral-700" value="vilao">Vilão</option>
                            </select>
                            <input onChange={handleInputChange} name="raca" type="text" placeholder="Raça (Ex: Humano)" title="Raça do Personagem" className="_default-input" />
                            <input onChange={handleInputChange} name="idade" type="number" placeholder="Idade" className="_default-input" />
                            <input onChange={handleInputChange} name="altura" type="number" placeholder="Altura" className="_default-input" />
                            <input onChange={handleInputChange} name="origem" type="text" placeholder="Origem (Hq de origem)" title="Origem do Personagem" className="_default-input" />
                            <textarea onChange={handleTextareaChange} name="descricao" placeholder="Detalhes do personagem" cols={30} rows={5} className="_default-input resize-none" ></textarea>
                            <input onChange={handleInputChange} name="imagem" type="url"
                                placeholder="URL da imagem do personagem"
                                // onChange={handleImageUrl} 
                                className="_default-input block"
                            />
                            <Dialog.Close className="w-full">
                                <Dialog.Close className="w-full">
                                    <button
                                        type="button"
                                        onClick={() => addHeroToFirestore(formData)}
                                        className={`_details-button mt-3 ${!formData.nome || !formData.tipo || !formData.raca || !formData.idade || !formData.altura || !formData.origem || !formData.descricao || !formData.imagem ? 'bg-red-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-400'}`}
                                        disabled={!formData.nome || !formData.tipo || !formData.raca || !formData.idade || !formData.altura || !formData.origem || !formData.descricao || !formData.imagem}
                                    >
                                        Enviar
                                    </button>
                                </Dialog.Close>
                            </Dialog.Close>
                        </form>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root >
    )
}