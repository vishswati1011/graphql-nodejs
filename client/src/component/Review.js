import React,{useState,useEffect} from "react";
import { GET_REVIEWS } from "../graphQL/reviewTags"; // Import your GraphQL query
import styles from './Authors.module.css';
import axios from 'axios';

function Review() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

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
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <React.Fragment>
      <h1>Reviews Details</h1>
      <table className={styles.table_container}>
        <thead>
          <tr>

            <th className={styles.table_row}>Rating</th>
            <th className={styles.table_row}>Content</th>
            <th className={styles.table_row}>Author Name</th>
            <th className={styles.table_row}>Game</th>
          </tr>
        </thead>
        <tbody>
          {reviews?.map((review) => (
            <tr key={review._id} className={styles.table_row}>
              <td className={styles.table_row}>{review.rating}</td>
              <td className={styles.table_row}>{review.content}</td>
              <td className={styles.table_row}>{review.game.title}</td>
              <td className={styles.table_row}>{review.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Review;
