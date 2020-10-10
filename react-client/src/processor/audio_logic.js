const audioCtx = new AudioContext()

if (audioCtx.audioWorklet === undefined) { 
  console.log("audio worklet is not supported");
}

export const startAudioModule = async (audioCtx) => {
  await audioCtx.audioWorklet.addModule("processor.js");

  const node = new AudioWorkletNode(audioCtx, "processor")

  var res = await fetch("../../wasm_build/wasm_synth_bg.wasm")
  
  // send over our wasm
  node.port.postMessage(res.arrayBuffer())

}

export const add = (x, y) => {
  return x + y;
}