import React, { useState, useEffect, memo, Suspense } from 'react';
const PropTypes = { number: () => {}, string: () => {}, bool: () => {}, func: () => {}, object: () => {} };

// Hook to track window size for responsive styles
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    function onResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

// Navigation Bar component
const NavigationBar = memo(({ width }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = width < 641;
  const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'Features', to: 'features' },
    { name: 'Testimonials', to: 'testimonials' },
    { name: 'Calculator', to: 'calculator' },
    { name: 'FAQ', to: 'faq' }
  ];
  const styles = {
    nav: {
      position: 'fixed', top: 0, left: 0, width: '100%',
      backgroundColor: '#ffffff', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      padding: '0 20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000, height: '60px'
    },
    logo: { fontFamily: 'Georgia, serif', fontSize: '24px', color: '#205781', textDecoration: 'none' },
    menuIcon: { width: '30px', height: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' },
    bar: { width: '100%', height: '3px', backgroundColor: '#1a1a1a', transition: 'background-color 0.3s' },
    linksMobile: {
      display: menuOpen ? 'flex' : 'none', flexDirection: 'column',
      position: 'absolute', top: '60px', left: 0, width: '100%',
      backgroundColor: '#ffffff', padding: '10px 0'
    },
    linksDesktop: { display: 'flex', alignItems: 'center', gap: '20px' },
    link: {
      fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#1a1a1a',
      textDecoration: 'none', padding: '8px 12px', borderRadius: '4px',
      transition: 'background-color 0.3s'
    },
    cta: {
      backgroundColor: '#205781', color: '#ffffff', border: 'none',
      padding: '8px 16px', borderRadius: '4px', cursor: 'pointer',
      transition: 'background-color 0.3s'
    }
  };
  function scrollToSection(e, id) {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <header>
      <nav role="navigation" aria-label="Main navigation" style={styles.nav}>
        <a href="#hero" style={styles.logo} onClick={e => scrollToSection(e, 'hero')} aria-label="Logo">FinancePro</a>
        {isMobile ? (
          <>
            <div style={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" role="button" tabIndex={0}>
              <span style={styles.bar}></span>
              <span style={styles.bar}></span>
              <span style={styles.bar}></span>
            </div>
            <div style={styles.linksMobile}>
              {navItems.map(item => (
                <a key={item.to} href={`#${item.to}`} style={styles.link}
                   onClick={e => scrollToSection(e, item.to)}>{item.name}</a>
              ))}
              <button style={styles.cta} onClick={e => scrollToSection(e, 'calculator')}>Get Started</button>
            </div>
          </>
        ) : (
          <div style={styles.linksDesktop}>
            {navItems.map(item => (
              <a key={item.to} href={`#${item.to}`} style={styles.link}
                 onClick={e => scrollToSection(e, item.to)}>{item.name}</a>
            ))}
            <button style={styles.cta} onClick={e => scrollToSection(e, 'calculator')}>Get Started</button>
          </div>
        )}
      </nav>
    </header>
  );
});
NavigationBar.propTypes = { width: PropTypes.number };

// Hero Section
const Hero = memo(({ width }) => {
  const isMobile = width < 641;
  const styles = {
    section: {
      id: 'hero', paddingTop: '80px', textAlign: 'center',
      backgroundColor: '#F6F8D5', color: '#1a1a1a',
      padding: isMobile ? '80px 20px' : '120px 40px'
    },
    h1: { fontFamily: 'Georgia, serif', fontSize: isMobile ? '32px' : '48px', margin: '0 0 20px' },
    p: { fontFamily: 'Arial, sans-serif', fontSize: '18px', margin: '0 0 30px' },
    btnPrimary: {
      backgroundColor: '#205781', color: '#ffffff', border: 'none',
      padding: '12px 24px', borderRadius: '4px', cursor: 'pointer',
      marginRight: '10px', transition: 'background-color 0.3s'
    },
    btnSecondary: {
      backgroundColor: 'transparent', color: '#205781', border: '2px solid #205781',
      padding: '10px 22px', borderRadius: '4px', cursor: 'pointer',
      transition: 'background-color 0.3s, color 0.3s'
    }
  };
  function scrollToCalculator() {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <section id="hero" style={styles.section}>
      <h1 style={styles.h1}>Secure Your Financial Future Today</h1>
      <p style={styles.p}>With FinancePro's expert tools and guidance, you can plan, invest, and grow your wealth confidently.</p>
      <button style={styles.btnPrimary} onClick={scrollToCalculator} aria-label="Start using calculator">Start Calculating</button>
      <button style={styles.btnSecondary} onClick={scrollToCalculator} aria-label="Learn more about calculation">Learn More</button>
    </section>
  );
});
Hero.propTypes = { width: PropTypes.number };

