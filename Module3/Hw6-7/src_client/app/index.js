
/*global framer*/
	
import '../assets/framer';

import loginName from './components/shared/login/loginComponent.js';

import signupName from './components/shared/signup/signupComponent.js';

import wallName from './components/wall/wallComponent.js';

import authName from './components/shared/auth/authComponent.js';

import profileName from './components/shared/profile/profileComponent.js';

import '../styles/style.css';

framer.router
	.route('/', authName)
	.route('login', loginName, authName)
	.route('signup', signupName, authName)
	.route('wall', wallName, authName)
	.route('profile', profileName, authName);
