// access filesystem
let fs = require('fs')
// readlineSync package to easily ask questions
let readlineSync = require('readline-sync')


/* pass file path as third argument when running program and create global variable
to access data afterwards */
let path = process.argv[2]
// create variable to store data returned from input
let file_data

// interpolate the path
// read the file and assign the parsed output to a variable
let data = fs.readFile(`${path}`, "utf8", function (err, data) {
    if (err) throw err;
    // save data from file to variable
    file_data = data
    // invoke function to print the data asynchronously
    print()
})

// print data from file to console
function print () {
    let value_to_find = keepSearching()
    // `plain old javascript object`
    let pojo = JSON.parse(file_data)
    // log to console return value from `findVal` function
    if (value_to_find) {
        console.log(findVal(pojo, `${value_to_find}`))
        print()
    }
    // check for falsey value, break by logging to console
    else if (!value_to_find) {
        console.log('bye!');
    }
}
// recursively search object for value of user-given key
function findVal(object, key) {
    // create value variable to store found value after searching
    let value;
    // search the pojo's keys and iterating using some method
    Object.keys(object).find(function(k) {
        if (k === key) {
            // once found, assign the value of the key to `value` variable
            value = object[k];
            // return true to stop iterating
            return true;
        }
        /* recursively call function, first checking if the key exists in the object and 
        that it is an object*/
        if (object[k] && typeof object[k] === 'object') {
            // function call
            value = findVal(object[k], key);
            // return the value while it is not undefined
            return value !== undefined;
        }
    });
    return value
}

function keepSearching () {
    // user input
    let ques = readlineSync.question('Enter your key to get your value (Or type `quit`): ')
    
    // allow user to enter 'quit' if they are done searching
    if (ques !== 'quit') {
        return ques 
    }
    // return null so value_to_find will be falsey
        if (ques == 'quit') {
            return null;
        }
    }