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
let objetos = {
    '$scope': {},
    '$http': {}
}

window.addEventListener('load', function() {
    //DOM
    let wgAppDOM = document.querySelector('[wg-app]');
    let ctrlDOM = wgAppDOM.querySelector('[wg-controller]');
    let modelsDOM = ctrlDOM.querySelectorAll('[wg-model]');
    let ctrlName = ctrlDOM.getAttribute('wg-controller');

    //get controller e params
    let fnCtrl = wag.controllers[ctrlName];
    let fnCtrlStr = fnCtrl.toString();
    let params = fnCtrlStr.substring(fnCtrlStr.indexOf('(') + 1, fnCtrlStr.indexOf(')')).replace(' ', '').split(',');
    let arrayParam = [];
    params.forEach(p => arrayParam.push(objetos[p]));
    // console.log(params, arrayParam);

    //invocar a funcao passando os params
    let scope = objetos['$scope']
    fnCtrl.apply(scope, arrayParam);
    console.log(scope);

    modelsDOM.forEach(model => {
        let modelField = model.getAttribute('wg-model');
        model.value = scope[modelField];
    })
});
