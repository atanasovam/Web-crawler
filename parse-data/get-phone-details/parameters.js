const extractCharacteristics = (characteristics, store) => {
    const smartphonebg = () => {
        const verifyParams = (parametersTitle) => {
            switch (parametersTitle) {
                case 'Серия':
                    key = 'model';
                    val = val
                        .split(/(?:>)((\w.+)|([0-9]+))(?:<)/g)[1]
                        .split(/(?:\(.*\))/g)[0]
                        .trim();
                    return true;
                case 'Процесор':
                    key = 'cpu';
                    val = val
                        .split(/\(.*/g)[0]
                        .trim();
                    return true;
                case 'Оперативна памет':
                    key = 'ram';
                    return true;
                case 'Операционна система':
                    key = 'os';
                    val = val.split(' ')[0];
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
            return [key, val];
        }

        return false;
    };

    const technopolis = () => {
        const verifyToken = (tokenTitle) => {
            switch (tokenTitle) {
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

        let key = characteristics[0];
        let val = characteristics[1];

        if (verifyToken(key)) {
            if (
                val === '<span class="option no">НЕ</span>\n\t\t\t\t\t\t\t\t\t'
            ) {
                val = 'No';
            }
            return [key, val];
        }

        return false;
    };

    if (store === 'technopolis') {
        return technopolis();
    }

    return smartphonebg();
};

module.exports = {
    extractCharacteristics,
};
