import React from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../graphQL/authorTags"; // Import your GraphQL query
import client from "../graphQL/apolloClient"; // Import your client
import styles from "./Authors.module.css";

function Authors() {
  const { loading, error, data } = useQuery(GET_AUTHORS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <React.Fragment>
      <h1>Authors Details</h1>
      <table className={styles.table_container}>
        <thead>
          <tr>
            <th className={styles.table_row}>Name</th>
            <th className={styles.table_row}>Verified</th>
          </tr>
        </thead>
        <tbody>
          {data.authors.map((author) => (
            <tr key={author._id} className={styles.table_row}>
              <td className={styles.table_row}>{author.name}</td>
              <td className={styles.table_row}>{author.verified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Authors;
