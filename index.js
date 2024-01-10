const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// commonJS > ES6 > package.json setting 필요
// .js 생략 가능
const dbData = require('./dbData')

// console.log(dbData[0])

// cors 피해주는 code
// express는 middle ware를 거쳐서 옴
app.use(cors({
    origin: "http://127.0.0.1:5500",    // http://127.0.0.1:5000/ /하면 안됨.
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(express.json());

// async, await를 첨가 해 줘야 함.
app.get('/', async (req, res) => {
    let result = [];
    await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => data.forEach( element => {
        result.push(element.title.slice(0, 5));
    }))
    res.send(result);
});

app.get('/posts', (req, res) => {
    // const { postId } = req.query;
    const pppId = req.query.postId;
    let result = [];
    if (pppId) {
       for(let value of dbData){
            if (value.userId === pppId){
                result.push(value);
            }
       }
        res.send(result);
    } else {
        res.send(dbData[0]);
    }
});

// fetch('http://localhost:3000/posts?userId=5&postId=8')

// fetch('http://localhost:3000/posts/5/8')
// 'posts/:userId/:postId'
// 'posts/:userId'
// 'posts/:postId' X

// js 구조 분해 할당
app.get('/posts/:pid', (req, res) => {
    const { pid } = req.params;
    console.log(dbData[pid - 1]);
    res.send(dbData[pid - 1]);
});

app.get('/posts', (req, res) => {
    const { postId } = req.query;
    console.log(postId);
})

// 비동기 무한 loop
app.listen(port, () => {
    console.log(`Example app listning on port ${port}`)
});

app.post('/posts', function (req, res) {
    // const { postId } = req.params; < post에서는 이방식으로 하지 말 것.
    // Rest API에서는 update는 PUT 방식을
    const obj = req.body;   // 객체로 받고 몬지 모르니까 { } X
    obj.id = dbData.length + 1;
    // obj.id = postId;
    console.log(dbData.length);
    dbData.push(obj);
    console.log(dbData.length);
    console.log(dbData[dbData.length -1]);
    res.send(obj);
});

app.put('/posts/:pid', function (req, res) {
    const { pid } = req.params;
    const obj = req.body;
    if(!obj.id){
        obj.id = pid;
    }
    dbData.splice(pid - 1, 0, obj);
    res.send(dbData[pid - 1]);
});

app.delete('/posts/:pid', function (req, res) {
    const { pid } = req.params;
    dbData.splice(pid - 1, 1);
    res.send(dbData.slice(Number(pid)-2, Number(pid)));
});
