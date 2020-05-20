class Bind {

    constructor(model, view, ...traps) {
        let proxy = ProxyFactory.create(model, model => view.update(model), traps);

        view.update(model);
        return proxy;
    }

}