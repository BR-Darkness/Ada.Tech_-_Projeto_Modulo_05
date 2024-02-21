import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";

export function NewCharacterCard() {
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
                    <Dialog.Content className="flex flex-col justify-center items-center w-[640px] h-[640px] bg-neutral-800 rounded-md">
                        <input type="text" placeholder="Nome do Heroi" className="_default-input"/>
                        <input type="text" placeholder="Nome do Heroi" className="_default-input"/>
                        <input type="text" placeholder="Nome do Heroi" className="_default-input"/>
                        <input type="text" placeholder="Nome do Heroi" className="_default-input"/>

                    </Dialog.Content>                    
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}