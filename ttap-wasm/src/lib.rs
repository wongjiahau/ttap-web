mod utils;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

use wasm_bindgen::JsObject;

use itertools::Itertools;

use crate::utils::set_panic_hook;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

type SlotId = usize;

struct Snapshot {
    slot_ids: Vec<SlotId>,
    day_time_matrix: DayTimeMatrix,
}

/// This is called "Partial" because after the result still has to be processed by calling the
/// "newTnewTimetable"  function in JavaScript.
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PartialTimetable {
    slot_ids: Vec<SlotId>,
    uncompressed_day_time_matrix: DayTimeMatrix,
}

#[wasm_bindgen]
pub fn find_timetable_json(json_optimized_slots: String, disable_clash_checking: bool) -> String {
    // set_panic_hook();
    match serde_json::from_str(json_optimized_slots.as_str()) {
        Ok(input) => serde_json::to_string(&find_timetable(input, disable_clash_checking)).unwrap(),
        Err(err) => {
            format!("{:#?}", err)
        }
    }
}

const LIMIT: usize = 10000000;

/// This code is translated from TypeScript, see "../../src/ts/permutator/findTimetable.ts".
///
/// Assumptions:
/// - the length of each day_time_matrix of every slot should be the same
pub fn find_timetable(
    input: Vec<OptimizedSlot>,
    disable_clash_checking: bool,
) -> Vec<PartialTimetable> {
    if input.is_empty() {
        return vec![];
    }
    if input.len() == 1 {
        return vec![PartialTimetable {
            slot_ids: input[0].slot_ids.clone(),
            uncompressed_day_time_matrix: input[0].day_time_matrix.clone(),
        }];
    }

    let mut result: Vec<PartialTimetable> = vec![];

    let mut snapshots: Vec<Snapshot> = vec![Snapshot {
        slot_ids: vec![],
        day_time_matrix: vec![0; input[0].day_time_matrix.len()],
    }];
    let partitioned = {
        let mut partitioned = input
            .into_iter()
            .group_by(|slot| slot.partition_key)
            .into_iter()
            .map(|(_, slots)| slots.collect::<Vec<OptimizedSlot>>())
            .collect::<Vec<Vec<OptimizedSlot>>>();
        partitioned.sort_by_key(|a| a.len());
        partitioned
    };

    let mut indices = generate_indices(&partitioned);
    let length = indices.len();
    let last = length - 1;
    let mut ptr = 0;
    let mut current: &OptimizedSlot;
    let mut prev_snapshot: &Snapshot;
    loop {
        prev_snapshot = &snapshots[ptr];
        current = &partitioned[ptr][indices[ptr].value];

        if disable_clash_checking
            || !got_intersection(&current.day_time_matrix, &prev_snapshot.day_time_matrix)
        {
            snapshots.push(Snapshot {
                slot_ids: {
                    let mut result = current.slot_ids.clone();
                    result.extend(prev_snapshot.slot_ids.clone());
                    result
                },
                day_time_matrix: append_matrix(
                    &current.day_time_matrix,
                    &prev_snapshot.day_time_matrix,
                ),
            });
            if ptr == last {
                result.push(PartialTimetable {
                    slot_ids: snapshots[ptr + 1].slot_ids.clone(),
                    uncompressed_day_time_matrix: snapshots[ptr + 1].day_time_matrix.clone(),
                });
                if result.len() > LIMIT {
                    // if too many results, just return the result
                    return result;
                }
                snapshots.pop();
                loop {
                    indices[ptr].value += 1;
                    if indices[ptr].value <= indices[ptr].upper_limit {
                        break;
                    } else {
                        indices[ptr].value = 0;
                        snapshots.pop();
                        if ptr == 0 {
                            return result;
                        }
                        ptr -= 1;
                    }
                }
            } else {
                ptr += 1;
            }
        } else {
            loop {
                indices[ptr].value += 1;
                if indices[ptr].value <= indices[ptr].upper_limit {
                    break;
                } else {
                    indices[ptr].value = 0;
                    snapshots.pop();
                    if ptr == 0 {
                        return result;
                    }
                    ptr -= 1;
                }
            }
        }
    }
}

/// Look at the code and test about bigSlot in TypeScript to understand more about DayTimeMatrix
type DayTimeMatrix = Vec<u32>;

#[inline]
fn append_matrix(original_matrix: &DayTimeMatrix, new_matrix: &DayTimeMatrix) -> DayTimeMatrix {
    let length = original_matrix.len();
    let mut result = Vec::with_capacity(length);
    for i in 0..(length - 1) {
        result.push(original_matrix[i] | new_matrix[i]);
    }
    result
}

#[inline]
fn got_intersection(matrix1: &DayTimeMatrix, matrix2: &DayTimeMatrix) -> bool {
    let length = matrix1.len();
    for i in 0..length - 1 {
        if (matrix1[i] & matrix2[i]) > 0 {
            return true;
        }
    }
    false
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "PascalCase")]
pub struct OptimizedSlot {
    partition_key: u64,
    day_time_matrix: DayTimeMatrix,
    slot_ids: Vec<SlotId>,
}

struct BoundedInt {
    upper_limit: usize,
    value: usize,
}

fn generate_indices<T>(partitions: &[Vec<T>]) -> Vec<BoundedInt> {
    partitions
        .iter()
        .map(|partition| BoundedInt {
            value: 0,
            upper_limit: partition.len() - 1,
        })
        .collect()
}
