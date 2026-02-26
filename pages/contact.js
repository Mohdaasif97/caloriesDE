import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('Bitte füllen Sie alle Felder aus.');
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      setLoading(false);
      return;
    }

    try {
      // Send email via API route
      const response = await fetch('https://formspree.io/f/mnjbwoyk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.error || 'Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.');
      }
    } catch (err) {
      setError('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Kontakt - Kalorienrechner</title>
        <meta name="description" content="Kontaktieren Sie uns für Fragen und Anliegen zum Kalorienrechner." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Kontakt - Kalorienrechner" />
        <meta property="og:description" content="Kontaktieren Sie uns für Fragen und Anliegen zum Kalorienrechner." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kalorienrechner9.de/contact" />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.title}>Kontakt</h1>
        <p className={styles.subtitle}>Haben Sie Fragen oder Anliegen? Kontaktieren Sie uns gerne!</p>

        <div className={styles.contactForm}>
          {submitted && (
            <div className={styles.successMessage}>
              ✅ Vielen Dank! Ihre Nachricht wurde erfolgreich versendet. Wir werden uns in Kürze bei Ihnen melden.
            </div>
          )}

          {error && (
            <div className={styles.errorMessage}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ihr Name"
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-Mail-Adresse *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ihre E-Mail-Adresse"
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Betreff *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Betreff Ihrer Nachricht"
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Nachricht *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Ihre Nachricht..."
                rows="6"
                disabled={loading}
              ></textarea>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Wird versendet...' : 'Nachricht senden'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
