import { useState, useEffect } from 'react';
import useSWR from "swr";
import './App.css'


function App() {
	const [photos, setPhotos] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [fetching, setFetching] = useState(true);
	const [totalCount, setTotalCount] = useState(0);

	async function dataFetcher() {
		const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`, {
			method: 'get',
			headers: {
				"Accept": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("fetch error " + response.status);
		}
		return response.json();
	}

	const { data, error, isLoading } = useSWR(
		"jsonphotos",
		dataFetcher
	);

	useEffect(() => {
		if (fetching) {
			console.log('fetching');
			if ( !isLoading ) {
				setPhotos([...photos,...data]);
		 }
		 setCurrentPage(prevState => prevState + 1);
		}	
},[fetching, data, isLoading])


	useEffect(() =>{
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [totalCount, fetching]);

	const scrollHandler = (eo) => {
		if (eo.target.documentElement.scrollHeight - (eo.target.documentElement.scrollTop + window.innerHeight) < 100) {
			setFetching(true);
		}
	};

	if ( error ) {
    return <div>Ошибка: {error}</div>;
  }

  if ( isLoading ) {
    return <div>загрузка данных...</div>;
  }

	const photoCode = photos.map(photo =>
		<div className='photo' key={photo.id}>
			<div className='title'>{photo.id}. {photo.title}</div>
			<img src={photo.thumbnailUrl} alt=""/>
		</div>)

  return (
    <div className='app'>
			{photoCode}
    </div>
  )
}

export default App
