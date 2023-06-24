//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;
mod data;
use ttap_wasm::find_timetable;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn pass() {
    use crate::data::test_data_1;
    let slots = serde_json::from_str(test_data_1().as_str()).unwrap();
    let timetables = find_timetable(slots, false);
    assert_eq!(timetables.len(), 616872)
}
