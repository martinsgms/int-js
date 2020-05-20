class ProxyFactory {

    static create(object, traps, action) {
        return new Proxy(object, {
            get(target, prop, receiver) {
                if(traps.includes(prop) && ProxyFactory.isFunction(target[prop])) {
                    return function() {
                        console.log(`[SET] prop ${prop} interceptado pelo proxy`);
                        
                        Reflect.apply(target[prop], target, arguments);
                        return action(target);
                    }
                }
                console.log(`[GET] prop ${prop} interceptado pelo proxy`);
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                if(traps.includes(prop)) {
                    
                    action(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        }); 
    }

    static isFunction(object) {
        return typeof(object)  == typeof(Function)
    }
}