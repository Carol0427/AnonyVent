import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import micImg from "../images/mic-button.png";
import tapeImg from "../images/retro-tape-icon.png";
import "./Home.css";

const Home = () => {
	const [docs, setDocs] = useState([]);

	const fetchDocs = async () => {
		try {
			const response = await fetch("http://localhost:8080/get"); // Update the URL with your server URL
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setDocs(data);
			localStorage.setItem("docs", JSON.stringify(data)); // Store data in localStorage
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		const storedDocs = JSON.parse(localStorage.getItem("docs"));
		if (storedDocs && storedDocs.length > 0) {
			setDocs(storedDocs);
		} else {
			fetchDocs();
		}
	}, []);

	const handleFetchNewItems = () => {
		fetchDocs();
	};

	console.log("Context value:", value);

	if (isLoading) {
		return (
			<div className="loading-screen">
				<div className="loading-spinner"></div>
				<p className="loading-text">Loading your tapes...</p>
			</div>
		);
	}

	return (
		<>
			<main>
				<div id="tapes-container">
					<div id="tapes" style={{ position: "relative" }}>
						{docs.map((doc, index) => (
							<Link to={`viewvent/${doc._id}`} key={index}>
								<div className="tape">
									<img
										className="tapeDisappear"
										src={tapeImg}
										alt={`tape${index}`}
										width="250"
										height="250"
									/>
									<div className="tape-text">{doc.title}</div>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div id="btns-container">
					<button
						onClick={handleFetchNewItems}
						id="refresh-button"
						className="btn"
					>
						<img src={refreshImg} alt="refreshBtn" />
					</button>
					<Link to="/recordvent">
						<div id="record-button" className="btn">
							<img src={micImg} alt="mic-image" />
						</div>
					</Link>
				</div>
			</main>
		</>
	);
};

export default Home;
