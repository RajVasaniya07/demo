import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
	return (
		<div className="home-container">
			<header className="home-header" title="home page">
				<h1>Home Page</h1>
			</header>
			<main className="home-main">
				<h2>Welcome to My React App</h2>
				<p>Explore the amazing features and functionalities of our app!</p>
				<Link to="/login">
					<button type="button" className="home-btn">
						Login
					</button>
				</Link>
			</main>
		</div>
	);
};

export default Home;
