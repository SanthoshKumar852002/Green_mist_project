import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "../utils/i18n";
import {
  MessageSquare,
  MapPin,
  RefreshCcw,
  ChevronDown,
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Toast from "./Toast";

const ContactSection = ({ lang }) => {
  const { t } = useTranslation(lang);

  const [openFaq, setOpenFaq] = useState(null);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    drawCaptcha();
  }, [captchaCode]);

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 1. Clear & Background Pattern
    ctx.clearRect(0, 0, width, height);

    // Gradient Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0fdf4');
    gradient.addColorStop(1, '#dcfce7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Heavy Noise Texture (Static)
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5, 0, 2 * Math.PI);
      ctx.fill();
    }

    // 3. Grid Lines (Behind)
    ctx.beginPath();
    for (let i = 0; i < width; i += 20) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i + Math.random() * 10, height);
    }
    for (let i = 0; i < height; i += 20) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i + Math.random() * 10);
    }
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)'; // Faint grid
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. Draw Characters with heavy distortion
    const chars = captchaCode.split('');
    const charWidth = width / (chars.length + 1); // Extra spacing

    chars.forEach((char, i) => {
      ctx.save();

      // Random Position
      const x = 20 + i * charWidth + (Math.random() - 0.5) * 15;
      const y = height / 2 + (Math.random() - 0.5) * 15;

      // Random Rotation (heavier)
      const angle = (Math.random() - 0.5) * 0.7;

      // Random Scale
      const scale = 0.8 + Math.random() * 0.4;

      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Font Styles
      const fonts = ['Arial', 'Verdana', 'Courier New', 'Georgia'];
      ctx.font = `bold ${28 + Math.random() * 10}px ${fonts[Math.floor(Math.random() * fonts.length)]}`;

      // Text Color (Dark with slight variation)
      const hue = Math.floor(Math.random() * 360);
      ctx.fillStyle = `hsl(${hue}, 50%, 20%)`;

      // Apply Distortion
      ctx.transform(1, Math.random() * 0.3 - 0.15, Math.random() * 0.3 - 0.15, 1, 0, 0);

      ctx.shadowColor = "rgba(0,0,0,0.1)";
      ctx.shadowBlur = 4;
      ctx.fillText(char, 0, 0);

      ctx.restore();
    });

    // 5. Interference Curves (Foreground)
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * height);
      ctx.bezierCurveTo(
        width / 3, Math.random() * height,
        2 * width / 3, Math.random() * height,
        width, Math.random() * height
      );
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // 6. Scratch Lines
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + (Math.random() - 0.5) * 50, startY + (Math.random() - 0.5) * 50);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleNameChange = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val && !/^[6-9]/.test(val)) val = "";
    if (val.length > 10) val = val.slice(0, 10);
    e.target.value = val;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captchaInput.toUpperCase() !== captchaCode) {
      showNotification(lang === "ta" ? "தவறான கோடு" : "Incorrect CAPTCHA", "error");
      generateCaptcha();
      return;
    }

    setStatus("submitting");

    const formData = new FormData(e.target);
    const scriptURL = "https://script.google.com/macros/s/AKfycbwJiVEsooSPPPDsNnqkZ5tTMC2ocP9ivfFiiroxjQYcBSk1nfOX3sNVvSdezH3tsNkJ/exec";

    try {
      await fetch(scriptURL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      setStatus("success");
      showNotification(t("successMsg"), "success");
      e.target.reset();
      setCaptchaInput(""); // Clear captcha input
      generateCaptcha();
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      showNotification(t("errorMsg"), "error");
    }
  };

  const faqs = [
    { q: t("faq1q"), a: t("faq1a") },
    { q: t("faq2q"), a: t("faq2a") },
    { q: t("faq3q"), a: t("faq3a") },
    { q: t("faq4q"), a: t("faq4a") }
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50 relative">
      {/* Green Mixed Effect: A soft glow in the background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-green-200/20 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(34,197,94,0.2)] p-10 border border-white">
          
          <AnimatePresence>
            {notification && (
              <Toast 
                message={notification.message} 
                type={notification.type} 
                onClose={() => setNotification(null)} 
              />
            )}
          </AnimatePresence>

          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-8">
              {/* FAQ - Reduced title size */}
              <div className="flex flex-col h-full">
                <div className="bg-primary-50/50 border border-primary-100 p-8 md:p-12 rounded-[2.5rem] h-full shadow-lg">
                  <h2 className="text-2xl md:text-3xl font-black mb-8 text-primary-900 tracking-tight">
                    {t("commonQuestions")}
                  </h2>

                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className={`border rounded-[1.5rem] transition-all duration-300 ${openFaq === i ? 'border-primary-500 bg-white shadow-md' : 'border-primary-100 bg-white/50 hover:bg-white'}`}>
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full p-5 flex justify-between items-center font-bold text-left"
                        >
                          <span className="text-primary-900 uppercase tracking-tight text-sm md:text-base font-black leading-snug pr-4">{faq.q}</span>
                          <ChevronDown className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-emerald-600" : "text-gray-400"}`} />
                        </button>
                        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                          <div className="overflow-hidden">
                            <p className="px-5 pb-5 text-gray-600 leading-relaxed text-sm md:text-base font-medium">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enquiry Form */}
              <div className="flex flex-col h-full">
                <div className="bg-primary-700 p-8 md:p-12 rounded-[2.5rem] text-white shadow-2xl h-full flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tight">
                    {t("quickInquiry")} <Send className="w-5 h-5 text-emerald-400" />
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase font-black text-emerald-400 mb-2 tracking-widest">{t("formName")}</label>
                        <input name="Name" required onInput={handleNameChange} placeholder={t("namePlaceholder")} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none font-bold" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-black text-emerald-400 mb-2 tracking-widest">{t("formPhone")}</label>
                        <div className="flex bg-white/5 border border-white/10 rounded-xl items-center px-4 focus-within:border-emerald-500">
                          <span className="text-emerald-400 font-bold mr-2">+91</span>
                          <input name="Mobile" required onInput={handlePhoneChange} placeholder="0000000000" className="w-full bg-transparent p-4 outline-none font-bold" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-black text-emerald-400 mb-2 tracking-widest">{t("formMessage")}</label>
                      <textarea name="Message" rows="3" required placeholder={t("messagePlaceholder")} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none font-bold resize-none" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/5 p-4 rounded-2xl">
                      <canvas
                        ref={canvasRef}
                        width="180"
                        height="60"
                        onClick={generateCaptcha}
                        className="rounded-xl shadow-lg cursor-pointer bg-emerald-500 hover:opacity-90 transition-opacity"
                      />
                      <button type="button" onClick={generateCaptcha} className="p-2 text-emerald-400 hover:rotate-180 transition-transform duration-500">
                        <RefreshCcw />
                      </button>
                      <input value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="CODE" className="w-full sm:w-32 p-3 rounded-xl bg-white/5 border border-white/10 uppercase font-black text-center tracking-widest focus:border-emerald-500 outline-none" />
                    </div>

                    <button disabled={status === "submitting"} className="w-full bg-emerald-500 hover:bg-emerald-400 text-primary-950 py-4 md:py-5 rounded-2xl font-black text-base md:text-xl uppercase tracking-widest transition-all shadow-xl active:scale-95">
                      {status === "submitting" ? "..." : t("submit")}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Details Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="p-8 border border-gray-100 rounded-[2rem] flex items-center gap-6 group hover:border-emerald-500 transition-all bg-white shadow-sm hover:shadow-md">
                <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all"><MessageSquare /></div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 font-sans">{t("whatsappLabel")}</p>
                  <div className="space-y-0.5">
                    <p className="font-black text-primary-950 text-base md:text-lg">78999 78869</p>
                    <p className="font-black text-primary-950 text-base md:text-lg">91503 95864</p>
                    <p className="font-black text-primary-950 text-base md:text-lg">90039 92693</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-gray-100 rounded-[2rem] flex items-center gap-6 group hover:border-emerald-500 transition-all bg-white shadow-sm hover:shadow-md">
                <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all"><MapPin /></div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 font-sans">{t("locationLabel")}</p>
                  <p className="font-bold text-primary-950 text-base md:text-lg leading-snug whitespace-pre-line">{t("address")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
