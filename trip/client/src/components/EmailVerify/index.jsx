import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react/cjs/react.production.min";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	const navigate = useNavigate(); 

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);

				if (data.redirect) {
					setTimeout(() => {
						navigate(data.redirect); // Redirect after 2 seconds
					}, 2000);
				}

				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param, navigate]);

	return (
		<Fragment>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<p>Redirecting to login...</p>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;
