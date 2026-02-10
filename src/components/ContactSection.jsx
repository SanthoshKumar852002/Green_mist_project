import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../utils/i18n";
import {
  MessageSquare,
  MapPin,
  RefreshCcw,
  ChevronDown,
  Send,
  User,
  Phone,
  MessageCircle
} from "lucide-react";
import Toast from "./Toast";

// Floating label input component - UPDATED (removed floating label)
const FloatingInput = ({ label, icon: Icon, name, type = "text", required, onInput, placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.01 }}
    >
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none ${isFocused || hasValue ? 'opacity-0 -translate-x-4' : 'opacity-50'
        }`}>
        <Icon className="w-5 h-5 text-white/60" />
      </div>
      <input
        name={name}
        type={type}
        required={required}
        onInput={onInput}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          onChange?.(e);
        }}
        className={`w-full p-4 rounded-xl bg-transparent border-2 transition-all duration-300 outline-none font-bold placeholder:text-white/40 ${isFocused
          ? 'border-emerald-500 pl-4'
          : 'border-white/10 pl-12 hover:border-white/30'
          }`}
      />
      {isFocused && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

const ContactSection = ({ lang }) => {
  const { t } = useTranslation(lang);

  const [openFaq, setOpenFaq] = useState(null);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [status, setStatus] = useState("");
  const [notification, setNotification] = useState(null);
  const [formProgress, setFormProgress] = useState(0);

  const canvasRef = useRef(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [captchaCode]);

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0fdf4');
    gradient.addColorStop(1, '#dcfce7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.beginPath();
    for (let i = 0; i < width; i += 20) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i + Math.random() * 10, height);
    }
    for (let i = 0; i < height; i += 20) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i + Math.random() * 10);
    }
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const chars = captchaCode.split('');
    const charWidth = width / (chars.length + 1);

    chars.forEach((char, i) => {
      ctx.save();
      const x = 20 + i * charWidth + (Math.random() - 0.5) * 15;
      const y = height / 2 + (Math.random() - 0.5) * 15;
      const angle = (Math.random() - 0.5) * 0.7;
      const scale = 0.8 + Math.random() * 0.4;

      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      const fonts = ['Arial', 'Verdana', 'Courier New', 'Georgia'];
      ctx.font = `bold ${28 + Math.random() * 10}px ${fonts[Math.floor(Math.random() * fonts.length)]}`;

      const hue = Math.floor(Math.random() * 360);
      ctx.fillStyle = `hsl(${hue}, 50%, 20%)`;
      ctx.transform(1, Math.random() * 0.3 - 0.15, Math.random() * 0.3 - 0.15, 1, 0, 0);
      ctx.shadowColor = "rgba(0,0,0,0.1)";
      ctx.shadowBlur = 4;
      ctx.fillText(char, 0, 0);

      ctx.restore();
    });

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
    updateProgress();
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val && !/^[6-9]/.test(val)) val = "";
    if (val.length > 10) val = val.slice(0, 10);
    e.target.value = val;
    updateProgress();
  };

  const updateProgress = () => {
    const form = document.querySelector('form');
    if (!form) return;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let filled = 0;
    inputs.forEach(input => {
      if (input.value.trim()) filled++;
    });
    setFormProgress((filled / inputs.length) * 100);
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
      setCaptchaInput("");
      setFormProgress(0);
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
    <section
      id="contact"
      className="py-6 md:py-8 bg-slate-50 relative overflow-hidden"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-[100px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(34,197,94,0.2)] p-6 sm:p-8 md:p-10 border border-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Hidden H1 for SEO if this is main contact page */}
          <h1 id="contact-heading" className="sr-only">
            {lang === 'ta' ? 'கிரீன் மிஸ்ட் - எங்களை தொடர்பு கொள்ளுங்கள்' : 'Contact Green Mist - Agricultural Drone Services'}
          </h1>

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4 sm:pt-8">
              {/* FAQ Section with Schema */}
              <motion.aside
                className="flex flex-col h-full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                aria-label="Frequently Asked Questions"
              >
                <div className="bg-gradient-to-br from-primary-50/80 to-emerald-50/80 border border-primary-100 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] h-full shadow-lg">

                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-black mb-6 sm:mb-8 text-primary-900 tracking-tight flex items-center gap-3"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {t("commonQuestions")}
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💡
                    </motion.span>
                  </h3>

                  <div className="space-y-3 sm:space-y-4" role="list">
                    {faqs.map((faq, i) => (
                      <article
                        key={i}
                        className={`border rounded-xl sm:rounded-[1.5rem] transition-all duration-300 overflow-hidden ${openFaq === i
                          ? 'border-primary-500 bg-white shadow-lg shadow-emerald-500/10'
                          : 'border-primary-100 bg-white/50 hover:bg-white hover:border-primary-200'
                          }`}
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full p-4 sm:p-5 flex justify-between items-center font-bold text-left"
                          aria-expanded={openFaq === i}
                          aria-controls={`faq-answer-${i}`}
                        >
                          <span
                            className="text-primary-900 uppercase tracking-tight text-xs sm:text-sm md:text-base font-black leading-snug pr-4"
                          >
                            {faq.q}
                          </span>
                          <motion.div
                            animate={{ rotate: openFaq === i ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaq === i ? 'bg-emerald-500 text-white' : 'bg-primary-100 text-primary-600'
                              }`}
                            aria-hidden="true"
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              id={`faq-answer-${i}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p
                                className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 leading-relaxed text-sm md:text-base font-medium"
                              >
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </article>
                    ))}
                  </div>
                </div>
              </motion.aside>

              {/* Enquiry Form */}
              <motion.div
                className="flex flex-col h-full"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gradient-to-br from-primary-700 to-primary-800 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] text-white shadow-2xl h-full flex flex-col justify-center relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl" />

                  {/* Progress bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                      animate={{ width: `${formProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-6 sm:mb-8 flex items-center gap-3 uppercase tracking-tight relative">
                    {t("quickInquiry")}
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Send className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                  </h3>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 sm:space-y-6 relative"
                    onChange={updateProgress}
                    aria-label="Contact inquiry form"
                    itemScope
                    itemType="https://schema.org/ContactAction"
                  >
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="contact-name" className="sr-only">{t("formName")}</label>
                        <FloatingInput
                          id="contact-name"
                          label={t("formName")}
                          icon={User}
                          name="Name"
                          required
                          onInput={handleNameChange}
                          placeholder={t("namePlaceholder") || "Enter your name"}
                          aria-required="true"
                        />
                      </div>
                      <div className="relative">
                        <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
                        <div className="flex bg-transparent border-2 border-white/10 rounded-xl items-center px-4 focus-within:border-emerald-500 transition-all">
                          <Phone className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span className="text-emerald-400 font-bold mr-2" aria-label="Country code">+91</span>
                          <input
                            id="contact-phone"
                            name="Mobile"
                            type="tel"
                            required
                            onInput={handlePhoneChange}
                            placeholder="0000000000"
                            pattern="[6-9][0-9]{9}"
                            className="w-full bg-transparent py-4 outline-none font-bold placeholder:text-white/40"
                            aria-required="true"
                            itemProp="telephone"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="contact-message" className="sr-only">Message</label>
                      <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-white/40" aria-hidden="true" />
                      <textarea
                        id="contact-message"
                        name="Message"
                        rows="3"
                        required
                        placeholder={t("messagePlaceholder") || "How can we help you?"}
                        className="w-full p-4 pl-12 rounded-xl bg-transparent border-2 border-white/10 focus:border-emerald-500 outline-none font-bold resize-none transition-all placeholder:text-white/40"
                        aria-required="true"
                      />
                    </div>

                    {/* Captcha */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 items-center bg-transparent p-4 rounded-2xl border border-white/10"
                      whileHover={{ borderColor: 'rgba(52, 211, 153, 0.5)' }}
                    >
                      <motion.canvas
                        ref={canvasRef}
                        width="180"
                        height="60"
                        onClick={generateCaptcha}
                        className="rounded-xl shadow-lg cursor-pointer bg-emerald-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      />
                      <motion.button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-2 text-emerald-400 hover:text-emerald-300"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <RefreshCcw />
                      </motion.button>
                      <input
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder="CODE"
                        className="w-full sm:w-32 p-3 rounded-xl bg-transparent border-2 border-white/10 uppercase font-black text-center tracking-widest focus:border-emerald-500 outline-none transition-all placeholder:text-white/40"
                      />
                    </motion.div>

                    <motion.button
                      disabled={status === "submitting"}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-primary-950 py-4 md:py-5 rounded-2xl font-black text-base md:text-xl uppercase tracking-widest transition-all shadow-xl disabled:opacity-50 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === "submitting" ? (
                          <motion.div
                            className="w-6 h-6 border-2 border-primary-950 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <>
                            {t("submit")}
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </>
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Contact Details Cards - Single Row */}
            <address
              className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-4xl mx-auto not-italic"
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <meta itemProp="name" content="GREENMIST Agriculture Drone" />

              <motion.div
                className="p-6 sm:p-8 border border-gray-100 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group hover:border-emerald-500 transition-all bg-white shadow-sm hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-emerald-50 text-emerald-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{t("whatsappLabel")}</p>
                  <div className="space-y-0.5">
                    <p className="font-black text-primary-950 text-sm sm:text-base md:text-lg">
                      <a href="tel:+917899978869" itemProp="telephone" className="hover:text-emerald-600 transition-colors">+91 78999 78869</a>
                    </p>
                    <p className="font-black text-primary-950 text-sm sm:text-base md:text-lg">
                      <a href="tel:+919150395864" itemProp="telephone" className="hover:text-emerald-600 transition-colors">+91 91503 95864</a>
                    </p>
                    <p className="font-black text-primary-950 text-sm sm:text-base md:text-lg">
                      <a href="tel:+919003992693" itemProp="telephone" className="hover:text-emerald-600 transition-colors">+91 90039 92693</a>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.a
                href="mailto:greenmist695@gmail.com"
                className="p-6 sm:p-8 border border-gray-100 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group hover:border-emerald-500 transition-all bg-white shadow-sm hover:shadow-xl cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-emerald-50 text-emerald-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{lang === 'ta' ? 'மின்னஞ்சல்' : 'Email'}</p>
                  <p className="font-black text-primary-950 text-sm sm:text-base md:text-lg" itemProp="email">greenmist695@gmail.com</p>
                </div>
              </motion.a>

              <motion.div
                className="p-6 sm:p-8 border border-gray-100 rounded-[1.5rem] sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 group hover:border-emerald-500 transition-all bg-white shadow-sm hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-emerald-50 text-emerald-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{t("locationLabel")}</p>
                  <p className="font-bold text-primary-950 text-sm sm:text-base md:text-lg leading-snug">
                    {lang === 'ta' ? (
                      <>
                        <span itemProp="streetAddress">மணிக்கம்பாளையம்</span><br />
                        <span itemProp="addressLocality">திருச்செங்கோடு</span>, <span itemProp="addressRegion">தமிழ்நாடு</span><br />
                        <span itemProp="postalCode">637202</span>, <span itemProp="addressCountry">இந்தியா</span>
                      </>
                    ) : (
                      <>
                        <span itemProp="streetAddress">Manickampalayam</span><br />
                        <span itemProp="addressLocality">Tiruchengode</span>, <span itemProp="addressRegion">Tamil Nadu</span><br />
                        <span itemProp="postalCode">637202</span>, <span itemProp="addressCountry">India</span>
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            </address>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
