"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import profile from "@/data/profile.json";

export default function Contact() {
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setSubmittedData(data);

    try {
      const response = await fetch("https://formspree.io/f/xbdaanvv", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const openWhatsApp = () => {
    if (!submittedData) return;
    
    const phone = profile.contact.phone.replace(/[^0-9]/g, "");
    const formattedPhone = phone.startsWith("0") ? "62" + phone.substring(1) : phone;

    const text = `Halo Sidik, saya ${submittedData.name}. 
Subjek: ${submittedData.subject}

Pesan:
${submittedData.message}

Email saya: ${submittedData.email}`;

    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="relative">
      <section className="page-header section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight">
              Mari <span className="text-gradient">Bicara</span> Bisnis.
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed font-light max-w-xl">
              Punya proyek dalam pikiran? Mencari mitra teknis jangka panjang? atau hanya ingin menyapa? Saya siap mendengarkan.
            </p>
            
            <div className="space-y-10 pt-8">
              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 border-white/5">
                  <Mail className="text-primary group-hover:text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Email</h4>
                  <p className="text-xl font-bold">{profile.contact.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 border-white/5">
                  <Phone className="text-primary group-hover:text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Telepon</h4>
                  <p className="text-xl font-bold">{profile.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 border-white/5">
                  <MapPin className="text-primary group-hover:text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Lokasi</h4>
                  <p className="text-xl font-bold">{profile.contact.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center p-12 glass rounded-3xl text-center backdrop-blur-3xl"
              >
                <CheckCircle size={64} className="text-primary mb-8 animate-bounce" />
                <h2 className="text-3xl font-black mb-4">Pesan Terkirim!</h2>
                <p className="text-gray-400 mb-10 leading-relaxed">
                  Terima kasih telah menghubungi. Pesan Anda sudah masuk ke email saya.
                </p>
                
                <div className="flex flex-col gap-4 w-full px-8">
                  <button
                    onClick={openWhatsApp}
                    className="w-full py-4 bg-green-500 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    Lanjut ke WhatsApp <Phone size={14} />
                  </button>
                  
                  <button
                    onClick={() => setStatus(null)}
                    className="w-full py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </motion.div>
            ) : null}

            <GlassCard className="p-12 border-white/5">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
                    <input
                      required
                      name="name"
                      type="text"
                      className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-primary outline-none transition-all placeholder:text-gray-700"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Alamat Email</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-primary outline-none transition-all placeholder:text-gray-700"
                      placeholder="email@anda.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Subjek</label>
                  <input
                    required
                    name="subject"
                    type="text"
                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-primary outline-none transition-all placeholder:text-gray-700"
                    placeholder="Pertanyaan Proyek"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Pesan</label>
                  <textarea
                    required
                    name="message"
                    rows="5"
                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-primary outline-none transition-all resize-none placeholder:text-gray-700"
                    placeholder="Ceritakan tentang proyek Anda..."
                  ></textarea>
                </div>

                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 hover:bg-white/90 transition-all shadow-2xl shadow-white/5 disabled:opacity-50 rounded-2xl mt-4"
                >
                  {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
                  <Send size={16} />
                </button>
                
                {status === "error" && (
                  <div className="text-center space-y-4">
                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">Gagal mengirim ke email. Silakan coba lagi atau gunakan WhatsApp.</p>
                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="w-full py-4 bg-green-500 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                    >
                      Kirim via WhatsApp <Phone size={14} />
                    </button>
                  </div>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
