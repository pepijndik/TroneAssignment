import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useCharacters } from '@/hooks/characters'
import { useState } from 'react'
import { useEffect } from 'react'
import router, { useRouter } from 'next/router'
import { CharacterType } from '@/app/types/CharacterType'
import Character from '@/components/Character'
import PrimaryButton from '@/components/PrimaryButton'
import { useErrors } from '@/hooks/error'
import DangerButton from '@/components/DangerButton'
import { useTrigger } from '@/hooks/trigger'
const Dashboard = () => {
    const {errors,setErrors} = useErrors()
    const { query, } = useRouter()
    const router = useRouter()
    const [status, setStatus] = useState<string | null>(null)
    const [characters,setCharacters] = useState<CharacterType[]>(
        []
    );

    
    useEffect(() => {
        const reset = query && query.reset ? query.reset as string : ''
        if (reset.length > 0 && errors.length === 0) {
            setStatus(atob(reset))
        } else {
            setStatus(null)
        }
    }, [query, errors.length])
    
    const { GetCharacters } = useCharacters();

    const removeCharacter =  (id: number) => {
    const updatedCharacters = characters.filter(character => character.id !== id);
    setCharacters(updatedCharacters);
    }
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
    
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }>

            <Head>
                <title>Games Charaters</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="m-10">
                         <PrimaryButton onClick={()=>{
                            router.push("/character");
                         }}>
                            Add new
                        </PrimaryButton>

                        <DangerButton onClick={()=>{
                            router.push("/battle");
                         }}>
                            Battle
                        </DangerButton>
                    </div>
                        
                    <div className="bg-grey dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                       
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {characters && characters.map((character) => (
                            <Character key={character.id} character={character} onClick={removeCharacter} />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
