/*
Complete the following table when you submit this file:

Surname     | Firstname | email | Contribution% | Any issues?
=============================================================
Person 1... | Robert    | rdav0020@mckinnonsc.vic.edu.au | 25%           |
Person 2... | Tina      | tjia0024@student.monash.edu    | 25%           |
Major       | Damien    | dmaj0002@student.monash.edu    | 25%           |
Fons        | Mae       | jpes0001@student.monash.edu    | 25%           |

complete Worksheet 3 by entering code in the places marked below...

For instructions and tests open the file worksheetChecklist.html
in Chrome browser.  Keep it open side-by-side with your editor window.
You will edit this file (main.ts), save it, and reload the
browser window to run the test.
*/
/**
 * Exercise 1:
*/
function addStuff(a, b) {
    return a + b;
}
function numberToString(input) {
    return JSON.stringify(input);
}
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
padLeft("Hello world", 4); // returns "    Hello world"
function curry(f) {
    return function (x) {
        return function (y) {
            return f(x, y);
        };
    };
}
/**
 * cons "constructs" a list node, if no second argument is specified it is the last node in the list
 */
function cons(head, rest) {
    return (selector) => selector(head, rest);
}
/**
 * head selector, returns the first element in the list
 * @param list is a Cons (note, not an empty ConsList)
 */
function head(list) {
    return list((head, rest) => head);
}
/**
 * rest selector, everything but the head
 * @param list is a Cons (note, not an empty ConsList)
 */
function rest(list) {
    return list((head, rest) => rest);
}
/**
 * Use this as an example for other functions!
 * @param f Function to use for each element
 * @param list is a Cons
 */
function forEach(f, list) {
    if (list) {
        f(head(list));
        forEach(f, rest(list));
    }
}
function map(f, l) {
    return l ? cons(f(head(l)), map(f, rest(l))) : null;
}
//
// Exercise 3: 
// 
function fromArray(arr) {
    return arr.length > 0 ? cons(arr[0], fromArray(arr.slice(1)))
        : null;
}
function filter(f, l) {
    if (l === null) {
        return null;
    }
    return f(head(l)) ? cons(head(l), filter(f, rest(l)))
        : (rest(l) ? filter(f, rest(l)) : null);
}
function reduce(f, initialValue, inputArray) {
    if (rest(inputArray) == null) {
        return head(inputArray);
    }
    if (rest(rest(inputArray)) === null) {
        return f(head(inputArray), head(rest(inputArray)));
    }
    else {
        if (initialValue !== null) {
            inputArray = cons(f(initialValue, head(inputArray)), rest(inputArray));
        }
        else {
            inputArray = cons(f(head(inputArray), head(rest(inputArray))), rest(rest(inputArray)));
        }
        return reduce(f, null, inputArray);
    }
}
// example use of reduce:
function countLetters(stringArray) {
    const list = fromArray(stringArray);
    return reduce((len, s) => len + s.length, 0, list);
}
//console.log(countLetters(["Hello","there!"]));
function reduceRight(f, n, inputArray) {
    return f(reduce(f, null, reverse(inputArray)), n);
}
function concat(list1, list2) {
    return list1 ? cons(head(list1), concat(rest(list1), list2))
        : (list2 ? concat(list2) : null);
}
function reverse(list) {
    if (list === null) {
        return null;
    }
    else if (rest(list) !== null) {
        return concat(reverse(rest(list)), cons(head(list), null));
    }
    else {
        return list;
    }
}
//
// Exercise 4:
// 
/**
 * A linked list backed by a ConsList
 */
class List {
    constructor(list) {
        if (list instanceof Array) {
            this.head = fromArray(list);
        }
        else {
            this.head = (list === undefined) ? null : list;
        }
    }
    /**
     * create an array containing all the elements of this List
     */
    //toArray(): T[] {
    // Getting type errors here?
    // Make sure your type annotation for reduce()
    // in Exercise 3 is correct!    
    //    return reduce((a, t) => [...a, t], <T[]>[], this.head);
    //}
    toArray(l = this.head) {
        return l ? [head(l), ...this.toArray(rest(l))] : [];
    }
    forEach(f) {
        forEach(f, this.head);
        return this;
    }
    filter(f) {
        return new List(filter(f, this.head));
    }
    map(f) {
        return new List(map(f, this.head));
    }
    reduce(f, initialValue) {
        return reduce(f, initialValue, this.head);
    }
    concat(other) {
        return new List(concat(this.head, other.head));
    }
}
/**
 * Exercise 5:
 */
