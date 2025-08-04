//const color = ["yellow", "red", "blue","black", ""]

// let fruit1 = "mango"
// let fruit2 = "orange"
// let fruit3 = "apple"

let fruits = ["mango", "orange", "apple","pineapple","gauva",2, 300,true, false]
//syntax
let variable = ["values"]
//mixed datatypes

//elements of an array are indexed

let fruit = ["mango", "orange", "apple","pineapple","gauva",2, 300,true, false]
     let num ="  0        1         2         3         4    5   6   7     8"


//filter method  //returns an array that satisfys a given condition
let calc = [2, 4, 5, 6,7, 8, 10]
//syntax  array.map((element)=> condition) it does not modify the element inplace


let result = calc.map(element => element * 2)

console.log(result)
//syntax       array.filter(calback(element, index) => conditon)
//element --- the value being considered


//modulus  6/4 == 1 rem 2
//6 % 4 =2
// let result = calc.filter((element, index)=>{
//      return element % 2 === 0
// })

// let num2 = 2
// let num1 = "2"
// console.log(num2 == num1)   //true  == values 
// console.log(num2 === num1)  //false  == values and datatype

// step1 = condition  2 % 2  0
// step2 = condition  4 % 2  0
// step3 = condition  5 % 2  1
// step4 = condition  6 % 2  0
// step5 = condition  7 % 2   1
// step6 = condition  8 % 2   0
// step7 = condition  10 % 2  0



//console.log(result)



//slice method 
//map method
//forEach
//slice method
//splice method
//findIndex



//fruit.unshift("benz")  //add an element at the begining of an array
//fruit.shift()   //remove from beginin
//fruit.pop()   //remove the last element of an array
//fruit.push("blessing")

//forEach method

// let playlist = []  //empty
// playlist[0] = "song1"
// playlist[1] = "song2"
// playlist[2] = "song2"
// playlist[3] = "song3"
// playlist[4] = "song4"
// playlist[5] = "song5"


// playlist.unshift("newsong")
// console.log(playlist)

// playlist.shift()  
// console.log(playlist) 

// playlist.pop()
// console.log(playlist)

// playlist.push("song6")
// console.log(playlist)











//updating array elements

//let fruit = ["mango", "orange", undefined,"pinepple","gauva",2, 300,true, false]

// delete fruit[3]
// console.log(fruit)




//length property
//console.log(fruit.length)

//accessing elements of an array --  bracket notation array[index]
// console.log(fruit[3])
// console.log(fruit[5])
// console.log(fruit[7])


//method of an array
//push method  array.push()