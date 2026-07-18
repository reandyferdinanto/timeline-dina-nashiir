"use client";

import React, { useState, useMemo } from 'react';
import { Search, Clock, Users, Calendar, MapPin, Heart, FileText, CheckCircle, Utensils, Coffee, Camera, Package } from 'lucide-react';

// --- Data Preparation ---
const weddingDetails = {
  brideAndGroom: "Dina & Nashiir",
  venue: "Jambur Djawata",
  date: "Sabtu, 25 Juni 2026",
  seserahanTime: "07.00 / 07.30 WIB (Tentative)",
  akadTime: "08.00 WIB",
  resepsiTime: "11.00 - 13.00 WIB",
  organizer: "Big Wedding Organizer"
};

const panitiaData = [
  // Inti & Vendor
  { id: 1, role: "Ketua Panitia, PIC Angpao, & Saksi Nikah CPW", name: "Reandy Ferdinanto", category: "Inti" },
  { id: 2, role: "Koordinator Pelaksana, Dekor, Ent, Dok", name: "BIG WO", category: "Inti" },
  { id: 3, role: "PIC Catering", name: "Mbak Rini, Diah", category: "Keluarga" },
  { id: 4, role: "Vendor Catering", name: "BIG Catering", category: "Vendor" },
  { id: 5, role: "Vendor Dekorasi", name: "Big Decoration", category: "Vendor" },
  { id: 6, role: "Vendor Entertainment", name: "Dream Entertainment", category: "Vendor" },
  { id: 7, role: "Vendor Dokumentasi", name: "BIG Moment", category: "Vendor" },
  
  // PIC & Keluarga
  { id: 32, role: "PIC Buku Tamu & Souvenir", name: "Damara & Haira", category: "PIC", description: "Menjaga & memastikan semua tamu mengisi buku tamu, menulis list kado (jika berupa hadiah barang), dan memastikan souvenir dibagikan dengan sistem tukar voucher." },
  { id: 9, role: "Koordinator Kunci Ruang Rias", name: "Abrar", category: "PIC", relatedEventId: 4, description: "Tugas H-1 (24 Juli 2026): Mengantar souvenir & peralatan pernikahan ke ruang rias, memberikan bukti foto kepada pengantin bahwa barang sudah ditaruh dengan baik & ruangan dikunci. Kunci kemudian dititipkan ke rumah Maulidina untuk persiapan pagi hari." },
  { id: 10, role: "Koord. Keluarga CPP", name: "Neni Balqis", category: "Keluarga" },
  { id: 11, role: "Koord. Keluarga CPW, PIC VIP, & PIC Mahar/Buku Nikah/Hantaran", name: "Muthia", category: "Keluarga" },
  { id: 30, role: "Koord. Keluarga Besar Hardjosuwito", name: "Tanty", category: "Keluarga", relatedEventId: 8 },

  // Panitia Akad Nikah
  { id: 12, role: "Teks Meja Akad, Label Kursi & MC Akad", name: "BIG WO", category: "Akad", relatedEventId: 11 },
  { id: 13, role: "Juru Bicara Akad CPW", name: "Bp. Toni Yuseno", category: "Akad", relatedEventId: 11 },
  { id: 14, role: "Juru Bicara Akad CPP & Sambutan/Do'a Resepsi", name: "Bp. Ust. Hadiri", category: "Akad", relatedEventId: 11 },
  { id: 15, role: "Wali Nikah", name: "Bp. Faizann Raihan Eshan (Adik Kandung)", category: "Akad", relatedEventId: 12 },
  { id: 16, role: "Qori", name: "Lukman Hakim", category: "Akad", relatedEventId: 12 },
  { id: 17, role: "Saritilawah", name: "Putri Daryani", category: "Akad", relatedEventId: 12 },
  { id: 18, role: "Penghulu (KUA Pondok Gede)", name: "Bp. Ust. H. Khamaludin", category: "Akad", relatedEventId: 12 },
  { id: 19, role: "Wakil Ketua Panitia & PIC Penghulu", name: "Amar", category: "Inti", relatedEventId: 10, description: "Memantau masing-masing panitia sudah melakukan tugasnya dengan baik. Serta bertugas menghubungi penghulu & memastikan hadir tepat waktu." },
  { id: 21, role: "Saksi Nikah CPP", name: "Bp. Abdul Rahman", category: "Akad", relatedEventId: 12 },
  { id: 22, role: "Pengapit CPP", name: "Ibu Zaenab Rambe & Bp.", category: "Keluarga", relatedEventId: 11 },
  { id: 23, role: "Pengapit CPW", name: "Muthia & Nadhira", category: "Keluarga", relatedEventId: 12 },
  { id: 24, role: "Pembawa Baki Melati", name: "Azura", category: "Akad", relatedEventId: 12 },
  
  // Resepsi
  { id: 33, role: "Among Tamu", name: "Mbak Rika & Mas Hari", category: "Keluarga", relatedEventId: 17, description: "Berdiri di depan (setelah penerima tamu) untuk menerima dan menyapa tamu undangan." },
  { id: 34, role: "Among Tamu", name: "Mbak Tia & Mas Toni", category: "Keluarga", relatedEventId: 17, description: "Berdiri di depan (setelah penerima tamu) untuk menerima dan menyapa tamu undangan." },
  { id: 35, role: "Among Tamu", name: "Bang Amri & Kak Ratih", category: "Keluarga", relatedEventId: 17, description: "Berdiri di depan (setelah penerima tamu) untuk menerima dan menyapa tamu undangan." },

  // Busana & Tata Rias
  { id: 27, role: "Asisten CPP & CPW", name: "-", category: "Rias" },
  { id: 28, role: "Rias, Busana Akad, & Retouch", name: "BIG WO", category: "Rias", relatedEventId: 4 },
  { id: 29, role: "Rias & Busana Penerima Tamu", name: "BIG WO", category: "Rias", relatedEventId: 5 }
];

