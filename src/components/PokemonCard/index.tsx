import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PokemonCardProps {
  name: string;
  types: string[];
}

interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

const typeImages: Record<string, string> = {
  normal: 'types/Normal.png',
  fire: 'types/Fire.png',
  water: 'types/Water.png',
  electric: 'types/Electric.png',
  grass: 'types/Grass.webp',
  ice: 'types/Ice.webp',
  fighting: 'types/Fighting.png',
  poison: 'types/Poison.png',
  ground: 'types/Ground.png',
  flying: 'types/Flying.png',
  psychic: 'types/Psy.png',
  bug: 'types/Bug.png',
  rock: 'types/Rock.png',
  ghost: 'types/Ghost.webp',
  dragon: 'types/Dragon.webp',
  dark: 'types/Dark.png',
  steel: 'types/Steel.webp',
  fairy: 'types/Fairy.png',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, types }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
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
          {/* Encapsuler le contenu dans un lien */}
          <Link legacyBehavior href={`/pokemon/${pokemonDetails.name}`}>
            <a>
              {/* Afficher le nom du Pokémon */}
              <p>{pokemonDetails.name}</p>
              <img
                className="pokemon-image"
                src={pokemonDetails.sprites.front_default}
                alt={`${pokemonDetails.name} sprite`}
              />
              {/* Afficher l'image du Pokémon */}
              {/* Afficher les types du Pokémon */}
              <div className="pokemon-types">
                {pokemonDetails.types.map((type, index) => (
                  <div
                    key={index}
                    className={`pokemon-type ${type.type.name}`}
                  >
                    <img
                      className="img-type"
                      src={typeImages[type.type.name]}
                      alt={`${type.type.name} type`}
                    />
                    <p>{type.type.name}</p>
                  </div>
                ))}
              </div>
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default PokemonCard;
