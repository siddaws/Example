import { CATS } from '../js/cats.js'; 


function showImage(arr) {
    let out = '<div class="images-grid">'; 
    arr.forEach(el => {
        out += `
        <div class="grid-item">
            <img src="${el.image}" alt="${el.title}" onerror="this.onerror=null;this.src='img/defoultCat.avif';">
            <div class="images-text">
                <h3>${el.title}</h3>
                <p>${el.price}$, ${el.description}</p>
            </div>
        </div>`
    });
    out += '</div>'
    document.getElementById('about').innerHTML = out
}
showImage(CATS);






const form = document.getElementById('addCatForm'); 

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const image = imageInput.files[0]; 

   
    saveCat(title, description, price, image);
});

function saveCat(title, description, price, image) {
    
    const cat = {
        title: title,
        description: description,
        price: price,
        image: image ? image.name : 'defaultCat.avif' 
    };

    
    CATS.push(cat);

   
    showImage(CATS);

   
}





form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const image = imageInput.files[0];

    const formData = new FormData();
    formData.append('image', image);  // Додаємо зображення у форму
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            saveCat(title, description, price, result.filePath);
        } else {
            alert('Не вдалося завантажити зображення');
        }
    } catch (error) {
        alert('Помилка при завантаженні зображення');
    }
});



let mobilePanel = document.querySelector('.mobile-panel')
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function () {
    mobilePanel.classList.toggle('show-mobile-panel')
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  
})
