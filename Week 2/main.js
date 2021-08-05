// Surname     | Firstname | Contribution % | Any issues?
// =====================================================
// Davidovic   | Robert    | 33%
// Fons        | Mae       | 33%
// Jiang       | Tina      | 33%
//
// complete Worksheet 2 by entering code in the places marked below...
//
// For full instructions and tests open the file worksheetChecklist.html
// in Chrome browser.  Keep it open side-by-side with your editor window.
// You will edit this file (main.js), save it, and reload the
// browser window to run the test.

/**
 * Exercise 1
 */
const myObj = {
    aProperty: "Hello world",
    anotherProperty: 123
}
/**
 * Exercise 2
 */
function operationOnTwoNumbers(f){
    return function(x){
        return function(y){
            return f(x,y);
        }
    }
}
/**
 * Exercise 3
 */
function callEach(array){
    array.forEach(element => {
        element();
    });

}

/**
 * Exercise 4
 */

function addN(n, array){
    return array.map(x => x + n);
}   

function getEvens(array){   
    return array.filter(elems => elems % 2 == 0);
}

function multiplyArray(array){
    let sum = array.reduce((total, current) => {
        if (total!= 0 && current!=0){
            total =  total*current;
            return total;
        } else{
            return total;
        }
    })
    return sum;
}
/**
 * Exercise 5
 */

function range(n){
    if(n == 0){
        let zero_base_array = [];
        return zero_base_array;
    }
    if(n == 1){
        let one_base_array = [0];
        return one_base_array;
    }
    let count_array = [n - 1];
    return range(n - 1).concat(count_array);
}

/**
 * Exercise 6
 */

function Euler1(){
    let count_array = range(1000);
    count_array.filter(elems => elems % 3 == 0 || elems % 5 == 0);
    let sum = count_array.reduce((total, current) => total + current);
    return sum
}
/**
 * Exercise 7
 */

/**
 * Exercise 8
 */

/**
 * Exercise 9
 */

/**
 * Exercise 10
 */
