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
    //receives a function f,
    //then has two layers of function for x and y,
    //then applies function f to x and y
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
    //adds n to every element in the array
    return array.map(x => x + n);
}   

function getEvens(array){   
    //filters the array to only have even numbers
    return array.filter(elems => elems % 2 == 0);
}

function multiplyArray(array){
    //performs an equation on the array to reduce all elements in the array to one number
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
    //base cases, empty array for n = 0
    if(n === 0){
        let zero_base_array = [];
        return zero_base_array;
    }
    //catches the recursion before zero, then adds zero
    if(n === 1){
        let one_base_array = [0];
        return one_base_array;
    }
    //adds the value before the current n, and then recursively requests the previous values
    //does it this way so that n is not included
    let count_array = [n - 1];
    let precuror_array = range(n - 1);
    let final_array = precuror_array.concat(count_array);
    return final_array;
}


/**
 * Exercise 6
 */

 function Euler1(){
    //create an array of size 1000, then filter to only keep values that are divisible by 3 or 5
    let count_array = range(1000);
    const second_array = count_array.filter(elems => {
        if(elems % 3 == 0 || elems % 5 == 0){
            return true
        }
        return false
    });
    //reduce the array into a sum, by adding the current value to the total sequentially
    let sum = second_array.reduce((total, current) => {
        total = total + current;
        return total;
    });
    return sum
}

/**
 * Exercise 7
 */

function infinite_series_calculator(accumulate){
    // wait for all arguements to be given over time, then perform them in the order:
    // 1. create array of length n
    // 2. filter by the predicate
    // 3. transform the remaining elements by the transform
    // 4. then accumulate by the accumulate function
    // returns this value
    return function(predicate){
        return function(transform){
            return function(n){
                let n_array = range(n);
                n_array = n_array.filter(elems => {
                    if(predicate(elems) === true){
                        return true
                    }
                    else{
                        return false
                    }
                });
                n_array = n_array.map(transform);
                let final_value = n_array.reduce((total, current) => {
                    total = accumulate(total, current);
                    return total;
                });
                return final_value;
            }
        }
    }
}

/**
 * Exercise 8
 */
function calculatePiTerm(n){
    //the calculation needed to find pi
    return (4*n**2)/(4*n**2-1)
}

function skipZero(number){
    //returns true if number is not zero
    if (number === 0){
        return false;
    }
    return true;
}
function productAccumulate(a, b){
    //sums up a and b
    return a*b;
}

function calculatePi(n){
    fi//performs the calculation and sums up the number up to n to find approximation to pi
    return 2*(infinite_series_calculator((x,y) => productAccumulate(x, y))((x) => skipZero(x))((x) => calculatePiTerm(x))(n));
}
//approximates pi
const pi = calculatePi(100);
/**
 * Exercise 9
 */
function factorial(n){ 
    //It calculates the factorial by multiplying n with the number below it until n reaches 0
    if (n == 1){
        return 1;
    }
    return n * factorial(n - 1);
}
function calculateETerm(nth){ 
    //Formula for calculating the E term
    return 2 * (nth + 1) / factorial(2*nth + 1);
}
function sumAccumulate(x, y){
    //Adds two numbers
    return x + y;
}

function alwaysTrue(){
    //Always returns true and never false
    return true;
}
function sum_series_calculator(transform){
    return function(n){
        // passes in the accumulate function as addition
        let infCalc = infinite_series_calculator((x,y) => sumAccumulate(x,y));
        // does not filter out any values
        infCalc = infCalc((x) => alwaysTrue(x));
        // gives the transform for a single n value
        infCalc = infCalc(transform);
        // calculates with a precision of n
        let final_value = infCalc(n);
        // returns the sine value
        return final_value;
    }
}
function calculateE(n){
    // passes in the transform, then the n value - to the infinite series calculator
    let sumSeries = sum_series_calculator((x) => calculateETerm(x));
    return sumSeries(n);
}

const e = calculateE(100);
/**
 * Exercise 10
 */

function sin(sinValue){
    // passes in the accumulate function as addition
    let infCalc = infinite_series_calculator((x,y) => sumAccumulate(x,y));
    // does not filter out any values
    infCalc = infCalc((x) => true);
    // gives the transform for a single n value
    // this is where the value the sine is performed on is passes in to the terms
    infCalc = infCalc((x) => sinTerm(x,sinValue));
    // calculates with a precision of 100
    let final_value = infCalc(100);
    // returns the sine value
    return final_value;
}
function sinTerm(n, x){
    // calculates a single term
    let numerator = ((-1)**n) * (x**((2*n)+1));
    let denominator = factorial((2*n) + 1);
    return numerator/denominator;
}