import medicineData            from './medicine.json';
import graduateMedicineData    from './graduate-medicine.json';
import dentistryData           from './dentistry.json';
import veterinaryData          from './veterinary.json';
import nursingData             from './nursing.json';
import midwiferyData           from './midwifery.json';
import pharmacyData            from './pharmacy.json';
import physiotherapyData       from './physiotherapy.json';
import paramedicScienceData    from './paramedic-science.json';
import radiographyData         from './radiography.json';
import occupationalTherapyData from './occupational-therapy.json';
import dieteticsData           from './dietetics.json';

export const COURSES = [
  {
    id: 'medicine',
    label: 'Medicine (MBBS/MBChB)',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Medicine MBBS/MBChB titles — the standard 5-6 year route to become a doctor in the UK',
    rankingScope: 'official',
    data: medicineData,
  },
  {
    id: 'graduateMedicine',
    label: 'Graduate Entry Medicine',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Graduate Entry Medicine titles — accelerated 4-year programmes for graduates with a relevant prior degree',
    rankingScope: 'comparison',
    data: graduateMedicineData,
  },
  {
    id: 'dentistry',
    label: 'Dentistry (BDS)',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Dentistry BDS titles — the route to become a dentist registered with the General Dental Council',
    rankingScope: 'official',
    data: dentistryData,
  },
  {
    id: 'veterinary',
    label: 'Veterinary Medicine',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Veterinary Medicine BVMS/BVSc titles — RCVS-accredited degrees leading to vet registration',
    rankingScope: 'official',
    data: veterinaryData,
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy (MPharm)',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Pharmacy MPharm titles — GPhC-accredited 4-year programmes leading to pharmacist registration',
    rankingScope: 'official',
    data: pharmacyData,
  },
  {
    id: 'nursing',
    label: 'Nursing',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Nursing BSc titles — NMC-approved programmes (Adult, Child, Mental Health and Learning Disabilities pathways)',
    rankingScope: 'official',
    data: nursingData,
  },
  {
    id: 'midwifery',
    label: 'Midwifery',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Midwifery BSc titles — NMC-approved programmes leading to midwife registration',
    rankingScope: 'comparison',
    data: midwiferyData,
  },
  {
    id: 'physiotherapy',
    label: 'Physiotherapy',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Physiotherapy BSc titles — CSP/HCPC accredited programmes',
    rankingScope: 'comparison',
    data: physiotherapyData,
  },
  {
    id: 'paramedicScience',
    label: 'Paramedic Science',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Paramedic Science BSc titles — HCPC-approved programmes with ambulance service placements',
    rankingScope: 'comparison',
    data: paramedicScienceData,
  },
  {
    id: 'radiography',
    label: 'Radiography',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Diagnostic and Therapeutic Radiography BSc titles — HCPC/SoR accredited',
    rankingScope: 'comparison',
    data: radiographyData,
  },
  {
    id: 'occupationalTherapy',
    label: 'Occupational Therapy',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Occupational Therapy BSc titles — HCPC/RCOT accredited programmes',
    rankingScope: 'comparison',
    data: occupationalTherapyData,
  },
  {
    id: 'dietetics',
    label: 'Nutrition & Dietetics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Dietetics BSc titles — HCPC/BDA accredited programmes leading to registered dietitian status',
    rankingScope: 'comparison',
    data: dieteticsData,
  },
];
