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
    
    var url_get = "https://cors-anywhere.herokuapp.com/http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com/repo_data/btc-eur.json";
    var request = require('request');
    var options = {
      'method': 'GET',
      'url':  url_get,
      'headers': {
      }
    };
    
    request(options, function (error, response) { 
      console.log(response);
      
        
    });  
  

}