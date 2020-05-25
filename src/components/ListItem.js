import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CommentsElement = styled.p`
	display: inline-block;
	text-align: center;
	justify-content: center;
`;

const UpVoteButton = styled.span`
	display: inline-block;
	height: 20px;
	width: 20px;
	font-size: 20px;
	line-height: 0px;
	text-align: center;
	vertical-align: top;
	cursor: pointer;
`;

const ItemContainer = styled.div`
	display: grid;
	grid-template-columns: 0.15fr 0.06fr 1fr;
	padding: 4px 0;
	@media (max-width: 648px) {
		grid-template-columns: 0.15fr 0.15fr 1fr;
		margin-bottom: 10px;
	}
	p {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
`;

const LightText = styled.span`
	opacity: 0.7;
	font-size: 0.7rem;
	margin: 0 4px;
	font-weight: 700;
`;

const HideButton = styled.span`
	font-size: 0.8rem;
	cursor: pointer;
`;

export const ListItem = ({ data, incrementUpvote, fetchUpvote }) => {
	let hiddenNewsIds = [];
	const [show, setShow] = useState(true);
	const { title, author, num_comments, points, url, created_at, objectID } = data;
	const domain = url ? url.split('/') : '';

	const hide = () => {
		hiddenNewsIds.push(objectID);
		localStorage.setItem('hiddenNewsIds', JSON.stringify(hiddenNewsIds));
		setShow(false);
	};

	const postedTime = () => {
		const currentTime = new Date().getTime();
		let diff = Math.round(currentTime - new Date(created_at).getTime()) / 1000;
		diff /= 60 * 60;
		const hourDifference = Math.abs(Math.round(diff));
		return hourDifference <= 0 ? 'less than an hour ago ' : `${hourDifference} hours ago`;
	};

	useEffect(() => {
		hiddenNewsIds = JSON.parse(localStorage.getItem('hiddenNewsIds')) || [];
		setShow(!hiddenNewsIds.includes(objectID));
		const payload = {
			id: objectID,
		};
		fetchUpvote(payload);
	}, [show]);

	const upVote = () => {
		const payload = {
			...data,
			points: data.points + 1,
		};
		incrementUpvote(payload);
	};

	return (
		<React.Fragment>
			{show && (
				<ItemContainer>
					<CommentsElement>{num_comments}</CommentsElement>
					<p>
						{points} <UpVoteButton onClick={upVote}>&#129169;</UpVoteButton>
					</p>
					<p>
						<span>{title}</span>
						<LightText>( {domain[2]} )</LightText>
						<LightText> by</LightText>
						<span> {author}</span>
						<LightText> {postedTime()}</LightText>
						<HideButton onClick={hide}>[ Hide ]</HideButton>
					</p>
				</ItemContainer>
			)}
		</React.Fragment>
	);
};
