import React from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import NavAnchor from './NavAnchor.jsx';
import Menu from 'grommet/components/Menu';

export default () => (
	<Header pad="medium">
		<Title>
			<IndexLink to="/">
				Dolphin
			</IndexLink>
		</Title>
		
		{Auth.isUserAuthenticated() ? (
			<Menu responsive={true}
				inline={true}
				flex={true}
				direction='row'
				justify='end'>
				<NavAnchor path="/logout">
					Log out
				</NavAnchor>
			</Menu>
		) : (
			<Menu responsive={true}
				inline={true}
				flex={true}
				direction='row'
				justify='end'>
				<NavAnchor path="/login">
					Login
				</NavAnchor>
				<NavAnchor path="/signup">
					Sign up
				</NavAnchor>
			</Menu>
		)}
	</Header>
)
