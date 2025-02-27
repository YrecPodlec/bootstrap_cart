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

            let product = {
                id: Date.now(),
                name: productName,
                image: productImage, // Изображение будет добавлено позже из localStorage
                size: selectedSize,
                price: 1499, // Цена по умолчанию
            };

            // Получаем товары из localStorage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length > 0) {
                cart.forEach(item => {
                    if (item.name === productName) {
                        product.image = item.image; // Обновляем путь к изображению
                    }
                });
            }

            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();
        });
    });

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCount = cart.length;
        document.getElementById("cartCount").textContent = cartCount;
    }

    updateCartCount();
});
