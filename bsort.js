let array = document.getElementById("array_input");
let container = document.getElementById("sort_array_container");
let status_heading = document.getElementById("status_heading");

let insertButton = document.getElementById("insert");

let startButton = document.getElementById("start");
startButton.disabled = true;

let clearButton = document.getElementById("clear");
clearButton.disabled = true;

let squares = [];

insertButton.onclick = function insert() {
  const regex = /^\d+$/;

  let resultsArray = array.value.split(",");
  const onlyDigits = resultsArray.every((item) => regex.test(item));

  if (onlyDigits) {
    const filteredResultsArray = resultsArray.filter((item) =>
      regex.test(item)
    );

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < filteredResultsArray.length; i++) {
      let array_item = document.createElement("p");
      array_item.setAttribute("id", i + 1);
      array_item.innerHTML = filteredResultsArray[i];
      array_item.classList.add("box");
      squares.push(array_item);
      fragment.appendChild(array_item);
    }
    container.appendChild(fragment);

    status_heading.innerHTML = "";
    startButton.disabled = false;
    clearButton.disabled = false;
  } else {
    alert("Array values should be a valid whole number");
  }
};

startButton.onclick = function start() {
  status_heading.innerHTML = "In Progress";
  startButton.disabled = true;
  insertButton.disabled = true;
  bubbleSort();
};

clearButton.onclick = function reset() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  while (squares.length) {
    squares.pop();
  }

  status_heading.innerHTML = "";
  array.value = "";
  clearButton.disabled = true;
  startButton.disabled = true;
  insertButton.disabled = false;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < squares.length - 1; i++) {
    for (let j = 0; j < squares.length - i - 1; j++) {
      squares[j].classList.add("active");
      squares[j].style.setProperty(
        "--translate-width",
        `${squares[j + 1].offsetWidth + 20}px`
      );

      squares[j + 1].classList.add("active");
      squares[j + 1].style.setProperty(
        "--translate-width",
        `${squares[j].offsetWidth + 20}px`
      );

      if (parseInt(squares[j].innerHTML) > parseInt(squares[j + 1].innerHTML)) {
        squares[j + 1].classList.add("move-left");
        squares[j].classList.add("move-right");

        let swap = squares[j];
        squares[j] = squares[j + 1];
        squares[j + 1] = swap;
        await sleep(1000);

        squares[j].classList.remove("move-left");
        squares[j + 1].classList.remove("move-right");

        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        for (let k = 0; k < squares.length; k++) {
          fragment.appendChild(squares[k]);
        }
        container.appendChild(fragment);
      }

      await sleep(1000);
      if (squares[j] && squares[j + 1]) {
        squares[j].classList.remove("active");
        squares[j + 1].classList.remove("active");
      }
      await sleep(1000);
    }
  }
  if (!clearButton.disabled) {
    // To check if the clear button was not clicked before the sort is completed.
    startButton.disabled = false;
    insertButton.disabled = false;
    status_heading.innerHTML = "Completed";
  }
}
