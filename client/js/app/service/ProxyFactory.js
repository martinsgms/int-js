class ProxyFactory {

    static create(model, view, traps) {
        return new Proxy(model, {
            get(target, prop, receiver) {
                if(traps.includes(prop) && ProxyFactory.isFunction(target[prop])) {
                    return function() {
                        console.log(`[CALL] prop ${prop} interceptado pelo proxy`);
                        
                        Reflect.apply(target[prop], target, arguments);
                        return view(target);
                    }
                }
                console.log(`[GET] prop ${prop} interceptado pelo proxy`);
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                console.log(`[SET] prop ${prop} interceptado pelo proxy`);

                if(traps.includes(prop)) {
                    target[prop] = value;
                    view(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        }); 
    }

    static isFunction(model) {
        return typeof(model)  == typeof(Function)
    }
}