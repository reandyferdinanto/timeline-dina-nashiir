"use client";

import React, { useState, useMemo } from 'react';
import { Search, Clock, Users, Calendar, MapPin, Heart, FileText, CheckCircle } from 'lucide-react';

// --- Data Preparation ---
const weddingDetails = {
  brideAndGroom: "Dina & Nashiir",
  venue: "Jambur Djawata",
  date: "Sabtu, 25 Juni 2026",
  akadTime: "08.00 WIB",
  resepsiTime: "11.00 - 13.00 WIB",
  organizer: "Big Wedding Organizer"
};

const panitiaData = [
  { id: 1, role: "Ketua Panitia", name: "Reandy Ferdinanto", category: "Inti" },
  { id: 2, role: "Koordinator Pelaksana, Dekor, Ent, Dok", name: "BIG WO", category: "Inti" },
  { id: 3, role: "PIC Catering", name: "Rini BIG Catering", category: "Vendor" },
  { id: 4, role: "Vendor Dekorasi", name: "Big Decoration", category: "Vendor" },
  { id: 5, role: "Vendor Entertainment", name: "Dream Entertainment", category: "Vendor" },
  { id: 6, role: "Vendor Dokumentasi", name: "BIG Moment", category: "Vendor" },
  { id: 7, role: "PIC Angpao & Souvenir / Kunci Rias", name: "Reandy", category: "PIC" },
  { id: 8, role: "Koord. Keluarga CPP", name: "Neni Balqis", category: "Keluarga" },
  { id: 9, role: "Koord. Keluarga CPW / PIC Mahar", name: "Muthia", category: "Keluarga" },
  { id: 10, role: "Juru Bicara Akad CPW", name: "Bp. Toni Yuseno", category: "Akad" },
  { id: 11, role: "Juru Bicara Akad CPP / Wali / Do'a", name: "Bp. Ust. Hadiri", category: "Akad" },
  { id: 12, role: "Qori", name: "Lukman Hakim", category: "Akad" },
  { id: 13, role: "Saritilawah", name: "Putri Daryani", category: "Akad" },
  { id: 14, role: "Penghulu (KUA Pondok Gede)", name: "Bp. Ust. H. Khamaludin", category: "Akad" },
  { id: 15, role: "PIC Penghulu", name: "Bp. Irfan", category: "PIC" },
  { id: 16, role: "Saksi Nikah CPW", name: "Bp. Reandy Ferdinanto", category: "Akad" },
  { id: 17, role: "Saksi Nikah CPP", name: "Bp. Abdul Rahman", category: "Akad" },
  { id: 18, role: "Pengapit CPP", name: "Ibu Zaenab Rambe Bp.", category: "Keluarga" },
  { id: 19, role: "Pengapit CPW", name: "Muthia Nadhira", category: "Keluarga" },
];

const timelineData = [
  // Akad
  { id: 1, time: "01.00 - 02.00", activity: "Morning Call (Membangunkan mempelai)", pic: "BIG WO", phase: "Persiapan" },
  { id: 2, time: "02.30 - 04.00", activity: "Panitia & Perias tiba, Makeup Pengantin", pic: "Tim Makeup, Keluarga", phase: "Persiapan" },
  { id: 3, time: "02.30", activity: "Makeup Orang Tua dan Penerima Tamu", pic: "Tim Makeup", phase: "Persiapan" },
  { id: 4, time: "04.00 - 06.00", activity: "Makeup Saudara, Ganti Pakaian", pic: "Tim Makeup, Keluarga", phase: "Persiapan" },
  { id: 5, time: "04.00 - 07.00", activity: "Tim WO & Dokumentasi tiba di Gedung", pic: "BIG WO & BIG Moment", phase: "Persiapan" },
  { id: 6, time: "05.30", activity: "Penjemputan Penghulu", pic: "PIC Penjemput", phase: "Persiapan" },
  { id: 7, time: "07.00", activity: "Keluarga Besar CPP & CPW Standby", pic: "Seluruh Keluarga, Panitia, BIG WO", phase: "Akad" },
  { id: 8, time: "07.00", activity: "Iringan Keluarga CPP, Penghulu Tiba", pic: "Keluarga CPP, PIC Penjemput", phase: "Akad" },
  { id: 9, time: "07.30 - 08.00", activity: "Penyerahan CPP, Sambutan, Serah Terima", pic: "MC, BIG WO", phase: "Akad" },
  { id: 10, time: "08.00 - 09.00", activity: "Pelaksanaan Akad Nikah / Ijab Kabul", pic: "MC, Penghulu, Qori", phase: "Akad" },
  // Resepsi
  { id: 11, time: "09.40 - 10.40", activity: "Touch Up Makeup & Ganti Busana", pic: "BIG WO", phase: "Resepsi" },
  { id: 12, time: "10.30", activity: "Penerimaan Tamu Undangan", pic: "Penerima Tamu", phase: "Resepsi" },
  { id: 13, time: "10.50", activity: "Welcome Speech oleh MC", pic: "MC, Tim Dokumentasi", phase: "Resepsi" },
  { id: 14, time: "11.00 - 11.25", activity: "Prosesi Kirab Pengantin", pic: "MC, Mempelai, Keluarga", phase: "Resepsi" },
  { id: 15, time: "11.25 - 11.30", activity: "Kata Sambutan & Do'a", pic: "MC, Mempelai, BIG WO", phase: "Resepsi" },
  { id: 16, time: "11.30 - 13.00", activity: "Pemberian Ucapan Selamat & Foto Bersama", pic: "MC, BIG WO, Dokumentasi", phase: "Resepsi" },
  { id: 17, time: "13.00", activity: "Penutup", pic: "MC, Panitia, BIG WO", phase: "Resepsi" }
];

export default function WeddingDashboard() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [searchQuery, setSearchQuery] = useState('');

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
                      <div className="timeline-card">
                        <div className="timeline-header">
                          <div className="timeline-time">
                            <Clock size={18} /> {item.time}
                          </div>
                          <span className={`phase-badge phase-${item.phase.toLowerCase()}`}>
                            {item.phase}
                          </span>
                        </div>
                        <h3 className="timeline-title">{item.activity}</h3>
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
                      <div className="panitia-role">
                        <CheckCircle size={16} className="role-icon" />
                        <span>{person.role}</span>
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
                      <span className="waktu-label">Akad Nikah</span>
                      <span className="waktu-value">{weddingDetails.akadTime}</span>
                    </div>
                    <div className="waktu-row">
                      <span className="waktu-label">Resepsi</span>
                      <span className="waktu-value">{weddingDetails.resepsiTime}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card info-lokasi">
                  <h3 className="info-card-title"><MapPin size={22} /> Lokasi & Organizer</h3>
                  <div className="lokasi-container">
                    <div className="lokasi-item">
                       <p className="lokasi-label">Venue</p>
                       <p className="lokasi-value">{weddingDetails.venue}</p>
                    </div>
                    <div className="lokasi-item">
                       <p className="lokasi-label">Organizer</p>
                       <p className="lokasi-value">{weddingDetails.organizer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