const timelineData = [
  // Persiapan
  { id: 1, time: "01.00 - 02.00", activity: "Morning Call\n- Membangunkan mempelai Wanita dan keluarga via telepon atau datang langsung", pic: "BIG WO", phase: "Persiapan" },
  { id: 2, time: "02.30 - 04.00", activity: "Seluruh Panitia tiba di lokasi", pic: "Keluarga", phase: "Persiapan" },
  { id: 3, time: "02.30", activity: "Tim Perias tiba di Gedung", pic: "-", phase: "Persiapan" },
  { id: 4, time: "04.00 - 06.00", activity: "Makeup Pengantin\n- Proses makeup Pengantin\n- Pengantin berganti pakaian", pic: "Tim Makeup dan Mempelai", phase: "Persiapan" },
  { id: 5, time: "04.00 - 07.00", activity: "Makeup Orang Tua dan Penerima Tamu\n- Proses makeup kedua Ibu\n- Proses makeup penerima tamu\n- Proses makeup Saudara (Jika Ada)\n- Orang Tua dan Penerima Tamu berganti pakaian", pic: "Tim Makeup dan Keluarga", phase: "Persiapan" },
  { id: 6, time: "05.30", activity: "Tim WO & Tim Dokumentasi tiba di Gedung", pic: "BIG WO & BIG Moment", phase: "Persiapan" },
  { id: 7, time: "07.00", activity: "Penjemputan Penghulu", pic: "PIC Penjemput", phase: "Persiapan" },
  // Akad
  { id: 8, time: "07.00", activity: "Keluarga Besar Standby\n- Seluruh Keluarga Besar CPP & CPW dan Sanak Family lainnya sudah siap dan stand by", pic: "Seluruh Keluarga Besar CPP + CPW + Panitia + BIG WO", phase: "Akad" },
  { id: 9, time: "07.00", activity: "Prosesi Iringan Rombongan Keluarga CPP\n- Rombongan dibariskan menuju ke tempat pelaksanaan Akad Nikah\n- Keluarga Besar CPW sudah bersiap di dalam ruangan Akad Nikah", pic: "Seluruh Keluarga Besar CPP + CPW + Panitia + BIG WO", phase: "Akad" },
  { id: 10, time: "07.50", activity: "Bapak Penghulu sudah berada di lokasi", pic: "PIC Penjemput + BIG WO", phase: "Akad" },
  { id: 11, time: "07.30 - 08.00", activity: "Acara Penyerahan CPP\n- MC membuka acara\n- Rombongan CPP masuk ke ruangan\n- Sambutan Perwakilan Keluarga CPP (Bp. Ust. Hadiri)\n- Sambutan balasan Keluarga CPW (Bp. Toni Yuseno)\n- Penyerahan seserahan (hantaran) secara simbolis\n- Ayahanda & Ibunda CPW menerima CPP dan menggandeng CPP menuju ruang Akad", pic: "MC dan BIG WO", phase: "Akad" },
  { id: 12, time: "08.00 - 09.00", activity: "Pelaksanaan Akad Nikah / Ijab Kabul\n- Pembukaan oleh MC & Pengecekan Administrasi\n- Pembacaan Kalam Illahi (Qori & Saritilawah)\n- Mempelai izin menikah kepada Mama & Kakak\n- Khotbah Nikah oleh Penghulu & Prosesi Ijab Kabul\n- Mempelai Wanita didampingi Muthia & Nadhira bertemu dengan Mempelai Pria\n- Penyerahan Buku Nikah, Mahar, dan Pemasangan Cincin", pic: "MC + Penghulu + Qori + Saritilawah", phase: "Akad" },
  // Resepsi
  { id: 13, time: "09.40 - 10.40", activity: "Touch Up Makeup\n- Retouch makeup pengantin\n- Mempelai berganti busana", pic: "BIG WO", phase: "Resepsi" },
  { id: 14, time: "10.30", activity: "Penerimaan Tamu\n- Para tamu undangan berdatangan\n- Petugas penerima tamu bersiap", pic: "Penerima Tamu", phase: "Resepsi" },
  { id: 15, time: "10.50", activity: "Welcome Speech oleh MC\n- MC memberi salam kepada tamu undangan yang telah hadir\n- Tim dokumentasi bersiap", pic: "MC dan Tim Dokumentasi", phase: "Resepsi" },
  { id: 16, time: "11.00 - 11.25", activity: "Prosesi Kirab Pengantin\n- MC memandu iringan kirab\n- Kedua mempelai memasuki area acara menuju kursi pelaminan diiringi musik", pic: "MC, Tim Dok, Mempelai, Keluarga", phase: "Resepsi" },
  { id: 17, time: "11.25 - 11.30", activity: "Kata Sambutan & Do'a\n- Sambutan & Do'a oleh: Bp. Ust. Hadiri", pic: "MC + Mempelai + BIG WO", phase: "Resepsi" },
  { id: 18, time: "11.30 - 13.00", activity: "Pemberian Ucapan Selamat dan Foto Bersama\n- Tamu undangan memberikan ucapan selamat dan berfoto\n- List foto disebutkan berurutan oleh MC\n- Tamu undangan menikmati hidangan", pic: "MC + BIG WO + Dokumentasi", phase: "Resepsi" },
  { id: 19, time: "13.00", activity: "Penutup\n- MC menutup acara", pic: "MC + Panitia + BIG WO", phase: "Resepsi" }
];

