import React, { useState, useEffect, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import { connect } from 'react-redux';

//import { AppContext } from '../AppContext';
import { ListItem } from '../components/ListItem';
import { fetchNews, incrementUpvote, fetchUpvote } from '../redux/actionTypes';

const ListContainer = styled.section`
	padding: 15px 0 0;
	background: #f6f6ef;
	> div :nth-child(even) {
		background: #dcdcd5;
	}
`;

const LoadMoreBtn = styled.button`
	color: #b53309;
	margin: 20px 0;
	text-align: center;
	cursor: pointer;
	font-weight: 900;
`;

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		hits: state.hits,
		pageNumber: state.pageNumber,
	};
};

const mapDispatchToProps = { fetchNews, incrementUpvote, fetchUpvote };

const List = ({ hits, pageNumber, fetchNews, incrementUpvote, fetchUpvote }) => {
	const loadMore = () => {
		fetchNews(pageNumber + 1);
	};

	useEffect(() => {
		fetchUpvote();
	}, []);
	return (
		<Fragment>
			<ListContainer>
				{!hits && <p>Loading ...</p>}
				{hits &&
					hits.map((hit, i) => {
						return <ListItem data={hit} key={i} incrementUpvote={incrementUpvote} />;
					})}
			</ListContainer>
			<LoadMoreBtn onClick={loadMore}>Load More</LoadMoreBtn>
		</Fragment>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
