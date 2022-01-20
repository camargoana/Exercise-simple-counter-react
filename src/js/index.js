//import react into the bundle
import propTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

function SimpleCounter(props) {
	return (
		<div className="bigCounter">
			<div className="calendar">
				<i className="far fa-clock"></i>
			</div>
			<div className="four">{props.digitFour % 10}</div>
			<div className="three">{props.digitThree % 10}</div>
			<div className="two">{props.digitTwo % 10}</div>
			<div className="one">{props.digitOne % 10}</div>
		</div>
	);
}

SimpleCounter.prototype = {
	digitFour: propTypes.number,
	digitThree: propTypes.number,
	digitTwo: propTypes.number,
	digitOne: propTypes.number,
};

function SecondsCounter(props) {
	let seconds;

	if (props.countdown !== undefined) {
		if (props.countdown > props.seconds) {
			seconds = props.countdown - props.seconds;
		} else {
			seconds = 0;
		}
	} else {
		seconds = props.seconds;
	}
	const four = Math.floor(seconds / 1000);
	const three = Math.floor(seconds / 100);
	const two = Math.floor(seconds / 10);
	const one = Math.floor(seconds / 1);

	return (
		<div>
			<div className="bigCounter">
				<div className="calendar">
					<i className="far fa-clock"></i>
				</div>
				<div className="four">{four % 10}</div>
				<div className="three">{three % 10}</div>
				<div className="two">{two % 10}</div>
				<div className="one">{one % 10}</div>
			</div>
		</div>
	);
}

SecondsCounter.prototype = {
	seconds: propTypes.number,
	countdown: propTypes.number,
};

function run_simple_counter(counter) {
	const four = Math.floor(counter / 1000);
	const three = Math.floor(counter / 100);
	const two = Math.floor(counter / 10);
	const one = Math.floor(counter / 1);
	console.log(four, three, two, one);

	ReactDOM.render(
		<SimpleCounter
			digitOne={one}
			digitTwo={two}
			digitThree={three}
			digitFour={four}
		/>,
		document.querySelector("#app")
	);
}

function run_seconds_counter(counter) {
	ReactDOM.render(
		<SecondsCounter seconds={counter} />,
		document.querySelector("#app")
	);
}

function run_seconds_countdown(counter, countdown) {
	ReactDOM.render(
		<SecondsCounter seconds={counter} countdown={countdown} />,
		document.querySelector("#app")
	);
}

let counter = -1;
let optionSelected = 1;

function start_counter() {
	let intervalID = setInterval(function () {
		counter++;
		let selectId = document.querySelector("#selectId").value;
		let countdown = document.querySelector("#valueId").value;
		console.log(selectId);
		switch (selectId) {
			case "2":
				run_seconds_countdown(counter, countdown);
				if (counter >= countdown) {
					alert("TIMEOUT!");
					document.querySelector("#btn-stop").onclick();
				}
				break;
			case "3":
				if (counter > countdown) {
					counter = countdown;
				}
				run_seconds_counter(counter, countdown);
				if (counter === countdown) {
					alert("TIMEOUT!");
					document.querySelector("#btn-stop").onclick();
				}
				break;
			default:
				run_seconds_counter(counter);
		}
	}, 1000);

	document.querySelector("#btn-stop").onclick = function () {
		clearInterval(intervalID);
		document.querySelector("#btn-status").className = "btn btn-danger";
		document.querySelector("#btn-status").innerHTML = "STOPPED";

		let selectId = document.querySelector("#selectId").value;
		document.querySelector("#selectId").disabled = false;
		if (selectId !== "1") {
			document.querySelector("#valueId").disabled = false;
		}
		document.querySelector("#btn-resume").disabled = false;
		document.querySelector("#btn-stop").disabled = true;
	};
}

start_counter();

document.querySelector("#btn-resume").onclick = function () {
	start_counter();
	document.querySelector("#btn-status").className = "btn btn-success";
	document.querySelector("#btn-status").innerHTML = "RUNNING";
	document.querySelector("#selectId").disabled = true;
	document.querySelector("#valueId").disabled = true;
	document.querySelector("#btn-resume").disabled = true;
	document.querySelector("#btn-stop").disabled = false;
};

document.querySelector("#selectId").onchange = function () {
	let selectId = document.querySelector("#selectId").value;
	if (selectId === "1") {
		document.querySelector("#valueId").value = "0";
		document.querySelector("#valueId").disabled = true;
	} else {
		document.querySelector("#valueId").disabled = false;
	}
	if (optionSelected !== selectId) {
		counter = -1;
		optionSelected = selectId;
	}
};

document.querySelector("#btn-reset").onclick = function () {
	let selectId = document.querySelector("#selectId").value;
	let countdown = document.querySelector("#valueId").value;
	counter = 0;
	if (selectId === "2") {
		ReactDOM.render(
			<SecondsCounter seconds={counter} countdown={countdown} />,
			document.querySelector("#app")
		);
	} else {
		ReactDOM.render(
			<SecondsCounter seconds={counter} />,
			document.querySelector("#app")
		);
	}
};
