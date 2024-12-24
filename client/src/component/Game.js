import React from "react";
import { useQuery } from "react-query";
import { GET_GAMES } from "../graphQL/gameTags"; // Import your GraphQL query
import styles from './Authors.module.css';
import axios from 'axios';

function Game() {

  const { data, loading, error } = useQuery("launches", () => {
    return axios({
      url: 'http://localhost:4000/graphql',
      method: "POST",
      data: {
        query: GET_GAMES
      }
    }).then(response => response?.data?.data?.games);
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <React.Fragment>
      <h1>Game Details</h1>
      <table className={styles.table_container}>
        <thead>
          <tr>

            <th className={styles.table_row}>Game</th>
            <th className={styles.table_row}>Platform</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((game) => (
            <tr key={game._id} className={styles.table_row}>
              <td className={styles.table_row}>{game.title}</td>
              <td className={styles.table_row}>{game.platform.join(" , ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Game;
