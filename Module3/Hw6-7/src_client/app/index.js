
/*global framer*/
	
import '../assets/framer';

import loginName from './components/login/loginComponent.js';

import signupName from './components/signup/signupComponent.js';

import someCoolModuleName from './components/someCoolModule/someCoolModuleComponent.js';

import thirdModuleName from './components/thirdModule/thirdModuleComponent.js';

import sharedModuleName from './shared/sharedModule/sharedModuleComponent.js';

import '../styles/style.css';

framer.router
	.route('/', someCoolModuleName, sharedModuleName)
	.route('login', loginName, sharedModuleName)
	.route('signup', signupName)
	.route('thirdtab', thirdModuleName, sharedModuleName);
