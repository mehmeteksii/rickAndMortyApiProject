import express from "express"
import ejs from "ejs";
import axios from "axios";

const app = express()

const port = 3000
app.use(express.static('public'))

function getPageUrl(pageNumber) {
    return `/page/${pageNumber}`;
}


app.get('/', async (req, res) => {
    try {
        const result = await axios.get("https://rickandmortyapi.com/api/character/?page=1");
        res.render("index.ejs", { content: result.data, getPageUrl }); //Burada getPageUrl fonksiyonunu ejs dosyasına aktararak ejs dosyasında kullanılabilir hale getiriyoruz
        console.log(result.data.info.pages);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

app.get('/page/:number', async (req, res) => {
    const pageNumber = req.params.number; // Url üzerindeki sayfa numarasını alındı (:number)
    try {
        const result = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`);
        res.render("index.ejs", { content: result.data, getPageUrl });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
