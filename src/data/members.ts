/**
 * AESI member directory
 * Extracted from the WordPress /anggota/ page Elementor data (id 836)
 * Categories reflect the original groupings, with one deduplication pass.
 */

export type MemberCategory = {
  id: string;
  label: string;
  members: Member[];
};

export type Member = {
  name: string;
  logo: string; // relative to /uploads/members/
};

export const memberCategories: MemberCategory[] = [
  {
    id: 'developer',
    label: 'Developer',
    members: [
      { name: 'Total', logo: 'developer/total.png' },
      { name: 'Adaro', logo: 'developer/adaro.png' },
      { name: 'AGRA', logo: 'developer/agra.png' },
      { name: 'Akua', logo: 'developer/akua.png' },
      { name: 'Alam Energy', logo: 'developer/alam-energy.png' },
      { name: 'Altiora', logo: 'developer/altiora.png' },
      { name: 'Arkhadaya', logo: 'developer/arkhadaya.png' },
      { name: 'Atap Surya', logo: 'developer/atap-surya.png' },
      { name: 'ATW Solar', logo: 'developer/atwsolar.png' },
      { name: 'Becis', logo: 'developer/Becis.png' },
      { name: 'BelSolar', logo: 'developer/belsolar.png' },
      { name: 'Bumi Raya', logo: 'developer/bumiraya.png' },
      { name: 'BUMI Resources', logo: 'developer/PT-Dago-Engineering.png' },
      { name: 'CDE', logo: 'developer/cde-1.png' },
      { name: 'Cleantech', logo: 'developer/cleantech.png' },
      { name: 'CPI', logo: 'developer/CPI.png' },
      { name: 'Daya Mas', logo: 'developer/daya-mas.png' },
      { name: 'Emerging', logo: 'developer/emerging.png' },
      { name: 'Emits', logo: 'developer/emits.png' },
      { name: 'Energy Lima Pilar', logo: 'developer/Energy-lima-pilar.png' },
      { name: 'EPC Alfa Service', logo: 'developer/EPC-Alfa-Service.png' },
      { name: 'Etrama', logo: 'developer/etrama.png' },
      { name: 'Green Roof', logo: 'developer/green-roof.png' },
      { name: 'Helio', logo: 'developer/helio.png' },
      { name: 'Hijau', logo: 'developer/hijau.png' },
      { name: 'Hokuriku', logo: 'developer/hokuriku.png' },
      { name: 'iforte', logo: 'developer/iforte.png' },
      { name: 'Ineco Solar', logo: 'developer/Ineco-solar-Developer.png' },
      { name: 'Inergia', logo: 'developer/inergia.png' },
      { name: 'Inerman', logo: 'developer/inerman.png' },
      { name: 'KCE', logo: 'developer/KCE.png' },
      { name: 'Kencana', logo: 'developer/kencana.png' },
      { name: 'Kencana Power', logo: 'developer/kencana-power.png' },
      { name: 'Leinpower', logo: 'developer/leinpower.png' },
      { name: 'MCC', logo: 'developer/mcc.png' },
      { name: 'Medco', logo: 'developer/medco.png' },
      { name: 'Modena', logo: 'developer/modena.png' },
      { name: 'Neira', logo: 'developer/Neira.png' },
      { name: 'Powerbrain', logo: 'developer/powerbrain.png' },
      { name: 'Prodigy', logo: 'developer/prodigy.png' },
      { name: 'PT ACEN', logo: 'developer/PT-ACEN.png' },
      { name: 'PT Sinergi Era Cemerlang', logo: 'developer/PT-Sinergi-Era-Cemerlang.png' },
      { name: 'SEI', logo: 'developer/SEI.png' },
      { name: 'Sembcorp', logo: 'developer/sembcorp.png' },
      { name: 'Sesna', logo: 'developer/sesna.png' },
      { name: 'SHAM', logo: 'developer/Sham.png' },
      { name: 'Sinar Mas', logo: 'developer/smssolar.png' },
      { name: 'Solar Jaya', logo: 'developer/solar-jaya.png' },
      { name: 'Solar Radiance', logo: 'developer/solar-radiance-2.png' },
      { name: 'Solarion', logo: 'developer/solarion.png' },
      { name: 'Solarvest', logo: 'developer/solarvest.png' },
      { name: 'Summit Niaga', logo: 'developer/summit-niaga.png' },
      { name: 'SunEnergy', logo: 'developer/sunenergy.png' },
      { name: 'Sunterra', logo: 'developer/sunterra.png' },
      { name: 'Suryanesia', logo: 'developer/suryanesia.png' },
      { name: 'WDS', logo: 'developer/wds.png' },
      { name: 'WPD', logo: 'developer/wpd.png' },
      { name: 'Xurya Daya', logo: 'developer/Xurya-Daya.png' },
    ],
  },
  {
    id: 'epc',
    label: 'EPC',
    members: [
      { name: 'Aneka Jaringan Energy', logo: 'epc/PT-Aneka-Jaringan-Energy.png' },
      { name: 'Arkhadaya', logo: 'epc/arkhadaya.png' },
      { name: 'AToenergi', logo: 'epc/atoenergi.png' },
      { name: 'ATW Solar', logo: 'epc/atwsolar.png' },
      { name: 'BelSolar', logo: 'epc/belsolar.png' },
      { name: 'BTI', logo: 'epc/bti-1.png' },
      { name: 'Bumi Raya', logo: 'epc/bumiraya.png' },
      { name: 'CDE', logo: 'epc/cde-1.png' },
      { name: 'Dago Engineering', logo: 'epc/PT-Dago-Engineering.png' },
      { name: 'Energy Service', logo: 'epc/energyservice.png' },
      { name: 'EnergiHub', logo: 'epc/energihub.png' },
      { name: 'Eternal', logo: 'epc/eternal.png' },
      { name: 'Etrama', logo: 'epc/etrama.png' },
      { name: 'HME', logo: 'epc/hme.png' },
      { name: 'Icon Green', logo: 'epc/icongreen.png' },
      { name: 'Indo Matra', logo: 'epc/indo-matra.png' },
      { name: 'Integral Energy', logo: 'epc/integral-energy.png' },
      { name: 'Kencana Power', logo: 'epc/kencana-power.png' },
      { name: 'Leinpower', logo: 'epc/leinpower.png' },
      { name: 'Neira', logo: 'epc/Neira.png' },
      { name: 'Powerbrain', logo: 'epc/powerbrain.png' },
      { name: 'Prasetia', logo: 'epc/prasetia.png' },
      { name: 'Pratiwi', logo: 'epc/pratiwi.png' },
      { name: 'Prima Khatulistiwa', logo: 'epc/Prima-Khatulistiwa-EPC.png' },
      { name: 'Quintsolar', logo: 'epc/quintsolar.png' },
      { name: 'RMS', logo: 'epc/rms.png' },
      { name: 'Satta', logo: 'epc/satta.png' },
      { name: 'SEI', logo: 'epc/SEI.png' },
      { name: 'SHAM', logo: 'epc/Sham.png' },
      { name: 'Solar Nusantara', logo: 'epc/solarnusantara.png' },
      { name: 'Solar Jaya', logo: 'epc/solar-jaya.png' },
      { name: 'Supraco', logo: 'epc/supraco.png' },
      { name: 'Suryanesia', logo: 'epc/suryanesia.png' },
      { name: 'TML', logo: 'epc/tml-1.png' },
      { name: 'Utomo Solar+UV', logo: 'epc/utomo-solaruv.png' },
      { name: 'Volt', logo: 'epc/volt.png' },
      { name: 'WDS', logo: 'epc/wds.png' },
      { name: 'Wiraky', logo: 'epc/wiraky.png' },
    ],
  },
  {
    id: 'supplier',
    label: 'Supplier',
    members: [
      { name: 'Agros', logo: 'supplier/Agros-Supplier.png' },
      { name: 'AGC', logo: 'supplier/agc.png' },
      { name: 'Bressen Technology', logo: 'supplier/PT-Bressen-Technology-Indonesia.png' },
      { name: 'CHINT', logo: 'supplier/chint.png' },
      { name: 'DEO Energy', logo: 'supplier/Supplier-DEO-Energy.png' },
      { name: 'DJE', logo: 'supplier/dje.png' },
      { name: 'Gading Suria', logo: 'supplier/Supplier-Gading-Suria.png' },
      { name: 'Hioki', logo: 'supplier/Supplier-Hioki.png' },
      { name: 'Indonesia Solar Global', logo: 'supplier/PT-Indonesia-Solar-Global.png' },
      { name: 'JJ-Lapp', logo: 'supplier/jjlap.png' },
      { name: 'JA Solar', logo: 'supplier/jasolar.png' },
      { name: 'Jinko Solar', logo: 'supplier/jinko.png' },
      { name: 'MH', logo: 'supplier/MH.png' },
      { name: 'Multi Kabel', logo: 'supplier/multi-kabel.png' },
      { name: 'PLP', logo: 'supplier/plp.png' },
      { name: 'Pylar Surya Indonesia', logo: 'supplier/PT-Pylar-Surya-Indonesia.png' },
      { name: 'Solarmart', logo: 'supplier/solarmart.png' },
      { name: 'TMAI', logo: 'supplier/tmai.png' },
      { name: 'Trina Solar', logo: 'supplier/trina.png' },
    ],
  },
  {
    id: 'instalasi',
    label: 'Instalasi PLTS',
    members: [
      { name: 'Greenfarm Energy Indonesia', logo: 'instalasi/PT-Greenfarm-Energy-Indonesia.png' },
    ],
  },
  {
    id: 'konsultan',
    label: 'Konsultan',
    members: [
      { name: 'PwC', logo: 'konsultan/pwc.png' },
      { name: 'Synkrona', logo: 'konsultan/synkrona.png' },
      { name: 'BMT', logo: 'konsultan/bmt.png' },
    ],
  },
  {
    id: 'lit',
    label: 'Lembaga Inspeksi Teknik',
    members: [
      { name: 'Serlindo Prima Energi', logo: 'lit/PT-Serlindo-Prima-Energi.png' },
      { name: 'Andalan Mutu Energi', logo: 'lit/PT-Andalan-Mutu-Energi.png' },
      { name: 'Cipta Mutu Optima', logo: 'lit/LIT-PT-Cipta-Mutu-Optima.png' },
      { name: 'Pradana Nusa', logo: 'lit/LIT-Pradana-Nusa.png' },
    ],
  },
  {
    id: 'lskk',
    label: 'Lembaga Sertifikasi Kompetensi Ketenagalistrikan',
    members: [
      { name: 'IATKI', logo: 'lskk/iatki.png' },
    ],
  },
  {
    id: 'perdagangan',
    label: 'Perdagangan Komoditi',
    members: [
      { name: 'ICDX', logo: 'perdagangan/icdx.png' },
    ],
  },
  {
    id: 'praktisi',
    label: 'Praktisi',
    members: [
      { name: 'MEA', logo: 'praktisi/mea.png' },
    ],
  },
  {
    id: 'distributor',
    label: 'Distributor',
    members: [
      { name: 'Rekasurya Prima Daya', logo: 'distributor/PT-Rekasurya-Prima-Daya.png' },
      { name: 'Muchun Solar Energy Indonesia', logo: 'distributor/Distributor-Muchun-solar-energy-Indonesia.png' },
      { name: 'Distritama', logo: 'distributor/Distritama.png' },
    ],
  },
  {
    id: 'bess',
    label: 'BESS',
    members: [
      { name: 'Tianneng', logo: 'bess/Tianneng-BESS.png' },
    ],
  },
  {
    id: 'otomasi',
    label: 'Otomasi dan Tenaga Listrik',
    members: [
      { name: 'Syntex', logo: 'otomasi/syntex.png' },
      { name: 'Ampotech Automation', logo: 'otomasi/Ampotech-Automation.png' },
    ],
  },
  {
    id: 'keuangan',
    label: 'Lembaga Keuangan',
    members: [
      { name: 'Mitsubishi HC Capital', logo: 'keuangan/L-Keuangan-Mitsubishi-HC-and-Finance.png' },
      { name: 'MSIG Insurance', logo: 'keuangan/Asuransi-MSIG-1.png' },
    ],
  },
];

export const totalMembers = memberCategories.reduce((sum, c) => sum + c.members.length, 0);
