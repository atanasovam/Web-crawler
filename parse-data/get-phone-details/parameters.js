const extractCharacteristics = (characteristics) => {
    const verifyToken = (parametersTitle) => {
        switch (parametersTitle) {
            case 'Brand':
                key = 'brand';
                return true;
            case 'MODEL':
                key = 'model';
                return true;
            case 'CPU':
                key = 'cpu';
                return true;
            case 'RAM':
                key = 'ram';
                return true;
            case 'OS':
                key = 'os';
                return true;
            case 'DISPLAY SIZE INCH':
                key = 'display_size';
                val = val.split(' "')[0];
                return true;
            default:
                return false;
        }
    };

    const key = characteristics[0];
    let val = characteristics[1];

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
