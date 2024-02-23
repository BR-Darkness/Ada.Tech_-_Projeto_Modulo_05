import { ReturnButton } from "../components/ReturnButton";
import notFoundImage from "../assets/404.gif";

export function ErrorPage() {
    return (
        <>
            <ReturnButton route="/" />
            <main className="min-h-screen flex flex-col justify-center tracking-wider text-center text-balance sm:w-[640px] mx-auto">
                <div className="flex flex-col justify-center items-center gap-6 m-4 py-10 p-4">
                    <h1 className="max-[450px]:order-2 text-4xl min-[450px]:text-6xl font-bebas leading-tight">404: Página não encontrada</h1>
                    <img className="max-[450px]:order-1" src={notFoundImage} alt="Error 404" width={240} />
                    <p className="max-[450px]:order-3 font-bebas text-lg min-[450px]:text-xl leading-normal text-gray-300">A página que procura não pode ser encontrada, procure na vizinhança mais próxima</p>
                </div>
            </main>
        </>
    )
}