export class ArrayObjectCompanies {

    originalArray: OriginalObject[];

    constructor(originalArray: OriginalObject[]) {
        this.originalArray = originalArray;
    }

    transformArray(): TransformedObject[] {
        return this.originalArray.map((obj) => {
            return {
                newAttr1: obj.attr1,
                newAttr2: obj.attr2,
                newAttr3: obj.attr6
            } as TransformedObject;
        });
    }
}

interface OriginalObject {
    attr1: number;
    attr2: string;
    attr3: number;
    attr4: string;
    attr5: number;
    attr6: string;
}

interface TransformedObject {
    newAttr1: number;
    newAttr2: string;
    newAttr3: string;
}

const originalArray: OriginalObject[] = [
    { attr1: 1, attr2: "A", attr3: 2, attr4: "B", attr5: 3, attr6: "C" },
    { attr1: 4, attr2: "D", attr3: 5, attr4: "E", attr5: 6, attr6: "F" },
    { attr1: 7, attr2: "G", attr3: 8, attr4: "H", attr5: 9, attr6: "I" },
    { attr1: 10, attr2: "J", attr3: 11, attr4: "K", attr5: 12, attr6: "L" },
    { attr1: 13, attr2: "M", attr3: 14, attr4: "N", attr5: 15, attr6: "O" },
    { attr1: 16, attr2: "P", attr3: 17, attr4: "Q", attr5: 18, attr6: "R" }
];

const transformer = new ArrayObjectCompanies(originalArray);
const transformedArray = transformer.transformArray();

console.log(transformedArray);
