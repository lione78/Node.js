console.log('test')
async function getJsonData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const jsonData = await response.json();
    console.log(jsonData);
}

getJsonData();