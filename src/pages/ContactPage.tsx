import React, { useState } from 'react';
import { saveContactMessage } from '../utils/storage';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  Mail,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format (e.g., you@example.com).';
    }
    if (!subject.trim()) errs.subject = 'Subject is required.';
    if (!message.trim()) {
      errs.message = 'Please type your message.';
    } else if (message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const saved = saveContactMessage({
      fullName: fullName.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    setSubmittedId(saved.id);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Get in Touch</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Contact Lanka Trip Guide
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Have feedback, destination questions, or suggestions? Send us your inquiry using our frontend contact form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Official Contact & Advisory Info */}
          <div className="space-y-6">
            {/* Sri Lanka Official Tourism Helpline */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-700" />
                <span>Sri Lanka Tourism Support</span>
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                For in-country emergency tourist assistance, safety advisories, and official travel guidelines, utilize the official national hotlines:
              </p>
              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                    Tourism Helpline (Toll-Free in SL)
                  </div>
                  <div className="text-lg font-mono font-bold text-emerald-800 mt-0.5">
                    1912
                  </div>
                  <div className="text-[11px] text-stone-500">24/7 Multi-lingual assistance</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                    National Emergency Ambulance
                  </div>
                  <div className="text-lg font-mono font-bold text-emerald-800 mt-0.5">
                    1990
                  </div>
                  <div className="text-[11px] text-stone-500">Suwa Seriya Free Ambulance</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                    Tourist Police Headquarters
                  </div>
                  <div className="font-mono font-semibold text-stone-800 mt-0.5">
                    +94 11 242 1052
                  </div>
                </div>
              </div>
            </div>

            {/* Note on Frontend-Only Data */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Local Storage Notice</span>
              </div>
              <p className="leading-relaxed">
                Because this application runs entirely client-side without a backend database or mail server, submitted messages are saved locally in your current web browser and are not emailed to anyone.
              </p>
            </div>
          </div>

          {/* Right 2 Columns: Validated Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-stone-500 mb-6">
                Fill in the details below. All fields with * are required.
              </p>

              {submittedId ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-emerald-950">
                    Message Stored Successfully!
                  </h3>
                  <p className="text-xs text-emerald-900 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{fullName}</strong>. Your message reference ID is{' '}
                    <strong className="font-mono">{submittedId}</strong>.
                  </p>
                  <p className="text-xs text-stone-600 bg-white/80 p-3 rounded-xl border border-emerald-100 max-w-md mx-auto italic">
                    Note: This message is stored locally in your browser’s localStorage. No real email is dispatched since this is a demonstration frontend application.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedId(null);
                        setFullName('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="px-6 py-2.5 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-xl hover:bg-emerald-100 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Maya Fernando"
                        className="w-full px-4 py-2.5 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                      />
                      {errors.fullName && (
                        <span className="text-[11px] text-rose-600 mt-1 block">{errors.fullName}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. maya@example.com"
                        className="w-full px-4 py-2.5 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-600 mt-1 block">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Inquiry about scenic hill country train travel"
                      className="w-full px-4 py-2.5 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                    />
                    {errors.subject && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.subject}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message, query, or feedback here..."
                      className="w-full px-4 py-2.5 text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-stone-900"
                    />
                    {errors.message && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] rounded-xl shadow-xs transition-colors"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Submit Message (Local Demo)</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
