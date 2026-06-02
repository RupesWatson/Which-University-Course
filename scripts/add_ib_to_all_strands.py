"""Add IB grade equivalents to all existing strands."""
import json
import os

def aLevel_to_ib(aLevel):
    """Convert A-level grades to approximate IB equivalent."""
    if not aLevel:
        return None

    # Common conversions: A* ≈ 7, A ≈ 6, B ≈ 5
    grade_map = {'A*': '7', 'A': '6', 'B': '5', 'C': '4', 'D': '3'}
    tokens = aLevel.replace('*', '').split()
    ib_grades = []

    for token in tokens:
        # Take first char (A, B, C, etc)
        if token and token[0] in grade_map:
            ib_grades.append(grade_map[token[0]])

    if not ib_grades:
        return None

    # For 3 A-levels: add total
    if len(ib_grades) == 3:
        total = sum(int(g) for g in ib_grades)
        return f"{'-'.join(ib_grades)} ({total}/42)"
    elif len(ib_grades) == 2:
        total = sum(int(g) for g in ib_grades)
        return f"{'-'.join(ib_grades)} ({total}/28)"

    return '-'.join(ib_grades)

def process_strand(strand_name):
    """Add IB grades to all course JSONs in a strand."""
    base_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', strand_name)

    # Find all JSON files except course-details and university-details
    for filename in os.listdir(base_path):
        if not filename.endswith('.json') or filename in ['course-details.json', 'university-details.json', 'universities.json']:
            continue

        filepath = os.path.join(base_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Add ibGrades if not present
        updated = False
        for row in data:
            if 'ibGrades' not in row and row.get('entryGrades'):
                row['ibGrades'] = aLevel_to_ib(row['entryGrades'])
                updated = True

        if updated:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"[+] Updated {strand_name}/{filename}")
        else:
            print(f"[=] {strand_name}/{filename}")

# Process all strands
for strand in ['biochemistry', 'finance', 'physics', 'maths']:
    print(f"\nProcessing {strand}...")
    process_strand(strand)

print("\n[OK] All strands updated with IB grades")
