import Image from "next/image";
import PokemonList from "../components/PokemonList";


export default function Home() {
  return (
    <main>
      <h1>Pokemon App</h1>
      <PokemonList />
    </main>
  );
}
