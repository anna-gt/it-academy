import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import './main.less';
import { getRepos } from "../actions/repos";
import Repo from './repo/repo'


const Main = () => {
	const dispatch = useDispatch();
	const reposData = useSelector(state => state.repos.items);
	const repos = useSelector(state => state.repos)

	useEffect(() => {
		dispatch(getRepos())
	}, [])


	return(
		<div>
			{ (repos.dataLoadState===0) && "no data" }
			{ (repos.dataLoadState===1) && "loading..." }
			{ (repos.dataLoadState===2) && reposData.map(repo => <Repo repo={repo} />) }
			{ (repos.dataLoadState===3) && "error"}
				
		</div>
	);
};

export default Main;