import { CharacterType } from '@/app/types/CharacterType';
import { useCharacters } from '@/hooks/characters'
import { useErrors } from '@/hooks/error';
import { useState } from 'react'
import { toast } from 'react-toastify';
import Label from './Label';
import Input from './Input';
import PrimaryButton from './PrimaryButton';
import ErrorMessage from './Errors';


export function CharacterForm({
    id
}:{ id?:number }) {
    const {errors,setErrors} = useErrors();
    const [status,setStatus] = useState();
  const { UpdateCharacter,CreateCharacter } = useCharacters()

  const [name, setName] = useState('')
  const [health, setHealth] = useState('')
  const [attack, setAttack] = useState('')
  const [gameName, setGameName] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate input
      if (!name || !health || !attack || !gameName) {
        throw new Error('All fields are required')
      }

      const newCharacter = {
        name,
        healthPoints: parseInt(health),
        attackPoints: parseInt(attack),
        gamename: gameName
      } as CharacterType
      if(id){
        await UpdateCharacter(id,newCharacter,{
            setErrors,
            setStatus
          })
      }else{
        await CreateCharacter(newCharacter,{
            setErrors,
            setStatus
          });
      }
    
      // Reset form
      setName('')
      setHealth('')
      setAttack('')
      setGameName('')
    } catch (error) {

      toast( error instanceof Error ? error.message : "Failed to add character")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>

      <div>
        <Label htmlFor="gamename">Defense</Label>
        <Input
          id="gamename"
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          placeholder="Game name"
        />
      </div>

        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Character name"
        />
      </div>
      <div>
        <Label htmlFor="health">Health</Label>
        <Input
          id="health"
          type="number"
          value={health}
          onChange={(e) => setHealth(e.target.value)}
          placeholder="Health points"
        />
      </div>
      <div>
        <Label htmlFor="attack">Attack</Label>
        <Input
          id="attack"
          type="number"
          value={attack}
          onChange={(e) => setAttack(e.target.value)}
          placeholder="Attack points"
        />
      </div>
      <ErrorMessage errors={errors} />
      <PrimaryButton type="submit" disabled={isLoading}
        onClick={handleSubmit}>
        {isLoading ? 'Adding...' : 'Add Character'}
      </PrimaryButton>
    </form>
  )
}
