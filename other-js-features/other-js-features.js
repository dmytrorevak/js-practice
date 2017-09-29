/**
 Practice with the polymorphic function that accepts difference type
 of arguments and returns date in a certain format.
 */


function formatDate(date) {

    var formatedDate = null;

    if (typeof(date) === 'number') {
        formatedDate = new Date(date * 1000);

    } else if ( typeof(date) === 'string') {
        formatedDate = new Date(date);

    } else if (Array.isArray(date)) {
        date.unshift(null);
        formatedDate = new (Function.prototype.bind.apply(Date, date));

    } else {
        formatedDate = date;
    }

    var getDay = formatOneDigitDate(formatedDate, formatedDate.getDate),
        getMonth = formatOneDigitDate(formatedDate, formatedDate.getMonth, true),
        getYear = formatOneDigitDate(formatedDate, formatedDate.getFullYear);

        return getDay() + '.' + getMonth() + '.' + getYear();
}


/**
 Decorator that verifies does date element have two digits.
 */


function formatOneDigitDate(date, getDateElementFunction, isMonth) {

    return function() {

        var dateElement = isMonth ? getDateElementFunction.func(date) + 1 : getDateElementFunction.func(date);
        dateElement = String(dateElement);

        if (dateElement.length === 1) {
            dateElement = '0' + dateElement;
        }

        return dateElement;
    };
}

// console.log(formatDate('2011-10-02'));
// console.log(formatDate(1234567890));
// console.log(formatDate([2014, 0, 1]));
// console.log(formatDate(new Date(2014, 0, 1)));


/**
 Practice with JSON format.
 */


var leader = {
    name: 'John Doe',
    age: 35
};

var jsonLeader = JSON.stringify(leader);
// console.log(jsonLeader);
var objectLeader = JSON.parse(jsonLeader);
// console.log(objectLeader);



var leader = {
    name: 'John Doe'
};

var soldier = {
    name: 'Eric Moreno'
};
leader.soldier = soldier;
soldier.leader = leader;

var team = [leader, soldier];
team.toJSON = function() {
    var teamJson = [];

    this.forEach(function(elem) {
        var jsonElem = {};

        for (var key in elem) {

            if (typeof(elem[key]) === 'object') {
                jsonElem[key] = elem[key].name;
            } else {
                jsonElem[key] = elem[key];
            }
        }

        teamJson.push(jsonElem);
    });

    return teamJson;
};

// var jsonTeam = JSON.stringify(team);
// console.log(jsonTeam);


/**
 Practice with setTimeout and setInterval functions.
 */


function printNumbersInterval() {
    var number = 1,
        timerId = setInterval(function() {
            if (number === 20) clearInterval(timerId);
            console.log(number);
            number++;
    }, 100);
}
// printNumbersInterval();

function recursivePrintNumbersInterval() {
    var number = 1;
    setTimeout(function printNumbers() {
        console.log(number);
        number++;
        if (number <= 20) setTimeout(printNumbers, 100);
    }, 100);
}
// recursivePrintNumbersInterval();


function delay(func, time) {

    return function() {
        var args = arguments,
            self = this;

        setTimeout(function() {
            func.apply(self, args);
        }, time);
    };
}

function f(x) {
    console.log(x);
}

// var f1000 = delay(f, 1000);
// var f1500 = delay(f, 1500);
// f1000('text');
// f1500('second text');


function debounce(func, time) {
    var paused = false;

    return function() {
        if (paused) return;

        func.apply(this, arguments);
        paused = true;

        setTimeout(function() {
            paused = false;
        }, time);
    };
}

// var f = debounce(f, 1000);
// f(1);
// f(2);
// setTimeout(function() { f(3) }, 100);
// setTimeout(function() { f(4) }, 1100);
// setTimeout(function() { f(5) }, 1500);


function throttle(func, time) {
    var last = null,
        paused = false;

    return function a() {
        if (paused) {
            last = arguments;
            return;
        }

        func.apply(this, arguments);
        paused = true;

        setTimeout(function() {
            paused = false;
            if (last) {
                a.apply(this, last);
                last = null;
            }
        }, time);
    };
}

// var f1000 = throttle(f, 1000);
// f1000(1);
// f1000(2);
// f1000(3);