// Features Section
const Features = memo(({ width }) => {
  const isMobile = width < 641;
  const features = [
    { icon: '📊', title: 'Real-time Analytics', desc: 'Get up-to-date insights on your portfolio.' },
    { icon: '🔒', title: 'Secure Platform', desc: 'Your data is encrypted and protected.' },
    { icon: '🤝', title: 'Expert Support', desc: 'Access professional financial advisors.' },
    { icon: '💡', title: 'Smart Recommendations', desc: 'AI-driven suggestions for your investments.' }
  ];
  const styles = {
    section: {
      id: 'features', padding: isMobile ? '60px 20px' : '80px 40px',
      backgroundColor: '#ffffff', color: '#1a1a1a', textAlign: 'center'
    },
    heading: { fontFamily: 'Georgia, serif', fontSize: '36px', marginBottom: '40px' },
    grid: {
      display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
      gap: '30px', maxWidth: '1000px', margin: '0 auto'
    },
    card: {
      padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'left', backgroundColor: '#F6F8D5'
    },
    icon: { fontSize: '40px', marginBottom: '20px' },
    title: { fontFamily: 'Arial, sans-serif', fontSize: '20px', marginBottom: '10px' },
    desc: { fontFamily: 'Arial, sans-serif', fontSize: '16px' }
  };
  return (
    <section id="features" style={styles.section}>
      <h2 style={styles.heading}>Our Key Benefits</h2>
      <div style={styles.grid}>
        {features.map((f, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.icon} aria-hidden="true">{f.icon}</div>
            <div style={styles.title}>{f.title}</div>
            <div style={styles.desc}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
});
Features.propTypes = { width: PropTypes.number };

// Social Proof Section
const Testimonials = memo(({ width }) => {
  const isMobile = width < 641;
  const testimonials = [
    { text: 'FinancePro changed the way I manage my investments.', name: 'Jane Doe', title: 'Entrepreneur' },
    { text: 'The insights are amazing and easy to understand.', name: 'John Smith', title: 'Investor' }
  ];
  const brands = ['AlphaCorp', 'BetaBank', 'GammaInvest'];
  const styles = {
    section: {
      id: 'testimonials', padding: isMobile ? '60px 20px' : '80px 40px',
      backgroundColor: '#F6F8D5', color: '#1a1a1a', textAlign: 'center'
    },
    heading: { fontFamily: 'Georgia, serif', fontSize: '36px', marginBottom: '40px' },
    testimonialGrid: {
      display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
      gap: '30px', maxWidth: '1000px', margin: '0 auto'
    },
    card: {
      backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'left'
    },
    text: { fontFamily: 'Arial, sans-serif', fontSize: '16px', marginBottom: '20px' },
    author: { fontFamily: 'Arial, sans-serif', fontSize: '14px', fontWeight: 'bold' },
    brands: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px' },
    brand: {
      backgroundColor: '#ffffff', padding: '10px 20px', borderRadius: '4px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif'
    }
  };
  return (
    <section id="testimonials" style={styles.section}>
      <h2 style={styles.heading}>Trusted by Leading Brands</h2>
      <div style={styles.testimonialGrid}>
        {testimonials.map((t, i) => (
          <div key={i} style={styles.card}>
            <p style={styles.text}>"{t.text}"</p>
            <p style={styles.author}>{t.name}, {t.title}</p>
          </div>
        ))}
      </div>
      <div style={styles.brands}>
        {brands.map((b, i) => <div key={i} style={styles.brand}>{b}</div>)}
      </div>
    </section>
  );
});
Testimonials.propTypes = { width: PropTypes.number };

// Call-to-Action Section
const CTASection = memo(({ width }) => {
  const isMobile = width < 641;
  const styles = {
    section: {
      id: 'cta', padding: isMobile ? '60px 20px' : '80px 40px',
      backgroundColor: '#205781', color: '#ffffff', textAlign: 'center'
    },
    heading: { fontFamily: 'Georgia, serif', fontSize: isMobile ? '28px' : '36px', marginBottom: '20px' },
    btn: {
      backgroundColor: '#F6F8D5', color: '#205781', border: 'none',
      padding: '12px 24px', borderRadius: '4px', cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    support: { fontFamily: 'Arial, sans-serif', fontSize: '14px', marginTop: '10px' }
  };
  return (
    <section id="cta" style={styles.section}>
      <h2 style={styles.heading}>Ready to Take Control of Your Finances?</h2>
      <button style={styles.btn} onClick={() => {
        const el = document.getElementById('calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} aria-label="Get started now">Get Started Now</button>
      <p style={styles.support}>No hidden fees. Cancel anytime.</p>
    </section>
  );
});
CTASection.propTypes = { width: PropTypes.number };

// Security & Trust Section
const SecurityTrustSection = memo(({ width }) => {
  const isMobile = width < 641;
  const badges = ['PCI DSS Compliant', 'ISO 27001 Certified', 'GDPR Compliant'];
  const styles = {
    section: {
      id: 'security', padding: isMobile ? '60px 20px' : '80px 40px',
      backgroundColor: '#ffffff', color: '#1a1a1a', textAlign: 'center'
    },
    heading: { fontFamily: 'Georgia, serif', fontSize: '36px', marginBottom: '40px' },
    badgeContainer: { display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', gap: '20px' },
    badge: {
      backgroundColor: '#F6F8D5', padding: '20px', borderRadius: '8px',
      fontFamily: 'Arial, sans-serif', fontSize: '16px'
    }
  };
  return (
    <section id="security" style={styles.section}>
      <h2 style={styles.heading}>Security & Trust</h2>
      <div style={styles.badgeContainer}>
        {badges.map((b, i) => <div key={i} style={styles.badge}>{b}</div>)}
      </div>
    </section>
  );
});
SecurityTrustSection.propTypes = { width: PropTypes.number };

// Calculator Component
function Calculator({ width }) {
  const isMobile = width < 641;
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const styles = {
    section: {
      id: 'calculator', padding: isMobile ? '60px 20px' : '80px 40px',
      backgroundColor: '#F6F8D5', color: '#1a1a1a'
    },
    heading: { fontFamily: 'Georgia, serif', fontSize: isMobile ? '28px' : '36px', textAlign: 'center', marginBottom: '40px' },
    form: { display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto', gap: '20px' },
    label: { fontFamily: 'Arial, sans-serif', fontSize: '16px' },
    input: {
      padding: '10px', fontSize: '16px', borderRadius: '4px',
      border: '1px solid #ccc', transition: 'border-color 0.3s'
    },
    btn: {
      backgroundColor: '#205781', color: '#ffffff', border: 'none',
      padding: '12px', borderRadius: '4px', cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    result: { fontFamily: 'Arial, sans-serif', fontSize: '18px', textAlign: 'center', marginTop: '20px' },
    error: { fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#dc2626', textAlign: 'center' }
  };
  function calculate(e) {
    e.preventDefault();
    setError('');
    const P = parseFloat(amount), r = parseFloat(rate) / 100 / 12, n = parseFloat(term) * 12;
    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      setError('Please enter valid positive numbers.');
      setResult(null);
      return;
    }
    const payment = (P * r) / (1 - Math.pow(1 + r, -n));
    setResult(payment.toFixed(2));
  }
  return (
    <section id="calculator" style={styles.section}>
      <h2 style={styles.heading}>Loan Payment Calculator</h2>
      <form style={styles.form} onSubmit={calculate} noValidate>
        <label style={styles.label}>Loan Amount ($)
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={styles.input} required aria-label="Loan amount" />
        </label>
        <label style={styles.label}>Annual Interest Rate (%)
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} style={styles.input} required aria-label="Annual interest rate" />
        </label>
        <label style={styles.label}>Term (years)
          <input type="number" value={term} onChange={e => setTerm(e.target.value)} style={styles.input} required aria-label="Term in years" />
        </label>
        <button type="submit" style={styles.btn} aria-label="Calculate payment">Calculate</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {result && <p style={styles.result}>Monthly Payment: ${result}</p>}
    </section>
  );
}
Calculator.propTypes = { width: PropTypes.number };

// Simple SVG Bar Chart Component
const Chart = memo(({ width }) => {
  const data = [50, 75, 100, 125, 150];
  const maxVal = Math.max(...data);
  const chartWidth = 500;
  const chartHeight = 200;
  const barWidth = chartWidth / data.length - 10;
  const styles = { display: 'block', margin: '0 auto', padding: '40px 0' };
  return (
    <svg width={chartWidth} height={chartHeight} style={styles} role="img" aria-label="Portfolio growth chart">
      {data.map((v, i) => {
        const h = (v / maxVal) * (chartHeight - 20);
        return <rect key={i}
          x={i * (barWidth + 10)} y={chartHeight - h}
          width={barWidth} height={h}
          fill="#4F959D" />;
      })}
    </svg>
  );
});
Chart.propTypes = { width: PropTypes.number };

// FAQ Section
const FAQSection = memo(({ width }) => {
  const isMobile = width < 641;
  const faqs = [
    { q: 'How secure is my data?', a: 'We use bank-level encryption and are fully PCI DSS compliant.' },
    { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time without penalties.' },
    { q: 'Do you offer customer support?', a: 'Our support team is available 24/7 via chat and email.' }
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const styles = {
    section: {
      id: 'faq', padding: isMobile ? '60px 20px' : '80px 40px',
      backgroundColor: '#ffffff', color: '#1a1a1a'
    },
    heading: { fontFamily: 'Georgia, serif', fontSize: '36px', textAlign: 'center', marginBottom: '40px' },
    item: { marginBottom: '20px', maxWidth: '800px', margin: '0 auto' },
    question: {
      fontFamily: 'Arial, sans-serif', fontSize: '18px', cursor: 'pointer',
      padding: '10px', backgroundColor: '#F6F8D5', borderRadius: '4px'
    },
    answer: {
      fontFamily: 'Arial, sans-serif', fontSize: '16px', padding: '10px 10px 10px 20px'
    }
  };
  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }
  return (
    <section id="faq" style={styles.section}>
      <h2 style={styles.heading}>Frequently Asked Questions</h2>
      {faqs.map((f, i) => (
        <div key={i} style={styles.item}>
          <div style={styles.question} onClick={() => toggle(i)} role="button" aria-expanded={openIndex === i}>
            {f.q}
          </div>
          {openIndex === i && <div style={styles.answer}>{f.a}</div>}
        </div>
      ))}
    </section>
  );
});
FAQSection.propTypes = { width: PropTypes.number };

// Main App Component
function App() {
  const { width } = useWindowSize();
  const LazyChart = React.lazy(() => Promise.resolve({ default: Chart })); // Lazy load chart
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', color: '#1a1a1a' }}>
      <NavigationBar width={width} />
      <main>
        <Hero width={width} />
        <Features width={width} />
        <Testimonials width={width} />
        <CTASection width={width} />
        <SecurityTrustSection width={width} />
        <Calculator width={width} />
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading chart...</div>}>
          <LazyChart width={width} />
        </Suspense>
        <FAQSection width={width} />
      </main>
      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#F6F8D5', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
        &copy; {new Date().getFullYear()} FinancePro. All rights reserved.
      </footer>
    </div>
  );
}

export default App;