#!/usr/bin/env python3
"""
Script to add/update IB Grades to all university course JSON files.
Calculates IB points from A-level grades.
"""

import json
import os
import re
from pathlib import Path

# IB points per A-level grade
IB_POINTS = {
    'A*': 7,
    'A': 6,
    'B': 5,
    'C': 4,
    'D': 3,
    'E': 2,
}

def calculate_ib_grades(entry_grades: str) -> str:
    """
    Calculate IB grades from A-level entry grades.

    Examples:
    - "A*A*A" -> "7-7-7 (21/21)"
    - "A*AA" -> "7-6-6 (19/21)"
    - "AAA" -> "6-6-6 (18/21)"
    - "AAB" -> "6-6-5 (17/21)"
    - "ABB" -> "6-5-5 (16/21)"
    """
    if not entry_grades or entry_grades.strip() == '':
        return None

    # Extract individual grades (A*, A, B, C, D, E)
    # Handle both "A*AA" and "A* A A" formats
    grades = re.findall(r'A\*|A|B|C|D|E', entry_grades)

    if not grades or len(grades) < 3:
        return None

    # Take only first 3 grades (standard A-level entry requirements)
    grades = grades[:3]

    # Convert to IB points
    ib_scores = [IB_POINTS.get(grade, 0) for grade in grades]

    # Calculate total
    total = sum(ib_scores)

    # Format as "7-6-6 (19/21)"
    scores_str = '-'.join(str(score) for score in ib_scores)
    return f"{scores_str} ({total}/21)"


def add_ib_grades_to_file(file_path: str) -> tuple[bool, str]:
    """
    Add or update ibGrades field in each university entry in a JSON file.
    Returns (success, message)
    """
    try:
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)

        if not isinstance(data, list):
            return False, f"File is not a list"

        modified_count = 0
        skipped_count = 0

        for entry in data:
            if not isinstance(entry, dict):
                continue

            # Check if we should update ibGrades
            entry_grades = entry.get('entryGrades', '')

            if entry_grades:
                ib_grades = calculate_ib_grades(entry_grades)

                if ib_grades:
                    # Check if ibGrades already exists
                    if 'ibGrades' in entry:
                        skipped_count += 1
                    else:
                        # Add ibGrades after entryGrades
                        new_entry = {}
                        for key, value in entry.items():
                            new_entry[key] = value
                            if key == 'entryGrades':
                                new_entry['ibGrades'] = ib_grades

                        entry.update(new_entry)
                        modified_count += 1

        # Write back to file (with utf-8-sig to handle BOM if present)
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

        return True, f"Added ibGrades to {modified_count} entries (skipped {skipped_count} already present)"

    except json.JSONDecodeError as e:
        return False, f"JSON error: {e}"
    except Exception as e:
        return False, f"Error: {e}"


def process_directory(directory: str, pattern: str = "*.json") -> None:
    """
    Process all JSON files in a directory.
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
        success, message = add_ib_grades_to_file(str(json_file))
        status = "[OK]" if success else "[FAIL]"
        relative_path = json_file.relative_to(data_dir.parent.parent)
        print(f"{status} {relative_path}: {message}")


def main():
    """Main entry point."""
    base_path = Path(__file__).parent / "src" / "data"

    print("\n" + "="*70)
    print("IB Grades Addition Script")
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
