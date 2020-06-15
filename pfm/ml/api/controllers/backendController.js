exports.entrena = function(req, res) {
    
    const tf = require('@tensorflow/tfjs');
    var data = getData();
    const model = tf.sequential(); 
    
    // Add a single input layer
    model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
  model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
    
    // Add an output layer
    model.add(tf.layers.dense({units: 1, useBias: true}));
  
    console.log(data);
    res.json("Prueba Entrena");
  };

function getData() {
    const fetch = require("node-fetch");
    var url_get = "https://cors-anywhere.herokuapp.com/http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com/repo_data/btc-eur.json";
    fetch(url_get).then(function(response) {
        const carsData = response.json();  
        const cleaned = carsData.map(value => ({
          open: value.Open,
          close: value.Close,
        }));  
        console.log(cleaned);
        return cleaned;    
    });  
    // const carsData = await carsDataReq.json();  
    // const cleaned = carsData.map(value => ({
    //   open: value.Open,
    //   close: value.Close,
    // }));  
    // return cleaned;
  }