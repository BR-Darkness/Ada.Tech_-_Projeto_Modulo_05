import { ChangeEvent, useState } from 'react';
import { Footer } from '../components/Footer';
import { Card } from '../components/Card';
import { CharactersData } from '../data/CharactersData';
import { NewCharacterCard } from '../components/NewCharacterCard';

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

export function HomePage() {
  // Filtro de tipo
  const [filter, setFilter] = useState('');

  // Filtro de busca por texto
  const [search, setSearch] = useState('');

  // Lista de personagens
  const [cards, setCards] = useState<personagem[]>(() => {
    const charactersOnStorage = localStorage.getItem('characters');

    if (charactersOnStorage) return JSON.parse(charactersOnStorage);

    localStorage.setItem('characters', JSON.stringify(CharactersData))
    return CharactersData
  });

  // Salvar novo personagem
  function onCardCreated(personagem: personagem) {
    const newCard = personagem;
    const cardsArray = [newCard, ...cards];

    setCards([newCard, ...cards]);
    localStorage.setItem('characters', JSON.stringify(cardsArray));
  }

  // Salva o filtro de tipo selecionado
  function handleFilter(selectedValue: ChangeEvent<HTMLSelectElement>) {
    const filter = selectedValue.target.value;
    setFilter(filter);
  }

  // Salvar palavra pesquisada
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  // Array filtrado de personagens baseado na palavra pesquisada
  const filteredCharacters = (search != '')
    ? cards.filter(card => card.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : cards;

  // Função de deletar personagem (é passada via props para o card)
  function onCardDeleted(nome: string) {
    const cardsArray = cards.filter(cards => {
      return cards.nome != nome;
    })

    setCards(cardsArray);
    localStorage.setItem('characters', JSON.stringify(cardsArray));
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-full mx-auto max-w-[1480px] my-12 space-y-6 px-5">
        <h1 className="text-3xl sm:text-4xl font-bebas tracking-wide">Projeto Final - Módulo 05:</h1>
        <form className="flex flex-wrap gap-3 justify-evenly sm:justify-between">
          <input 
            type="text" 
            placeholder='Pesquise pelo personagem...' 
            className="w-1/2 min-w-[240px] bg-transparent text-xl sm:text-3xl font-semibold placeholder:tracking-wider outline-none placeholder:font-bebas placeholder:text-neutral-500 text-neutral-300 hover:cursor-pointer hover:bg-neutral-800 focus-visible:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-600 rounded-md p-3"
            onChange={handleSearch}
          />
          <div className="flex gap-6 items-center justify-center">
            <select className="bg-transparent text-lg rounded p-3 outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 hover:cursor-pointer hover:bg-neutral-800 focus-visible:bg-neutral-800" name="characterType" id="characterType" defaultValue="" onChange={handleFilter} title="Selecione um tipo de personagem" required>
              <option className="bg-neutral-700" value="">- - -</option>
              <option className="bg-neutral-700" value="heroi">Herói</option>
              <option className="bg-neutral-700" value="vilao">Vilão</option>
            </select>
          </div>
        </form>

        <div className="h-px bg-neutral-700" />

        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
          <NewCharacterCard arrCharacters={cards} onCardCreated={onCardCreated} />
          {
            // Array filtrado pelo termo buscado sendo filtrado novamente pelo tipo buscado 
            filteredCharacters.filter(Character => Character.tipo.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map(personagem => {
              return <Card key={personagem.nome} personagem={personagem} onCardDeleted={onCardDeleted}/>
            })
          }
        </div>
      </main>
      <Footer />
    </div>
  )
}