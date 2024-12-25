import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_AUTHOR ,DELETE_AUTHOR} from "../graphQL/authorTags"; // Import your GraphQL query
import client from "../graphQL/apolloClient"; // Import your client
import styles from "./Authors.module.css";

function Authors() {
  const { loading, error, data } = useQuery(GET_AUTHORS, { client });
  const [addAuthorMutation, { authorData }] = useMutation(ADD_AUTHOR);
  const [deleteAuthorMutation] = useMutation(DELETE_AUTHOR)
  const [inputValue, setInputValue] = useState({
    name: "",
    verified: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await addAuthorMutation({
      variables: {
        addAuthorInput: {
          name: inputValue.name,
          verified: Boolean(inputValue.verified),
        },
      },
    });
  };

  const handleVerificationChange = (event) => {
    setInputValue({ ...inputValue, verified: event.target.value });
  };
  const handleDelete = async (authorId) => {

    const deleteData = await deleteAuthorMutation({
      variables: {
        deleteAuthorId:authorId
      }
    })
    // console.log(deleteData,"deleteData")
  }
  return (
    <React.Fragment>
      <h1>Authors Details</h1>
      <div className={styles.main}>
        <div className={styles.add_form}>
          <h4>Add Author</h4>
          <input
            placeholder="Enter Author Name"
            value={inputValue?.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, name: e.target.value })
            }
          />
          <select
            value={inputValue.verified}
            onChange={handleVerificationChange}
          >
            <option>Select</option>
            <option name="yes" id="yes" value={true}>
              Yes
            </option>
            <option name="no" id="no" value={false}>
              No
            </option>
          </select>
          <button onClick={(e) => handleSubmit(e)}>Add </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <table className={styles.table_container}>
            <thead>
              <tr>
                <th className={styles.table_row}>Name</th>
                <th className={styles.table_row}>Verified</th>
                <th className={styles.table_row}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.authors.map((author) => (
                <tr key={author.id} className={styles.table_row}>
                  <td className={styles.table_row}>{author.name}</td>
                  <td className={styles.table_row}>{author.verified}</td>
                  <td><button onClick={()=>handleDelete(author.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
}

export default Authors;
