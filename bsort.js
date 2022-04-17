var array = document.getElementById("array-elements");
var btn1 = document.getElementById("insert");
var btn2 = document.getElementById("start");
var btn3 = document.getElementById("clr");
var container = document.getElementById("contain");
var status_heading=document.getElementById("status_heading");
let squares = [];

btn1.onclick = function display() {
  var j = 0;
  var i = 0;
  var k=0;
  swap = 0;
  var temp = array.value;
  const result = temp.split(" ");
  for (i = 0; i < result.length; i++) {
    var array_item = document.createElement("p");
    array_item.setAttribute("id", i + 1);
    array_item.innerHTML = result[i];
    array_item.classList.add("box");
    squares.push(array_item);
    container.append(array_item);
  }
  status_heading.innerHTML="";
};

btn2.onclick = function bubble_sort() {
  status_heading.innerHTML="In Progress";
  Tutor();
};

btn3.onclick = function reset() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  while (squares.length) {
    squares.pop();
  }
  status_heading.innerHTML="";
  array.value="";
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Tutor() {
  
  for (i = 0; i < (squares.length - 1); i++) 
  {
        for (j = 0; j < (squares.length - i-1); j++) 
        {
            console.log("i= ",i," j= ",j);
            squares[j].classList.add("active");
            squares[j + 1].classList.add("active");
            console.log("squares ",container);
            if (parseInt(squares[j].innerHTML) > parseInt(squares[j + 1].innerHTML)) 
            {
                squares[j+1].classList.add("move-left");
                squares[j].classList.add("move-right");
                swap = squares[j];
                squares[j]= squares[j + 1];
                squares[j + 1] = swap;
                console.log("comparing "+squares[j].innerHTML+" and "+squares[j+1].innerHTML);
                await sleep(2000);
                while (container.firstChild) 
                {
                  container.removeChild(container.firstChild);
                }
                for (let k = 0; k < squares.length; k++) 
                {
                  var array_item = document.createElement("p");
                  array_item.setAttribute("id", k + 1);
                  array_item.innerHTML = squares[k].innerHTML;
                  console.log(" "+squares[k].innerHTML+" ");
                  array_item.classList.add("box");
                  squares[k].classList.remove("move-left");
                  squares[k].classList.remove("move-right");
                  squares[k].classList.remove("active");
                  container.append(squares[k]);
                }
            }
            await sleep(2000);
            squares[j].classList.remove("active");
            squares[j+1].classList.remove("active");
            await sleep(2000);
        }
    }
    status_heading.innerHTML="Completed";
}
