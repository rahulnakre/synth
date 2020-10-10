const ctx = new AudioContext()
let node;

// if (audioCtx.audioWorklet === undefined) { 
//   console.log("audio worklet is not supported");
// }

export const startAudioModule = async (audioCtx) => {
  console.log("audioCtx: " + audioCtx);

  await audioCtx.audioWorklet.addModule("processor/processor.js");


  node = new AudioWorkletNode(audioCtx, "processor");

  var res = await fetch("../../wasm_build/wasm_synth_bg.wasm") 
  const wasmArrbuf = await res.arrayBuffer();

  // send over our wasm
  await node.port.postMessage({ type: "loadWasm", data: wasmArrbuf });

}

export const add = (x, y) => {
  return x + y;
}

export const onKeyPress = (key) => {
  node.port.postMessage({ type: "trigger" })
}