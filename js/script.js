const todoInput = document.getElementById("todo-input"); 
const todoDate = document.getElementById("todo-date");
const taskList = document.getElementById("task-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");

let currentFilter = "all"; // tampilan semua inputan

function addTask() {
  const taskText = todoInput.value.trim();
  const dueDate = todoDate.value;

  if (taskText === "") {
    alert("Tulis dulu todonya ya!");
    return;
  }

  if (dueDate === "") {
    alert("Isi dulu tanggalnya ya!");
    return;
  }

  // Buat baris task baru
  const row = document.createElement("tr");
  row.classList.add("task-row");
  row.dataset.status = "pending";

  row.innerHTML = `
    <td>${taskText}</td>
    <td>${dueDate}</td>
    <td><span class="status">Pending</span></td>
    <td>
      <button class="complete-btn">✅</button>
      <button class="delete-btn">❌</button>
    </td>
  `;

  // Tombol selesai
  row.querySelector(".complete-btn").addEventListener("click", () => {
    row.classList.toggle("completed");
    const status = row.querySelector(".status");
    const isDone = row.classList.contains("completed");
    status.textContent = isDone ? "Done" : "Pending";
    row.dataset.status = isDone ? "done" : "pending";
  });

  // Tombol hapus
  row.querySelector(".delete-btn").addEventListener("click", () => {
    row.remove();
    checkEmptyTable();
  });

  // “No task found” jika tak ada todo
  if (taskList.children.length === 1 && taskList.children[0].innerText === "No task found") {
    taskList.innerHTML = "";
  }

  taskList.appendChild(row);

  // Reset input
  todoInput.value = "";
  todoDate.value = "";

  applyFilter(); // biar langsung ikut filter aktif
}

// Tombol hapus semua
deleteAllBtn.addEventListener("click", () => {
  taskList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
});

// Tombol filter
filterBtn.addEventListener("click", () => {
  if (currentFilter === "all") {
    currentFilter = "pending";
    filterBtn.textContent = "Show Pending";
  } else if (currentFilter === "pending") {
    currentFilter = "done";
    filterBtn.textContent = "Show Done";
  } else {
    currentFilter = "all";
    filterBtn.textContent = "Show All";
  }
  applyFilter();
});

function applyFilter() {
  const rows = document.querySelectorAll(".task-row");

  rows.forEach((row) => {
    if (currentFilter === "all") {
      row.style.display = "";
    } else if (currentFilter === "pending" && row.dataset.status !== "pending") {
      row.style.display = "none";
    } else if (currentFilter === "done" && row.dataset.status !== "done") {
      row.style.display = "none";
    } else {
      row.style.display = "";
    }
  });
}

// Cek kalau tabel kosong
function checkEmptyTable() {
  if (taskList.children.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
  }
}

