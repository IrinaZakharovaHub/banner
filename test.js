const app = document.getElementById('app');

//todo: the simplest callback

// function sum (a, callback) {
//   callback(a);
// }
//
// sum(1, (res)=> {
//     console.log(res);
// });

// function sum(a, b, callback) {
//     callback(a + b)
// }
// sum(1,2, (res)=> {console.log(res)});

//todo: callback with 2 layers

// function sum (a, callback) {
//     a((res)=> {
//         callback(res);
//     })
// }
//
// function func1(arg) {
//     arg(1);
// }
//
// sum(func1, (res)=> {console.log(res)});

//todo: callback with 3 layers

// function sum(a, b, callback) {
//     a(res1 => {
//         b(res => {
//             callback(res1 + res)
//         })
//     })
// }
//
// function func1(arg) {
//     arg(1)
// }
//
// function func2(arg) {
//     arg(2)
// }
//
// sum(func1, func2, (res) => console.log(res));


// function sum(a, b, callback) {
//     a(res => {
//         callback(res)
//     });
//
//     b(res => {
//         callback(res)
//     })
// }
// function callback() {
//     return 1;
// }
//
// const func1 = (arg) => {
//     arg(callback())
// };
//
// const func2 = (arg) => {
//     arg(2)
// };
//
//
//
// sum(func1, func2, (res)=> console.log(res));


// function sum(arg, callback) {
//     arg((a,b)=>callback(a,b))
// }
//
// function func1(arg) {
//     arg(1,2);
// }
//
// sum(func1, (res1, res2) => console.log(res1 + res2));


//
// function withArgs(a) {
//     a(1)
// }
//
// function withCallback(arg, callback) {
//     arg(res => callback(res));
// }
//
// withCallback(withArgs, (res)=>console.log(res));


// function sum(x, y) {
//     console.log(x + y) ;
// }
//
// function makeAdd(x, callback) {
//     return function(y) {
//         callback (x, y);
//     }
// }
//
// let onePlusTwo = makeAdd(1, sum);
// onePlusTwo(2);


// function sum(x, y) {
//     console.log(x + y) ;
// }
//
// function makeAdd(x, callback) {
//     return function(z) {
//         return function(y) {
//             callback (x + z, y);
//         }
//     }
// }
//
// let onePlusTwo = makeAdd(1, sum);
// let oneMore = onePlusTwo(1);
// oneMore(2);

// function ConfirmAndAskMove_Companies(agentID, agentName)
// {
//     var wrapperFactory = function(entityName) {
//         return entityName;
//     };
//
//     showAsConfirmDialog('crStatusReasonDialogWrapper', wrapperFactory);
//
// }
//
// function showAsConfirmDialog(divId, callbackApply)
// {
//     console.log(callbackApply(1))
//
//
// }
//
// let confirm = new ConfirmAndAskMove_Companies('agentID', 'agentName');





// function sum(getX, getY, callback) {
//     var x, y;
//     getX(function(result) {
//         x = result;
//         if (y !== undefined) {
//             callback(x + y);
//         }
//     });
//     getY(function(result) {
//         y = result;
//         if (x !== undefined) {
//             callback(x + y);
//         }
//     });
// }
// Синхронная или асинхронная функция, которая загружает значение`x`
// function fetchX(callback) {
//     setTimeout(()=> {
//         callback(1)
//     },500)
//
// }


// Синхронная или асинхронная функция, которая загружает значение `y`
// function fetchY(callback) {
//     setTimeout(()=> {
//         callback(1)
//     },1000)
// }
// sum(fetchX, fetchY, function(result) {
//     console.log(result);
// });

// async -  это обертка над функцией, возвращающая рез-т функции как объект Promise
// async function loadData() {
//     // `rp`- это функция request-promise.
//     let promise1 = setTimeout(()=> Promise.resolve(1), 100);
//     let promise2 = setTimeout(()=> Promise.resolve(2), 100);
//
//     // В данный момент выполняются оба запроса
//     // и нам нужно подождать их завершения.
//     let response1 = await promise1;
//     let response2 = await promise2;
//     //  Код приостанавливается и ожидает данных (await), после чего возобновляется
//     console.log(response1 + response2);
//     return response1 + ' ' + response2;
// }
// Так как мы больше не в функции, объявленной с ключевым словом `async`
// нам нужно использовать `then` с возвращённым объектом Promise
// loadData().then((data) => console.log('Done', data));


// Можно вызывать новый промис без добавления его в переменную, и тут же создавать цепочки then / catch, причем катч
// тоже может быть вызван несколько раз, анпример, если первый отдает new Error
// let test = true;
// new Promise((res, rej)=> {
//     if (test) {
//         res(new Promise((res, rej)=> res(1)))
//     }
//     else {
//         rej(new Error('Error'))
//     }
//
// }).then(res => console.log(res)).catch(err => {
//     console.error(err)
// });


// function tickets(peopleInLine) {
//     let wallet25 = [];
//     let wallet50 = [];
//     const ticket = 25;
//     let isCorrect = true;
//     peopleInLine.forEach(el => {
//         if (el === ticket) {
//             wallet25.push(el);
//         } else if (el === 50) {
//             if (wallet25.length > 0) {
//                 wallet25.pop();
//                 wallet50.push(el);
//             } else isCorrect = false;
//         } else if (el === 100) {
//             if (wallet50.length > 0 && wallet25.length > 0) {
//                 wallet50.pop();
//                 wallet25.pop();
//             } else if (wallet25.length > 2) {
//                 wallet25.splice(0, 3)
//             } else isCorrect = false;
//         }
//     });
//     if (isCorrect === true) {
//         return 'YES'
//     }
//     else return 'NO'
// }
//
// console.log(tickets([25,50,25,100,25,25,25,100,25,25,25,100,25,25,50,100]));

// var event = new Event('build');
// const checkbox = document.getElementById("checkbox");
//
// checkbox.addEventListener('build', function (e) {
//     console.log(1);
// }, false);
//
// // Вызываем событие
// setTimeout(()=> {
//     checkbox.dispatchEvent(event);
// }, 2000);


// function preventDef(event) {
//     event.preventDefault();
// }
//
// function addHandler() {
//     document.getElementById("checkbox").addEventListener("click",
//         preventDef, false);
// }
//
// function removeHandler() {
//     document.getElementById("checkbox").removeEventListener("click",
//         preventDef, false);
// }
//
// function simulateClick() {
//     var evt = document.createEvent("MouseEvents");
//     evt.initMouseEvent("click", true, true, window,
//         0, 0, 0, 0, 0, false, false, false, false, 0, null);
//     var cb = document.getElementById("checkbox");
//     var canceled = !cb.dispatchEvent(evt);
//     if(canceled) {
//         // A handler called preventDefault
//         alert("canceled");
//     } else {
//         // None of the handlers called preventDefault
//         alert("not canceled");
//     }
// }


class Myclass {
    constructor() {
        this.val = 0;
    }
    createVal = () => {
        this.val = 1
    };
    getVal = () => {
        console.log(this.val)
    }
}

let my = new Myclass();
my.createVal();
my.getVal();




