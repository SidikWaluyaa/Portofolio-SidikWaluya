"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, 
  Plus, 
  Trash2, 
  User, 
  Briefcase, 
  Settings, 
  LogOut,
  Database,
  CheckCircle2,
  AlertCircle,
  X,
  PlusCircle,
  Layout,
  GraduationCap,
  History,
  Award,
  Link as LinkIcon
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    }
  }, [isAuthorized]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const pRes = await fetch('/api/admin/profile/route.local');
      const prRes = await fetch('/api/admin/projects/route.local');
      const sRes = await fetch('/api/admin/services/route.local');
      setProfileData(await pRes.json());
      setProjectsData(await prRes.json());
      setServicesData(await sRes.json());
    } catch (error) {
      showStatus("error", "Gagal memuat data");
    }
    setLoading(false);
  };

  const showStatus = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: "", message: "" }), 3000);
  };

  const saveProfile = async () => {
    try {
      const res = await fetch('/api/admin/profile/route.local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (res.ok) showStatus("success", "Profil berhasil disimpan!");
    } catch (error) {
      showStatus("error", "Gagal menyimpan profil");
    }
  };

  const saveProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects/route.local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectsData),
      });
      if (res.ok) showStatus("success", "Proyek berhasil disimpan!");
    } catch (error) {
      showStatus("error", "Gagal menyimpan proyek");
    }
  };

  const saveServices = async () => {
    try {
      const res = await fetch('/api/admin/services/route.local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicesData),
      });
      if (res.ok) showStatus("success", "Layanan berhasil disimpan!");
    } catch (error) {
      showStatus("error", "Gagal menyimpan layanan");
    }
  };

  // Projects CRUD
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "Proyek Baru",
      slug: "proyek-baru",
      category: "Web Development",
      thumbnail: "/Portofolio-SidikWaluya/projects/default.jpg",
      shortDescription: "Deskripsi singkat proyek",
      problem: "Masalah yang diselesaikan...",
      goals: ["Goal 1"],
      tech: ["React", "Next.js"],
      impact: "Dampak proyek...",
      steps: [{ title: "Langkah 1", description: "Deskripsi langkah 1" }]
    };
    setProjectsData([newProject, ...projectsData]);
  };

  const deleteProject = (id) => {
    if(confirm("Yakin ingin menghapus proyek ini?")) {
      setProjectsData(projectsData.filter(p => p.id !== id));
    }
  };

  // Services CRUD
  const addService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      title: "Layanan Baru",
      description: "Deskripsi layanan...",
      icon: "Code",
      features: ["Fitur 1"]
    };
    setServicesData([...servicesData, newService]);
  };

  const deleteService = (id) => {
    if(confirm("Hapus layanan ini?")) {
      setServicesData(servicesData.filter(s => s.id !== id));
    }
  };

  const handleServiceArrayUpdate = (sIndex, fIndex, value, isRemove = false) => {
    const newServices = [...servicesData];
    if (isRemove) {
      newServices[sIndex].features.splice(fIndex, 1);
    } else if (fIndex === -1) {
      newServices[sIndex].features.push(value);
    } else {
      newServices[sIndex].features[fIndex] = value;
    }
    setServicesData(newServices);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black">
        <GlassCard className="max-w-md w-full p-10 text-center">
          <Settings className="mx-auto mb-6 text-primary" size={48} />
          <h1 className="text-2xl font-black mb-2 tracking-tighter uppercase">Admin Access</h1>
          <p className="text-gray-500 mb-8 text-sm">Hanya untuk penggunaan lokal.</p>
          <input 
            type="password"
            placeholder="Ketik 'admin' untuk masuk"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 mb-4 focus:border-primary outline-none transition-all text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && password === 'admin' && setIsAuthorized(true)}
          />
          <button 
            onClick={() => password === 'admin' && setIsAuthorized(true)}
            className="w-full bg-primary text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-primary/80 transition-all"
          >
            Authorize
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2 flex items-center gap-2">
              <Database size={12} /> Local Data Management
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Admin <span className="text-gradient">Dashboard</span></h1>
          </div>
          <div className="flex gap-4">
            <AnimatePresence>
              {status.message && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest",
                    status.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-red-500/20 text-red-400 border border-red-500/50"
                  )}
                >
                  {status.type === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsAuthorized(false)}
              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 text-gray-400 hover:text-red-400 transition-all"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-4">
            <GlassCard className="p-4 flex flex-col gap-2">
              <button onClick={() => setActiveTab("profile")} className={cn("flex items-center gap-3 px-4 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all", activeTab === "profile" ? "bg-primary text-white" : "hover:bg-white/5 text-gray-500")}>
                <User size={16} /> Profile
              </button>
               <button onClick={() => setActiveTab("services")} className={cn("flex items-center gap-3 px-4 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all", activeTab === "services" ? "bg-primary text-white" : "hover:bg-white/5 text-gray-500")}>
                <Layout size={16} /> Services
              </button>
              <button onClick={() => setActiveTab("projects")} className={cn("flex items-center gap-3 px-4 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all", activeTab === "projects" ? "bg-primary text-white" : "hover:bg-white/5 text-gray-500")}>
                <Briefcase size={16} /> Projects
              </button>
              <div className="p-4 mt-12 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Editor Note</p>
                <p className="text-[10px] text-gray-400 leading-relaxed italic">"Perubahan lokal akan memperbarui file JSON. Deploy ke GitHub Pages via `npm run export`."</p>
              </div>
            </GlassCard>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && profileData && (
                <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                  <GlassCard className="p-8">
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                      <h2 className="text-xl font-black uppercase tracking-tighter">Profile Configuration</h2>
                      <button onClick={saveProfile} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] hover:bg-primary/80 transition-all"><Save size={14} /> Simpan Perubahan</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Basic Section */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Basic Information</label>
                        <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} />
                        <input type="text" placeholder="Role" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" value={profileData.role} onChange={(e) => setProfileData({...profileData, role: e.target.value})} />
                        <input type="text" placeholder="Tagline" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" value={profileData.tagline} onChange={(e) => setProfileData({...profileData, tagline: e.target.value})} />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Social Links</label>
                        <div className="space-y-2">
                           {Object.keys(profileData.socials).map(key => (
                            <div key={key} className="flex items-center gap-2">
                              <span className="w-20 text-[9px] font-black text-gray-600 uppercase tracking-tighter">{key}</span>
                              <input type="text" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-primary" value={profileData.socials[key]} onChange={(e) => {
                                const newSocials = {...profileData.socials, [key]: e.target.value};
                                setProfileData({...profileData, socials: newSocials});
                              }} />
                            </div>
                           ))}
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Professional Bio</label>
                        <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm resize-none" value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} />
                      </div>

                      {/* Experience Section */}
                      <div className="md:col-span-2 pt-8 border-t border-white/5">
                        <div className="flex justify-between mb-6">
                           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><History size={14}/> Professional Experience</label>
                           <button onClick={() => setProfileData({...profileData, experience: [{company: "", role: "", period: "", description: ""}, ...profileData.experience]})} className="text-primary text-[10px] font-black uppercase hover:underline">+ Add Experience</button>
                        </div>
                        <div className="space-y-4">
                          {profileData.experience.map((exp, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 relative group">
                              <button onClick={() => {const newExp = [...profileData.experience]; newExp.splice(idx, 1); setProfileData({...profileData, experience: newExp})}} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input placeholder="Company" className="bg-transparent border-b border-white/10 py-1 outline-none text-sm font-bold" value={exp.company} onChange={(e) => {const newExp = [...profileData.experience]; newExp[idx].company = e.target.value; setProfileData({...profileData, experience: newExp})}} />
                                <input placeholder="Period" className="bg-transparent border-b border-white/10 py-1 outline-none text-sm text-gray-500" value={exp.period} onChange={(e) => {const newExp = [...profileData.experience]; newExp[idx].period = e.target.value; setProfileData({...profileData, experience: newExp})}} />
                                <input placeholder="Role" className="col-span-1 bg-transparent border-b border-white/10 py-1 outline-none text-xs text-primary uppercase font-black" value={exp.role} onChange={(e) => {const newExp = [...profileData.experience]; newExp[idx].role = e.target.value; setProfileData({...profileData, experience: newExp})}} />
                                <textarea placeholder="Description" className="col-span-2 bg-transparent outline-none text-xs text-gray-500 py-2 resize-none" value={exp.description} onChange={(e) => {const newExp = [...profileData.experience]; newExp[idx].description = e.target.value; setProfileData({...profileData, experience: newExp})}} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Education Section */}
                      <div className="md:col-span-1 pt-8 border-t border-white/5">
                        <div className="flex justify-between mb-6">
                           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><GraduationCap size={14}/> Education</label>
                        </div>
                        <div className="space-y-4">
                          {profileData.education.map((edu, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                               <input className="w-full bg-transparent font-bold text-xs mb-1" value={edu.school} onChange={(e) => {const newEdu = [...profileData.education]; newEdu[idx].school = e.target.value; setProfileData({...profileData, education: newEdu})}} />
                               <input className="w-full bg-transparent text-[10px] text-gray-500" value={edu.degree} onChange={(e) => {const newEdu = [...profileData.education]; newEdu[idx].degree = e.target.value; setProfileData({...profileData, education: newEdu})}} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Certifications Section */}
                      <div className="md:col-span-1 pt-8 border-t border-white/5">
                        <div className="flex justify-between mb-6">
                           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><Award size={14}/> Certifications</label>
                        </div>
                        <div className="space-y-2">
                          {profileData.certifications.map((cert, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                               <input className="flex-1 bg-transparent text-[11px] font-bold" value={cert} onChange={(e) => {const newCerts = [...profileData.certifications]; newCerts[idx] = e.target.value; setProfileData({...profileData, certifications: newCerts})}} />
                               <button onClick={() => {const newCerts = [...profileData.certifications]; newCerts.splice(idx, 1); setProfileData({...profileData, certifications: newCerts})}} className="text-red-500"><X size={12}/></button>
                            </div>
                          ))}
                           <button onClick={() => setProfileData({...profileData, certifications: [...profileData.certifications, "New Certificate"]})} className="text-primary text-[10px] font-black uppercase mt-2">+ Add Cert</button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {activeTab === "services" && (
                <motion.div key="services" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                   <div className="flex justify-between items-center mb-4">
                    <button onClick={addService} className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all font-black"><Plus size={16} /> Layanan Baru</button>
                    <button onClick={saveServices} className="flex items-center gap-2 px-6 py-4 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] hover:bg-primary/80 transition-all active:scale-95"><Save size={16} /> Simpan Layanan</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {servicesData.map((service, idx) => (
                      <GlassCard key={service.id} className="p-8">
                        <div className="flex justify-between mb-6">
                           <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black uppercase text-xs">{service.icon}</div>
                           <button onClick={() => deleteService(service.id)} className="text-gray-600 hover:text-red-500"><Trash2 size={18}/></button>
                        </div>
                        <input className="w-full bg-transparent text-xl font-black uppercase tracking-tighter mb-2 outline-none border-b border-transparent focus:border-primary/50" value={service.title} onChange={(e) => {const newS = [...servicesData]; newS[idx].title = e.target.value; setServicesData(newS)}} />
                        <textarea rows={3} className="w-full bg-transparent text-xs text-gray-500 leading-relaxed resize-none outline-none mb-6 border-b border-transparent focus:border-primary/50" value={service.description} onChange={(e) => {const newS = [...servicesData]; newS[idx].description = e.target.value; setServicesData(newS)}} />
                        
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 block">Key Features</label>
                          {service.features.map((f, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 group">
                               <input className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 text-[11px] outline-none hover:bg-white/10 focus:border-primary/50 border border-transparent" value={f} onChange={(e) => handleServiceArrayUpdate(idx, fIdx, e.target.value)} />
                               <button onClick={() => handleServiceArrayUpdate(idx, fIdx, null, true)} className="text-red-500 opacity-0 group-hover:opacity-100"><X size={12}/></button>
                            </div>
                          ))}
                          <button onClick={() => handleServiceArrayUpdate(idx, -1, "New Feature")} className="text-primary text-[9px] font-black hover:underline mt-2">+ ADD FEATURE</button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={addProject} className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"><Plus size={16} /> Tambah Proyek</button>
                    <button onClick={saveProjects} className="flex items-center gap-2 px-6 py-4 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] hover:bg-primary/80 transition-all active:scale-95"><Save size={16} /> Simpan Proyek</button>
                  </div>

                  <div className="space-y-8">
                    {projectsData.map((project, index) => (
                      <GlassCard key={project.id} className="p-8 md:p-12">
                         <div className="flex justify-between items-start mb-10 pb-6 border-b border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-xl">{index + 1}</div>
                            <div>
                              <input className="bg-transparent font-bold text-2xl outline-none" value={project.title} onChange={(e) => {const nP = [...projectsData]; nP[index].title = e.target.value; setProjectsData(nP)}} />
                              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{project.category}</p>
                            </div>
                          </div>
                          <button onClick={() => deleteProject(project.id)} className="p-3 text-gray-600 hover:text-red-500 transition-colors bg-white/5 rounded-xl border border-white/10 hover:border-red-500/50"><Trash2 size={20} /></button>
                        </div>
                        {/* Project editor content (previously implemented) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Judul Proyek</label>
                              <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" value={project.title} onChange={(e) => {const n = [...projectsData]; n[index].title = e.target.value; setProjectsData(n)}} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Slug</label>
                              <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" value={project.slug} onChange={(e) => {const n = [...projectsData]; n[index].slug = e.target.value; setProjectsData(n)}} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Thumbnail</label>
                              <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" value={project.thumbnail} onChange={(e) => {const n = [...projectsData]; n[index].thumbnail = e.target.value; setProjectsData(n)}} />
                            </div>
                          </div>
                          <div className="space-y-4">
                             <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Kategori</label>
                              <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" value={project.category} onChange={(e) => {const n = [...projectsData]; n[index].category = e.target.value; setProjectsData(n)}} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Deskripsi Singkat</label>
                              <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary resize-none" value={project.shortDescription} onChange={(e) => {const n = [...projectsData]; n[index].shortDescription = e.target.value; setProjectsData(n)}} />
                            </div>
                          </div>
                          {/* More details like Problem, Impact, Tech, Goals, Steps... */}
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
