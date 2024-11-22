import { CharacterForm } from "@/components/CharacterForm"
import AppLayout from "@/components/Layouts/AppLayout"
import Head from "next/head"
import { useRouter } from "next/router"



 const CharacterPage = () => {

   const { query } = useRouter()
   
   return (<AppLayout
      header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Dashboard
          </h2>
      }>

      <Head>
          <title>Games Charaters</title>
      </Head>
      <div>
        <CharacterForm id={query?.id as number|undefined}
        />
      </div>
</AppLayout>)
}
export default CharacterPage