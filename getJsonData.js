function getJsonData() {
    const response = fetch('https://jsonplaceholder.typicode.com/albums/posts');
    const jsonData = response.json();

    jsonData.array.forEach(element => {
        return element.title;
    });
}

module.exports = {getJsonData};