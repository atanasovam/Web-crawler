class Characteristics {
    constructor(procuctBrand, model, price, ram, os, displaySize) {
        this.procuctBrand = procuctBrand;
        this.model = {
            title: model.title,
            params: model.params,
        };
        this.price = price;
        this.ram = {
            title: ram.title,
            params: ram.params,
        };
        this.os = {
            title: os.title,
            params: os.params,
        };
        this.displaySize = {
            title: displaySize.title,
            params: displaySize.params,
        };
    }
}

module.exports = Characteristics;
