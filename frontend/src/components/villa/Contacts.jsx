import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarDays, ExternalLink, Loader2, Mail, Zap } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const PRIVACY_POLICY_URL = "https://www.iubenda.com/privacy-policy/39297685";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

const INITIAL_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  dateFrom: undefined,
  dateTo: undefined,
  message: "",
  privacy: false,
};

const DatePicker = ({ label, name, value, onChange, disabledBefore, placeholder, testId }) => (
  <div>
    <label className="text-[10px] uppercase tracking-luxury text-ivory/50" htmlFor={`${name}-trigger`}>
      {label}
    </label>
    <Popover>
      <PopoverTrigger asChild>
        <button
          id={`${name}-trigger`}
          type="button"
          data-testid={testId}
          className="mt-2 flex w-full items-center justify-between gap-3 border-b border-ivory/20 bg-transparent py-2 text-left font-light text-ivory transition-colors hover:border-ivory/40 focus:border-champagne focus:outline-none"
        >
          <span className={value ? "text-ivory" : "text-ivory/30"}>
            {value ? format(value, "dd / MM / yyyy") : placeholder}
          </span>
          <CalendarDays size={16} strokeWidth={1.25} className="shrink-0 text-champagne" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto border-champagne/30 bg-ivory p-0 text-charcoal shadow-2xl">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) => date < disabledBefore}
          initialFocus
          classNames={{
            day_selected: "bg-charcoal text-ivory hover:bg-charcoal hover:text-ivory focus:bg-charcoal focus:text-ivory",
            day_today: "bg-champagne/20 text-charcoal",
          }}
        />
      </PopoverContent>
    </Popover>
    <input type="hidden" name={name} value={value ? format(value, "yyyy-MM-dd") : ""} />
  </div>
);

