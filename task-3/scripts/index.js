"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelectorAll(".gallery img");
    const modal = document.querySelector(".modal");
    const modalImg = document.querySelector(".modal img");
    const closeModal = document.querySelector(".close-modal");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentIndex = 0;

    function openModal(index) {
        modalImg.src = gallery[index].src;
        modal.classList.add("open");
        currentIndex = index;
    }

    gallery.forEach((img, index) => {
        img.addEventListener("click", () => openModal(index));
    });

    closeModal.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("open");
        }
    });

    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        openModal(currentIndex);
    });

    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % gallery.length;
        openModal(currentIndex);
    });
});