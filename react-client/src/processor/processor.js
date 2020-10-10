export class Processor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage = (event) => { 
      console.log(event.data)
    }

    this.port.postMessage("init")
  }

  process(inputs, outputs, parameters) {
    // by default, node has a single input and output
    const input = inputs[0];
    const output = outputs[0];

    for (let channel = 0; channel < output.length; ++channel) {
      output[channel].set(input[channel]);
    }

    return true;
  }
}

registerProcessor("processor", Processor);