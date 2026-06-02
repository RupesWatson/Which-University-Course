#!/usr/bin/env python3
"""
Script to add UCAS Points to all university course JSON files.
Calculates UCAS tariff points from A-level grades.
"""

import json
import os
import re
from pathlib import Path

# UCAS tariff points per A-level grade
UCAS_POINTS = {
    'A*': 56,
    'A': 48,
    'B': 40,
    'C': 32,
    'D': 24,
    'E': 16,
}

def calculate_ucas_points(entry_grades: str) -> str:
    """
    Calculate total UCAS points from A-level entry grades.

    Examples:
    - "A*A*A" -> 168
    - "A*AA" -> 152
    - "AAA" -> 144
    - "AAB" -> 136
    - "ABB" -> 128
    """
    if not entry_grades or entry_grades.strip() == '':
        return None

    # Extract individual grades (A*, A, B, C, D, E)
    # Handle both "A*AA" and "A* A A" formats
    grades = re.findall(r'A\*|A|B|C|D|E', entry_grades)

    if not grades:
        return None

    # Calculate total points
    total = sum(UCAS_POINTS.get(grade, 0) for grade in grades)

    return str(total) if total > 0 else None


def add_ucas_points_to_file(file_path: str) -> tuple[bool, str]:
    """
    Add ucasPoints field to each university entry in a JSON file.
    Returns (success, message)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if not isinstance(data, list):
            return False, f"File is not a list"

        modified_count = 0
        skipped_count = 0

        for entry in data:
            if not isinstance(entry, dict):
                continue

            # Skip if ucasPoints already exists
            if 'ucasPoints' in entry:
                skipped_count += 1
                continue

            # Calculate UCAS points from entryGrades
            entry_grades = entry.get('entryGrades', '')
            if entry_grades:
                ucas_points = calculate_ucas_points(entry_grades)
                if ucas_points:
                    # Insert ucasPoints right after ibGrades or after entryGrades
                    # We'll do this by reconstructing the dict in insertion order
                    new_entry = {}
                    for key, value in entry.items():
                        new_entry[key] = value
                        if key == 'ibGrades' or (key == 'entryGrades' and 'ibGrades' not in entry):
                            new_entry['ucasPoints'] = ucas_points

                    # If ucasPoints wasn't inserted yet (no ibGrades), add it after typicalOffer
                    if 'ucasPoints' not in new_entry:
                        temp = {}
                        for key, value in new_entry.items():
                            temp[key] = value
                            if key == 'typicalOffer':
                                temp['ucasPoints'] = ucas_points
                        new_entry = temp

                    entry.update(new_entry)
                    modified_count += 1

        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

        return True, f"Added ucasPoints to {modified_count} entries (skipped {skipped_count} already present)"

    except json.JSONDecodeError as e:
        return False, f"JSON error: {e}"
    except Exception as e:
        return False, f"Error: {e}"


def process_directory(directory: str, pattern: str = "*.json") -> None:
    """
    Process all JSON files in a directory and subdirectories.
    """
    data_dir = Path(directory)
    if not data_dir.exists():
        print(f"[ERROR] Directory not found: {directory}")
        return

    json_files = list(data_dir.glob(pattern))

    if not json_files:
        print(f"[WARNING] No JSON files found in {directory}")
        return

    print(f"\n[INFO] Processing {len(json_files)} files in {directory}")
    print("=" * 70)

    for json_file in sorted(json_files):
        success, message = add_ucas_points_to_file(str(json_file))
        status = "[OK]" if success else "[FAIL]"
        relative_path = json_file.relative_to(data_dir.parent.parent)
        print(f"{status} {relative_path}: {message}")


def main():
    """Main entry point."""
    base_path = Path(__file__).parent / "src" / "data"

    print("\n" + "="*70)
    print("UCAS Points Addition Script")
    print("="*70)

    strands = ["biochemistry", "finance", "physics", "maths", "engineering"]

    for strand in strands:
        strand_path = base_path / strand
        if strand_path.exists():
            process_directory(str(strand_path), "*.json")
        else:
            print(f"\n[WARNING] Strand directory not found: {strand_path}")

    print("\n" + "="*70)
    print("Script completed successfully!")
    print("="*70 + "\n")


if __name__ == "__main__":
    main()
