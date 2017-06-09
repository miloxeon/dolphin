import React from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import { Link, IndexLink } from 'react-router';

export default (isUserAuthenticated) => (
	<Header fixed={false}
		float={false}
		size='small'
		splash={false}>
		<Box flex={true}
			justify='end'
			direction='row'
			responsive={false}>

			{!isUserAuthenticated ? (
				<Link to="/logout">
					<Anchor>Log out</Anchor>
				</Link>
			) : (
				<div>
					<Link to="/signup">
						<Anchor>Sign up</Anchor>
					</Link>
					<Link to="/login">
						<Anchor>Login</Anchor>
					</Link>
				</div>
			)}
		</Box>
	</Header>
)
