const extractCharacteristics = (characteristics) => {
    const verifyParams = (parametersTitle) => {
        switch (parametersTitle) {
            case 'Brand':
                key = 'brand';
                return true;
            case 'MODEL':
                key = 'model';
                return true;
            case 'Серия':
                key = 'model';
                val = val
                .split(/(?:>)((\w.+)|([0-9]+))(?:<)/g)[1]
                .split(/(?:\(.*\))/g)[0]
                .trim();
                return true;
            case 'CPU':
                key = 'cpu';
                return true;
            case 'Процесор':
                key = 'cpu';
                val = val.split(/\(.*/g)[0]
                    .trim();
                return true;
            case 'RAM':
            case 'Оперативна памет':
                key = 'ram';
                return true;
            case 'OS':
            case 'Операционна система':
                key = 'os';
                val = val.split(' ')[0];
                return true;
            case 'DISPLAY SIZE INCH':
                key = 'display_size';
                val = val.split(' "')[0];
                return true;
            default:
                return false;
        }
    };

    let key = characteristics[0].trim();
    let val = characteristics[1].trim();

    if (key === 'Екран') {
        return ['display_size', val];
    }

    if (verifyParams(key)) {
        if (val === '<span class="option no">НЕ</span>\n\t\t\t\t\t\t\t\t\t') {
            val = 'no';
        }
        return [key, val];
    }

    return false;
};

module.exports = {
    extractCharacteristics,
};
