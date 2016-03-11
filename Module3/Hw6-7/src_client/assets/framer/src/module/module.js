export default function Module(global){

    var allModules = {};

    function createModule (name, dependencies) {

        var moduleInstance = {
            name: name,
            dependencies: dependencies,
            controller: Controller,
            view: View,
            model: Model,
            storage: Storage
        };

        function Controller(controllerName, controllerFuncCallback) {
            moduleInstance.controller = new controllerFuncCallback(moduleInstance);
            return moduleInstance;
        }

        function View(viewName, viewFuncCallback) {
            viewFuncCallback.prototype = Object.create(viewFunctionality);
            moduleInstance.view = new viewFuncCallback(global);
            return moduleInstance;
        }

        var viewFunctionality = {
            bind: global.addEventListener
        }

        function Model(modelName, modelFuncCallback) {
            modelFuncCallback.prototype = Object.create(modelFunctionality);
            moduleInstance.model = new modelFuncCallback(global);
            return moduleInstance;
        }

        var modelFunctionality = {
            get: (url) => {
                return framer.ajax.get(`/api/${url}`);
            },
            post: (url, JSONData) => {
                return framer.ajax.post(`/api/${url}`, JSONData);
            },

            put: (url, JSONData) => {
                return framer.ajax.put(`/api/${url}`, JSONData);
            },
            delete: (url) => {
                return framer.ajax.delete(`/api/${url}`);
            }

            // create: function(data){
            //     moduleInstance.storage.create(moduleInstance.storage.storageName, Date.now(), data)
            // },
            // get: function(){
            //     moduleInstance.storage.get(moduleInstance.storage.storageName);
            // }
        }

        function Storage(storageName, storageFuncCallback) {

            if (!localStorage[storageName]) {
                global.localStorage[storageName] = JSON.stringify({});
            }

            storageFuncCallback.prototype = Object.create(storageFunctionality);
            storageFuncCallback.prototype.storageName = storageName;
            
            moduleInstance.storage = new storageFuncCallback(moduleInstance);
            return moduleInstance;
        }

        var storageFunctionality = {
            get: function(storageName) {
                return JSON.parse(global.localStorage[storageName]);
            },
            create: function(storageName, newFieldName, newFieldData) {
                var storage = JSON.parse(global.localStorage[storageName]);
                storage[newFieldName] = newFieldData;
                global.localStorage[storageName] = JSON.stringify(storage);
                return storage;
            }
        };

        allModules[name] = moduleInstance;
        return moduleInstance;
    }

    function getModule (name) {
        if (allModules.hasOwnProperty(name)) {
            return allModules[name];
        } else {
            throw 'Module '+ name + ' does not exist!';
        }
    }

    function module (name, dependencies) {
        if (dependencies && allModules[name]) {
            throw new Error(name + ' module is already registered!');
        } else if (dependencies) {
            return createModule(name, dependencies);
        } else {
            return getModule(name);
        }
    }

    return module;
}