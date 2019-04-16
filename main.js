
console.log("wokring")
var class_works = [
    {
        "name": "Classwork1",
        "meta": "Deterministic Finite Automata",
        "link": "CW1.html"
    },
    {
        "name": "Classwork2",
        "meta": "NFA and RegExp",
        "link": "CW2.html"
    },
    {
        "name": "Classwork3",
        "meta": "RegExp",
        "link": "CW3.html"
    },
    {
        "name": "Classwork4",
        "meta": "Context-free grammars",
        "link": "CW4.html"
    },
    {
        "name": "Classwork5",
        "meta": "Recursive-descent Parser",
        "link": "CW5/index.html"
    },
    {
        "name": "Classwork6",
        "meta": "Push-down Automaton",
        "link": "CW6.html"
    },
    {
        "name": "Classwork7",
        "meta": "microJ Level 3",
        "link": ""
    }
    
]
var home_works = [
    {
        "name": "Homework1",
        "meta": "Simple Syntax Highlighter for string and array",
        "link": "HW1.html" 
    },
    {
        "name": "Homework2",
        "meta": "",
        "link": "HW2/database.html" 
    }
]

//var cwtext = document.createTextNode= "Classworks: "
//document.getElementById("div_list").append(cwtext);
var cwtext = document.createTextNode= "Classworks: "
document.getElementById("div_list").append(cwtext);
var obj;

var cw = document.createElement("UL");
document.getElementById("div_list").appendChild(cw);
for (var i = 0; i < class_works.length; i++) {
    obj = class_works[i];
    var node = document.createElement("LI");
    node.innerHTML += 
    "<a href ='"+obj.link+"'>"+obj.name+"</a>" + ": "+ obj.meta+"<hr>"
    cw.appendChild(node); 
}


var hwtext = document.createTextNode= "Homeworks: "
document.getElementById("div_list").append(hwtext);

var hw = document.createElement("UL");
document.getElementById("div_list").appendChild(hw);
for (var i = 0; i < home_works.length; i++) {
    obj = home_works[i];
    var node = document.createElement("LI");
    node.innerHTML += 
    "<a href ='"+obj.link+"'>"+obj.name+"</a>: " + obj.meta+"<hr>"
    hw.appendChild(node); 
}