const Contacts = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    const { checked, name, type, value } = e.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    if (status !== "idle") setStatus("idle");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: new FormData(formElement),
      });
      const result = await response.json();

      if (!response.ok || !result.success) throw new Error(result.message || "Web3Forms submission failed");

      setForm(INITIAL_FORM);
      formElement.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const channels = [
    {
      icon: Mail,
      label: t.contact.channels.email,
      value: VILLA.contact.email,
      href: `mailto:${VILLA.contact.email}`,
      testid: "contact-email",
    },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="relative bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mx-auto mb-14 max-w-2xl text-center lg:mb-20"
        >
          <p className="text-overline mb-5 text-champagne">{t.contact.eyebrow}</p>
          <h2 data-testid="contact-title" className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-charcoal sm:text-5xl lg:text-[3.25rem]">
            {t.contact.title}
          </h2>
          <p className="mt-7 text-base font-light leading-relaxed text-charcoal-muted">{t.contact.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 bg-charcoal text-ivory lg:grid-cols-5"
        >
          <div className="border-b border-ivory/10 p-8 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-12">
            <h3 className="font-serif text-2xl font-light text-ivory">{VILLA.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-luxury text-ivory/55">{VILLA.contact.address}</p>
            <a
              href={VILLA.booking.airbnb}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-airbnb-primary"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-champagne px-7 py-4 text-[11px] font-medium uppercase tracking-luxury-wide text-charcoal transition-colors hover:bg-ivory"
            >
              {t.contact.channels.airbnb} <ExternalLink size={13} strokeWidth={1.5} />
            </a>
            {VILLA.booking.instantBook && (
              <p className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-luxury-wide text-champagne-light">
                <Zap size={11} strokeWidth={1.5} /> {t.contact.channels.instantBook}
              </p>
            )}
            <div className="luxury-divider mb-7 mt-9" />
            <div className="space-y-6">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.testid}
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    data-testid={channel.testid}
                    className="group flex items-start gap-4"
                  >
                    <Icon size={17} strokeWidth={1} className="mt-1 shrink-0 text-champagne" />
                    <div>
                      <p className="text-[10px] uppercase tracking-luxury text-ivory/50">{channel.label}</p>
                      <p className="mt-0.5 text-sm font-light text-ivory transition-colors group-hover:text-champagne">{channel.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-8 sm:p-10 lg:col-span-3 lg:p-12" data-testid="contact-form">
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value="Nuova richiesta da Villa La Valle" />
            <input type="hidden" name="from_name" value="Villa La Valle" />
            <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" aria-hidden="true" />

            <p className="mb-6 text-[10px] uppercase tracking-luxury-wide text-champagne-light">{t.cta.secondary}</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-first-name" className="text-[10px] uppercase tracking-luxury text-ivory/50">
                  {t.contact.form.name}
                </label>
                <input
                  id="contact-first-name"
                  required
                  name="first_name"
                  value={form.first_name}
                  onChange={onChange}
                  data-testid="form-first-name"
                  className="mt-2 w-full border-b border-ivory/20 bg-transparent py-2 font-light text-ivory outline-none transition-colors focus:border-champagne"
                />
              </div>
              <div>
                <label htmlFor="contact-last-name" className="text-[10px] uppercase tracking-luxury text-ivory/50">
                  {t.contact.form.surname}
                </label>
                <input
                  id="contact-last-name"
                  required
                  name="last_name"
                  value={form.last_name}
                  onChange={onChange}
                  data-testid="form-last-name"
                  className="mt-2 w-full border-b border-ivory/20 bg-transparent py-2 font-light text-ivory outline-none transition-colors focus:border-champagne"
                />
              </div>
              <div>
                <label htmlFor="contact-email-input" className="text-[10px] uppercase tracking-luxury text-ivory/50">
                  {t.contact.form.email}
                </label>
                <input
                  id="contact-email-input"
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  data-testid="form-email"
                  className="mt-2 w-full border-b border-ivory/20 bg-transparent py-2 font-light text-ivory outline-none transition-colors focus:border-champagne"
                />
              </div>
              <div>
                <label htmlFor="contact-phone-input" className="text-[10px] uppercase tracking-luxury text-ivory/50">
                  {t.contact.form.phone} <span className="normal-case text-ivory/30">{t.contact.form.phoneOptional}</span>
                </label>
                <input
                  id="contact-phone-input"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  data-testid="form-phone"
                  className="mt-2 w-full border-b border-ivory/20 bg-transparent py-2 font-light text-ivory outline-none transition-colors focus:border-champagne"
                />
              </div>
              <div className="sm:col-span-2">
                <p className="mb-1 text-[10px] uppercase tracking-luxury text-ivory/50">{t.contact.form.dates}</p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <DatePicker
                    label={t.contact.form.dateFrom}
                    name="date_from"
                    value={form.dateFrom}
                    onChange={(date) =>
                      setForm((current) => ({
                        ...current,
                        dateFrom: date,
                        dateTo: current.dateTo && date > current.dateTo ? undefined : current.dateTo,
                      }))
                    }
                    disabledBefore={today}
                    placeholder={t.contact.form.selectDate}
                    testId="form-date-from"
                  />
                  <DatePicker
                    label={t.contact.form.dateTo}
                    name="date_to"
                    value={form.dateTo}
                    onChange={(date) => setForm((current) => ({ ...current, dateTo: date }))}
                    disabledBefore={form.dateFrom || today}
                    placeholder={t.contact.form.selectDate}
                    testId="form-date-to"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="text-[10px] uppercase tracking-luxury text-ivory/50">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="contact-message"
                  required
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  data-testid="form-message"
                  className="mt-2 w-full resize-none border-b border-ivory/20 bg-transparent py-2 font-light text-ivory outline-none transition-colors focus:border-champagne"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-xs font-light leading-relaxed text-ivory/65">
                  <input
                    required
                    type="checkbox"
                    name="privacy"
                    value="accepted"
                    checked={form.privacy}
                    onChange={onChange}
                    data-testid="form-privacy"
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#C5A059]"
                  />
                  <span>
                    {t.contact.form.privacyPrefix}{" "}
                    <a
                      href={PRIVACY_POLICY_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-champagne underline decoration-champagne/50 underline-offset-4 transition-colors hover:text-ivory"
                    >
                      {t.contact.form.privacyLink}
                    </a>
                    .
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              data-testid="form-submit"
              className="mt-9 inline-flex items-center gap-3 bg-ivory px-9 py-4 text-[11px] font-medium uppercase tracking-luxury-wide text-charcoal transition-colors hover:bg-champagne disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" && <Loader2 size={14} className="animate-spin" />}
              {status === "sending" ? t.contact.form.sending : t.contact.form.submit} {status !== "sending" && "→"}
            </button>

            <div aria-live="polite">
              {status === "success" && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} data-testid="form-success" className="mt-6 text-sm font-light text-champagne-light">
                  {t.contact.form.success}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} data-testid="form-error" className="mt-6 text-sm font-light text-red-300">
                  {t.contact.form.error}
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;
