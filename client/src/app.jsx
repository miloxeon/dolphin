import 'grommet/scss/vanilla/index';


import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import App from 'grommet/components/App';


// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
	<App>
		<Router history={browserHistory} routes={routes} />
	</App>
), document.getElementById('react-app'));
