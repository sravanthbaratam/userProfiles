import React, { useState, useEffect } from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserList from './components/UserList';
import UserListHeading from './components/UserListHeading';
import SearchBox from './components/SearchBox';

const App = () => {
	const [users, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		//change the base url of the api based on ur local server port
		let url = `http://localhost:3002/users`;
		if(searchValue){
			url = url+"/"+searchValue;
			const response = await fetch(url);
			const responseJson = await response.json();
			setMovies(responseJson)
		}
		else{
			const response = await fetch(url);
			const responseJson = await response.json();
			setMovies(responseJson)
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);


	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<UserListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<UserList
					users={users}
				/>
			</div>
		</div>
	);
};

export default App;
