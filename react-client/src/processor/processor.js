export class Processor extends AudioWorkletProcessor {
  // params we can pass from AudioNode to this
  static get parameterDescriptors() {
    return [
      {
        name: "freq",
        defaultValue: 261.63
      },
      {
        name: "gain",
        defaultValue: 0.5
      },
      {
        name: "cutoff",
        defaultValue: 20
      },
      {
        name: "decay",
        defaultValue: 0.1
      },
      {
        name: "volume",
        defaultValue: 0.5
      }, 
      {
        name: "amount",
        defaultValue: 0.3
      }
    ];
  }

  constructor() {
    super();
    this.port.onmessage = (event) => { 
      console.log(event.data)
      switch(event.data.type) {
        case "loadWasm":
          this.initWasm(event.data); 
        break;
        case "trigger":
          break
        default:
          return
      }
    }
    this.port.postMessage("init")
  }

  async initWasm(data) {
    const wasmMod = await WebAssembly.compile(data.data);
    this.wasmInstance = await WebAssembly.instantiate(wasmMod);

    this._wasm = this.wasmInstance.instance;
    this._size = 125;
    // this._

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