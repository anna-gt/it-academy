import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'


function App() {
	const [photos, setPhotos] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [fetching, setFetching] = useState(true);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		if (fetching) {
			console.log('fetching');
			axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
				.then(response => {
					setPhotos([...photos,...response.data]);
					setCurrentPage(prevState => prevState + 1);
					setTotalCount(response.headers['x-total-count'])
				})
				.catch(error => console.log('error'))
				.finally(() => setFetching(false))
		}
	}, [fetching])


	useEffect(() =>{
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [totalCount]);

	const scrollHandler = (eo) => {
		if (eo.target.documentElement.scrollHeight - (eo.target.documentElement.scrollTop + window.innerHeight) < 100 
		&& photos.length < totalCount) {
			setFetching(true);
		}
	};

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
