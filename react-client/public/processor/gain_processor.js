class GainProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
      return [{
          name: "gain",
          defaultValue: 0.5,
      }];
  }

  process(inputs, outputs, parameters) {
      const input = inputs[0];
      const output = outputs[0];

      // Each input or output may have multiple channels. Get the first channel.
      // const inputChannel0 = input[0];
      // const outputChannel0 = output[0];
      
      // |myParamVals| is a Float32Array of either 1 or 128 audio samples
      // calculated by WebAudio engine from regular AudioParam operations.
      // (automation methods, setter) Without any AudioParam change, this array
      // would be a single value of 0.5.
      const gain = parameters.gain;
      
      for (let channel = 0; channel < input.length; ++channel) {
          const inputChannel = input[channel];
          const outputChannel = output[channel]
          if (gain.length == 1) {
              // |myParam| has been a constant value for the current render quantum,
              // which can be accessed by |myParamVals[0]|.
  
              // implement gain
              for (let i = 0; i < inputChannel.length; ++i) {
                  outputChannel[i] = inputChannel[channel] * gain;
              }
  
          } else {
              // |gain| has been changed and |myParam| has 128 values.
              for (let i = 0; i < inputChannel.length; ++i) {
                  outputChannel[i] = inputChannel[i] * gain;
              }
          }
      }

     

      // To keep this processor alive.
      return true;
  }
}

registerProcessor("gain_processor", GainProcessor);