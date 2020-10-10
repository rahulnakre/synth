pub struct Synth {
  pub frequency: f64,
  pub gain: f64,
  pub cutoff: f64,
  pub volume: f64
  pub phase: i64
}

impl Synth {
  pub fn newSynth() -> Synth {
    Synth {
      volume: 0.5,
      gain: 0.5,
      // default to C
      frequency: 261.63,
      cutoff: 1000.0
      phase: 0
    }
  }
}