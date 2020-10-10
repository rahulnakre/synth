// The wasm-pack uses wasm-bindgen to build and generate JavaScript binding file.
// Import the wasm-bindgen crate.
use wasm_bindgen::prelude::*;
use std::sync::Mutex;

#[macro_use]
extern crate lazy_static;

mod synth;


#[no_mangle]
pub extern "C" fn alloc(size: usize) -> *mut f32 {
  let mut buf = Vec::<f32>::with_capacity(size);
  // note: this is unsafe
  let ptr = buf.as_mut_ptr();
  // TODO: check that buf is initialized, and use drop instead
  std::mem::forget(buf);
  ptr as *mut f32
}

lazy_static! {
  static ref SYNTH: Mutex<synth::Synth> = Mutex::new(synth::Synth::new_synth());
}

#[no_mangle]
pub extern "C" fn process(out_ptr: *mut f32, size: usize) {
  let mut synth = SYNTH.lock().unwrap();
  synth.process(out_ptr, size);
}

#[no_mangle]
pub extern "C" fn set_freq(freq: f32) {
  let mut synth = SYNTH.lock().unwrap();
  synth.freq = freq as f64;
}

// Create a static mutable byte buffer.
// We will use for passing memory between js and wasm.
// NOTE: global `static mut` means we will have "unsafe" code
// but for passing memory between js and wasm should be fine.
const WASM_MEMORY_BUFFER_SIZE: usize = 2;
static mut WASM_MEMORY_BUFFER: [u8; WASM_MEMORY_BUFFER_SIZE] = [0; WASM_MEMORY_BUFFER_SIZE];

// Function to store the passed value at index 0,
// in our buffer
#[wasm_bindgen]
pub fn store_value_in_wasm_memory_buffer_index_zero(value: u8) {
  unsafe {
    WASM_MEMORY_BUFFER[0] = value;
  }
}

// Function to return a pointer to our buffer
// in wasm memory
#[wasm_bindgen]
pub fn get_wasm_memory_buffer_pointer() -> *const u8 {
  let pointer: *const u8;
  unsafe {
    pointer = WASM_MEMORY_BUFFER.as_ptr();
  }

  return pointer;
}

// test
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}

// Let's define our external function (imported from JS)
// Here, we will define our external `console.log`
#[wasm_bindgen]
extern "C" {
  // Use `js_namespace` here to bind `console.log(..)` instead of just
  // `log(..)`
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

// Export a function that will be called in JavaScript
// but call the "imported" console.log.
#[wasm_bindgen]
pub fn console_log_from_wasm() {
  log("This console.log is from wasm. can use this to debug?");
}