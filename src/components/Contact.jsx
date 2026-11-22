import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../motion/motionVariants';
import SectionReveal from './SectionReveal';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaExternalLinkAlt, FaPaperPlane, FaCoffee, FaPhone } from 'react-icons/fa';
import { HiClock, HiLockClosed } from 'react-icons/hi';
import { ValidationError, useForm } from '@formspree/react';

const CONTACT_FORM_ID = __CONTACT_FORM_ID__;

const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'gourabghosh828@gmail.com', href: 'mailto:gourabghosh828@gmail.com' },
    { icon: FaPhone, label: 'Phone', value: '+91 98340 15328', href: 'tel:+919834015328' },
    { icon: FaGithub, label: 'GitHub', value: 'github.com/gourab-0', href: 'https://github.com/gourab-0' },
    { icon: FaLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/gourabghosh-zecuron', href: 'https://linkedin.com/in/gourabghosh-zecuron' },
    { icon: FaInstagram, label: 'Instagram', value: '@gourabghosh25_', href: 'https://instagram.com/gourabghosh25_' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Virar, Mumbai, India', href: null },
];

function ResponsePromise() {
    return (
        <div className="flex flex-col gap-3 w-full justify-center">
            <div className="flex items-center gap-4 mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-crimson)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#F8FAFC' }}>
                        Communication Protocol
                    </h3>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#CBD5E1' }}>
                        Direct and professional communication.
                    </p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg" style={{ background: '#111015', border: '1px solid rgba(195, 23, 62, 0.15)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(195,23,62,0.05)]">
                    <HiClock size={20} style={{ color: 'var(--color-crimson)' }} />
                </div>
                <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.1rem' }}>Response Time</p>
                    <p style={{ fontSize: '0.9rem', color: '#F8FAFC' }}>Usually within 24 hours</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg" style={{ background: '#111015', border: '1px solid rgba(195, 23, 62, 0.15)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(16,185,129,0.05)]">
                    <HiLockClosed size={20} style={{ color: '#10B981' }} />
                </div>
                <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.1rem' }}>Channel Security</p>
                    <p style={{ fontSize: '0.9rem', color: '#F8FAFC' }}>Verified email &amp; professional inbox</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg" style={{ background: '#111015', border: '1px solid rgba(195, 23, 62, 0.15)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(195,23,62,0.05)]">
                    <FaMapMarkerAlt size={18} style={{ color: 'var(--color-crimson)' }} />
                </div>
                <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.1rem' }}>Timezone</p>
                    <p style={{ fontSize: '0.9rem', color: '#F8FAFC' }}>Mumbai, India (IST UTC+5:30)</p>
                </div>
            </div>
        </div>
    );
}

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [focused, setFocused] = useState('');
    const [setupNotice, setSetupNotice] = useState('');
    const [formState, submitToFormspree, resetFormspree] = useForm(CONTACT_FORM_ID || 'pending-setup');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        if (!CONTACT_FORM_ID) {
            e.preventDefault();
            setSetupNotice('The website message form is not connected yet. Please try again after setup is complete.');
            return;
        }
        setSetupNotice('');
        submitToFormspree(e);
    };

    const handleSendAnother = () => {
        setForm({ name: '', email: '', message: '' });
        setSetupNotice('');
        resetFormspree();
    };

    const inputStyle = (field) => ({
        width: '100%',
        padding: '1rem 1.25rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.95rem',
        color: '#F8FAFC',
        background: '#111015',
        border: `1px solid ${focused === field ? 'var(--color-crimson)' : 'rgba(195, 23, 62, 0.15)'}`,
        borderRadius: '8px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxShadow: focused === field ? '0 0 12px rgba(195,23,62,0.1)' : 'none',
    });

    return (
        <SectionReveal id="contact" className="section-padding relative">
            <div className="content-wrap--wide">
                {/* Title */}
                <motion.div
                    className="text-center"
                    style={{ marginBottom: '4rem' }}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p
                        variants={fadeUp}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            color: 'var(--color-crimson)',
                            letterSpacing: '0.2em',
                            marginBottom: '1rem',
                            fontWeight: 600,
                        }}
                    >
                        {'// GET IN TOUCH'}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                            fontWeight: 700,
                            color: '#F8FAFC',
                            lineHeight: 1.1,
                            marginBottom: '1.25rem',
                        }}
                    >
                        <span style={{ color: '#F8FAFC' }}>Initiate </span>
                        <span style={{ color: 'var(--color-crimson)' }}>Handshake</span>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '1.05rem',
                            color: '#CBD5E1',
                        }}
                    >
                        Let's build something secure together.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2" style={{ width: '100%', gap: '2.5rem' }}>
                    {/* Form */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col"
                        style={{ gap: '2rem' }}
                    >
                        <motion.div variants={fadeUp} className="glass rounded-xl h-fit relative overflow-hidden" style={{ background: '#0B0A0D', border: '1px solid rgba(195, 23, 62, 0.15)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                            <div className="flex items-center mb-8" style={{ gap: '1rem' }}>
                                <div className="rounded-lg bg-[rgba(195,23,62,0.05)] border border-[rgba(195,23,62,0.15)] flex items-center justify-center shrink-0" style={{ width: '48px', height: '48px' }}>
                                    <FaEnvelope size={22} style={{ color: 'var(--color-crimson)' }} />
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: '#F8FAFC' }}>
                                        Send a Message
                                    </h3>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#CBD5E1' }}>
                                        I usually respond within 24 hours.
                                    </p>
                                </div>
                            </div>
                            
                            <AnimatePresence mode="wait">
                                {!formState.succeeded ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col"
                                        style={{ gap: '1.25rem' }}
                                        onSubmit={handleSubmit}
                                    >
                                        <div aria-hidden="true" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                                            <label htmlFor="contact-website">Leave this field empty</label>
                                            <input id="contact-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                                        </div>
                                        <input type="hidden" name="subject" value={`Portfolio message from ${form.name}`} />
                                        {!CONTACT_FORM_ID && (
                                            <p role="status" style={{ color: '#FBBF24', fontSize: '0.85rem', lineHeight: 1.5 }}>
                                                Direct form delivery will be enabled after the contact service is configured.
                                            </p>
                                        )}
                                        {setupNotice && <p role="alert" style={{ color: '#FCA5A5', fontSize: '0.85rem' }}>{setupNotice}</p>}
                                        <div>
                                            <label
                                                htmlFor="contact-name"
                                                style={{
                                                    display: 'block',
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.75rem',
                                                    color: '#CBD5E1',
                                                    marginBottom: '0.5rem',
                                                    letterSpacing: '0.1em',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                NAME
                                            </label>
                                            <input
                                                id="contact-name"
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                onFocus={() => setFocused('name')}
                                                onBlur={() => setFocused('')}
                                                placeholder="John Doe"
                                                required
                                                style={inputStyle('name')}
                                            />
                                            <ValidationError field="name" errors={formState.errors} prefix="Name" />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="contact-email"
                                                style={{
                                                    display: 'block',
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.75rem',
                                                    color: '#CBD5E1',
                                                    marginBottom: '0.5rem',
                                                    letterSpacing: '0.1em',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                EMAIL
                                            </label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                onFocus={() => setFocused('email')}
                                                onBlur={() => setFocused('')}
                                                placeholder="john@example.com"
                                                required
                                                style={inputStyle('email')}
                                            />
                                            <ValidationError field="email" errors={formState.errors} prefix="Email" />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="contact-message"
                                                style={{
                                                    display: 'block',
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.75rem',
                                                    color: '#CBD5E1',
                                                    marginBottom: '0.5rem',
                                                    letterSpacing: '0.1em',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                MESSAGE
                                            </label>
                                            <textarea
                                                id="contact-message"
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                onFocus={() => setFocused('message')}
                                                onBlur={() => setFocused('')}
                                                placeholder="Your message..."
                                                required
                                                style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '150px' }}
                                            />
                                            <ValidationError field="message" errors={formState.errors} prefix="Message" />
                                        </div>
                                        <ValidationError errors={formState.errors} prefix="Submission" />

                                        <button
                                            type="submit"
                                            disabled={!CONTACT_FORM_ID || formState.submitting}
                                            className="w-full flex items-center justify-center transition-all"
                                            style={{
                                                gap: '0.75rem',
                                                marginTop: '0.5rem',
                                                background: 'var(--color-crimson)',
                                                color: '#fff',
                                                padding: '0.85rem',
                                                fontFamily: 'var(--font-display)',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px',
                                                cursor: !CONTACT_FORM_ID || formState.submitting ? 'not-allowed' : 'pointer',
                                                opacity: !CONTACT_FORM_ID || formState.submitting ? 0.6 : 1,
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = '#F43F5E';
                                                e.currentTarget.style.boxShadow = '0 0 16px rgba(225, 29, 72, 0.2)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'var(--color-crimson)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <FaPaperPlane size={14} />
                                            {formState.submitting ? 'Sending…' : 'Send Message'}
                                        </button>
                                        <p style={{ color: '#8B8791', fontSize: '0.75rem', lineHeight: 1.5 }}>
                                            Formspree stores your submission and forwards it to my email. No email app is required.
                                        </p>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col items-center justify-center h-full text-center"
                                        style={{ gap: '1rem', minHeight: '300px' }}
                                    >
                                        <div style={{
                                            width: 64, height: 64, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)',
                                            border: '1px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 0 16px rgba(16, 185, 129, 0.1)'
                                        }}>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <div style={{ fontFamily: 'var(--font-mono)' }}>
                                            <p style={{ color: '#10B981', fontSize: '1.1rem', marginBottom: '0.5rem' }}>[✓] Message sent</p>
                                            <p style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>Thanks for reaching out. I’ll reply to the email address you provided.</p>
                                        </div>
                                        <button 
                                            onClick={handleSendAnother}
                                            className="transition-colors"
                                            style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#8B8791', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-crimson)'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#8B8791'}
                                        >
                                            &gt; Send another message
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Quote Box */}
                        <motion.div variants={fadeUp} className="glass rounded-xl h-fit relative overflow-hidden" style={{ background: '#0B0A0D', border: '1px solid rgba(195, 23, 62, 0.15)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                            <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div className="rounded bg-[rgba(195,23,62,0.05)] flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                                    <FaCoffee size={14} style={{ color: 'var(--color-crimson)' }} />
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#F8FAFC', letterSpacing: '0.05em', margin: 0 }}>
                                    LET'S BUILD SOMETHING
                                </h3>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <p>
                                    Great ideas often start with a good conversation &mdash;<br />
                                    preferably over coffee.
                                </p>
                                <p>
                                    Let's turn that conversation into something meaningful.
                                </p>
                                <p style={{ color: 'var(--color-crimson)', fontWeight: 600 }}>
                                    Ready when you are.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col"
                        style={{ gap: '2rem' }}
                    >
                        {/* Response Promise */}
                        <motion.div
                            variants={fadeUp}
                            className="glass rounded-xl"
                            style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', background: '#0B0A0D', border: '1px solid rgba(195, 23, 62, 0.15)' }}
                        >
                            <ResponsePromise />
                        </motion.div>

                        {/* Contact info */}
                        <motion.div variants={fadeUp} className="glass rounded-xl flex flex-col" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', gap: '1.25rem', background: '#0B0A0D', border: '1px solid rgba(195, 23, 62, 0.15)' }}>
                            <div className="flex items-center mb-4" style={{ gap: '1rem' }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-crimson)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#F8FAFC' }}>
                                        Connect With Me
                                    </h3>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#CBD5E1' }}>
                                        Find me on various platforms.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col" style={{ gap: '0.75rem' }}>
                                {contactInfo.map((item, i) => (
                                    item.href ? <a
                                        key={i}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? "_blank" : undefined}
                                        rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                        className="rounded-lg transition-all group"
                                        style={{ 
                                            display: 'grid',
                                            gridTemplateColumns: '44px minmax(0, 1fr) 24px',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1rem 1.25rem', 
                                            textDecoration: 'none', 
                                            background: '#111015', 
                                            border: '1px solid rgba(195, 23, 62, 0.15)' 
                                        }}
                                        onMouseEnter={e => {
                                            if(item.href) e.currentTarget.style.borderColor = 'rgba(195, 23, 62, 0.35)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'rgba(195, 23, 62, 0.15)';
                                        }}
                                    >
                                        <div className="rounded bg-[rgba(195,23,62,0.05)] flex items-center justify-center group-hover:text-[var(--color-crimson)] transition-all" style={{ width: '44px', height: '44px' }}>
                                            <item.icon size={20} style={{ color: 'var(--color-crimson)' }} />
                                        </div>
                                        <div className="flex flex-col justify-center overflow-hidden" style={{ gap: '0.15rem' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                {item.label}
                                            </span>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.value}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center" style={{ width: '24px', height: '24px' }}>
                                            {item.href && (
                                                <FaExternalLinkAlt size={14} className="text-[#8B8791] group-hover:text-[var(--color-crimson)] transition-colors" />
                                            )}
                                        </div>
                                    </a> : <div key={i} className="rounded-lg" style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr) 24px', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: '#111015', border: '1px solid rgba(195, 23, 62, 0.15)' }}>
                                        <div className="rounded bg-[rgba(195,23,62,0.05)] flex items-center justify-center" style={{ width: '44px', height: '44px' }}><item.icon size={20} style={{ color: 'var(--color-crimson)' }} /></div>
                                        <div className="flex flex-col justify-center overflow-hidden" style={{ gap: '0.15rem' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.value}</span>
                                        </div>
                                        <span aria-hidden="true" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    className="text-center"
                    style={{ borderTop: '1px solid rgba(195, 23, 62, 0.1)', marginTop: '5rem', paddingTop: '3rem', paddingBottom: '2rem' }}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center mb-6" style={{ gap: '1.5rem' }}>
                        <a aria-label="GitHub profile" href="https://github.com/gourab-0" target="_blank" rel="noopener noreferrer" className="text-[#8B8791] hover:text-[var(--color-crimson)] transition-colors">
                            <FaGithub size={22} />
                        </a>
                        <a aria-label="LinkedIn profile" href="https://linkedin.com/in/gourabghosh-zecuron" target="_blank" rel="noopener noreferrer" className="text-[#8B8791] hover:text-[var(--color-crimson)] transition-colors">
                            <FaLinkedin size={22} />
                        </a>
                        <a aria-label="Instagram profile" href="https://instagram.com/gourabghosh25_" target="_blank" rel="noopener noreferrer" className="text-[#8B8791] hover:text-[var(--color-crimson)] transition-colors">
                            <FaInstagram size={22} />
                        </a>
                    </div>
                    <p
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            color: '#8B8791',
                        }}
                    >
                        &copy; {new Date().getFullYear()}{' '}
                        <span style={{ color: '#F8FAFC' }}>GOURAB GHOSH</span>. All rights reserved.
                    </p>
                    <p
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: '#8B8791',
                            marginTop: '0.5rem',
                        }}
                    >
                        Built with Security First
                    </p>
                </motion.div>
            </div>
        </SectionReveal>
    );
}
