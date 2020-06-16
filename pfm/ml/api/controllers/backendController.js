var request = require('request');
const tf = require('@tensorflow/tfjs');

exports.entrena = async function(req, res) {
    var data = getData();
    const model = tf.sequential(); 
    
    // Add a single input layer
    model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
    model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
    
    // Add an output layer
    model.add(tf.layers.dense({units: 1, useBias: true}));
    const tensorData = convertToTensor(data);
    const {inputs, labels} = tensorData;
    console.log("Comenzamos a entrenar el modelo");
    await trainModel(model, inputs, labels);
    console.log("Entrenamiento realizado");
    testModel(model, data, tensorData);  
    almacenaVariables(model, tensorData);  

    res.json("Modelo testado");
  };

function getData() {
  const fs = require('fs');
  let global_data = fs.readFileSync("cotizaciones.json");
  let data_semi = JSON.parse(global_data);
  const cleaned = data_semi.map(value => ({
    open: value.Open,
    close: value.Close,
  }));  
  return cleaned;
}

function convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any 
  // intermediate tensors.
  
  return tf.tidy(() => {
    // Step 1. Shuffle the data    
    tf.util.shuffle(data);

    // Step 2. Convert data to Tensor
    const inputs = data.map(d => d.open)
    const labels = data.map(d => d.close);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();  
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    }
  });  
}

async function trainModel(model, inputs, labels) {
  // Prepare the model for training.  
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse'],
  });
  
  const batchSize = 40;
  const epochs = 80;
  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
  });
}

function testModel(model, inputData, normalizationData) {
  const {inputMax, inputMin, labelMin, labelMax} = normalizationData;  
  
  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling 
  // that we did earlier.
  const [xs, preds] = tf.tidy(() => {
    
    const xs = tf.linspace(0, 1, 100);    
    const preds = model.predict(xs.reshape([100, 1]));      
    
    const unNormXs = xs
      .mul(inputMax.sub(inputMin))
      .add(inputMin);
      
    const unNormPreds = preds
      .mul(labelMax.sub(labelMin))
      .add(labelMin);
    
    // Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });
  
 
  const predictedPoints = Array.from(xs).map((val, i) => {
    return {x: val, y: preds[i]}
  });
  
  const originalPoints = inputData.map(d => ({
    x: d.open, y: d.close,
  }));
  // habría que enviar a cliente para que lo pinten -> originalPoints, predictedPoints
}

function almacenaVariables(model, normalizationData) {
  const {inputMax, inputMin, labelMin, labelMax} = normalizationData;  
  
  const [xs, preds] = tf.tidy(() => {
    
    const xs = tf.linspace(0, 1, 100);    
    const preds = model.predict(xs.reshape([100, 1]));      
    
    const unNormXs = xs
      .mul(inputMax.sub(inputMin))
      .add(inputMin);
      
    const unNormPreds = preds
      .mul(labelMax.sub(labelMin))
      .add(labelMin);
    
    const pend = inputMax.sub(inputMin).div(labelMax.sub(labelMin));
    const nplus = labelMax.sub(inputMax.sub(pend));
    console.log("Pendiente y nplus");
    var pendiente_recta = pend.toInt();
    var nplus_valor = nplus.toInt();
    console.log(pendiente_recta);
    console.log(nplus_valor);
    console.log("Pendiente y nplus imprimiendo");
    pend.print();
    nplus.print();
    return [pendiente_recta,nplus_valor]
  });
}

