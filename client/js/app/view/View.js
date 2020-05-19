class View {

    constructor(element) {
        this._element = element;
    }

    template() {throw new Error("Implemente o método 'template'");}

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}