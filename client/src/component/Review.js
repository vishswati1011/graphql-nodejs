// GraphQL with Axios without react-query and apollo/client

import React,{useState,useEffect} from "react";
import { GET_REVIEWS, DELETE_REVIEW, ADD_REVIEW ,GET_AUTHORS} from "../graphQL/reviewTags"; // Import your GraphQL query
import { GET_GAMES } from "../graphQL/gameTags";
import styles from './Authors.module.css';
import axios from 'axios';

function Review() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [authors,setAuthors] = useState([]);
  const [games,setGames] = useState([]);
 
  const [inputValue, setInputValue] = useState({
    content:'',
    rating:'',
    game_id:'',
    author_id:''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/graphql', {
          query: GET_REVIEWS,
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
        setReviews(response.data.data?.reviews);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      try {
        const response = await axios.post('http://localhost:4000/graphql', {
          query: GET_GAMES,
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
        setGames(response.data.data?.games);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      try {
        const response = await axios.post('http://localhost:4000/graphql', {
          query: GET_AUTHORS,
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
        setAuthors(response.data.data?.authors);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(authors,"game",games)
  const handleAdd = async() => {
    try {
      const response = await axios.post('http://localhost:4000/graphql',
        {
          query: ADD_REVIEW,
          variables: {
            addReviewInput:{ content: inputValue.content, 
              rating: inputValue.rating, 
              author_id:inputValue.author_id,
              game_id:inputValue.game_id
            }
          }
        }
      )
      console.log(response,"game added")
    } catch (err) {
      console.error("Error deleting game:", err);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.post('http://localhost:4000/graphql',
        {
          query: DELETE_REVIEW,
          variables: {
            deleteReviewId:reviewId
          }
        }
      )
      console.log(response,"game deleted")
    } catch (err) {
      console.error("Error deleting game:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <React.Fragment>
      <h1>Reviews Details</h1>
      <div className={styles.main}>
      <div className={styles.add_form}>
          <h4>Add Author</h4>
          <input
            placeholder="Enter Content"
            value={inputValue?.content}
            onChange={(e) =>
              setInputValue({ ...inputValue, content: e.target.value })
            }
          />
           <input
            type='number'
            placeholder="Enter rating"
            value={inputValue?.rating}
            onChange={(e) =>
              setInputValue({ ...inputValue, rating: e.target.value })
            }
          />
          <select
            value={inputValue.game_id}
            onChange={(e)=>setInputValue({...inputValue,game_id:e.target.value})}
          >
            <option>Select Game</option>
            {games?.map((game)=>
                <option id={game.id} value={game.id}>
                {game.title}
              </option>
            )}
          </select>

          <select
            value={inputValue.author_id}
            onChange={(e)=>setInputValue({...inputValue,author_id:e.target.value})}
          >
            <option>Select Author</option>
            {authors?.map((author)=>
                <option id={author.id} value={author.id}>
                {author.name}
              </option>
            )}
          </select>
          <button onClick={(e) => handleAdd(e)}>Add </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
      <table className={styles.table_container}>
        <thead>
          <tr>

            <th className={styles.table_row}>Rating</th>
            <th className={styles.table_row}>Content</th>
            <th className={styles.table_row}>Author Name</th>
            <th className={styles.table_row}>Game</th>
            <th className={styles.table_row}>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews?.map((review) => (
            <tr key={review._id} className={styles.table_row}>
              <td className={styles.table_row}>{review.rating}</td>
              <td className={styles.table_row}>{review.content}</td>
              <td className={styles.table_row}>{review.game.title}</td>
              <td className={styles.table_row}>{review.author.name}</td>
              <td className={styles.table_row} ><button className={styles.delete_btn}
              onClick={()=>handleDelete(review.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
        )}
        </div>
    </React.Fragment>
  );
}

export default Review;
