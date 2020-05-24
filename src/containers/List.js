import React, { useState, useEffect, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import { connect } from 'react-redux';

//import { AppContext } from '../AppContext';
import { ListItem } from '../components/ListItem';
import { fetchNews, incrementUpvote } from '../redux/actionTypes';

const ListContainer = styled.section`
	padding: 25px 0;
	background: #f6f6ef;
`;

const LoadMoreBtn = styled.section`
	border: none;
	background: none;
	color: #ff6600;
	margin: 20px 0;
	width: 100%;
	text-align: center;
	cursor: pointer;
	text-decoration: underline;
`;

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		hits: state.hits,
		pageNumber: state.pageNumber,
	};
};

const mapDispatchToProps = { fetchNews, incrementUpvote };

const List = ({ hits, pageNumber, fetchNews, incrementUpvote }) => {
	const loadMore = () => {
		fetchNews(pageNumber + 1);
	};
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
