let array = document.getElementById("array-elements");
let insertButton = document.getElementById("insert");
let startButton = document.getElementById("start");
startButton.disabled=true
let clearButton = document.getElementById("clear");
clearButton.disabled=true
let container = document.getElementById("container");
let status_heading=document.getElementById("status_heading");
let squares = [];
let inProgress=false;

insertButton.onclick = function insert() {
  let j = 0;
  let i = 0;
  let k=0;
  let tempArray = array.value.replace(/\s/g, "");
  if(tempArray){
    let resultArray = tempArray.split(",");
    resultArray=resultArray.filter((item)=>item!=='');
    for (i = 0; i < resultArray.length; i++) {
      let array_item = document.createElement("p");
      array_item.setAttribute("id", i + 1);
      array_item.innerHTML = resultArray[i];
      array_item.classList.add("box");
      squares.push(array_item);
      container.append(array_item);
    }
    status_heading.innerHTML="";
    startButton.disabled=false;
    clearButton.disabled=false;
  }
};

startButton.onclick = function start() {
  status_heading.innerHTML="In Progress";
  if(inProgress){
    return;
  }
  bubbleSort();
  inProgress=true;
  startButton.disabled=true
  clearButton.disabled=true
};

clearButton.onclick = function reset() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  while (squares.length) {
    squares.pop();
  }
  status_heading.innerHTML="";
  array.value="";
  clearButton.disabled=true;
  startButton.disabled=true;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  
  for (i = 0; i < (squares.length - 1); i++) 
  {
        for (j = 0; j < (squares.length - i-1); j++) 
        {
            squares[j].classList.add("active");
            squares[j + 1].classList.add("active");
            if (parseInt(squares[j].innerHTML) > parseInt(squares[j + 1].innerHTML)) 
            {
                squares[j+1].classList.add("move-left");
                squares[j].classList.add("move-right");
                let swap = squares[j];
                squares[j]= squares[j + 1];
                squares[j + 1] = swap;
                await sleep(2000);
                while (container.firstChild) 
                {
                  container.removeChild(container.firstChild);
                }
                for (let k = 0; k < squares.length; k++) 
                {
                  let array_item = document.createElement("p");
                  array_item.setAttribute("id", k + 1);
                  array_item.innerHTML = squares[k].innerHTML;
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
    inProgress=false;
    startButton.disabled=false
    clearButton.disabled=false
    status_heading.innerHTML="Completed";
}
