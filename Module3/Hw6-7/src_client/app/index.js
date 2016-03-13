
/*global framer*/
	
import '../assets/framer';

import loginName from './components/login/loginComponent.js';

import signupName from './components/signup/signupComponent.js';

// import someCoolModuleName from './components/someCoolModule/someCoolModuleComponent.js';

import wallName from './components/wall/wallComponent.js';

import sharedModuleName from './shared/sharedModule/sharedModuleComponent.js';

import authName from './components/auth/authComponent.js';


import '../styles/style.css';

framer.router
	.route('/', /*someCoolModuleName, */sharedModuleName, authName)
	.route('login', loginName, sharedModuleName, authName)
	.route('signup', signupName, authName)
	.route('wall', wallName, sharedModuleName, authName);
