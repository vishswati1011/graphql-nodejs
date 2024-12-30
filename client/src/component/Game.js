import React,{useEffect, useState} from "react";
import { useMutation, useQuery } from "react-query";
import { GET_GAMES,ADD_GAME,DELETE_GAME } from "../graphQL/gameTags"; // Import your GraphQL query
import styles from './Authors.module.css';
import axios from 'axios';


const fetchGames = async () => {
  const response = await axios.post("http://localhost:4000/graphql", {
    query: GET_GAMES
  })
  return response.data?.data?.games;
}


function Game() {
  const [inputValue, setInputValue] = useState({
    title: "",
    platform: "",
  });

  const { data :games, isLoading, error } = useQuery("gameData",fetchGames);

  // console.log(games,"game data")
  const [gameData,setGameData] = useState([])
  const addGameMutation = useMutation (async (addGameInput) => {
    const response =  await axios.post('http://localhost:4000/graphql',
      {
        query: ADD_GAME,
        variables: {
          addGameInput
        }
      }
    );
    setGameData([...gameData,response.data.data.addGame])
    return response;

  })

  useEffect(()=>{
    setTimeout(()=>{
      setGameData(games)
    },2000)
  },[])
  const handleAddGame = async() => {
    await addGameMutation.mutate({ title: inputValue.title, platform: inputValue.platform });
  
  };

  const handleDelete = async (gameId) => {
    try {
      const response = await axios.post('http://localhost:4000/graphql',
        {
          query: DELETE_GAME,
          variables: {
            deleteGameId:gameId
          }
        }
      )
      console.log(response,"game deleted")
    } catch (err) {
      console.error("Error deleting game:", err);
    }
  };

  const handleVerificationChange = (event) => {
    setInputValue({ ...inputValue, platform: event.target.value });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  


  return (
    <React.Fragment>
      <h1>Game Details</h1>
      <div className={styles.main}>
        <div className={styles.add_form}>
          <h4>Add Author</h4>
          <input
            placeholder="Enter Game"
            value={inputValue?.title}
            onChange={(e) =>
              setInputValue({ ...inputValue, title: e.target.value })
            }
          />
          <select
            value={inputValue.platform}
            onChange={handleVerificationChange}
          >
            <option>Select Platform</option>
            <option name="yes" id="yes" value="ios">
              IOS
            </option>
            <option name="no" id="no" value="android">
              Android
            </option>
          </select>
          <button onClick={(e) => handleAddGame(e)}>{addGameMutation.isLoading?  "Submitting..." : "Add" } </button>
          {addGameMutation.isError && <p style={{color:"red"}}> Error in add Game </p> }
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
      <table className={styles.table_container}>
        <thead>
          <tr>

            <th className={styles.table_row}>Game</th>
            <th className={styles.table_row}>Platform</th>
            <th className={styles.table_row}>Action</th>
          </tr>
        </thead>
        <tbody>
          {gameData && gameData?.length>0 &&gameData?.map((game) => (
            <tr key={game._id} className={styles.table_row}>
              <td className={styles.table_row}>{game.title}</td>
              <td className={styles.table_row}>{game.platform.join(" , ")}</td>
              <td><button 
              className={styles.delete_btn}
              onClick={()=>handleDelete(game.id)}
              >Delete</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
        )}
        </div>
    </React.Fragment>
  );
}

export default Game;