function line(newLine) {
    return [0, newLine];
}
function lineToList(line) {
    return new List([line]);
}
class BinaryTreeNode {
    constructor(data, leftChild, rightChild) {
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}
// example tree:
const myTree = new BinaryTreeNode(1, new BinaryTreeNode(2, new BinaryTreeNode(3)), new BinaryTreeNode(4));
function nest(indent, layout) {
    return layout.map((x) => [x[0] + indent, x[1]]);
}
// *** uncomment the following code once you have implemented List and nest function (above) ***
function prettyPrintBinaryTree(node) {
    if (!node) {
        return new List([]);
    }
    const thisLine = lineToList(line(node.data.toString())), leftLines = prettyPrintBinaryTree(node.leftChild), rightLines = prettyPrintBinaryTree(node.rightChild);
    return thisLine.concat(nest(1, leftLines.concat(rightLines)));
}
const output = prettyPrintBinaryTree(myTree)
    .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
    .reduce((a, b) => a + '\n' + b, '').trim();
//console.log(output);
/**
 * Exercise 7:
 *  implement prettyPrintNaryTree, which takes a NaryTree as input
 *  and returns a list of the type expected by your nest function
 */
class NaryTree {
    constructor(data, children = new List(undefined)) {
        this.data = data;
        this.children = children;
    }
}
// Example tree for you to print:
let naryTree = new NaryTree(1, new List([
    new NaryTree(2),
    new NaryTree(3, new List([
        new NaryTree(4),
    ])),
    new NaryTree(5)
]));
// implement: function prettyPrintNaryTree(...)
function prettyPrintNaryTree(node) {
    const thisLine = lineToList(line(node.data.toString()));
    if (!node) {
        return new List([]);
    }
    if (node.children.head !== null) {
        if (rest(node.children.head) !== null) {
            return thisLine.concat(nest(1, node.children.reduce((x, y) => {
                if (x instanceof NaryTree && y instanceof NaryTree) {
                    return prettyPrintNaryTree(x).concat(prettyPrintNaryTree(y));
                }
                else if (x instanceof NaryTree) {
                    return y.concat(prettyPrintNaryTree(x));
                }
                else if (y instanceof NaryTree) {
                    return x.concat(prettyPrintNaryTree(y));
                }
            }, null)));
        }
        else {
            return thisLine.concat(nest(1, prettyPrintNaryTree(head(node.children.head))));
        }
    }
    else {
        return thisLine;
    }
}
// *** uncomment the following code once you have implemented prettyPrintNaryTree (above) ***
const outputNaryTree = prettyPrintNaryTree(naryTree)
    .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
    .reduce((a, b) => a + '\n' + b, '').trim();
console.log(outputNaryTree);
const jsonPrettyToDoc = json => {
    if (Array.isArray(json)) { //I think the type should be jsonTypes. It can be returned by the function and allows both string a
        // Handle the Array case. 
        let arrayJson = new List(json);
        arrayJson = arrayJson.map(elm => { return jsonPrettyToDoc(elm); });
        //json.forEach(elm =>arrayJson.concat(new List<[number, string]>([[0, "bruh"]]))); // new List<[number, string]>([[0,"buh"]]))) // (jsonPrettyToDoc(elm).map(lineIndented).reduce(appendLine, '').trim());
        return arrayJson;
    }
    else if (typeof json === 'object' && json !== null) {
        // Handle the object case.
        // Hint: use Object.keys(json) to get a list of
        // keys that the object has.
        Object.keys(json).forEach(elm => jsonPrettyToDoc(elm).map(lineIndented).reduce(appendLine, '').trim());
    }
    else if (typeof json === 'string') {
        // Handle string case.
        return new List([[0, json]]);
    }
    else if (typeof json === 'number') {
        // Handle number
        return new List([[0, json.toString()]]);
    }
    else if (typeof json === 'boolean') {
        if (json) {
            return new List([[0, "true"]]);
        }
        else {
            return new List([[0, "false"]]);
        }
        //   return new List([0, json ? "true" : "false"]);  
    }
    else if (json === null) {
        // Handle the null case
        // "null" ???
        return new List([[0, "null"]]);
    }
    // Default case to fall back on.
    return new List([]);
};
// *** uncomment the following code once you are ready to test your implemented jsonPrettyToDoc ***
const json = {
    unit: "FIT2102",
    year: 2021,
    semester: "S2",
    active: true,
    assessments: { "week1": null, "week2": "Tutorial 1 Exercise", "week3": "Tutorial 2 Exercise" },
    languages: ["Javascript", "Typescript", "Haskell", "Minizinc"]
};
const testJason = ["1", "2", "3d"];
console.log("Test result gives " + jsonPrettyToDoc(testJason).map(lineIndented).reduce(appendLine, '').trim());
_;
function lineIndented(aLine) {
    return new Array(aLine[0] + 1).join('    ') + aLine[1];
}
function appendLine(acc, nextLine) {
    return nextLine.slice(-1) === "," ? acc + nextLine.trim() :
        acc.slice(-1) === ":" ? acc + " " + nextLine.trim() :
            acc + '\n' + nextLine;
}
console.log("Print should be below");
console.log(jsonPrettyToDoc(json)
    .map(lineIndented)
    .reduce(appendLine, '').trim());
// *** This is what it should look like in the console ***
// 
// {
//     unit: FIT2102,
//     year: 2021,
//     semester: S2,
//     active: true,
//     assessments: {
//         week1: null,
//         week2: Tutorial 1 Exercise,
//         week3: Tutorial 2 Exercise
//     },
//     languages: [
//         Javascript,
//         Typescript,
//         Haskell,
//         Minizinc
//     ]
// }
//# sourceMappingURL=main.js.map