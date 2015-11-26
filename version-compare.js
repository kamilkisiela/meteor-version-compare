class versionCompareC {

    /**
     * First greater then second
     * @param {string} first
     * @param {string} second
     * @returns {boolean}
     */
    gt(first, second) {
        return this.compare(first, '>', second);
    }

    /**
     * First equal or greater then second
     * @param {string} first
     * @param {string} second
     * @returns {boolean}
     */
    gte(first, second) {
        return !this.lt(first, second);
    }

    /**
     * First lower then second
     * @param {string} first
     * @param {string} second
     * @returns {boolean}
     */
    lt(first, second) {
        return this.compare(first, '<', second);
    }

    /**
     * First equal or lower then second
     * @param {string} first
     * @param {string} second
     * @returns {boolean}
     */
    lte(first, second) {
        return !this.gt(first, second);
    }

    /**
     * First equal second
     * @param {string} first
     * @param {string} second
     * @returns {boolean}
     */
    eq(first, second) {
        return this.compare(first, '=', second);
    }

    /**
     * Compare two version using >, <, = operators
     * @param {string} first
     * @param {string} operator
     * @param {string} second
     * @returns {boolean}
     */
    compare(first, operator, second) {
        const {a, b} = this.parse(first, second);

        switch (operator) {
            case '=':
                return a === b;
            case '>':
                return a > b;
            case '<':
                return a < b;
            default:
                return;
        }
    }

    /**
     *
     * @param {string} a
     * @param {string} b
     * @returns {Object|undefined}
     */
    parse(a, b) {
        if (typeof a + typeof b !== 'stringstring') {
            return undefined;
        }

        const digits = /^\d+/;

        // remove prefix with @ at the ent
        a = a.substr(a.indexOf('@') + 1)
            // split by dot
            .split('.')
            // leave only numbers
            .map((v) => digits.exec(v)[0]);

        b = b.substr(b.indexOf('@') + 1)
            .split('.')
            .map((v) => digits.exec(v)[0]);

        const len = Math.max(a.length, b.length);
        let i = 0;

        // add missing splits (as string!)
        while (a.length < len) a.push("0");
        while (b.length < len) b.push("0");

        // add leading zeros
        for (i = 0; i < len; i++) {
            while (b[i].length < a[i].length) b[i] = "0" + b[i];
            while (a[i].length < b[i].length) a[i] = "0" + a[i];
        }

        // output as integers
        return {
            a: parseInt(a.join("")),
            b: parseInt(b.join(""))
        };
    }
}

versionCompare = new versionCompareC;