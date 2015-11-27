import versionCompare from '../src/index';

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

    test() {
        this.stack.forEach((v) => {
            expect(versionCompare.parse(v.a, v.b)).toEqual({
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

    test(comparer) {
        this.stack.forEach((v) => {
            expect(comparer.call(undefined, v.a, v.b)).toBe(v.result);
        });
    }
}

describe("versionCompare", () => {
    it("should be defined", () => {
        expect(versionCompare).toBeDefined();
    });

    describe("parse()", () => {
        it("should return undefined if one version is not a string", () => {
            const values = [
                {a: "1.2.0", b: null},
                {a: "1.2.0", b: true},
                {a: false, b: "1.2.0"},
                {
                    a: "1.2.0", b: function string() {
                }
                }
            ];

            values.forEach((v) => {
                expect(versionCompare.parse(v.a, v.b)).toBeUndefined();
            });
        });
        it("should work with all numeric splits", () => {
            const parsing = new parseTest;

            // set
            parsing.add("1.2.0", "1.2.0", "1.1.9", "1.1.9");
            parsing.add("1.2.0", "1.2.0", "11.1.9", "11.1.9");
            parsing.add("1.21.0", "1.21.0", "11.1.9", "11.01.9");
            parsing.add("1.21.1", "1.21.01", "11.1.19", "11.01.19");

            // test
            parsing.test();
        });

        it("should work with different length splits", () => {
            const parsing = new parseTest;

            // set
            parsing.add("1.2.0.1", "1.2.0.1", "1.1.9", "1.1.9.0");
            parsing.add("3.2.0.1", "3.2.0.1", "1.1.9", "1.1.9.0");
            parsing.add("1.22.0.1", "1.22.0.1", "1.1.9", "1.01.9.0");
            parsing.add("1.22.23.1", "1.22.23.1", "1.1.9", "1.01.09.0");

            // test
            parsing.test();
        });

        it("should work with different length splits and non all numeric", () => {
            const parsing = new parseTest;

            // set
            parsing.add("1.2.0.1-rc1", "1.2.0.1", "1.1.9", "1.1.9.0");
            parsing.add("METEOR@3.2.0.1", "3.2.0.1", "METEOR@1.1.9B", "1.1.9.0");
            parsing.add("METEOR@1.22.0.1", "1.22.0.1", "1.1.9_RC1", "1.01.9.0");
            parsing.add("1.22.23.1-b", "1.22.23.1", "1.1.9", "1.01.09.0");
            parsing.add("1.1.9", "1.01.09.0", "1.22.23.1-b", "1.22.23.1");

            // test
            parsing.test();
        });
    });

    describe("compare()", () => {
        it("should support > operator", () => {
            expect(versionCompare.compare("1.2", ">", "1.3")).toBeFalsy();
            expect(versionCompare.compare("1.3", ">", "1.2")).toBeTruthy();
            expect(versionCompare.compare("1.2", ">", "1.2")).toBeFalsy();
        });

        it("should support < operator", () => {
            expect(versionCompare.compare("1.2", "<", "1.3")).toBeTruthy();
            expect(versionCompare.compare("1.3", "<", "1.2")).toBeFalsy();
            expect(versionCompare.compare("1.2", "<", "1.2")).toBeFalsy();
        });

        it("should support = operator", () => {
            expect(versionCompare.compare("1.2", "=", "1.3")).toBeFalsy();
            expect(versionCompare.compare("1.3", "=", "1.2")).toBeFalsy();
            expect(versionCompare.compare("1.2", "=", "1.2")).toBeTruthy();
        });

        it("should not support other operators", () => {
            expect(versionCompare.compare("1.2", ">=", "1.3")).toBeUndefined();
            expect(versionCompare.compare("1.3", "<=", "1.2")).toBeUndefined();
            expect(versionCompare.compare("1.2", "==", "1.2")).toBeUndefined();
        });
    });

    describe("gt()", () => {
        it("should be able to compare and return boolean", () => {
            const gtTest = new compareTest;

            // set
            gtTest.add("1.2.0", "1.1.0", true);
            gtTest.add("1.1.0", "1.2.0", false);
            gtTest.add("1.1.0-RC1", "1.2.0", false);
            gtTest.add("1.1.0-RC1", "1.1.0", false);

            // test
            gtTest.test((a, b) => versionCompare.gt(a, b));
        });
    });

    describe("gte()", () => {
        it("should be able to compare and return boolean", () => {
            const gtTest = new compareTest;

            // set
            gtTest.add("1.2.0", "1.1.0", true);
            gtTest.add("1.1.0", "1.2.0", false);
            gtTest.add("1.1.0-RC1", "1.2.0", false);
            gtTest.add("1.1.0-RC1", "1.1.0", true);

            // test
            gtTest.test((a, b) => versionCompare.gte(a, b));
        });
    });

    describe("lt()", () => {
        it("should be able to compare and return boolean", () => {
            const gtTest = new compareTest;

            // set
            gtTest.add("1.2.0", "1.1.0", false);
            gtTest.add("1.1.0", "1.2.0", true);
            gtTest.add("1.1.0-RC1", "1.2.0", true);
            gtTest.add("1.1.0-RC1", "1.1.0", false);

            // test
            gtTest.test((a, b) => versionCompare.lt(a, b));
        });
    });

    describe("lte()", () => {
        it("should be able to compare and return boolean", () => {
            const gtTest = new compareTest;

            // set
            gtTest.add("1.2.0", "1.1.0", false);
            gtTest.add("1.1.0", "1.2.0", true);
            gtTest.add("1.1.0-RC1", "1.2.0", true);
            gtTest.add("1.1.0-RC1", "1.1.0", true);

            // test
            gtTest.test((a, b) => versionCompare.lte(a, b));
        });
    });

    describe("eq()", () => {
        it("should be able to compare and return boolean", () => {
            const gtTest = new compareTest;

            // set
            gtTest.add("1.2.0", "1.1.0", false);
            gtTest.add("1.1.0", "1.2.0", false);
            gtTest.add("1.1.0-RC1", "1.2.0", false);
            gtTest.add("1.1.0-RC1", "1.1.0", true);
            gtTest.add("1.2.0-RC1", "1.2.0B", true);

            // test
            gtTest.test((a, b) => versionCompare.eq(a, b));
        });
    });
});