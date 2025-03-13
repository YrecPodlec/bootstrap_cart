document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".btn-primary");

    cartButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const card = button.closest(".card");
            const productName = card.querySelector(".card-title").textContent.trim();
            const productImage = card.querySelector("img").src || ''; // Путь к изображению

            // Определяем выбранный размер
            const selectedSize = card.querySelector("input[type=radio]:checked")?.nextElementSibling.textContent.trim() || "S";

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Проверяем, есть ли уже этот товар в корзине
            let existingItem = cart.find(item => item.name === productName && item.size === selectedSize);

            if (existingItem) {
                existingItem.quantity += 1; // Увеличиваем количество
            } else {
                let product = {
                    id: Date.now(),
                    name: productName,
                    image: productImage, // Изображение
                    size: selectedSize,
                    price: 1499, // Цена по умолчанию
                    quantity: 1, // Начальное количество
                };
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();
        });
    });

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cartCount").textContent = cartCount;
    }



    updateCartCount();
});
