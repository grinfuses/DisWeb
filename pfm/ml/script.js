
/**
 * Get the car data reduced to just the variables we are interested
 * and cleaned of missing data.
 */
async function getData() {
    const carsDataReq = await fetch('https://cors-anywhere.herokuapp.com/http://ec2-35-180-234-37.eu-west-3.compute.amazonaws.com/repo_data/btc-eur.json');  
    const carsData = await carsDataReq.json();  
    const cleaned = carsData.map(value => ({
      open: value.Open,
      close: value.Close,
    }));  
    return cleaned;
  }
  async function run() {
    // Load and plot the original input data that we are going to train on.
    const data = await getData();
    const values = data.map(d => ({
      x: d.open,
      y: d.close,
    }));
  
    // tfvis.render.scatterplot(
    //   {name: 'Open and Close'},
    //   {values}, 
    //   {
    //     xLabel: 'Open',
    //     yLabel: 'Close',
    //     height: 300
    //   }
    // );
  
    // More code will be added below
  // Create the model
  const model = createModel();  
  //tfvis.show.modelSummary({name: 'Model Summary'}, model);
  // Convert the data to a form we can use for training.
  const tensorData = convertToTensor(data);
  const {inputs, labels} = tensorData;
      
  // Train the model  
  await trainModel(model, inputs, labels);
  console.log('Done Training');
  testModel(model, data, tensorData);
  }
  
  //document.addEventListener('DOMContentLoaded', run);
  function createModel() {
    // Create a sequential model
    const model = tf.sequential(); 
    
    // Add a single input layer
    model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
  model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
    
    // Add an output layer
    model.add(tf.layers.dense({units: 1, useBias: true}));
  
    return model;
  }
  /**
   * Convert the input data to tensors that we can use for machine 
   * learning. We will also do the important best practices of _shuffling_
   * the data and _normalizing_ the data
   * MPG on the y-axis.
   */
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
    //const batchSize = 32;
    const epochs = 80;
    /**callbacks: tfvis.show.fitCallbacks(
        { name: 'Training Performance' },
        ['loss', 'mse'], 
        { height: 200, callbacks: ['onEpochEnd'] }
      ) */
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
    
    
    tfvis.render.scatterplot(
      {name: 'Model Predictions vs Original Data'}, 
      {values: [originalPoints, predictedPoints], series: ['original', 'predicted']}, 
      {
        xLabel: 'Open',
        yLabel: 'Close',
        height: 300
      }
    );
  }
  function predictModel(model, value, normalizationData) {
    const {inputMax, inputMin, labelMin, labelMax} = normalizationData;  
    // console.log("Datos maximo");
    // console.log(labelMax.print());
    // console.log(inputMax.print());
    // console.log("Datos maximo");
    // console.log(labelMin.print());
    // console.log(inputMin.print());

    // Generate predictions for a uniform range of numbers between 0 and 1;
    // We un-normalize the data by doing the inverse of the min-max scaling 
    // that we did earlier.
    const [xs, preds] = tf.tidy(() => {
      // console.log("valor inicial")
      // console.log(value);
      //const xs = tf.linspace(value, value, 1);  
      const xs = tf.linspace(value, value, 1);  
      //console.log("tensor inicial")  
      const preds = model.predict(xs);      
      // console.log("preds inicial")
      // console.log(preds.print());

      const unNormXs = xs
        .mul(inputMax.sub(inputMin))
        .add(inputMin);
        // console.log("unNormXs")  
        // console.log(unNormXs.print());
      const pend = inputMax.sub(inputMin).div(labelMax.sub(labelMin));
      const nplus = labelMax.sub(inputMax.sub(pend));
      const valor_inicial = tf.scalar(value);
      // console.log("pendiente y valor n")  
      // console.log(pend.print());
      // console.log(nplus.print());
      const estimacion = pend.mul(xs).add(nplus);
      //console.log(estimacion.print());
      const valor_escribir = estimacion.toInt();
      console.log("valor a escribir:" +valor_escribir)
      document.getElementById("estimacion").innerHTML=valor_escribir;
      //alert(estimacion.print());
      const unNormPreds = preds
        .mul(labelMax.sub(labelMin))
        .add(labelMin);
        // console.log("unNormPreds")  
        // console.log(unNormPreds.print());

      // Un-normalize the data
      return [unNormXs.dataSync(), unNormPreds.dataSync()];
    });
    // console.log("predicciones dentro de la funcion")
    // console.log(preds);
    // console.log("xs dentro de la funcion")
    // console.log(xs);

    return preds;
  }
  
  async function prediceValor(value) {
    console.log("entrando en predice Valor");
    console.log(value);
    //const preds = model.predict(xs.reshape([100, 1]));
    const data = await getData();
    const model = createModel();  
    console.log("Modelo creado");
    // Convert the data to a form we can use for training.
    const tensorData = convertToTensor(data);
    const {inputs, labels} = tensorData;
        
    // Train the model  
    await trainModel(model, inputs, labels);
    console.log("Entrenamiento realizado");
    testModel(model, data, tensorData);  
    //const xs = tf.linspace(value, value, 1);   
    //const predicciones = model.predict(xs.reshape([1, 1]));    
    ///No cuadra las predicciones  
    predictModel(model, value, tensorData);  
  }