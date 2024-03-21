import { useState, useEffect } from 'react';
import useSWR from "swr";
import './App.css'

async function dataFetcher() {
	const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10&_page=3', {
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

function App() {
	const [photos, setPhotos] = useState([]);

	const { data, error, isLoading } = useSWR(
		"jsonphotos",
		dataFetcher
	);

	useEffect(() => {
		setPhotos(data);
		console.log(data)
	},[data])


	useEffect(() =>{
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, []);

	const scrollHandler = (eo) => {
		console.log(scroll);
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
