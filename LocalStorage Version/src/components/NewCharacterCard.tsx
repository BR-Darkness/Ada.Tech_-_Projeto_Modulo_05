import { ChangeEvent, FormEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircle, X } from "lucide-react";

interface Personagem
{
    nome: string,
    tipo: string,
    raca: string,
    origem: string,
    descricao: string,
    idade: string | number,
    altura: string | number,
    imagem: string,
}

type NewCardProps = 
{
    arrCharacters: Personagem[];
    onCardCreated: (personagem: Personagem) => void;
}

export function NewCharacterCard({ arrCharacters, onCardCreated }: NewCardProps) {
    // Definindo estado inicial do modal
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Definindo estado inicial do formulário
    const [formData, setFormData] = useState({
        nome: "",
        tipo: "",
        raca: "",
        origem: "",
        descricao: "",
        idade: "",
        altura: "",
        imagem: ""
    });

    // Verifica o valor digitado nos inputs, textareas e selects
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

    // Verifica se o valor digitado no input nome é único
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const input = document.getElementById('nome');

        if(arrCharacters.find(item => item.nome.toLocaleLowerCase() == value.toLocaleLowerCase())) {
            input?.classList.add('ring-red-600')
            input?.classList.remove('ring-emerald-600')
            setFormData({ ...formData, ['nome']: '' });
            return
        }

        if (value != '') {
            input?.classList.add('ring-emerald-600')
            input?.classList.remove('ring-red-600')
            setFormData({ ...formData, ['nome']: value });
            return
        }

        input?.classList.add('ring-red-600')
        input?.classList.remove('ring-emerald-600')
    }

    // Verifica o valor digitado no inputURL
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

    // Função de Salvar (é passada via props da homepage)
    function handleSaveCard(event: FormEvent) {
        event.preventDefault();
        
        // Verifica se os campos obrigatórios possuem algum dado inserido
        const { nome, origem, tipo, descricao, imagem } = formData;
        if (nome.trim() === '' || origem.trim() === '' || tipo.trim() === '' || descricao.trim() === '' || imagem.trim() === '')
        {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return
        }

        if (formData.idade == '') {
            formData.idade = 'Indefinida';
        }

        if (formData.altura == '') {
            formData.altura = 'Variável';
        }

        onCardCreated(formData);

        setFormData({
            nome: "",
            tipo: "",
            raca: "",
            origem: "",
            descricao: "",
            idade: "",
            altura: "",
            imagem: ""
        });

        setIsModalOpen(false);
    }

    return (
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen} >
            <Dialog.Trigger 
                className="bg-neutral-800 h-full md:min-h-[480px] min-h-24 flex flex-col justify-center items-center rounded-md outline-none
                hover:ring-[1px] hover:ring-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-600" 
                title="Adicionar Personagem"
            > 
                    <PlusCircle size={48} />
            </Dialog.Trigger>
            
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50 flex justify-center items-center">
                    <Dialog.Content className="flex flex-col justify-center items-center p-8 w-[640px] max-[640px]:h-full bg-neutral-800 min-[640px]:rounded-md relative overflow-hidden">
                        <Dialog.Close className="absolute right-0 top-0 bg-neutral-900 ring-[1px] ring-neutral-800 p-1.5 text-slate-400 hover:text-slate-100">
                            <X size={20} />
                        </Dialog.Close>
                        <form className="flex flex-col gap-3 w-full m-auto">
                            <h2 className="font-bebas text-3xl max-[300px]:text-xl mb-3 tracking-wider">Adicionar Personagem:</h2>
                            
                            <input onChange={handleNameChange} name="nome" id="nome" type="text" autoComplete="off" placeholder="Nome do personagem*" className="_default-input"/>

                            <select onChange={handleInputChange} name="tipo" id="tipo" className="_default-input" defaultValue="" required>
                                <option className="bg-neutral-700" value="">Tipo*</option>
                                <option className="bg-neutral-700" value="heroi">Herói</option>
                                <option className="bg-neutral-700" value="vilao">Vilão</option>
                            </select>

                            <input onChange={handleInputChange} name="raca" id="raca" type="text" autoComplete="off" placeholder="Raça* (Ex: Humano)" title="Raça do Personagem" className="_default-input" />

                            <input onChange={handleInputChange} name="idade" id="idade" type="number" autoComplete="off" placeholder="Idade (vazio = indefinida)" className="_default-input" />

                            <input onChange={handleInputChange} name="altura" id="altura" type="number" autoComplete="off" placeholder="Altura (vazio = variável)" className="_default-input" />     

                            <input onChange={handleInputChange} name="origem" id="origem" type="text" autoComplete="off" placeholder="Origem*" title="Origem do Personagem" className="_default-input" />

                            <textarea onChange={handleInputChange} name="descricao" id="descricao" autoComplete="off" placeholder="Detalhes do personagem*" cols={30} rows={5} className="_default-input resize-none"></textarea>

                            <input onChange={handleImageUrl} name="imagem" id="imagem" type="url"
                                autoComplete="off"
                                placeholder="URL da imagem*"
                                className="_default-input block"
                            />
                            
                            <div className="flex gap-3 mt-3">
                                <Dialog.Close className="w-1/2"><button type="button" className="_delete-button inline-block w-full">Cancelar</button></Dialog.Close>
                                <button type="button" className="_details-button w-1/2" onClick={handleSaveCard}>Enviar</button>
                            </div>
                        </form>
                    </Dialog.Content>                    
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}