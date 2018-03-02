const extractCharacteristics = (characteristics) => {
    const verifyToken = (tokenTitle) => {
        switch (tokenTitle) {
            case 'Brand':
            case 'MODEL':
            case 'CPU':
            case 'RAM':
            case 'OS':
                return true;
            case 'DISPLAY SIZE INCH':
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
            val = 'NO';
        }
        return [key, val];
    }

    return false;
};

module.exports = {
    extractCharacteristics,
};
