import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import aleoLogo from "./assets/aleo.svg";
import "./App.css";
// import helloworld_program from "../helloworld/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker.js";
import {
	useConnect,
	useAccount,
	useDisconnect,
	useRecords,
	getRecords,
} from "@puzzlehq/sdk";
import { requestCreateEvent } from "@puzzlehq/sdk-core";
import { EventType } from "@puzzlehq/types";

// const aleoWorker = AleoWorker();
function App() {
	// const [count, setCount] = useState(0);
	// const [account, setAccount] = useState(null);
	const [executing, setExecuting] = useState(false);
	const [deploying, setDeploying] = useState(false);

	const {
		connect,
		data,
		error: connectError,
		loading: connectLoading,
	} = useConnect();
	const {
		disconnect,
		error: disconnectError,
		loading: disconnectLoading,
	} = useDisconnect();
	const {
		account,
		error: accountError,
		loading: accountLoading,
	} = useAccount();
	// const {
	// 	fetchPage,
	// 	records,
	// 	error: recordsError,
	// 	loading: recordsLoading,
	// 	page,
	// 	pageCount,
	// } = useRecords({
	// 	programId: "beginner_v0001.aleo",
	// 	type: "unspent",
	// });
	// console.log(records, recordsError, recordsLoading);

	const [globalCount, setGlobalCount] = useState(0);
	const [personalCount, setPersonalCount] = useState(0);
	const [records, setRecords] = useState([]);

	const [txHash, setTxHash] = useState("");
	const [hhh, setHhh] = useState(0);

	useEffect(() => {
		fetch(
			"https://api.explorer.aleo.org/v1/testnet/program/beginner_v0001.aleo/mapping/global_count/true"
		)
			.then((res) => {
				res.json().then((res) => {
					console.log("Global Count: " + res);
					setGlobalCount(res || 0);
				});
			})
			.catch((e) => {
				console.log(e);
			});
		fetch(
			"https://api.explorer.aleo.org/v1/testnet/program/beginner_v0001.aleo/mapping/personal_count/" +
				account?.address
		)
			.then((res) => {
				res.json().then((res) => {
					console.log("Personal Count: " + res);
					setPersonalCount(res || 0);
				});
			})
			.catch((e) => {
				console.log(e);
			});
		getRecords({
			filter: {
				programId: "beginner_v0001.aleo",
				type: "unspent",
			},
			address: account?.address,
		}).then((res) => {
			console.log(res);
			setRecords(res.records);
		});
	}, [account?.address, hhh]);

	useEffect(() => {
		const interval = setInterval(() => {
			setHhh(new Date().getTime().toString());
		}, 15000);

		return () => clearInterval(interval);
	}, []);

	// const generateAccount = async () => {
	// 	const key = await aleoWorker.getPrivateKey();
	// 	setAccount(await key.to_string());
	// };

	async function execute() {
		setExecuting(true);

		const createEventResponse = await requestCreateEvent({
			type: EventType.Execute,
			programId: "beginner_v0001.aleo",
			functionId: "say_hello",
			fee: 0.1,
			inputs: Object.values([]),
		});

		console.log(createEventResponse);
		if (createEventResponse.error) {
			setTxHash(createEventResponse.error);
			setInterval(() => setTxHash(""), 5000);
		} else {
			setTxHash(createEventResponse.eventId);
			setInterval(() => setTxHash(""), 5000);
		}

		setExecuting(false);
	}

	async function generate() {
		setDeploying(true);

		const createEventResponse = await requestCreateEvent({
			type: EventType.Execute,
			programId: "beginner_v0001.aleo",
			functionId: "generate_record",
			fee: 0.1,
			inputs: Object.values([account.address, personalCount]),
		});

		console.log(createEventResponse);
		if (createEventResponse.error) {
			setTxHash(createEventResponse.error);
			setInterval(() => setTxHash(""), 5000);
		} else {
			setTxHash(createEventResponse.eventId);
			setInterval(() => setTxHash(""), 5000);
		}

		setDeploying(false);
	}

	return (
		<>
			<div style={{ position: "fixed", top: "10px", right: "20px" }}>
				{account?.address ? (
					<div>
						<button disabled={disconnectLoading} onClick={() => disconnect()}>
							{account?.shortenedAddress}
						</button>
					</div>
				) : (
					<div>
						<button disabled={connectLoading} onClick={() => connect()}>
							connect wallet
						</button>
					</div>
				)}
			</div>

			<div>
				{/* <a href="https://aleo.org" target="_blank"> */}
				<img src={aleoLogo} className="logo" alt="Aleo logo" />
				{/* </a> */}
				{/* <a href="https://react.dev" target="_blank"> */}
				<img src={reactLogo} className="logo react" alt="React logo" />
				{/* </a> */}
			</div>
			<h1>Say Hello</h1>
			<div className="card" style={{ fontSize: "18px" }}>
				<h2>Check states here</h2>
				<p>
					<button>Global count is {globalCount}</button>
				</p>
				<p>
					<button>Your count is {personalCount}</button>
				</p>

				{/* <p style={{ marginTop: "50px" }}></p> */}
			</div>

			<h2>Action here</h2>
			<p>
				<button disabled={executing} onClick={execute}>
					{executing ? `Executing...` : `Click to say hello`}
				</button>
			</p>
			<p>{txHash}</p>
			<p>
				<button disabled={deploying} onClick={generate}>
					{deploying ? `Executing...` : `Click to generate record`}
				</button>
			</p>
			<p>{txHash}</p>
      <p>
					<a href="https://www.provable.tools/record">
						<button>Click to check your records</button>
					</a>
				</p>

			{/* Advanced Section */}
			{/* <div className="card">
				<h2>Advanced Actions</h2>
				<p>
					Deployment on Aleo requires certain prerequisites like seeding your
					wallet with credits and retrieving a fee record. Check README for more
					details.
				</p>
				<p>
					<button disabled={deploying} onClick={deploy}>
						{deploying
							? `Deploying...check console for details...`
							: `Deploy helloworld.aleo`}
					</button>
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Aleo and React logos to learn more
			</p> */}
		</>
	);
}

export default App;
