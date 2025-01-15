const apiUrl = "https://67874e6cc4a42c91610628b7.mockapi.io/products";
const productsContainer = document.getElementById("products-container");

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();

       
        productsContainer.innerHTML = products.map(product => `
            <div class="card">
                <img src="${product.image}" alt="${product.title}">
                <div class="card-content">
                    <h2 class="card-title">${product.title}</h2>
                    <p class="card-price">$${product.Price}</p>
                    <p class="card-description">${product.Description}</p>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                    <button onclick="updateProduct(${product.id})">Update</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

document.getElementById("addForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                Price: price,
                Description: description,
                image: image
            })
        });
        alert("Product added successfully");
        fetchProducts();
        document.getElementById("addForm").reset();
    } catch (error) {
        console.error("Error adding product:", error);
    }
});


async function deleteProduct(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        alert("Product deleted");
        fetchProducts();
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}


async function updateProduct(id) {
    const newTitle = prompt("Enter new title");
    if (newTitle) {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle })
            });
            alert("Product updated");
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }
}


fetchProducts();
