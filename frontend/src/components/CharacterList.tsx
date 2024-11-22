'use client'

import { CharacterType } from '@/app/types/CharacterType'
import { useState } from 'react'
import Character from './Character'



type CharacterListProps = {
  initialCharacters: CharacterType[]
}

export default function CharacterList({ initialCharacters }: CharacterListProps) {
  const [characters] = useState(initialCharacters)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {characters.map((character) => (
        <Character key={character.id} character={character} />
      ))}
    </div>
  )
}

