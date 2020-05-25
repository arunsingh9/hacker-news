import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
	background: #ff6600;
`;

const BrandIcon = styled.a`
	color: #fff;
	border: 1px solid #fff;
	padding: 3px 5px;
	display: inline-block;
	margin: 5px;
	text-decoration: none;
	font-size: 0.9rem;
`;

const SkipLink = styled.a`
	color: #1f1414;
	margin: 0 20px;
	padding: 4px;
	font-size: 12px;
`;

export const SkipLinkElement = () => <SkipLink href='#main'>New</SkipLink>;

export const Header = () => {
	return (
		<Wrapper>
			<BrandIcon href='#'>Y</BrandIcon>
			<SkipLinkElement />
		</Wrapper>
	);
};
