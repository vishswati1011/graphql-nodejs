import React,{useState} from "react";
import { useMutation, useQuery } from "react-query";
import { GET_GAMES,ADD_GAME,DELETE_GAME } from "../graphQL/gameTags"; // Import your GraphQL query
import styles from './Authors.module.css';
import axios from 'axios';
import {request} from 'graphql-request';


const useCreateAddGameMutation =  () => {
  return useMutation(
    async (variables) => {
      const response = await request('http://localhost:4000/graphql', ADD_GAME, {addGameInput:variables});
      return response;
    },
    {
      onSuccess: (data) => {
        // Handle success, e.g., update cache, show success message
        console.log('Post created successfully:', data); 
        return data;
      },
      onError: (error) => {
        // Handle errors, e.g., display error message to user
        console.error('Error creating post:', error);
      },
    }
  );
};

function Game() {

  const createGameMutation = useCreateAddGameMutation();
  // const [deleteGameMutation] = useMutation(DELETE_GAME);

  const [inputValue, setInputValue] = useState({
    title: "",
    platform: "",
  });

  const { data, loading, error } = useQuery("launches", () => {
    return axios({
      url: 'http://localhost:4000/graphql',
      method: "POST",
      data: {
        query: GET_GAMES
      }
    }).then(response => response?.data?.data?.games);
  });

  const handleAddGame = async() => {
    // const result = await createGameMutation.mutate({ title: inputValue.title, platform: inputValue.platform });
    // console.log(result,"result")
    try {
      const response = await axios.post('http://localhost:4000/graphql',
        {
          query: ADD_GAME,
          variables: {
            addGameInput:{ title: inputValue.title, platform: inputValue.platform }
          }
        }
      )
      console.log(response,"game added")
    } catch (err) {
      console.error("Error deleting game:", err);
    }
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

  if (loading) return <p>Loading...</p>;
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
          <button onClick={(e) => handleAddGame(e)}>Add </button>
        </div>
        {loading ? (
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
          {data?.map((game) => (
            <tr key={game._id} className={styles.table_row}>
              <td className={styles.table_row}>{game.title}</td>
              <td className={styles.table_row}>{game.platform.join(" , ")}</td>
              <td><button 
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