const cateringData = {
  buffet: [
    "Nasi Putih",
    "Soup Kimlo",
    "Daging Teriyaki",
    "Ayam Rica - Rica",
    "Asinan Betawi",
    "Kerupuk Udang",
    "Puding (Coklat, Pandan, Mangga)",
    "Buah Potong (Semangka & Melon)",
    "Air Mineral (PRIMA)",
    "Lemon Tea + Fanta"
  ],
  afterAkad: [
    { name: "Soto Ayam + Lontong", qty: "100 porsi" },
    { name: "Kopi & Teh", qty: "50 porsi" },
    { name: "Air Mineral", qty: "100 porsi" }
  ],
  disiapkanKeluarga: [
    { name: "Nasi Box (untuk vendor)", qty: "22 Box" },
    { name: "Snack Box (untuk keluarga & vendor)", qty: "100 Box" }
  ],
  gubukan: [
    {
      session: "Sesi 1 (11.00 - 12.00 WIB)",
      items: [
        { name: "Ice Cream", qty: "2 Galon" },
        { name: "Bakso", qty: "150 Pax" },
        { name: "Pempek", qty: "100 Pax" },
        { name: "Siomay", qty: "100 Pax" }
      ]
    },
    {
      session: "Sesi 2 (12.00 - 13.00 WIB)",
      items: [
        { name: "Zuppa Soup", qty: "100 Pax" },
        { name: "Es Cendol", qty: "100 Cup" }
      ]
    }
  ]
};

const fotoData = [
  "Keluarga Inti Cpp/Cpw",
  "Keluarga Besar Bapa Rahmat (Palembang)",
  "Keluarga Besar Bapa Miden (Medan)",
  "Keluarga Besar Hardjo Suwito",
  "Keluarga Besar Amril Djohor",
  "Keluarga Besar Djaman",
  "Keluarga Besar Gabungan",
  "Pt. Godrej Indonesia",
  "(Kolega Kerja List VIP Nashiir)",
  "Teman Kuliah Universitas Negri Veteran Jakarta",
  "Teman SMA Angkasa",
  "Teman Rumah",
  "Bridesmaid",
  "Penjaga Buku Tamu"
];

