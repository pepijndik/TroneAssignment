import { CharacterType } from "@/app/types/CharacterType"
import DangerButton from "./DangerButton"
import { useCharacters } from "@/hooks/characters";
import { useState } from "react";
import { useErrors } from "@/hooks/error";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/router";
type CharacterProps = {
  character: CharacterType
  onClick: (id:number) => void
}

export default function Character({ character, onClick }: CharacterProps) {

  const {setErrors} = useErrors()
  const [status, setStatus] = useState<string | null>(null)
  const { DeleteCharacter } = useCharacters()
  const router = useRouter()
  useEffect(()=>{
    toast(status);

  },[status])

  const Delete =  async ()=> {
    await  DeleteCharacter(
      character.id,{
        setErrors,
        setStatus
    });
   await onClick(character.id);
  }
  return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">{character.name}</h2>
        <h3 className="text-xl font-semibold mb-2">{character.gamename}</h3>
        <p className="text-gray-600 mb-1">attackPoints: {character.attackPoints}</p>
        <p className="text-gray-600 mb-1">healthPoints: {character.healthPoints}</p>
        <DangerButton onClick={Delete}>Delete</DangerButton>

        <PrimaryButton onClick={
                ()=> {
                  router.push(`/character?id=${character.id}`);
                }
            }>Edit</PrimaryButton>


      </div>
    )
}

