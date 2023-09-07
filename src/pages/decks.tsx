import {useCreateDeckMutation, useGetDecksQuery} from "@/services/decks/decks.ts"
import {Button} from "@/components/ui"
import {useState} from "react"

export const Decks = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const decks = useGetDecksQuery({
    itemsPerPage: itemsPerPage,
  })
  const [createDeck] = useCreateDeckMutation()

  console.log(decks)
  if (decks.isLoading) return <div>Loading...</div>
  if (decks.isError) return <div>Error</div>

  return (
    <div>
      <Button
        onClick={() => {
          createDeck({name: '123'})
        }}
      >
        create deck
      </Button>
      <Button onClick={() => setItemsPerPage(20)}>20 items per page</Button>
      <Button onClick={() => setItemsPerPage(10)}>10 items per page</Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Updated</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>

      {


        decks.data?.items?.map((deck) => {
          return (
            <tr key={deck.id}>
              <td>{deck.name}</td>
              <td>{deck.cardsCount}</td>
              <td>{deck.updated}</td>
              <td>{deck.author.name}</td>
            </tr>
            )
        })
      }
        </tbody>

      </table>
    </div>
  )
}