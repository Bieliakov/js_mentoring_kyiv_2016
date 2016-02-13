	
import './../../framer/src';

import mainModuleName from './components/mainModule/mainModuleComponent.js';

import someCoolModuleName from './components/someCoolModule/someCoolModuleComponent.js';

import thirdModuleName from './components/thirdModule/thirdModuleComponent.js';

import sharedModuleName from './shared/sharedModule/sharedModuleComponent.js';

import '../styles/style.css';

framer.router
	.route('/', mainModuleName, sharedModuleName)
	.route('somecooltab', someCoolModuleName, sharedModuleName)
	.route('thirdtab', thirdModuleName, sharedModuleName);
