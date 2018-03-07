const extractCharacteristics = (characteristics) => {
    const verifyToken = (parametersTitle) => {
        switch (parametersTitle) {
            case 'Brand':
                key = 'brand';
                return true;
            case 'MODEL':
            case 'Серия':
                key = 'model';
                return true;
            case 'CPU':
            case 'Процесор':
                key = 'cpu';
                return true;
            case 'RAM':
            case 'Оперативна памет':
                key = 'ram';
                return true;
            case 'OS':
            case 'Операционна система':
                key = 'os';
                return true;
            case 'DISPLAY SIZE INCH':
            case 'Екран':
                key = 'display_size';
                val = val.split(' "')[0];
                return true;
            default:
                return false;
        }
    };

    const key = characteristics[0].trim();
    let val = characteristics[1].trim();

    if (verifyToken(key)) {
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
