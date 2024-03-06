'use client'
import React, { useEffect, useState } from 'react';

interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  weight: number;
  height: number;
  stats: { base_stat: number; stat: { name: string } }[];
}

const PokemonDetailsPage: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const pathSegments = window.location.pathname.split('/');
        const pokemonName = pathSegments[pathSegments.length - 1];

        if (pokemonName && typeof pokemonName === 'string') {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          const data = await response.json();
          setPokemonDetails({
            id: data.id,
            name: data.name,
            types: data.types,
            sprites: data.sprites,
            weight: data.weight,
            height: data.height,
            stats: data.stats,
          });
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération des détails pour ${pokemonDetails}:`, error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonDetails]);

  if (!pokemonDetails) {
    return <div>Loading</div>;
  }

  return (
    <div className="show-pokemon bg-black text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{pokemonDetails.name}</h1>
      <p className="text-gray-400">Pokedex Number: {pokemonDetails.id}</p>
      <p className="text-gray-400">Types: {pokemonDetails.types.map((type: any) => type.type.name).join(', ')}</p>
      <p className="text-gray-400">Weight: {pokemonDetails.weight}</p>
      <p className="text-gray-400">Height: {pokemonDetails.height}</p>
      <p className="text-gray-400">Stats:</p>
      <ul className="text-gray-400">
        {pokemonDetails.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <img className="mt-4" src={pokemonDetails.sprites.front_default} alt={`${pokemonDetails.name} sprite`} />
    </div>
  );

};

export default PokemonDetailsPage;
