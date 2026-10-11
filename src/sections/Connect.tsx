import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal, { WordReveal } from '../components/ui/Reveal';
import TornDivider from '../components/ui/TornDivider';
import { IconCheck, IconCopy } from '../components/ui/Icons';
import { contactInformation, socialLinks, teacherName } from '../data/portfolio';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { DURATION, EASE } from '../styles/motion';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 20;

function validate(values: FormValues): Partial<Record<keyof FormValues, string>> {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.name.trim()) errors.name = 'Please tell me your name.';
  if (!values.email.trim()) errors.email = 'An email address is needed for a reply.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That address does not look right.';
  if (!values.message.trim()) errors.message = 'A message, even a short one, helps.';
  else if (values.message.trim().length < MIN_MESSAGE)
    errors.message = `A little more detail, please — at least ${MIN_MESSAGE} characters.`;
  return errors;
}

/**
 * TODO: replace this placeholder with a real service — Formspree, EmailJS,
 * or your own API route. Example:
 *
 *   await fetch('https://formspree.io/f/XXXXXXXX', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(values),
 *   }).then((res) => { if (!res.ok) throw new Error('Request failed'); });
 *
 * Any thrown error switches the form into its error state.
 */
async function sendMessage(_values: FormValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return undefined;
}

/** Section 14 — "Let's Connect": details with copy buttons + a real form. */
export default function Connect() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const { copy: copyEmail, copied: emailCopied } = useCopyToClipboard();
  const { copy: copyPhone, copied: phoneCopied } = useCopyToClipboard();

  const handleChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      if (submitted) setErrors(validate(next)); // live re-validation after first attempt
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setSubmitted(true);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    try {
      await sendMessage(values);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues({ name: '', email: '', message: '' });
    setErrors({});
    setSubmitted(false);
    setStatus('idle');
  };

  const fieldProps = (field: keyof FormValues) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange(field),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  });

  return (
    <section id="connect" className="section connect" aria-labelledby="connect-title">
      <TornDivider top fill="var(--color-offwhite)" />

      <div className="section__inner">
        <header className="connect__header">
          <span className="section-eyebrow">chapter 14 — say hello</span>
          <h2 id="connect-title" className="section-title">
            <WordReveal as="span" text="Let's Connect" />
          </h2>
          <p className="section-lede">
            Questions about a project, a guest lesson, a reading circle of your
            own — the door is open.
          </p>
        </header>

        <div className="connect__grid">
          {/* Contact details */}
          <div className="connect__details">
            <Reveal as="address" className="contact-list" y={16}>
              <div className="contact-row">
                <span className="contact-row__label">Email</span>
                <span className="contact-row__value">
                  <a href={`mailto:${contactInformation.email}`}>{contactInformation.email}</a>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={() => void copyEmail(contactInformation.email)}
                    aria-label="Copy email address"
                  >
                    {emailCopied ? <IconCheck /> : <IconCopy />}
                    <span className="copy-btn__text">{emailCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </span>
              </div>

              <div className="contact-row">
                <span className="contact-row__label">Phone</span>
                <span className="contact-row__value">
                  <a href={`tel:${contactInformation.phone.replace(/[^+\d]/g, '')}`}>
                    {contactInformation.phone}
                  </a>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={() => void copyPhone(contactInformation.phone)}
                    aria-label="Copy phone number"
                  >
                    {phoneCopied ? <IconCheck /> : <IconCopy />}
                    <span className="copy-btn__text">{phoneCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </span>
              </div>

              <div className="contact-row">
                <span className="contact-row__label">Institution</span>
                <span className="contact-row__value">{contactInformation.institution}</span>
              </div>

              <div className="contact-row">
                <span className="contact-row__label">Location</span>
                <span className="contact-row__value">{contactInformation.location}</span>
              </div>

              <p className="sr-only" aria-live="polite">
                {emailCopied ? 'Email address copied to clipboard.' : ''}
                {phoneCopied ? 'Phone number copied to clipboard.' : ''}
              </p>
            </Reveal>

            <Reveal delay={140} y={14}>
              <ul className="socials">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      className="socials__link"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={120} y={22} className="connect__form-wrap">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className="form-success"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.base, ease: EASE }}
                  role="status"
                >
                  <span className="form-success__mark" aria-hidden="true">
                    <IconCheck />
                  </span>
                  <h3 className="form-success__title">Message sent</h3>
                  <p className="form-success__text">
                    Thank you, {values.name.trim() || 'friend'} — your note has landed
                    on the desk. Expect a reply within a couple of days.
                  </p>
                  <button type="button" className="btn btn--ghost" onClick={reset}>
                    Write another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={false}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                >
                  <div className="form__field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      {...fieldProps('name')}
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                    />
                    {errors.name && (
                      <p className="form__error" id="contact-name-error" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="form__field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      {...fieldProps('email')}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                    />
                    {errors.email && (
                      <p className="form__error" id="contact-email-error" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="form__field">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      {...fieldProps('message')}
                      rows={5}
                      placeholder={`A note for ${teacherName.split(' ')[0]}…`}
                      required
                    />
                    {errors.message && (
                      <p className="form__error" id="contact-message-error" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <p className="form__error form__error--form" role="alert">
                      Something went wrong sending your message. Please try again,
                      or email directly — the address is just to the left.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn--solid"
                    disabled={status === 'sending'}
                    aria-busy={status === 'sending' ? true : undefined}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="btn__spinner" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
