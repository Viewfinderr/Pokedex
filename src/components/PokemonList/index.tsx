"use client"
import React, { useState, useEffect } from 'react';
import PokemonCard from '../PokemonCard';
import TypeFilter from '../TypeFilter';


interface Pokemon {
  name: string;
  type: string;
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredType, setFilteredType] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
     .then((response) => response.json())
     .then((data) => {
        const availableTypes = data.results.map((type: { name: string }) => type.name);
        setTypes(['all',...availableTypes]);
      })
     .catch((error) => console.error('Error fetching Pokemon types:', error));



     //la tu fetch la base pour aller chercher ce que tu veux en l'occurance le nom le type et la photo
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
     .then((response) => response.json())
     .then((data) => {
        const fetchedPokemon: Pokemon[] = data.results.map((pokemon: { name: string }) => ({
          name: pokemon.name,
          // la du coup c'est juste que le type est défini a uknow tant qu'un filtre n'est pas défini
          type: 'unknown',
        }));

        Promise.all(
          fetchedPokemon.map((pokemon) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
             .then((response) => response.json())
             .then((pokemonData) => {
                const pokemonType = pokemonData.types[0].type.name;
                pokemon.type = pokemonType;
              })
          )
        )
         .then(() => setPokemonList(fetchedPokemon))
         .catch((error) => console.error('Error ', error));
      })
     .catch((error) => console.error('Error ', error));
  }, []);

  const filterPokemonByType = (type: string | null) => {
    setFilteredType(type);
  };

  // la tu as ta condition genre si le type du pokemon est le meme que celui qui
  // a été pick alors il s'affiche
  const filteredPokemon = filteredType
   ? pokemonList.filter((pokemon) => pokemon.type === filteredType)
    : pokemonList;

  return (
    <div>
      <TypeFilter types={types} onFilterChange={(type) => filterPokemonByType(type as string | null)} />
      <div>
        {filteredPokemon.slice(0, 10).map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} type={pokemon.type} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
