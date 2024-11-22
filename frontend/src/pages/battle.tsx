import { CharacterType } from "@/app/types/CharacterType"
import AppLayout from "@/components/Layouts/AppLayout"
import PrimaryButton from "@/components/PrimaryButton"
import { useCharacters } from "@/hooks/characters"
import { useErrors } from "@/hooks/error"
import { Select } from "@headlessui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"



 const BattlePage = () => {
  const { GetCharacters,Battle } = useCharacters();

  const {errors,setErrors} = useErrors()

  const router = useRouter()
  const [status, setStatus] = useState<string | null>(null)

   const { query } = useRouter()
   const [characters,setCharacters] = useState<CharacterType[]>(
      []
  );

  const [char,setChar] = useState<number>();
  const [enemy,setEnemy] = useState<number>();
  
  const [winner,setWinner] = useState<number|null>(null);
  useEffect( ()=>{

    const get = async ()=>{
        const char = await  GetCharacters({
            setErrors,
            setStatus
        })
      setCharacters(char);
    }
    get();
  },[]);


   return (<AppLayout
      header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Battle
          </h2>
      }>

      <Head>
          <title>Battle Charaters</title>
      </Head>
      <div>

        <h1>Character</h1>
        <Select name="status" aria-label="Battle" onChange={(e)=>{
          setChar(e.target.value as unknown as number)
        }}> 
        {characters && characters.map((character) => (
            <option key={character.id} value={character.id}>{character.name}</option>
        ))}
      </Select>
      <h1>Enemy 1</h1>
      <Select name="status" aria-label="Battle" onChange={(e)=>{
          setEnemy(e.target.value as unknown as number)
        }}> 
        {characters && characters.map((character) => (
            <option key={character.id} value={character.id}>{character.name}</option>
        ))}
      </Select>
         <PrimaryButton onClick={async ()=>{
             if(char && enemy){
          
              const battleWinner = await Battle(char,enemy,{
                  setErrors,setStatus
              });

              console.log(battleWinner);
              setWinner( battleWinner?.winner_id ?? null);
              toast(`Winner is ${battleWinner?.winner_id}`);
             }
              else{

              toast("Select char and enemy")
            }
           
         }}>
          Battle!
         </PrimaryButton>
      </div>

</AppLayout>)
}
export default BattlePage