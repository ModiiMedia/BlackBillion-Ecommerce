const request = require('request');
const snipcart = require('snipcart-api');
const fs = require('fs')
require('dotenv').config()

let url = "https://app.snipcart.com/api/products"

fs.readFile('./public/products/index.json', (err, data) => {
    if (err) throw err;
    let postData = JSON.parse(data)
    updateProducts(postData)
})


function updateProducts(data){
    let options = {
        method: "post",
        body: data,
        json: true,
        url: url,
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        }
    }    

    request(options, function(err, res, body){
        if (err) {
            console.error('error posting json: ', err)
            throw err
        }
        let headers = res.headers;
        let statusCode = res.statusCode;
        console.log('headers: ', headers)
        console.log('statusCode: ', statusCode)
        console.log('body: ', body)
    })
}




// snipcart.configure('SECRET_API_KEY', process.env.SECRET_API_KEY);




// function updateProducts(data) {
//     snipcart.api.products
//     .create({
//         params: data
//     })
//     .then((response) => {
//         console.log('sucess');
//         console.log(response.data);
//         console.log(response.statusText);
//         console.log(response.headers);
//         console.log(response.config);
//     })
//     .catch((error) => {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);
//             console.error('Error', error.message);
//         }
//     })
// }
