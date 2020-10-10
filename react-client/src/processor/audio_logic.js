const audioCtx = new AudioContext()
let node;

if (audioCtx.audioWorklet === undefined) { 
  console.log("audio worklet is not supported");
}



export const startAudioModule = async (audioCtx) => {
  await audioCtx.audioWorklet.addModule("processor.js");

  node = new AudioWorkletNode(audioCtx, "processor")

  var res = await fetch("../../wasm_build/wasm_synth_bg.wasm")
  
  // send over our wasm
  await node.port.postMessage(res.arrayBuffer());
  // signal to load
  await node.postMessage({ type: "loadWasm", data: res });

}

export const add = (x, y) => {
  return x + y;
}

export const onKeyPress = (key) => {
  node.port.postMessage({ type: "trigger" })
}