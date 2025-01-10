import { CATS } from './cats.js'; 


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

