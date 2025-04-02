document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("draggable-list");
  let draggedItem = null;

  document.querySelectorAll("#draggable-list li").forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      draggedItem = this;
      setTimeout(() => this.classList.add("dragging"), 0);
    });

    item.addEventListener("dragend", function () {
      this.classList.remove("dragging");
      draggedItem = null;
    });

    item.addEventListener("dragover", function (e) {
      e.preventDefault();
      if (!draggedItem) return;
      list.insertBefore(draggedItem, this);
    });
  });
});
