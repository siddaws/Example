const express = require('express');
const { url } = require('inspector');
const multer = require('multer');
const path = require('path');
const { URL } = require('url');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'assets'))); // Замість 'public' — шлях до вашої папки зі статичними файлами (css, js, img)
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));


// Налаштування для зберігання завантажених зображень
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img', 'uploads');  // Папка, куди будуть зберігатися файли
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Перейменовуємо файл, щоб уникнути колізій
    }
});

const upload = multer({ storage: storage });



// Обробка завантаження зображення
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Файл не було завантажено');
    }
    res.status(200).send({ filePath: '../img/uploads/' + req.file.filename });
});

// Обслуговування HTML форми
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));  // Припускаємо, що ваша форма знаходиться в index.html
});

app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});
