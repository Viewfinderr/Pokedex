import React, { useEffect, useState } from 'react';


// commme dans java, dans typescript tu as aussi tes constructeurs
// qui vont établir ce qu'il va y avoir à l'intérieur
interface PokemonCardProps {
  name: string;
  types: string[];
}

// on n'oublie pas d'annoncer le type à chaque fois
interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}
XMLDocument

const PokemonCard: React.FC<PokemonCardProps> = ({ name, types }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();

        setPokemonDetails({
          id: data.id,
          name: data.name,
          types: data.types,
          sprites: data.sprites,
        });
      } catch (error) {
        console.error(`Error fetching details for ${name}:`, error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  return (
    <div className="pokemon-card">
      {pokemonDetails && (
        <>
          {/* Afficher le nom du Pokémon */}
          <p className="pokemon-name">{pokemonDetails.name}</p>
          {/* Afficher l'image du Pokémon */}
          <img className="pokemon-image" src={pokemonDetails.sprites.front_default} alt={`${name} sprite`} />
          {/* Afficher les types du Pokémon */}
          <p className="pokemon-types">Types: {types.join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default PokemonCard;
