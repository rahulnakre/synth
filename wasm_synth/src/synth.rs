pub struct Synth {
  pub freq: f64,
  pub gain: f64,
  pub cutoff: f64,
  pub volume: f64,
  pub decay: f64,
  pub phase: i64,
  pub sample_rate: f64,
  pub wave_phase: i64,
  pub synth_time: i64,
}

impl Synth {
  pub fn new_synth() -> Synth {
    Synth {
      volume: 0.5,
      gain: 0.5,
      decay: 1.0,
      // default to C
      freq: 261.63,
      cutoff: 1000.0,
      phase: 0,
      sample_rate: 44100.0,
      wave_phase: 0,      
      synth_time: -1,
    }
  }

  pub fn process(&mut self, out_ptr: *mut f32, size: usize) {
    let wave_buffer = self.generate_wave_buffer(size);
    // TODO: more filters

    let output_buffer: &mut [f32] 
      = unsafe { std::slice::from_raw_parts_mut(out_ptr, size)};
    
    for i in 0..size {
      output_buffer[i] = wave_buffer[i] as f32;
    }

    self.synth_time = match self.synth_time {
      -1 => -1,
      x if (x as f64) < self.decay * self.sample_rate => x + size as i64,
      _ => -1
    }
  }

  pub fn generate_wave_buffer(&mut self, size: usize) -> [f64; 128] {
    let mut output: [f64; 128] = [0.0; 128];
    for i in 0..size {
      let v = self.sawtooth_wave(self.freq, self.phase);
      output[i] = v;
      self.wave_phase = (self.wave_phase + 1) % (self.sample_rate as i64);
    }
    output
  }

  pub fn sawtooth_wave(&self, freq: f64, phase: i64) -> f64 {
    let val: f64 = (phase as f64) / self.sample_rate; 
    (val * freq) - (val * freq).floor() - 0.5
  }

}