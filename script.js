const root = document.getElementById("root");

function TodoForm(add) {
  const container = document.createElement("form");

  container.innerHTML = `
        <div class="row mb-3 d-flex justify-content-between">
            <div class="col-auto">
                <input type="text" class="form-control" />
            </div>
            <div class="col-auto">
                <button class="btn btn-success">Add</button>
            </div>
        <div>
    `;

  container.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = container.querySelector("input").value;
    add(value);
  });

  return container;
}

function List(todos, onChange) {
  const container = document.createElement("div");

  todos
    .map((todo) => {
      return ListItem(todo, (change) => {
        todo.completed = change;
        onChange();
      });
    })
    .forEach((el) => {
      container.appendChild(el);
    });

  return container;
}

function ListItem(todo, onChange) {
  const container = document.createElement("div");
  container.className = "border border-secondary rounded p-2 mt-1 mb-1";

  container.innerHTML = `
        <label class="w-100">
            <input type="checkbox" ${todo.completed ? "checked" : ""}/>
            ${todo.label}
        </label>
    `;

  const input = container.querySelector("input");
  input.addEventListener("change", (e) => {
    onChange(e.target.checked);
  });

  return container;
}

function TodoFooter(todos, onChange) {
  const container = document.createElement("div");
  container.className = "mt-3 d-flex justify-content-between align-items-center";

  const completed = todos.filter((todo) => todo.completed === true).length;
  container.innerHTML = `
        <span>${completed} / ${todos.length} Completed</span>
        <button class="btn btn-danger">Clear Completed</button>
    `;

  const btn = container.querySelector("button");
  btn.addEventListener("click", () => {
    onChange(todos.filter((todo) => todo.completed === false));
  });

  return container;
}

function App() {
  let todos = [
    { label: "Buy milk", completed: false },
    { label: "Buy bread", completed: false },
    { label: "Buy cheese", completed: false },
  ];

  const container = document.createElement("div");

  function render() {
    container.innerHTML = "";

    container.appendChild(
      TodoForm(function (newText) {
        todos.push({
          label: newText,
          completed: false,
        });
        render();
      })
    );

    container.appendChild(
      List(todos, () => {
        render();
      })
    );

    container.appendChild(
      TodoFooter(todos, (newTodos) => {
        todos = newTodos;
        render();
      })
    );
  }
  render();

  return container;
}

root.appendChild(App());
