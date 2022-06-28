import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import styled from 'styled-components'

interface Character {
  name: string
  id: number
  image: string
  status: string
  species: string
  gender: string
  type: string
  location: any
}

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 20px;
  flex-wrap: wrap;
  padding: 10px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: #fff;
  width: 300px;

  @media screen and (min-width: 1024px) {
    width: 800px;
  }
`

const Card = styled.div`
  display: flex;
  gap: 15px;
  background: #3d3d3d;
  border: 2px solid #4d4d4d;
  padding: 15px;
  border-radius: 6px;
  flex: 1 1 300px;
  width: 300px;
  text-align: left;

  h3 {
    font-weight: 600;
    font-size: 1.4rem;
  }

  img {
    border-radius: 6px;
    align-self: flex-start;
  }
`

const Pagination = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;

  button {
    background: #3d3d3d;
    color: #fff;
    font-size: 1.4rem;
    padding: 10px 20px;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
    }
  }
`

const App = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useQuery(
    ['people', page],
    async ({ queryKey }) => {
      console.log(queryKey)
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
      )
      return data
    },
    {
      keepPreviousData: true,
      onSettled: () => {
        window.scrollTo(0, 0)
      },
    }
  )

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div>Error!</div>
  }

  return (
    <Container>
      <h1 style={{ width: '100%' }}>Rick and Morty Characters</h1>
      {data.results.map((character: Character) => (
        <Card key={character.id}>
          <img src={character.image} width={120} />
          <div>
            <h3>{character.name}</h3>
            <p>
              <strong>status:</strong> {character.status}
            </p>
            <p>
              <strong>gender:</strong> {character.gender}
            </p>
            <p>
              <strong>species:</strong> {character.species}
            </p>
            <p>
              <strong>location:</strong> {character.location.name}
            </p>
          </div>
        </Card>
      ))}
      <Pagination>
        <button
          onClick={() => {
            setPage(page - 1)
          }}
          disabled={!data.info.prev}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPage(page + 1)
          }}
          disabled={!data.info.next}
        >
          Next
        </button>
      </Pagination>
    </Container>
  )
}

export default App
