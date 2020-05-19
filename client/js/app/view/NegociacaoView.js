class NegociacaoView {

    constructor(element) {
        this._element = element;
    }

    _template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                </tbody>

                ${model.negociacoes.map(n => {
                    return `
                        <tr>
                            <td>${DateHelper.dateToText(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>
                    `;
                }).join('')}
                
                <tfoot>
                </tfoot>
            </table>
        `;
    }

    update(model) {
        this._element.innerHTML = this._template(model);
    }

}