const perlengkapanData = [
  "Gembok Angpao 12mm x 2 pcs",
  "Gembok Ruang Rias 22 mm x 2 pcs",
  "Koper Angpao (Biru)",
  "Goody bag untuk souvenir"
];

const highlightNames = (text: string) => {
  if (!text) return text;
  const names = [
    "Bp. Ust. Hadiri", "Bp. Toni Yuseno", "Ust. Lukman Hakim", "Putri Daryani",
    "Muthia", "Nadhira", "Ayahanda", "Ibunda", "Mama", "Kakak", "Penghulu"
  ];
  const escapedNames = names.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedNames.join('|')})`, 'gi');
  
  const parts = text.split(regex);
  return parts.map((part, index) => {
    const isName = names.some(name => name.toLowerCase() === part.toLowerCase());
    if (isName) {
      return <strong key={index} style={{ color: 'var(--primary-color)' }}>{part}</strong>;
    }
    return part;
  });
};

export default function WeddingDashboard() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [searchQuery, setSearchQuery] = useState('');

  const jumpToTimeline = (eventId: number) => {
    setActiveTab('timeline');
    setSearchQuery('');
    setTimeout(() => {
      const el = document.getElementById(`timeline-card-${eventId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight-pulse');
        setTimeout(() => el.classList.remove('highlight-pulse'), 2000);
      }
    }, 100);
  };

  const filteredTimeline = useMemo(() => {
    return timelineData.filter(item => 
      item.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phase.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredPanitia = useMemo(() => {
    return panitiaData.filter(item =>
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <header className="hero">
        <div className="hero-content fade-in-up">
          <Heart className="hero-icon" size={56} />
          <h1 className="hero-title">{weddingDetails.brideAndGroom}</h1>
          <div className="hero-divider"></div>
          
          <div className="hero-meta delay-1 fade-in-up">
            <div className="meta-badge">
              <Calendar size={18} /> {weddingDetails.date}
            </div>
            <div className="meta-badge">
              <MapPin size={18} /> {weddingDetails.venue}
            </div>
          </div>
        </div>
      </header>

      <main className="container pb-12">
        <div className="search-wrapper fade-in-up delay-2">
          <div className="search-input-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Cari tugas, nama panitia, atau jadwal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="tabs-container fade-in-up delay-2">
          <div className="tabs-wrapper">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            >
              <Clock size={18} /> Jadwal Acara
            </button>
            <button
              onClick={() => setActiveTab('panitia')}
              className={`tab-btn ${activeTab === 'panitia' ? 'active' : ''}`}
            >
              <Users size={18} /> Daftar Panitia
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            >
              <FileText size={18} /> Info Umum
            </button>
            <button
              onClick={() => setActiveTab('catering')}
              className={`tab-btn ${activeTab === 'catering' ? 'active' : ''}`}
            >
              <Utensils size={18} /> Menu Catering
            </button>
            <button
              onClick={() => setActiveTab('foto')}
              className={`tab-btn ${activeTab === 'foto' ? 'active' : ''}`}
            >
              <Camera size={18} /> List Foto
            </button>
            <button
              onClick={() => setActiveTab('perlengkapan')}
              className={`tab-btn ${activeTab === 'perlengkapan' ? 'active' : ''}`}
            >
              <Package size={18} /> Lain-lain
            </button>
          </div>
        </div>

        <div className="main-panel fade-in-up delay-3">
          
          {/* TAB: TIMELINE */}
          {activeTab === 'timeline' && (
            <div>
              <div className="panel-header">
                <h2 className="panel-title font-serif">Susunan Acara</h2>
                <span className="panel-badge">{filteredTimeline.length} Kegiatan</span>
              </div>
              
              {filteredTimeline.length === 0 ? (
                <div className="empty-state">
                  <Clock size={48} className="empty-icon" />
                  <p>Tidak ada jadwal yang cocok dengan pencarian.</p>
                </div>
              ) : (
                <div className="timeline">
                  {filteredTimeline.map((item) => (
                    <div key={item.id} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div id={`timeline-card-${item.id}`} className="timeline-card">
                        <div className="timeline-header">
                          <span className="timeline-time">
                            <Clock size={18} /> {item.time}
                          </span>
                          <span className={`phase-badge phase-${item.phase.toLowerCase()}`}>
                            {item.phase}
                          </span>
                        </div>
                        <h3 className="timeline-title" style={{ whiteSpace: 'pre-line' }}>{highlightNames(item.activity)}</h3>
                        <div className="timeline-pic">
                          <Users size={18} style={{ marginTop: '2px', color: 'var(--primary-color)' }} />
                          <div>
                            <span className="pic-label">PIC / Penanggung Jawab:</span>
                            {item.pic}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: PANITIA */}
          {activeTab === 'panitia' && (
            <div>
              <div className="panel-header">
                <h2 className="panel-title font-serif">Susunan Panitia</h2>
                <span className="panel-badge">{filteredPanitia.length} Orang/Vendor</span>
              </div>

              {filteredPanitia.length === 0 ? (
                <div className="empty-state">
                  <Users size={48} className="empty-icon" />
                  <p>Tidak ada panitia yang cocok dengan pencarian.</p>
                </div>
              ) : (
                <div className="grid-container">
                  {filteredPanitia.map((person) => (
                    <div key={person.id} className="panitia-card">
                      <div>
                        <span className="panitia-category">{person.category}</span>
                        <h3 className="panitia-name">{person.name}</h3>
                      </div>
                      <div className="panitia-role" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <CheckCircle size={16} className="role-icon" />
                          <span>{person.role}</span>
                        </div>
                        {('description' in person) && (
                          <div style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: '#555', lineHeight: '1.4', padding: '0.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '6px', borderLeft: '3px solid var(--primary-color)' }}>
                            {(person as any).description}
                          </div>
                        )}
                        {person.relatedEventId && (() => {
                          const event = timelineData.find(item => item.id === person.relatedEventId);
                          return event ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem', width: '100%' }}>
                              <div style={{ fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f5f5f5', padding: '0.3rem 0.6rem', borderRadius: '4px', width: 'fit-content' }}>
                                <Clock size={14} style={{ color: 'var(--primary-color)' }} /> 
                                <span style={{ fontWeight: 600 }}>Tugas: {event.time}</span>
                              </div>
                              <button 
                                onClick={() => jumpToTimeline(person.relatedEventId)}
                                style={{ 
                                  fontSize: '0.8rem', color: 'var(--primary-color)', 
                                  background: 'rgba(114, 47, 55, 0.1)', padding: '0.3rem 0.6rem', 
                                  borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.4rem',
                                  border: 'none', cursor: 'pointer', width: 'fit-content', fontWeight: 500
                                }}
                              >
                                <FileText size={12} /> Lihat Detail Jadwal
                              </button>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: INFO */}
          {activeTab === 'info' && (
            <div>
               <div className="panel-header">
                <h2 className="panel-title font-serif">Informasi Umum</h2>
              </div>
              
              <div className="info-grid">
                <div className="info-card info-mempelai">
                  <h3 className="info-card-title"><Heart size={22} /> Mempelai</h3>
                  <p className="mempelai-name font-serif">{weddingDetails.brideAndGroom}</p>
                  <p className="text-secondary" style={{fontWeight: 500}}>{weddingDetails.date}</p>
                </div>

                <div className="info-card info-waktu">
                  <h3 className="info-card-title"><Clock size={22} /> Waktu Acara</h3>
                  <div>
                    <div className="waktu-row">
                      <span className="waktu-label">Prosesi Seserahan</span>
                      <span className="waktu-value">{weddingDetails.seserahanTime}</span>
                    </div>
                    <div className="waktu-row">
                      <span className="waktu-label">Akad Nikah</span>
                      <span className="waktu-value">{weddingDetails.akadTime}</span>
                    </div>
                    <div className="waktu-row">
                      <span className="waktu-label">Resepsi</span>
                      <span className="waktu-value">{weddingDetails.resepsiTime}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card info-lokasi" style={{ gridColumn: '1 / -1' }}>
                  <h3 className="info-card-title"><MapPin size={22} /> Lokasi & Organizer</h3>
                  <div className="lokasi-container" style={{ marginBottom: '1.5rem' }}>
                    <div className="lokasi-item">
                       <p className="lokasi-label">Venue</p>
                       <p className="lokasi-value">{weddingDetails.venue}</p>
                    </div>
                    <div className="lokasi-item">
                       <p className="lokasi-label">Organizer</p>
                       <p className="lokasi-value">{weddingDetails.organizer}</p>
                    </div>
                  </div>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9744847502484!2d106.90907171105853!3d-6.267085961328026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f31c2c754807%3A0xf41b9adb909f4e1a!2sJAMBUR%20DJAWATA%20Office%20%26%20Function%20Hall!5e0!3m2!1sen!2sid!4v1784353884602!5m2!1sen!2sid" 
                      width="100%" 
                      height="300" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="strict-origin-when-cross-origin">
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CATERING */}
          {activeTab === 'catering' && (
            <div>
              <div className="panel-header">
                <h2 className="panel-title"><Utensils size={28} /> Menu Catering</h2>
              </div>
              
              <div className="grid-container">
                <div className="panitia-card">
                  <span className="panitia-category" style={{ background: '#F0F4F8', color: '#4A6C8C', borderColor: 'rgba(74, 108, 140, 0.2)' }}>Menu After Akad</span>
                  <h3 className="panitia-name" style={{ fontSize: '1.4rem' }}>Sajian Pagi</h3>
                  <div className="panitia-role" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                    {cateringData.afterAkad.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '1rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}><Coffee size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: '#4A6C8C' }}/> {item.name}</span>
                        <span className="waktu-value" style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem', background: '#F0F4F8', color: '#4A6C8C', borderColor: 'rgba(74, 108, 140, 0.2)' }}>{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panitia-card">
                  <span className="panitia-category" style={{ background: '#FDF3E1', color: '#B37D26', borderColor: 'rgba(179, 125, 38, 0.2)' }}>Disiapkan Keluarga</span>
                  <h3 className="panitia-name" style={{ fontSize: '1.4rem' }}>Sarapan Tambahan</h3>
                  <div className="panitia-role" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                    {cateringData.disiapkanKeluarga.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '1rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}><Coffee size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: '#B37D26' }}/> {item.name}</span>
                        <span className="waktu-value" style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem', background: '#FDF3E1', color: '#B37D26', borderColor: 'rgba(179, 125, 38, 0.2)' }}>{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panitia-card">
                  <span className="panitia-category">Buffet Utama</span>
                  <h3 className="panitia-name" style={{ fontSize: '1.4rem' }}>Menu Prasmanan (400 Pax)</h3>
                  <div className="panitia-role" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                    {cateringData.buffet.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <CheckCircle size={16} style={{ color: 'var(--primary-color)', marginTop: '4px', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {cateringData.gubukan.map((gubuk, idx) => (
                  <div key={idx} className="panitia-card">
                    <span className="panitia-category" style={{ background: 'rgba(114, 47, 55, 0.08)', color: 'var(--primary-color)', borderColor: 'rgba(114, 47, 55, 0.2)' }}>Gubukan</span>
                    <h3 className="panitia-name" style={{ fontSize: '1.4rem' }}>{gubuk.session}</h3>
                    <div className="panitia-role" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                      {gubuk.items.map((item, idxi) => (
                        <div key={idxi} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.5rem' }}>
                          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.name}</span>
                          <span className="waktu-value" style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}>{item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FOTO */}
          {activeTab === 'foto' && (
            <div>
              <div className="panel-header">
                <h2 className="panel-title"><Camera size={28} /> List Foto Resepsi</h2>
                <span className="panel-badge">{fotoData.length} Sesi Foto</span>
              </div>
              
              <div className="grid-container">
                {fotoData.map((item, idx) => (
                  <div key={idx} className="panitia-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem' }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', 
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontSize: '1.2rem', fontWeight: 600, flexShrink: 0 
                    }}>
                      {idx + 1}
                    </div>
                    <h3 className="panitia-name" style={{ fontSize: '1.1rem', margin: 0 }}>{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PERLENGKAPAN */}
          {activeTab === 'perlengkapan' && (
            <div>
              <div className="panel-header">
                <h2 className="panel-title"><Package size={28} /> Perlengkapan Tambahan</h2>
                <span className="panel-badge">{perlengkapanData.length} Item</span>
              </div>
              
              <div className="grid-container">
                {perlengkapanData.map((item, idx) => (
                  <div key={idx} className="panitia-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: '#F8F9FA' }}>
                    <div style={{ 
                      width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary-color)', flexShrink: 0 
                    }}></div>
                    <h3 className="panitia-name" style={{ fontSize: '1.1rem', margin: 0, fontWeight: 500 }}>{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
