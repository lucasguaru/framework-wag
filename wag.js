var WagFramework = function() {
    this.version = '1.0';
    this.modules = [];
    this.controllers = {};
    this.module = function(nome, dependencias) {
        this.modules.push(nome);
        return this;
    };

    this.controller = function(nome, funcao) {
        this.controllers[nome] = funcao;
        return this;
    };

    this.getController = function(nome) {
        return this.controllers[nome];
    };
}

var wag = new WagFramework();
var handler = {
    get: function(target, prop) {
        return prop in target ?
            target[prop] :
            'Lucas';
    },
    set: function(target, prop, value) {
        target[prop] = value;
        render();
    }
};

var scopeProxy = new Proxy({}, handler);

let objetos = {
    '$scope': scopeProxy,
    '$http': {}
}

window.addEventListener('load', function() {
    render(true);
});

let rendering = false;
function render(callController) {
    //DOM
    if (rendering) {
        return;
    }
    rendering = true;
    let wgAppDOM = document.querySelector('[wg-app]');
    let ctrlDOM = wgAppDOM.querySelector('[wg-controller]');
    let modelsDOM = ctrlDOM.querySelectorAll('[wg-model]');
    let ctrlName = ctrlDOM.getAttribute('wg-controller');

    let scope = objetos['$scope'];
    //get controller e params
    if (callController) {
        let fnCtrl = wag.controllers[ctrlName];
        let fnCtrlStr = fnCtrl.toString();
        let params = fnCtrlStr.substring(fnCtrlStr.indexOf('(') + 1, fnCtrlStr.indexOf(')')).replace(' ', '').split(',');
        let arrayParam = [];
        params.forEach(p => arrayParam.push(objetos[p]));
    
        //invocar a funcao passando os params
        fnCtrl.apply(scope, arrayParam);
    }

    modelsDOM.forEach(model => {
        let modelField = model.getAttribute('wg-model');
        model.value = scope[modelField];
    })
    rendering = false;
}