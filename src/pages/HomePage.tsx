import { ChangeEvent, useState } from 'react';
import { Footer } from '../components/Footer';
import { Card } from '../components/Card';
import { CharactersData } from '../data/CharactersData';

export function HomePage() {
  const [cards, setCards] = useState(CharactersData);
  const [filter, setFilter] = useState('');

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    const filteredCharacters = (query != '')
    ? CharactersData.filter(CharactersData => CharactersData.nome.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    : CharactersData;

    setCards(filteredCharacters);
  }

  function handleFilter(selectedValue: ChangeEvent<HTMLSelectElement>) {
    const filter = selectedValue.target.value;
    setFilter(filter);
  }

  return (
    <>
      <main className="mx-auto max-w-[1480px] my-12 space-y-6 px-5">
        <h1 className="text-3xl sm:text-4xl font-bebas tracking-wide">Exercício - Aula 04:</h1>
        <form className="flex flex-wrap gap-3 justify-evenly sm:justify-between">
          <input 
            type="text" 
            placeholder='Pesquise pelo personagem...' 
            className="w-1/2 min-w-[240px] bg-transparent text-xl sm:text-3xl font-semibold placeholder:tracking-wider outline-none placeholder:font-bebas placeholder:text-neutral-500 text-neutral-300 hover:cursor-pointer hover:bg-neutral-800 focus-visible:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-600 rounded-md p-3"
            onChange={handleSearch}
          />
          <div className="flex gap-6 items-center justify-center">
            <select className="bg-transparent text-xl rounded p-3 outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 hover:cursor-pointer hover:bg-neutral-800 focus-visible:bg-neutral-800" name="characterType" id="characterType" defaultValue="" onChange={handleFilter} required>
              <option className="bg-neutral-700" value="">- - -</option>
              <option className="bg-neutral-700" value="heroi">Herói</option>
              <option className="bg-neutral-700" value="vilao">Vilão</option>
            </select>
          </div>
        </form>

        <div className="h-px bg-neutral-700" />

        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {cards.filter(CharactersData => CharactersData.tipo.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map(personagem => {
            return <Card key={personagem.nome} personagem={personagem} />
          })}
        </div>
      </main>
      <Footer />
    </>
  )
}