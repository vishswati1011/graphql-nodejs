## how to make GraphQL api calls in React

1. create react project

###
    npx create-react-app client
###

2. cd client
3. npm start
4. http://localhost:3000/
5. install routing package
###
    npm i react-router-dom
###

6. now we add Router to index.js
###
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';
    import App from './App';
    import reportWebVitals from './reportWebVitals';
    import {BrowserRouter as Router } from 'react-router-dom'

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <Router>
        <App />
        </Router>
    </ApolloProvider>
    );
    reportWebVitals();

###

7. now we create component folder in src folder

8. now create Header.js file
## Header.js
###
   import React from "react";
    import styles from "./Header.module.css";
    import { Link } from "react-router-dom";
    function Header() {
    return (
        <nav className={styles.header}>
        <h1 className={styles.title}>GraphQL-Project</h1>
        <ul className={styles.list_menu}>
            <Link to="/" className={styles.list_style}><li>Authors</li></Link>
            <Link to="/game" className={styles.list_style}><li>Game</li></Link>
            <Link to="/review" className={styles.list_style}><li>Reviews</li></Link>
        </ul>
        </nav>
    );
    }

    export default Header;
###

## 9. Header.module.css

###
    .header {
        display: flex;
        background-color: black;
        color:aliceblue;
        align-items: center;
        justify-content: space-around;
    }

    .title:hover{
        color: rgb(247, 154, 40);
    }
    .list_menu{
        list-style: none;
        display: flex;
    }

    .list_style{
        text-decoration: none;
        margin-left: 10px;
        color: white;
    }
    .list_style:hover{
        color: rgb(247, 154, 40);
    }
###


10. create more file in component folder like 
    9.1 Author.js
    9.2 Games.js
    9.3 Header.js

## Author.js
###

    import React from "react";

    function Authors() {
    return (
        <React.Fragment>
        <h1>Authors Details</h1>
        </React.Fragment>
    );
    }

    export default Authors;

###

## Game.js
###

    import React from "react";

    function Games() {
    return (
        <React.Fragment>
        <h1>Games Details</h1>
        </React.Fragment>
    );
    }

    export default Games;

###


## Review.js
###

    import React from "react";

    function Reviews() {
    return (
        <React.Fragment>
        <h1>Reviews Details</h1>
        </React.Fragment>
    );
    }

    export default Reviews;

###


11. now we add above page routes in App.js

    import "./App.css";
    import Authors from "./component/Authors";
    import Game from './component/Games'
    import Review from './component/Reviews';
    import Header from "./component/Header";
    import { Routes, Route } from "react-router-dom";

    function App() {
    return (
        <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Authors />} />
            <Route path="/game" element={<Game />} />
            <Route path="/review" element={<Review />} />
        </Routes>
        </div>
    );
    }

    export default App;


12. check nagivation on browser

13. now we install apollo client dependency

###
    npm i @apollo/client graphql graphql-tag
###

## 13. 1. create graphQL folder 

## 13. 2.  create graphQL/apolloClient.js and configure baseurl
###
    import { ApolloClient, InMemoryCache ,} from '@apollo/client';

    const client = new ApolloClient({
    uri: "http://localhost:4000/graphql/",
    cache: new InMemoryCache()
    });

    export default client;
###

## 13. 3. import apollo/client and provider to index.js file

###
    import { ApolloProvider} from "@apollo/client";
    import client from './graphQL/apolloClient'
###

## 13. 4. 
###

    root.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
    );

###

## 13. 5. now to use apolloProvider to make api calls

## 13. 6. Author.js
###
    import { useQuery } from "@apollo/client";
    import { GET_AUTHORS } from "../graphQL/authorTags"; // Import your GraphQL query
    import client from "../graphQL/apolloClient"; // Import your client
###

## 13. 7. useQuery to graphql api calls in Author.js

###
    const { loading, error, data } = useQuery(GET_AUTHORS, { client });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
###

## 13. 8. Author.js file look like 
###
    import React from "react";
    import { useQuery } from "@apollo/client";
    import { GET_AUTHORS } from "../graphQL/authorTags"; // Import your GraphQL query
    import client from "../graphQL/apolloClient"; // Import your client
    import styles from './Authors.module.css';

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

###

## 14. now how to use react-query to make api calls

## 14. 1. first install react-query

###
    npm i react-query -f
###

## 14. 2. import queryClientProvider in index.js

###
    import { QueryClient, QueryClientProvider } from 'react-query';

    const queryClient = new QueryClient();
###

## 14. 3. create graphQL/GameTag.js file to add graphql query 

###
    import {gql} from '@apollo/client';

    export const GET_GAMES = `
    query {
        games{
            id
            title
            platform
        }
        }
    `;

###
## 14. 4. now in game.js look how to make api call use useQuery and react-query

###

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

###


## 15. graphql with axios

## 15. 1. create graphQL/reviewTag.js

###
    export const GET_REVIEWS = `
    query GET_REVIEWS {
        reviews{
            id
            rating
            content
            author{
                name
            }
            game{
                title
            }
        }
        }
    `;

###

## 15.2. refer review.js to learn how to use axios make graphql api calls

###
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

###