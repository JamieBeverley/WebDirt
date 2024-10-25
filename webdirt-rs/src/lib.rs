mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, webdirt-rs!");
}

#[wasm_bindgen]
pub fn processCoarse(buffer_ptr: *mut f32, length: usize) {
    let audio_data = unsafe {
        assert!(!buffer_ptr.is_null());
        std::slice::from_raw_parts_mut(buffer_ptr, length)
    };

    // TODO: proper dsp, just make quiet for now
    for sample in audio_data.iter_mut() {
        *sample *= 0.5;
    }
}