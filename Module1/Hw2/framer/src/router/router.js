export default function Router(global) {

    var self = this;

    this.route = route;

    var routes = {};

    global.addEventListener('hashchange', hashChangeHandler);
    global.addEventListener('load', hashChangeHandler);

    function route(path /* moduleNames */) {
        var moduleNamesArray = Array.prototype.slice.call(arguments, 1);
        routes[path] = { moduleNames: moduleNamesArray };
        return self;
    }

    function hashChangeHandler(event) {
        event.preventDefault();
        
        var hashLessURL = location.hash.slice(1) || '/';
        var hashLessURLArray = hashLessURL.split('/');
        var routeName = hashLessURLArray[0] || '/';
        var routeElements = routes[routeName];

        routeElements.moduleNames.forEach(function(moduleName){
            var module = framer.module(moduleName);
            var moduleController = module.controller;
            if (typeof moduleController.init === 'function') {
                moduleController.init();
            } else {
                throw new Error('Please, define init function in contoller of ' + moduleName + '!');
            }
        });
    }
};