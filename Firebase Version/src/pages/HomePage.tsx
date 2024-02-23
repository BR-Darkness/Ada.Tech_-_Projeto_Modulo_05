import { ChangeEvent, useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Card } from '../components/Card';
import { NewCharacterCard } from '../components/NewCharacterCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebaseConnection';
import { Personagem } from '../models/hero';



export function HomePage() {
  const [cards, setCards] = useState<Personagem[]>([])
  const [filter, setFilter] = useState('');


  useEffect(() => {
     loadHeroes();
  }, []);

  async function loadHeroes() {
    const heroesRef = collection(db, "heroes");
    const unsubscribe = onSnapshot(heroesRef, (snapshot) => {
      const heroesData: Personagem[] = [];
      snapshot.forEach((doc) => {
        const heroData = {
          id: doc.id,
          altura: doc.data().altura,
          descricao: doc.data().descricao,
          idade: doc.data().idade,
          imagem: doc.data().imagem,
          nome: doc.data().nome,
          origem: doc.data().origem,
          raca: doc.data().raca,
          tipo: doc.data().tipo,
        };
        heroesData.push(heroData);
      });
      setCards(heroesData);
    });
    return unsubscribe;
  }

  console.log(cards)

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    const filteredCharacters = (query != '')
      ? cards.filter(CharactersData => CharactersData.nome.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
      : cards;

    setCards(filteredCharacters);
  }

  function handleFilter(selectedValue: ChangeEvent<HTMLSelectElement>) {
    const filter = selectedValue.target.value;
    setFilter(filter);
  }


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow mx-auto max-w-[1480px] my-12 space-y-6 px-5">
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
          <NewCharacterCard />
          {cards.filter(CharactersData => CharactersData.tipo.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map(personagem => {
            return <Card key={personagem.id} personagem={personagem} />
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}