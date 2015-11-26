class parseTest {

    constructor() {
        this.stack = [];
    }

    /**
     *
     * @param {string} a
     * @param {string} ae
     * @param {string} b
     * @param {string} be
     */
    add(a, ae, b, be) {
        this.stack.push({
            a: a,
            b: b,
            expected: {
                a: parseInt(ae.replace(/\./g, "")),
                b: parseInt(be.replace(/\./g, ""))
            }
        });
    }

    test(test) {
        this.stack.forEach((v) => {
            test.equal(versionCompare.parse(v.a, v.b), {
                a: v.expected.a,
                b: v.expected.b
            });
        });
    }
}

class compareTest {
    constructor() {
        this.stack = [];
    }

    add(a, b, result) {
        this.stack.push({
            a: a,
            b: b,
            result: result
        });
    }

    test(test, comparer) {
        this.stack.forEach((v) => {
            test.equal(v.result, comparer.call(undefined, v.a, v.b))
        });
    }
}

Tinytest.add('versionCompare is defined', (test) => {
    test.equal(typeof versionCompare, "object");
});

Tinytest.add('parse method for all numeric splits', (test) => {
    const parsing = new parseTest;

    // set
    parsing.add("1.2.0", "1.2.0", "1.1.9", "1.1.9");
    parsing.add("1.2.0", "1.2.0", "11.1.9", "11.1.9");
    parsing.add("1.21.0", "1.21.0", "11.1.9", "11.01.9");
    parsing.add("1.21.1", "1.21.01", "11.1.19", "11.01.19");

    // test
    parsing.test(test);
});

Tinytest.add('parse method for non same length splits', (test) => {
    const parsing = new parseTest;

    // set
    parsing.add("1.2.0.1", "1.2.0.1", "1.1.9", "1.1.9.0");
    parsing.add("3.2.0.1", "3.2.0.1", "1.1.9", "1.1.9.0");
    parsing.add("1.22.0.1", "1.22.0.1", "1.1.9", "1.01.9.0");
    parsing.add("1.22.23.1", "1.22.23.1", "1.1.9", "1.01.09.0");

    // test
    parsing.test(test);
});

Tinytest.add('parse method for non same length splits and non all numeric', (test) => {
    const parsing = new parseTest;

    // set
    parsing.add("1.2.0.1-rc1", "1.2.0.1", "1.1.9", "1.1.9.0");
    parsing.add("METEOR@3.2.0.1", "3.2.0.1", "METEOR@1.1.9B", "1.1.9.0");
    parsing.add("METEOR@1.22.0.1", "1.22.0.1", "1.1.9_RC1", "1.01.9.0");
    parsing.add("1.22.23.1-b", "1.22.23.1", "1.1.9", "1.01.09.0");

    // test
    parsing.test(test);
});

Tinytest.add('greater then', (test) => {
    const gtTest = new compareTest;

    // set
    gtTest.add("1.2.0", "1.1.0", true);
    gtTest.add("1.1.0", "1.2.0", false);
    gtTest.add("1.1.0-RC1", "1.2.0", false);
    gtTest.add("1.1.0-RC1", "1.1.0", false);

    // test
    gtTest.test(test, (a, b) => versionCompare.gt(a, b));
});

Tinytest.add('greater then or equal', (test) => {
    const gtTest = new compareTest;

    // set
    gtTest.add("1.2.0", "1.1.0", true);
    gtTest.add("1.1.0", "1.2.0", false);
    gtTest.add("1.1.0-RC1", "1.2.0", false);
    gtTest.add("1.1.0-RC1", "1.1.0", true);

    // test
    gtTest.test(test, (a, b) => versionCompare.gte(a, b));
});

Tinytest.add('lower then', (test) => {
    const gtTest = new compareTest;

    // set
    gtTest.add("1.2.0", "1.1.0", false);
    gtTest.add("1.1.0", "1.2.0", true);
    gtTest.add("1.1.0-RC1", "1.2.0", true);
    gtTest.add("1.1.0-RC1", "1.1.0", false);

    // test
    gtTest.test(test, (a, b) => versionCompare.lt(a, b));
});

Tinytest.add('lower then or equal', (test) => {
    const gtTest = new compareTest;

    // set
    gtTest.add("1.2.0", "1.1.0", false);
    gtTest.add("1.1.0", "1.2.0", true);
    gtTest.add("1.1.0-RC1", "1.2.0", true);
    gtTest.add("1.1.0-RC1", "1.1.0", true);

    // test
    gtTest.test(test, (a, b) => versionCompare.lte(a, b));
});

Tinytest.add('equal', (test) => {
    const gtTest = new compareTest;

    // set
    gtTest.add("1.2.0", "1.1.0", false);
    gtTest.add("1.1.0", "1.2.0", false);
    gtTest.add("1.1.0-RC1", "1.2.0", false);
    gtTest.add("1.1.0-RC1", "1.1.0", true);
    gtTest.add("1.2.0-RC1", "1.2.0B", true);

    // test
    gtTest.test(test, (a, b) => versionCompare.eq(a, b));
});