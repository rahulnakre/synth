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
          console.log("trigger in processor");
          console.log(this.wasmInstance)
          this.wasmInstance.exports.trigger();
          break;
        default:
          return;
      }
    }
    this.port.postMessage("init")
  }

  async initWasm(data) {
    console.log(data.data);
    var wasmModule
    try {  
      // module obj containts the STATELESS compiled wasm code
      // can be shared with workers, and instantiated many times
      wasmModule = await WebAssembly.compile(data.data);
    } catch (err) {
      console.log("[initWasm - compile] " + err);
    }

    try {
      const debug = (id, ...args) => console.log(`[${id}]: ${args.join(' ')}`);
      // const importObject = {
      //   env: {
      //     debug1_: debug,
      //     debug2_: debug,
      //     debug3_: debug,
      //     debug4_: debug,
      //   },
      // };

      const importObject = {
        imports: {
          imported_func: function(arg) {
            console.log(arg);
          },
          wasi_unstable: () => {}
        }
      };
      // instance is STATEFUL, executable instance of a wasm module
      this.wasmInstance = await WebAssembly.instantiate(wasmModule, importObject);
    } catch (err) {
      console.log("[initWasm - instantiate] " + err);
    }

    if (this.wasmInstance === undefined) {
      console.log("this.wasmInstance is undefined, leave processor");
      return;
    }
    // try {
    //   this.wasmInstance = await WebAssembly.instantiateStreaming(
    //     fetch("wasm_build/wasm_synth_bg.wasm") 
    //   );
    // } catch (err) {
    //   console.log("[initwasm - instantiateStreaming] " + err);
    // }

    // this._wasm = this.wasmInstance.instance;
    this.size = 128; // frames
    /* exports is a readonly property that returns
      an obj containng an obj with all funcs expeorted from
      the wasm module
    */
    // this.inPtr = this.wasmInstance.exports.alloc(this.size);
    // this.outPtr = this.wasmInstance.exports.alloc(this.size)


    this.float32WasmMem = new Float32Array(
      this.wasmInstance.exports.memory.buffer
    );
    this.inputBuffer = new Float32Array(
      this.wasmInstance.exports.memory.buffer,
      this.inPtr,
      this.size
    );
    this.outputBuffer = new Float32Array(
      this.wasmInstance.exports.memory.buffer,
      this.outPtr,
      this.size
    )


    console.log("result of add: " + this.wasmInstance.exports.add(3,4));
    // console.log(this.inputBuffer);
    // console.log(this.outputBuffer);
    console.log(this.float32WasmMem);
    this.wasmInstance.exports.trigger();
  }


  process(inputs, outputs, parameters) {
    if (!this.wasmInstance) {
      return true;
    }
    console.log("in process");
    // by default, node has a single input and output
    const input = inputs[0];
    const output = outputs[0];
    this.wasmInstance.exports.set_freq(parameters.freq[0])

    for (let channel = 0; channel < output.length; ++channel) {
      this.wasmInstance.exports.process(this.outPtr, this.size);
      output[channel].set(this.outputBuffer);
    }

    return true;
  }
}

registerProcessor("processor", Processor);