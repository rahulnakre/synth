// import init from "./wasm_build/wasm_synth.js";
let node;

// if (audioCtx.audioWorklet === undefined) { 
//   console.log("audio worklet is not supported");
// }

export const startAudioModule = async (audioCtx) => {
  console.log("audioCtx: " + audioCtx);

  await audioCtx.audioWorklet.addModule("processor/processor.js");


  node = new AudioWorkletNode(audioCtx, "processor");
  var wasmArrBuf;

  try {
    var res = await fetch("wasm_build/wasm_synth_bg.wasm") 
  } catch (err) {
    console.log(err);
  }

  try {
    wasmArrBuf = await res.arrayBuffer();
  } catch (err) {
    console.log(err);
  }
  
  var d = new TextDecoder().decode(wasmArrBuf);
  
  // send over our wasm
  node.port.postMessage({ type: "loadWasm", data: wasmArrBuf });


  onKeyPress("c")

  return node;
}

export const add = (x, y) => {
  return x + y;
}

export const onKeyPress = (midiNumber) => (
  node?.port?.postMessage({ type: "trigger" })
)