

import { CharacterType } from "@/app/types/CharacterType";
import { IApiRequest } from "./auth";
import axios, { csrf } from "@/lib/axios";
import { toast } from "react-toastify";

export const useCharacters = () => {
     
    const GetCharacters  = async (args: IApiRequest): Promise<CharacterType[]> => {
        const { setErrors,} = args

        await csrf()
        setErrors([])

        return axios
            .get('/api/characters')
            .then(({data}) => {
                console.log("data",data);
                return data.characters as CharacterType[];
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
                return [];
            })
    }

    const UpdateCharacter  = async (id:number,
        character: CharacterType, 
        args: IApiRequest) => {
        const { setErrors } = args

        await csrf()

        setErrors([])

        axios
            .put(`/api/characters/${id}`, character)
            .then(({data}) => {
                toast( "Character updated successfully!")
                return data
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                toast( error.response.data.errors);
                setErrors(error.response.data.errors)
            })
    }

    const CreateCharacter  = async (
        character: CharacterType, 
        args: IApiRequest) => {
        const { setErrors } = args

        await csrf()

        setErrors([])

        axios
            .post(`/api/characters/`, character)
            .then(({data}) => {
                console.log(data);
                toast("Character created successfully!")
                return data
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                toast("Failure");
                setErrors(error.response.data.errors)
            })
    }
    const DeleteCharacter  = async (id:number,
        args: IApiRequest ) => {
        const { setErrors, 
             } = args

        await csrf()

        setErrors([])

        axios
            .delete(`/api/characters/${id}`)
            .then((r:unknown) => {
                toast( "Character deleted successfully!")
                return r;
            })
            .catch(error => {

                if (error.response.status !== 422) throw error
                toast("Failure");
                setErrors(error.response.data.errors)
            })
    }

    const Battle  = async (id:number,enemy:number, args:IApiRequest) => {
        const { setErrors, ...props } = args

        await csrf()

        setErrors([])

        return axios
            .post(`/api/characters/${id}/battle/${enemy}`, props)
            .then((data) => {
                return data;
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }
    return {
        CreateCharacter,
        GetCharacters,
        UpdateCharacter,
        DeleteCharacter,
        Battle
    }
}