import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import { connect } from 'react-redux';

//import { AppContext } from '../AppContext';
import { ListItem } from '../components/ListItem';
import { fetchNews } from '../redux/actionTypes';

const ListContainer = styled.section`
	padding-top: 25px;
	background: #f6f6ef;
`;

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		hits: state.hits,
		pageNumber: state.pageNumber,
	};
};

const mapDispatchToProps = { fetchNews };

const List = ({ hits, pageNumber, fetchNews }) => {
	const loadMore = () => {
		fetchNews(pageNumber + 1);
	};
	return (
		<ListContainer>
			{!hits && <p>Loading ...</p>}
			{hits &&
				hits.map((hit, i) => {
					return <ListItem data={hit} key={i} />;
				})}
			<button onClick={loadMore}>Load More</button>
		</ListContainer>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
