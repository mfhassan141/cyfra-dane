import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, Calendar, Mail, Menu, X, ChevronDown, Check, 
  MapPin, Clock, Phone, AlertCircle, Info, Database, Zap, Shield, HelpCircle, 
  BarChart, ArrowDown, ExternalLink, Globe, Layers, Cpu, Server, Play
} from 'lucide-react';

// ==========================================
// SEO & Schema Helper
// ==========================================
const Helmet = ({ title, description, schema, breadcrumbs }) => {
  useEffect(() => {
    if (title) document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || "Specialist Databricks and Data Engineering consultancy helping UK businesses build scalable, secure, and AI-ready data platforms.";

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'index, follow';

    // Inject Schemas
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(s => s.remove());

    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    if (breadcrumbs) {
      const bScript = document.createElement('script');
      bScript.type = 'application/ld+json';
      bScript.innerHTML = JSON.stringify(breadcrumbs);
      document.head.appendChild(bScript);
    }
  }, [title, description, schema, breadcrumbs]);

  return null;
};

// Scroll to Top on Route Change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ==========================================
// SHARED COMPONENTS
// ==========================================

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const closeAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navLinks = [
    {
      name: 'Databricks Consulting',
      path: '/databricks-consulting/',
      dropdown: [
        { name: 'Overview', path: '/databricks-consulting/' },
        { name: 'Databricks Implementation', path: '/databricks-consulting/databricks-implementation/' },
        { name: 'Databricks Migration', path: '/databricks-consulting/databricks-migration/' },
        { name: 'Databricks Optimisation', path: '/databricks-consulting/databricks-optimization/' },
        { name: 'Delta Lake Consulting', path: '/databricks-consulting/delta-lake-consulting/' },
        { name: 'Spark Consulting', path: '/databricks-consulting/spark-consulting/' },
        { name: 'Managed Services', path: '/databricks-consulting/databricks-managed-services/' }
      ]
    },
    {
      name: 'Data Engineering',
      path: '/data-engineering-services/',
      dropdown: [
        { name: 'Overview', path: '/data-engineering-services/' },
        { name: 'Pipeline Development', path: '/data-engineering-services/data-pipeline-development/' },
        { name: 'ETL/ELT Development', path: '/data-engineering-services/etl-development/' },
        { name: 'Data Quality', path: '/data-engineering-services/data-quality/' },
        { name: 'Data Warehouse', path: '/data-engineering-services/data-warehouse-consulting/' }
      ]
    },
    { name: 'Data Platform', path: '/data-platform-solutions/' },
    { name: 'Migration', path: '/data-migration/' },
    {
      name: 'Industries',
      path: '#',
      dropdown: [
        { name: 'Finance', path: '/industries/finance-data-engineering/' },
        { name: 'Healthcare', path: '/industries/healthcare-data-engineering/' },
        { name: 'Retail', path: '/industries/retail-data-engineering/' },
        { name: 'Manufacturing', path: '/industries/manufacturing-data-engineering/' },
        { name: 'SaaS', path: '/industries/saas-data-engineering/' }
      ]
    },
    { name: 'Resources', path: '/resources/' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      height: '68px',
      backgroundColor: '#0A1628',
      zIndex: 1000,
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* Logo */}
        <Link to="/" onClick={closeAll} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#1E6FFF',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontSize: '16px',
            fontFamily: 'var(--heading)'
          }}>CD</div>
          <span style={{
            fontFamily: 'var(--heading)',
            fontSize: '20px',
            fontWeight: '700',
            color: '#FFFFFF'
          }}>
            Cyfra <span style={{ color: '#00C4A0' }}>Dane</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', gap: '20px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <div key={link.name} style={{ position: 'relative' }} className="nav-dropdown-wrapper">
              {link.dropdown ? (
                <button 
                  onClick={() => toggleDropdown(link.name)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 12px'
                  }}
                >
                  {link.name} <ChevronDown size={14} />
                </button>
              ) : (
                <Link 
                  to={link.path}
                  style={{
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '500',
                    padding: '8px 12px'
                  }}
                >
                  {link.name}
                </Link>
              )}

              {link.dropdown && activeDropdown === link.name && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#0F2040',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px 0',
                  minWidth: '220px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      onClick={closeAll}
                      style={{
                        color: 'rgba(255,255,255,0.8)',
                        padding: '8px 20px',
                        fontSize: '14px',
                        transition: 'all 0.2s'
                      }}
                      className="dropdown-item"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'none', alignItems: 'center', gap: '20px' }} className="desktop-nav">
          <a href="mailto:hello@cyfradane.co.uk" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={14} /> hello@cyfradane.co.uk
          </a>
          <Link to="/book-assessment/" className="btn btn-teal" style={{ padding: '8px 16px', fontSize: '14px' }}>
            Book Assessment
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'block'
          }}
          className="mobile-menu-trigger"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '68px',
          left: 0,
          right: 0,
          backgroundColor: '#0A1628',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          maxHeight: 'calc(100vh - 68px)',
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 999
        }}>
          {navLinks.map((link) => (
            <div key={link.name} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {link.dropdown ? (
                <>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {link.name}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                    {link.dropdown.map((sub) => (
                      <Link key={sub.name} to={sub.path} onClick={closeAll} style={{ color: '#FFFFFF', fontSize: '15px' }}>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link to={link.path} onClick={closeAll} style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '500' }}>
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="mailto:hello@cyfradane.co.uk" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} /> hello@cyfradane.co.uk
            </a>
            <Link to="/book-assessment/" onClick={closeAll} className="btn btn-teal" style={{ width: '100%' }}>
              Book Assessment
            </Link>
          </div>
        </div>
      )}

      {/* Inline styles helper for responsive desktop nav */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-trigger { display: none !important; }
        }
        .dropdown-item:hover {
          color: #00C4A0 !important;
          background-color: rgba(255,255,255,0.02);
        }
      `}</style>
    </header>
  );
};

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0A1628', color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '60px 0 30px 0' }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#1E6FFF',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#FFFFFF',
                fontSize: '14px'
              }}>CD</div>
              <span style={{ fontFamily: 'var(--heading)', fontSize: '18px', fontWeight: '700', color: '#FFFFFF' }}>
                Cyfra <span style={{ color: '#00C4A0' }}>Dane</span>
              </span>
            </Link>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Specialist Databricks and Data Engineering consultancy helping UK businesses build scalable, secure, and AI-ready data platforms.
            </p>
            <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>United Kingdom · Remote-first</div>
              <a href="mailto:hello@cyfradane.co.uk" style={{ color: '#00C4A0' }}>hello@cyfradane.co.uk</a>
            </div>
          </div>

          {/* Links 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '15px' }}>Databricks</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <Link to="/databricks-consulting/">Databricks Consulting</Link>
              <Link to="/databricks-consulting/databricks-implementation/">Implementation</Link>
              <Link to="/databricks-consulting/databricks-migration/">Migration</Link>
              <Link to="/databricks-consulting/delta-lake-consulting/">Delta Lake</Link>
              <Link to="/databricks-consulting/databricks-managed-services/">Managed Services</Link>
            </div>
          </div>

          {/* Links 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '15px' }}>Data Engineering</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <Link to="/data-engineering-services/">Data Engineering</Link>
              <Link to="/data-engineering-services/data-pipeline-development/">Pipeline Development</Link>
              <Link to="/data-engineering-services/etl-development/">ETL/ELT</Link>
              <Link to="/data-migration/">Data Migration</Link>
              <Link to="/data-platform-solutions/">Lakehouse Architecture</Link>
            </div>
          </div>

          {/* Links 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '15px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <Link to="/resources/">Resources & Blog</Link>
              <Link to="/book-assessment/">Free Assessment</Link>
              <Link to="/contact/">Contact</Link>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '30px 0' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '13px' }}>
          <div>© 2025 Cyfra Dane Ltd. All rights reserved. Registered in England and Wales.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy</span>
            <span>Cookies</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname === '/book-assessment/' || !isVisible) {
    return null;
  }

  return (
    <Link 
      to="/book-assessment/" 
      className="btn btn-electric"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 900,
        boxShadow: '0 6px 24px rgba(30,111,255,.45)',
        gap: '8px',
        padding: '14px 22px'
      }}
    >
      <Calendar size={18} /> Book Assessment
    </Link>
  );
};

// ==========================================
// GENERIC SUB-SERVICE RENDERER (Clean fallback routing)
// ==========================================
const SubServiceDetail = ({ serviceName, subtitle, checklist, price, processSteps }) => {
  const defaultChecklist = [
    "Expert configuration tailored to UK workloads",
    "Security & compliance configuration aligning to enterprise specs",
    "Complete pipeline blueprint and execution pipelines"
  ];
  return (
    <div style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '14px', color: '#1E6FFF', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Service Detail</span>
          <h1 style={{ fontSize: '36px', marginTop: '10px' }}>{serviceName}</h1>
          <p style={{ color: '#718096', fontSize: '18px', marginTop: '12px' }}>{subtitle}</p>
        </div>

        <div className="grid-2" style={{ alignItems: 'start', gap: '48px', marginBottom: '60px' }}>
          <div style={{ backgroundColor: '#F8F9FC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>What's Included:</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              {(checklist || defaultChecklist).map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                  <Check size={18} style={{ color: '#00C4A0', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ color: '#2D3748' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justify: 'center', height: '100%' }}>
            <div style={{ fontSize: '14px', color: '#00C4A0', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Project Cost</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>{price || "From £15,000"}</div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '24px' }}>
              Fixed price engagement with defined deliverables. UK-based certified consultants.
            </p>
            <Link to="/book-assessment/" className="btn btn-teal" style={{ alignSelf: 'start' }}>
              Book Free Data Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// FAQ ACCORDION COMPONENT
// ==========================================
const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
      {faqs.map((faq, idx) => (
        <div key={idx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
          <button 
            onClick={() => toggle(idx)}
            style={{
              width: '100%',
              padding: '20px 24px',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontWeight: '600', fontSize: '16px', color: '#0A1628' }}>{faq.q}</span>
            <ChevronDown size={18} style={{ transform: openIndex === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {openIndex === idx && (
            <div style={{ padding: '0 24px 20px 24px', color: '#718096', fontSize: '15px', borderTop: '1px solid #F8F9FC', paddingTop: '10px' }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ==========================================
// GENERIC FORM WRAPPER
// ==========================================
const ContactForm = ({ successText }) => {
  const [formData, setFormData] = useState({ name: '', company: '', role: '', email: '', interest: '', challenge: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div style={{ backgroundColor: '#E8F0FF', border: '2px solid #1E6FFF', padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
        <Check size={48} style={{ color: '#00C4A0', margin: '0 auto 16px auto' }} />
        <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Request Received</h3>
        <p style={{ color: '#2D3748' }}>{successText || "✓ Request received — we will be in touch within 1 business day"}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Full Name *</label>
        <input 
          type="text" 
          required 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Company *</label>
          <input 
            type="text" 
            required 
            value={formData.company} 
            onChange={(e) => setFormData({...formData, company: e.target.value})} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Role *</label>
          <input 
            type="text" 
            required 
            value={formData.role} 
            onChange={(e) => setFormData({...formData, role: e.target.value})} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} 
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Work Email *</label>
        <input 
          type="email" 
          required 
          value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Primary Interest *</label>
        <select 
          required 
          value={formData.interest} 
          onChange={(e) => setFormData({...formData, interest: e.target.value})} 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}
        >
          <option value="">Select an option</option>
          <option value="Databricks Implementation">Databricks Implementation</option>
          <option value="Databricks Migration">Databricks Migration</option>
          <option value="Databricks Optimisation">Databricks Optimisation</option>
          <option value="Delta Lake / Spark Consulting">Delta Lake / Spark Consulting</option>
          <option value="Data Pipeline Development">Data Pipeline Development</option>
          <option value="Managed Data Engineering Services">Managed Data Engineering Services</option>
          <option value="Data Architecture Assessment">Data Architecture Assessment</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Data Challenges & Scope</label>
        <textarea 
          rows="4" 
          value={formData.challenge} 
          onChange={(e) => setFormData({...formData, challenge: e.target.value})} 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} 
        />
      </div>

      <button type="submit" className="btn btn-electric" style={{ width: '100%' }}>
        Request Free Assessment
      </button>

      <span style={{ fontSize: '12px', color: '#718096', textAlign: 'center' }}>
        We respond within 1 business day. GDPR compliant.
      </span>
    </form>
  );
};

// ==========================================
// PAGE 1: HOMEPAGE (/)
// ==========================================
const Homepage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cyfra Dane",
    "url": "https://cyfradane.co.uk",
    "description": "Specialist Databricks and Data Engineering consultancy for UK businesses.",
    "address": {"@type": "PostalAddress", "addressCountry": "GB"},
    "contactPoint": {"@type": "ContactPoint", "contactType": "sales", "email": "hello@cyfradane.co.uk"},
    "knowsAbout": ["Databricks", "Data Engineering", "Apache Spark", "Delta Lake", "Data Lakehouse", "ETL Development", "Data Migration"]
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://cyfradane.co.uk"}
    ]
  };

  const faqs = [
    {
      q: "What exactly does a Databricks consultant do?",
      a: "Our Databricks consultants set up your secure workspaces, build ETL data pipelines using Delta Lake, configure Unity Catalog for compliance, and design your Medallion (Bronze/Silver/Gold) architecture. We focus on optimising clusters to ensure you aren't overspending while maintaining performance standards required for modern Business Intelligence (BI) and AI tools."
    },
    {
      q: "How long does a Databricks implementation take?",
      a: "A typical Databricks implementation with basic pipeline automation and BI dashboard configuration takes 8 to 16 weeks depending on data volume. Smaller data architecture assessments can be delivered in 1 to 3 weeks to define standard recommendations."
    },
    {
      q: "Is Databricks better than Snowflake for UK businesses?",
      a: "Databricks excels in machine learning, streaming, and large-scale data engineering projects because of its native integration with Apache Spark. Snowflake is historically better for SQL-only workloads. If your roadmap includes predictive analytics, data science, or structured AI, Databricks is the ideal platform choice."
    },
    {
      q: "Do you offer a free initial consultation?",
      a: "Yes, we offer a free 45-minute data architecture assessment call with a senior Databricks consultant. We review your current systems, identify major bottlenecks, and outline a fixed-price proposal within 5 business days."
    },
    {
      q: "What UK industries do you serve?",
      a: "We work extensively across the financial services, retail, healthcare, manufacturing, and SaaS sectors. Our engineers understand the regulatory frameworks in the UK, such as FCA regulations and NHS security standards."
    },
    {
      q: "Can you migrate our SQL Server or Oracle database to Databricks?",
      a: "Yes. We specialise in zero-downtime, validated migrations from SQL Server, Oracle, Hadoop HDFS, and old Redshift/BigQuery systems directly to the Databricks Lakehouse Platform."
    }
  ];

  return (
    <>
      <Helmet 
        title="Cyfra Dane | Databricks Data Engineering Consultancy UK" 
        description="Specialist Databricks and Data Engineering consultancy helping UK businesses build scalable, secure, and AI-ready data platforms."
        schema={schema}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Hero Section */}
      <section style={{ 
        backgroundColor: '#0A1628', 
        color: '#FFFFFF', 
        padding: '100px 0 80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow Effects */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(30,111,255,0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,196,160,0.1) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0,196,160,0.1)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(0,196,160,0.3)', marginBottom: '24px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00C4A0', display: 'inline-block' }} />
                <span style={{ fontSize: '13px', color: '#00C4A0', fontWeight: '600' }}>UK Databricks Implementation Partner</span>
              </div>
              <h1 style={{ color: '#FFFFFF', fontSize: '48px', lineHeight: '1.2', marginBottom: '20px' }}>
                Databricks Data Engineering Consulting for <span style={{ color: '#00C4A0' }}>Modern UK Businesses</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '32px', maxWidth: '540px' }}>
                Build scalable data platforms, automate complex pipelines, and unlock AI-ready insights — delivered by specialist Databricks engineers who work exclusively in data.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/book-assessment/" className="btn btn-teal" style={{ gap: '8px' }}>
                  <Calendar size={18} /> Book Free Data Assessment
                </Link>
                <Link to="/databricks-consulting/" className="btn btn-outline-white">
                  View Services
                </Link>
              </div>

              {/* Trust signals */}
              <div style={{ marginTop: '48px', display: 'flex', gap: '24px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                  <ShieldCheck size={18} style={{ color: '#00C4A0' }} /> UK-Based Engineers
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                  <ShieldCheck size={18} style={{ color: '#00C4A0' }} /> Fixed-Price Projects
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                  <ShieldCheck size={18} style={{ color: '#00C4A0' }} /> Databricks Certified
                </div>
              </div>
            </div>

            {/* Right Column: Stats stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Card 1 */}
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px', 
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s'
              }} className="stats-card">
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Data Pipeline Health</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFFFFF', marginTop: '4px' }}>99.8%</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Uptime across all jobs</div>
                </div>
                <div style={{ backgroundColor: 'rgba(0,196,160,0.1)', color: '#00C4A0', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                  ↑ Optimal
                </div>
              </div>

              {/* Card 2 */}
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px', 
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s'
              }} className="stats-card">
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Query Performance</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFFFFF', marginTop: '4px' }}>8.4×</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Faster vs legacy stack</div>
                </div>
                <div style={{ backgroundColor: 'rgba(30,111,255,0.1)', color: '#1E6FFF', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                  Post-migration
                </div>
              </div>

              {/* Card 3 */}
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px', 
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s'
              }} className="stats-card">
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Cloud Cost Reduction</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFFFFF', marginTop: '4px' }}>£42K</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Saved annually per client</div>
                </div>
                <div style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: '#F59E0B', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                  Avg. saving
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .stats-card:hover {
            transform: translateX(4px);
            background-color: rgba(255,255,255,0.06);
          }
        `}</style>
      </section>

      {/* Tech Logo Bar */}
      <section style={{ backgroundColor: '#F3F4F6', padding: '20px 0', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
          <span style={{ fontSize: '13px', color: '#718096', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Technology Stack</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} /> Databricks
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#009E80' }} /> Apache Spark
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00C4A0' }} /> Delta Lake
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E6FFF' }} /> Azure
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} /> AWS
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EA4335' }} /> Google Cloud
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#800080' }} /> Power BI
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0A1628' }} /> Python/SQL
            </span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section" style={{ backgroundColor: '#F8F9FC' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '14px', color: '#1E6FFF', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>The Problem</span>
            <h2 style={{ fontSize: '32px', marginTop: '10px' }}>Your Data Should Work For Your Business</h2>
            <p style={{ color: '#718096', fontSize: '16px', marginTop: '12px' }}>
              Most UK businesses are sitting on valuable data they cannot use. Here is what we hear from clients before they engage us.
            </p>
          </div>

          <div className="grid-3">
            {[
              { title: "Data Trapped in Silos", desc: "CRM, ERP, marketing, and financial details sit in separate systems. Analysts waste hours downloading CSVs." },
              { title: "Slow, Manual Reporting", desc: "Teams manually build key metrics. By the time reports reach directors, the data is days out of date." },
              { title: "Slow Decision Making", desc: "Without real-time dashboards, leadership lacks daily visibility, causing the window for market actions to close." },
              { title: "Rising Infrastructure Costs", desc: "Clunky legacy systems and poorly configured cloud warehouses grow your cloud bills every single month." },
              { title: "Poor Data Quality", desc: "Duplicates, missing entries, and incompatible formats lead to mismatching figures and break stakeholder trust." },
              { title: "Not AI-Ready", desc: "You want to automate processes and integrate AI models, but your underlying data layers cannot support it." }
            ].map((prob, idx) => (
              <div key={idx} className="card-shadow" style={{ 
                backgroundColor: '#FFFFFF', 
                padding: '30px', 
                borderRadius: '16px', 
                border: '1px solid #E2E8F0',
                borderTop: '4px solid #1E6FFF',
                textAlign: 'left'
              }}>
                <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>{prob.title}</h3>
                <p style={{ color: '#718096', fontSize: '14px' }}>{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '14px', color: '#00C4A0', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>What We Do</span>
            <h2 style={{ fontSize: '32px', marginTop: '10px' }}>Databricks Data Engineering Services</h2>
            <p style={{ color: '#718096', fontSize: '16px', marginTop: '12px' }}>
              From initial assessment through to enterprise-scale managed services.
            </p>
          </div>

          <div className="grid-3">
            {[
              { name: "Databricks Consulting", desc: "Architecture design, workspace configuration, Delta Lake implementation", price: "From £25,000", path: "/databricks-consulting/" },
              { name: "Data Engineering Services", desc: "End-to-end data pipeline development, ETL/ELT modernisation", price: "From £10,000", path: "/data-engineering-services/" },
              { name: "Data Migration", desc: "Migrate from SQL Server, Oracle, Hadoop to Databricks Lakehouse", price: "From £30,000", path: "/data-migration/" },
              { name: "Lakehouse Architecture", desc: "Cloud-native lakehouse solutions — unified storage, governance, analytics", price: "From £40,000", path: "/data-platform-solutions/" },
              { name: "Managed Data Engineering", desc: "Ongoing pipeline management on a monthly retainer", price: "From £5,000/mo", path: "/databricks-consulting/databricks-managed-services/" },
              { name: "Data Architecture Assessment", desc: "Structured 1–3 week review of current data stack", price: "From £1,500", path: "/book-assessment/" }
            ].map((srv, idx) => (
              <Link to={srv.path} key={idx} className="card-shadow" style={{ 
                backgroundColor: '#FFFFFF', 
                padding: '30px', 
                borderRadius: '16px', 
                border: '1px solid #E2E8F0',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: idx % 3 === 0 ? '#1E6FFF' : idx % 3 === 1 ? '#00C4A0' : '#F59E0B' }} />
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1E6FFF', backgroundColor: '#E8F0FF', padding: '4px 10px', borderRadius: '12px' }}>{srv.price}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{srv.name}</h3>
                  <p style={{ color: '#718096', fontSize: '14px', marginBottom: '20px' }}>{srv.desc}</p>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '600', color: '#1E6FFF' }}>
                  View service <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="section" style={{ backgroundColor: '#0A1628', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', color: '#FFFFFF' }}>Our Databricks Technology Stack</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginTop: '12px' }}>
              We build production platforms using standard technologies.
            </p>
          </div>

          <div className="grid-4">
            {[
              { name: "Databricks", sub: "Unified Data Platform", color: '#F59E0B' },
              { name: "Apache Spark", sub: "Distributed Analytics Engine", color: '#009E80' },
              { name: "Delta Lake", sub: "Storage Layer Transactions", color: '#00C4A0' },
              { name: "Python", sub: "General Purpose Pipeline Language", color: '#1E6FFF' },
              { name: "SQL", sub: "Relational Queries & Views", color: '#EA4335' },
              { name: "Azure", sub: "Cloud Infrastructure Host", color: '#1E6FFF' },
              { name: "AWS", sub: "Cloud Scalable Resources", color: '#F59E0B' },
              { name: "Google Cloud", sub: "Cloud Managed Compute", color: '#EA4335' },
              { name: "Power BI", sub: "Reports & Data Visuals", color: '#800080' },
              { name: "Snowflake", sub: "Data Warehousing Engine", color: '#1E6FFF' },
              { name: "dbt", sub: "Data Transformation Tool", color: '#EA4335' },
              { name: "Airflow", sub: "Workflow Orchestrator", color: '#009E80' }
            ].map((tech, idx) => (
              <div key={idx} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px', 
                padding: '20px', 
                textAlign: 'left' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: tech.color }} />
                  <span style={{ fontWeight: '600', fontSize: '15px' }}>{tech.name}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{tech.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: '#F8F9FC' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px' }}>From Assessment to Live Platform in Weeks</h2>
            <p style={{ color: '#718096', fontSize: '16px', marginTop: '12px' }}>
              We follow a streamlined implementation timeline to minimise project friction.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'space-between', flexWrap: 'wrap' }} className="process-flow">
            {[
              { step: "1", title: "Discovery", desc: "Audit the current data ecosystem and data sources." },
              { step: "2", title: "Architecture", desc: "Design target states, folder structures, and cluster sizing." },
              { step: "3", title: "Development", desc: "Build out medallion pipelines and code repositories." },
              { step: "4", title: "Deployment", desc: "Production cutover with comprehensive user training." },
              { step: "5", title: "Optimisation", desc: "Perform regular cost control and run performance tuning." }
            ].map((step, idx) => (
              <div key={idx} style={{ flex: '1 1 180px', minWidth: '180px', textAlign: 'left', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', position: 'relative' }}>
                <span style={{ 
                  position: 'absolute', 
                  top: '-16px', 
                  left: '24px', 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: '#1E6FFF', 
                  color: '#FFFFFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>{step.step}</span>
                <h3 style={{ fontSize: '16px', marginTop: '8px', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ color: '#718096', fontSize: '13px', lineHeight: '1.4' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section" style={{ backgroundColor: '#0A1628', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', color: '#FFFFFF' }}>Data Engineering Across UK Sectors</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginTop: '12px' }}>
              We build systems that comply with regulatory requirements across industries.
            </p>
          </div>

          <div className="grid-3" style={{ justifyContent: 'center' }}>
            {[
              { name: "Finance", desc: "FCA-compliant pipelines, secure financial reporting, transaction tracking", path: "/industries/finance-data-engineering/" },
              { name: "Healthcare", desc: "NHS-compliant patient tracking, HL7/FHIR inputs, strict data masking", path: "/industries/healthcare-data-engineering/" },
              { name: "Retail", desc: "Customer 360 platforms, inventory monitoring, omnichannel analytics", path: "/industries/retail-data-engineering/" },
              { name: "Manufacturing", desc: "IoT sensor streams, supply chains tracking, predictive scheduling", path: "/industries/manufacturing-data-engineering/" },
              { name: "SaaS", desc: "Application usage telemetry, cohort metrics, MRR databases", path: "/industries/saas-data-engineering/" }
            ].map((ind, idx) => (
              <Link to={ind.path} key={idx} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px', 
                padding: '24px',
                textAlign: 'left',
                display: 'block',
                transition: 'all 0.2s'
              }} className="industry-card">
                <span style={{ fontSize: '13px', color: '#00C4A0', fontWeight: 'bold' }}>UK Sector</span>
                <h3 style={{ fontSize: '18px', color: '#FFFFFF', margin: '6px 0 10px 0' }}>{ind.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{ind.desc}</p>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          .industry-card:hover {
            border-color: #00C4A0 !important;
            transform: translateY(-2px);
          }
        `}</style>
      </section>

      {/* Engagement Models */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px' }}>Choose Your Engagement Model</h2>
            <p style={{ color: '#718096', fontSize: '16px', marginTop: '12px' }}>
              Simple pricing mechanisms designed for modern business budgets.
            </p>
          </div>

          <div className="grid-3" style={{ alignItems: 'stretch' }}>
            {/* Card 1 */}
            <div style={{ border: '1px solid #E2E8F0', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justify: 'space-between', textAlign: 'left' }}>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>Hourly Consulting</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E6FFF', marginBottom: '20px' }}>£50 – £300/hr</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', fontSize: '14px', color: '#718096', marginBottom: '30px' }}>
                  <li>• Advisory & code reviews</li>
                  <li>• Troubleshooting sessions</li>
                  <li>• No monthly minimum</li>
                </ul>
              </div>
              <Link to="/contact/" className="btn btn-outline-navy" style={{ width: '100%' }}>Enquire Now</Link>
            </div>

            {/* Card 2 - Featured */}
            <div style={{ border: '2px solid #1E6FFF', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justify: 'space-between', textAlign: 'left', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-14px', right: '24px', backgroundColor: '#1E6FFF', color: '#FFFFFF', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Most Popular</span>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>Fixed Project</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E6FFF', marginBottom: '20px' }}>£10K – £250K+</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', fontSize: '14px', color: '#718096', marginBottom: '30px' }}>
                  <li>• Fixed cost & clear timeline</li>
                  <li>• Dedicated engineering team</li>
                  <li>• Post-launch support documentation</li>
                </ul>
              </div>
              <Link to="/book-assessment/" className="btn btn-teal" style={{ width: '100%' }}>Get a Quote</Link>
            </div>

            {/* Card 3 */}
            <div style={{ border: '1px solid #E2E8F0', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justify: 'space-between', textAlign: 'left' }}>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>Monthly Retainer</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E6FFF', marginBottom: '20px' }}>£5K+/month</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', fontSize: '14px', color: '#718096', marginBottom: '30px' }}>
                  <li>• Dedicated resource availability</li>
                  <li>• 24/7 critical pipeline alerts</li>
                  <li>• Monthly performance audits</li>
                </ul>
              </div>
              <Link to="/databricks-consulting/databricks-managed-services/" className="btn btn-outline-navy" style={{ width: '100%' }}>View Plans</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section" style={{ backgroundColor: '#F8F9FC' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#718096', fontSize: '16px', marginTop: '12px' }}>
              Learn more about how we work and deliver Databricks solutions.
            </p>
          </div>
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px' }}>Databricks Insights and Guides</h2>
            <Link to="/resources/" className="btn btn-outline-navy" style={{ padding: '8px 16px', fontSize: '14px' }}>
              View All Articles
            </Link>
          </div>

          <div className="grid-3">
            {[
              { title: "Databricks vs Snowflake: Which Should UK Businesses Choose?", readTime: "7 min read", path: "/resources/databricks-vs-snowflake/" },
              { title: "What Is Delta Lake? A Plain English Guide", readTime: "9 min read", path: "/resources/delta-lake-guide/" },
              { title: "ETL vs ELT: Which Pipeline Pattern Is Right?", readTime: "6 min read", path: "/resources/etl-vs-elt/" }
            ].map((blog, idx) => (
              <Link to={blog.path} key={idx} className="card-shadow" style={{ 
                border: '1px solid #E2E8F0', 
                padding: '24px', 
                borderRadius: '12px',
                textAlign: 'left',
                display: 'block',
                backgroundColor: '#FFFFFF'
              }}>
                <span style={{ fontSize: '12px', color: '#1E6FFF', fontWeight: 'bold' }}>Resource Guide</span>
                <h3 style={{ fontSize: '16px', margin: '8px 0 16px 0', lineHeight: '1.4' }}>{blog.title}</h3>
                <div style={{ fontSize: '13px', color: '#718096' }}>{blog.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Assessment CTA */}
      <section className="section" style={{ backgroundColor: '#0A1628', color: '#FFFFFF', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', color: '#FFFFFF', marginBottom: '16px' }}>Start With a Free Data Assessment</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
            Book a 45-minute call with a senior Databricks architect. We will review your current stack, identify your biggest data bottlenecks, and give you a clear picture of what modernisation would cost and deliver.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <Link to="/book-assessment/" className="btn btn-teal">Book Free Assessment</Link>
            <Link to="/contact/" className="btn btn-outline-white">Contact Us Directly</Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00C4A0' }}>£5K – £42K</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Avg. savings</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00C4A0' }}>8.4×</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Query speedup</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00C4A0' }}>8–16 Weeks</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Delivery time</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00C4A0' }}>100%</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>UK-based team</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// PAGE 2: /databricks-consulting/
// ==========================================
const DatabricksConsulting = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {"@type": "Organization", "name": "Cyfra Dane"},
    "areaServed": {"@type": "Country", "name": "United Kingdom"},
    "serviceType": "Databricks Consulting"
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://cyfradane.co.uk"},
      {"@type": "ListItem", "position": 2, "name": "Databricks Consulting", "item": "https://cyfradane.co.uk/databricks-consulting/"}
    ]
  };

  const checklistItems = [
    "Workspace provisioning & access controls",
    "Medallion architecture design (Bronze, Silver, Gold)",
    "Delta Lake schema design & migration layout",
    "High-performance PySpark data pipeline building",
    "Unity Catalog implementation for data governance",
    "dbt Core/Cloud integration for structural modeling",
    "Power BI and dashboard reporting configuration"
  ];

  return (
    <>
      <Helmet 
        title="Databricks Consulting Services UK | Cyfra Dane" 
        description="Certified Databricks consultants for UK enterprises — workspace implementation, Delta Lake, pipelines, and optimisation. From £25,000."
        schema={schema}
        breadcrumbs={breadcrumbs}
      />

      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'left' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '40px', marginBottom: '16px' }}>Databricks Consulting Services for UK Enterprises</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '800px', marginBottom: '24px' }}>
            From workspace setup to full lakehouse architecture — certified Databricks consultants design and build data platforms that scale, reduce costs, and make AI a reality.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Databricks Implementation', 'Delta Lake', 'Apache Spark', 'Lakehouse Design', 'Azure · AWS · GCP'].map((tag, i) => (
              <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', fontSize: '13px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start', gap: '48px' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Databricks Implementation, End to End</h2>
              <p style={{ color: '#718096', marginBottom: '24px' }}>
                We work directly with your internal teams to construct a secure, performant Databricks workspace that provides complete visibility over raw and transformed datasets.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', marginBottom: '32px' }}>
                {checklistItems.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Check size={18} style={{ color: '#00C4A0' }} />
                    <span style={{ fontSize: '15px' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/book-assessment/" className="btn btn-teal">Get a Free Assessment</Link>
            </div>

            <div style={{ backgroundColor: '#F8F9FC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'left' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>Project Parameters</h3>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E6FFF', marginBottom: '24px' }}>£25,000 – £150,000+</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>Timeline & Milestones:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', fontSize: '13px', color: '#718096' }}>
                    <div>• Discovery: Weeks 1–2</div>
                    <div>• Architecture: Weeks 2–4</div>
                    <div>• Workspace Setup: Weeks 4–6</div>
                    <div>• Pipeline Build: Weeks 6–14</div>
                    <div>• Optimisation: Weeks 14–16</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-services Grid */}
      <section className="section" style={{ backgroundColor: '#F8F9FC' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Our Databricks Sub-Services</h2>
          <div className="grid-4">
            {[
              { title: "Databricks Implementation", slug: "databricks-implementation", desc: "Fresh workspace creation, VNet injection setup, unity catalog configuration." },
              { title: "Databricks Migration", slug: "databricks-migration", desc: "Transfer code, tables, and permissions from on-prem systems seamlessly." },
              { title: "Delta Lake Consulting", slug: "delta-lake-consulting", desc: "Enable transaction support, ACID guarantees, and time travel auditing." },
              { title: "Managed Services", slug: "databricks-managed-services", desc: "Ongoing operational support, monitoring, and regular cost checks." }
            ].map((sub, i) => (
              <div key={i} style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'left' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>{sub.title}</h3>
                <p style={{ color: '#718096', fontSize: '13px', marginBottom: '16px' }}>{sub.desc}</p>
                <Link to={`/databricks-consulting/${sub.slug}/`} style={{ color: '#1E6FFF', fontSize: '13px', fontWeight: 'bold' }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <h3 style={{ color: '#FFFFFF', fontSize: '20px' }}>Ready to Build Your Databricks Platform?</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/book-assessment/" className="btn btn-teal">Book Free Assessment</Link>
            <Link to="/contact/" className="btn btn-outline-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// PAGE 3: /data-engineering-services/
// ==========================================
const DataEngineeringServices = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {"@type": "Organization", "name": "Cyfra Dane"},
    "areaServed": {"@type": "Country", "name": "United Kingdom"},
    "serviceType": "Data Engineering Services"
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://cyfradane.co.uk"},
      {"@type": "ListItem", "position": 2, "name": "Data Engineering Services", "item": "https://cyfradane.co.uk/data-engineering-services/"}
    ]
  };

  return (
    <>
      <Helmet 
        title="Data Engineering Services UK | Cyfra Dane" 
        description="Data pipeline development, ETL/ELT modernisation, and data quality engineering for UK businesses on Databricks."
        schema={schema}
        breadcrumbs={breadcrumbs}
      />

      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'left' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '40px', marginBottom: '16px' }}>Data Engineering Services for UK Businesses</h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Data Pipeline Development', 'ETL/ELT', 'Data Quality', 'PySpark', 'Data Integration'].map((tag, i) => (
              <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', fontSize: '13px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {[
              { title: "Data Pipeline Development", price: "£10,000–£50,000+", desc: "Automate raw data extraction from multiple SaaS APIs, relational tables, and files directly into bronze parquet layers.", path: "/data-engineering-services/data-pipeline-development/" },
              { title: "ETL/ELT Modernisation", price: "£15,000–£75,000", desc: "Refactor slow, legacy SQL Server Integration Services (SSIS) packages or stored procedures into blazing fast PySpark jobs.", path: "/data-engineering-services/etl-development/" },
              { title: "Data Quality Engineering", price: "From £8,000", desc: "Integrate automatic schema enforcement, anomaly checkers, and Great Expectations workflows to validate pipelines.", path: "/data-engineering-services/data-quality/" },
              { title: "Data Warehouse Consulting", price: "From £12,000", desc: "Design star and snowflake schemas in Gold Delta tables optimized for rapid querying inside Power BI.", path: "/data-engineering-services/data-warehouse-consulting/" }
            ].map((srv, i) => (
              <div key={i} style={{ border: '1px solid #E2E8F0', padding: '32px', borderRadius: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '20px' }}>{srv.title}</h3>
                    <span style={{ fontSize: '13px', color: '#1E6FFF', fontWeight: 'bold', backgroundColor: '#E8F0FF', padding: '4px 10px', borderRadius: '8px' }}>{srv.price}</span>
                  </div>
                  <p style={{ color: '#718096', fontSize: '15px', marginBottom: '24px' }}>{srv.desc}</p>
                </div>
                <Link to={srv.path} className="btn btn-outline-navy" style={{ alignSelf: 'start' }}>
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hourly rates section */}
      <section className="section" style={{ backgroundColor: '#F8F9FC' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
            <h2>Data Engineering Consulting Rates UK</h2>
            <p style={{ color: '#718096', fontSize: '16px', marginTop: '12px' }}>
              Flexible support rates based on specialist engineering availability.
            </p>
          </div>

          <div className="grid-3">
            {[
              { title: "Junior Data Engineer", rate: "£50–£80/hr", features: ["Pipeline maintenance", "Bug fixes", "Basic dashboard edits"] },
              { title: "Data Engineer (Mid-Level)", rate: "£80–£140/hr", features: ["PySpark development", "ETL design", "Database optimization"], featured: true },
              { title: "Senior Architect / Consultant", rate: "£140–£300/hr", features: ["Medallion system design", "Cloud security audit", "Enterprise cost tuning"] }
            ].map((tier, i) => (
              <div key={i} style={{ 
                backgroundColor: '#FFFFFF', 
                border: tier.featured ? '2px solid #1E6FFF' : '1px solid #E2E8F0', 
                borderRadius: '16px', 
                padding: '32px',
                textAlign: 'left'
              }}>
                <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>{tier.title}</h3>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E6FFF', marginBottom: '20px' }}>{tier.rate}</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', fontSize: '14px', color: '#718096' }}>
                  {tier.features.map((f, j) => <li key={j}>• {f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// PAGE 4: /data-migration/
// ==========================================
const DataMigration = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {"@type": "Organization", "name": "Cyfra Dane"},
    "areaServed": {"@type": "Country", "name": "United Kingdom"},
    "serviceType": "Data Migration"
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://cyfradane.co.uk"},
      {"@type": "ListItem", "position": 2, "name": "Data Migration", "item": "https://cyfradane.co.uk/data-migration/"}
    ]
  };

  const tableData = [
    { src: "SQL Server", type: "Full DWH", dur: "6–12 weeks", price: "£30K–£80K" },
    { src: "Oracle", type: "Schema + data", dur: "8–16 weeks", price: "£40K–£120K" },
    { src: "Hadoop HDFS", type: "Big data", dur: "10–20 weeks", price: "£60K–£200K" },
    { src: "Amazon Redshift", type: "Cloud DWH", dur: "4–10 weeks", price: "£25K–£75K" },
    { src: "Google BigQuery", type: "Cloud DWH", dur: "4–8 weeks", price: "£20K–£60K" },
    { src: "On-Premise Legacy", type: "Full modernisation", dur: "12–24 weeks", price: "£80K–£250K+" }
  ];

  const migrationFaqs = [
    { q: "How long does SQL Server → Databricks take?", a: "Depending on data complexity, SQL Server migration typically completes within 6 to 12 weeks. We map schemas, rewrite T-SQL stored procedures to Spark SQL, and validate accuracy before final production cutover." },
    { q: "Can you migrate from Hadoop HDFS?", a: "Yes, we regularly help enterprises retire legacy on-premise Hadoop clusters. We move files to cloud storage (ADLS/S3) and re-write MapReduce or Hive jobs into clean, modern Spark applications." },
    { q: "Will BI dashboards break during migration?", a: "No, we use parallel validation. We keep your existing reports running live while building and testing the new medallion structures, changing report source targets only when validation steps pass 100%." },
    { q: "What happens to stored procedures?", a: "We audit and rewrite your stored procedures. Highly complex transactional logic is decoupled and written into efficient Python/PySpark functions or clean Spark SQL statements." }
  ];

  return (
    <>
      <Helmet 
        title="Data Migration to Databricks UK — SQL Server, Oracle & Hadoop | Cyfra Dane" 
        description="Zero-data-loss migration from SQL Server, Oracle, Hadoop, or legacy warehouses to Databricks Lakehouse. Fixed-price from £30,000."
        schema={schema}
        breadcrumbs={breadcrumbs}
      />

      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'left' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '40px', marginBottom: '16px' }}>Data Migration to Databricks — SQL Server, Oracle & Hadoop</h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['SQL Server→Databricks', 'Oracle→Databricks', 'Hadoop→Databricks', 'Legacy Modernisation'].map((tag, i) => (
              <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', fontSize: '13px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Table section */}
      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: '32px', textAlign: 'left' }}>Migration Pricing Matrix</h2>
          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8F9FC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '16px', fontWeight: '600' }}>Source</th>
                  <th style={{ padding: '16px', fontWeight: '600' }}>Migration Type</th>
                  <th style={{ padding: '16px', fontWeight: '600' }}>Duration</th>
                  <th style={{ padding: '16px', fontWeight: '600' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background 0.2s' }} className="table-row">
                    <td style={{ padding: '16px', fontWeight: '500' }}>{row.src}</td>
                    <td style={{ padding: '16px', color: '#2D3748' }}>{row.type}</td>
                    <td style={{ padding: '16px', color: '#718096' }}>{row.dur}</td>
                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#1E6FFF' }}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <style>{`
          .table-row:hover { background-color: #F8F9FC; }
        `}</style>
      </section>

      {/* 6 step process */}
      <section className="section" style={{ backgroundColor: '#F8F9FC' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Our Structured Migration Process</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {[
              "Data Inventory", "Target Architecture", "Ingestion Pipelines", "Parallel Validation", "Staged Cut-Over", "Handover & Support"
            ].map((step, idx) => (
              <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #E2E8F0', flex: '1 1 200px', minWidth: '150px', textAlign: 'center' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#00C4A0', color: '#FFFFFF', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 10px auto', fontWeight: 'bold', fontSize: '13px' }}>{idx+1}</div>
                <span style={{ fontWeight: '600', fontSize: '15px' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Migration FAQs</h2>
          <FAQSection faqs={migrationFaqs} />
        </div>
      </section>
    </>
  );
};

// ==========================================
// PAGE 5: /data-platform-solutions/
// ==========================================
const DataPlatformSolutions = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {"@type": "Organization", "name": "Cyfra Dane"},
    "areaServed": {"@type": "Country", "name": "United Kingdom"},
    "serviceType": "Lakehouse Architecture"
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://cyfradane.co.uk"},
      {"@type": "ListItem", "position": 2, "name": "Data Platform Solutions", "item": "https://cyfradane.co.uk/data-platform-solutions/"}
    ]
  };

  return (
    <>
      <Helmet 
        title="Cloud Data Platform & Lakehouse Architecture UK | Cyfra Dane" 
        description="Design and build a Databricks Lakehouse — medallion architecture, Delta Lake, Unity Catalog, and AI-ready data foundations."
        schema={schema}
        breadcrumbs={breadcrumbs}
      />

      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'left' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '40px', marginBottom: '16px' }}>Cloud Data Platform and Lakehouse Architecture for UK Businesses</h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Lakehouse Architecture', 'Cloud Data Platform', 'Modern Data Stack', 'AI Data Platform'].map((tag, i) => (
              <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', fontSize: '13px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>One Platform for Data, Analytics, and AI</h2>
              <p style={{ color: '#718096', marginBottom: '24px' }}>
                We structure your cloud storage around the open-source Delta Lake layout, bridging the gap between raw data repositories and clean, reporting-ready databases.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', marginBottom: '30px' }}>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={18} style={{ color: '#00C4A0' }} /> ACID transactions on files</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={18} style={{ color: '#00C4A0' }} /> Schema enforcement and auditing</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={18} style={{ color: '#00C4A0' }} /> Complete history auditing and rollback</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={18} style={{ color: '#00C4A0' }} /> Separation of compute & storage layers</li>
                <li style={{ display: 'flex', gap: '8px' }}><Check size={18} style={{ color: '#00C4A0' }} /> Unity Catalog governance models</li>
              </ul>
              <Link to="/book-assessment/" className="btn btn-teal">Enquire Now</Link>
            </div>

            {/* Medallion representation */}
            <div style={{ backgroundColor: '#F8F9FC', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', borderLeft: '6px solid #1E6FFF', textAlign: 'left' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#1E6FFF', textTransform: 'uppercase' }}>BRONZE LAYER</span>
                <h4 style={{ fontSize: '15px', margin: '2px 0' }}>Raw Ingestion</h4>
                <p style={{ fontSize: '12px', color: '#718096' }}>CRM, ERP, Webhook APIs, CSV files, and live streaming sources.</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown size={20} style={{ color: '#718096' }} /></div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', borderLeft: '6px solid #00C4A0', textAlign: 'left' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#00C4A0', textTransform: 'uppercase' }}>SILVER LAYER</span>
                <h4 style={{ fontSize: '15px', margin: '2px 0' }}>Cleansed & Enriched</h4>
                <p style={{ fontSize: '12px', color: '#718096' }}>Data formats normalized, missing variables flagged, duplicate rows removed.</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown size={20} style={{ color: '#718096' }} /></div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', borderLeft: '6px solid #F59E0B', textAlign: 'left' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#F59E0B', textTransform: 'uppercase' }}>GOLD LAYER</span>
                <h4 style={{ fontSize: '15px', margin: '2px 0' }}>Business Aggregate</h4>
                <p style={{ fontSize: '12px', color: '#718096' }}>Summarized metrics, star schema models, ready for Power BI & AI training.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// PAGE 6: /databricks-consulting/databricks-managed-services/
// ==========================================
const ManagedServices = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {"@type": "Organization", "name": "Cyfra Dane"},
    "areaServed": {"@type": "Country", "name": "United Kingdom"},
    "serviceType": "Managed Databricks Services"
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://cyfradane.co.uk"},
      {"@type": "ListItem", "position": 2, "name": "Managed Services", "item": "https://cyfradane.co.uk/databricks-consulting/databricks-managed-services/"}
    ]
  };

  return (
    <>
      <Helmet 
        title="Managed Databricks Services UK | Cyfra Dane" 
        description="Monthly Databricks managed services — Bronze £5K/mo, Silver £15K/mo, Gold £30K+/mo. Dedicated engineers, 24/7 monitoring."
        schema={schema}
        breadcrumbs={breadcrumbs}
      />

      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '40px', marginBottom: '16px' }}>Managed Databricks Data Engineering</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            Monthly retainer plans designed to give you continuous support, pipeline health updates, and constant cloud cost optimizations.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ alignItems: 'stretch' }}>
            {/* Bronze */}
            <div style={{ border: '1px solid #E2E8F0', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justify: 'space-between', textAlign: 'left' }}>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>Bronze Plan</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E6FFF', marginBottom: '24px' }}>£5,000/month</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', fontSize: '14px', color: '#718096', marginBottom: '30px' }}>
                  <li>• Pipeline monitoring and alerting</li>
                  <li>• Bug fixes and incident response</li>
                  <li>• Regular pipeline maintenance</li>
                  <li>• Monthly performance report</li>
                  <li>• Support for up to 20 pipeline jobs</li>
                  <li>• Business hours support (9–5 GMT)</li>
                </ul>
              </div>
              <Link to="/book-assessment/" className="btn btn-outline-navy" style={{ width: '100%' }}>Choose Bronze</Link>
            </div>

            {/* Silver */}
            <div style={{ border: '2px solid #1E6FFF', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justify: 'space-between', textAlign: 'left', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-14px', right: '24px', backgroundColor: '#1E6FFF', color: '#FFFFFF', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Most Popular</span>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>Silver Plan</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E6FFF', marginBottom: '24px' }}>£15,000/month</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', fontSize: '14px', color: '#718096', marginBottom: '30px' }}>
                  <li>• Everything in Bronze plan</li>
                  <li>• Dedicated data engineer (0.5 FTE)</li>
                  <li>• New pipeline development</li>
                  <li>• Routine performance tuning</li>
                  <li>• Cloud cost control audit</li>
                  <li>• Unlimited pipeline jobs supported</li>
                </ul>
              </div>
              <Link to="/book-assessment/" className="btn btn-teal" style={{ width: '100%' }}>Choose Silver</Link>
            </div>

            {/* Gold */}
            <div style={{ border: '1px solid #E2E8F0', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justify: 'space-between', textAlign: 'left' }}>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>Gold Plan</h3>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E6FFF', marginBottom: '24px' }}>£30,000+/month</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', fontSize: '14px', color: '#718096', marginBottom: '30px' }}>
                  <li>• Everything in Silver plan</li>
                  <li>• Dedicated data team (engineer + architect)</li>
                  <li>• 24/7 critical issue response</li>
                  <li>• Compliance governance reviews</li>
                  <li>• AI models and ML setup checks</li>
                  <li>• Quarterly platform review</li>
                </ul>
              </div>
              <Link to="/book-assessment/" className="btn btn-outline-navy" style={{ width: '100%' }}>Choose Gold</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// PAGE 7: /book-assessment/
// ==========================================
const BookAssessment = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {"@type": "Organization", "name": "Cyfra Dane"},
    "areaServed": {"@type": "Country", "name": "United Kingdom"},
    "serviceType": "Data Architecture Assessment"
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://cyfradane.co.uk"},
      {"@type": "ListItem", "position": 2, "name": "Book Assessment", "item": "https://cyfradane.co.uk/book-assessment/"}
    ]
  };

  return (
    <>
      <Helmet 
        title="Free Databricks Data Architecture Assessment UK | Cyfra Dane" 
        description="Book a free 45-minute Databricks assessment with a senior consultant. Written follow-up in 48 hours. No obligation."
        schema={schema}
        breadcrumbs={breadcrumbs}
      />

      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '40px', marginBottom: '16px' }}>Book Your Free Databricks Assessment</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            A structured 45-minute session with a senior Databricks architect — at no cost.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '48px', alignItems: 'start' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>What the Assessment Covers:</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { step: "1", title: "Data Ecosystem Review", desc: "We evaluate your current databases, BI dashboards, and pipeline tools." },
                  { step: "2", title: "Pipeline Audit", desc: "Identify delay bottlenecks and trace missing data variables." },
                  { step: "3", title: "Cloud Readiness", desc: "Outline cloud workspace configuration standards." },
                  { step: "4", title: "Cost Modelling", desc: "Calculate expected Databricks compute (DBU) consumption estimates." },
                  { step: "5", title: "Migration Roadmap", desc: "Step-by-step layout for system transitions." },
                  { step: "6", title: "Next Steps", desc: "Provide options for fixed-price integration phases." }
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#00C4A0', color: '#FFFFFF', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 'bold', fontSize: '13px', flexShrink: 0 }}>{s.step}</div>
                    <div>
                      <h4 style={{ fontSize: '16px', marginBottom: '2px' }}>{s.title}</h4>
                      <p style={{ color: '#718096', fontSize: '13px' }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px', backgroundColor: '#F8F9FC', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '14px', color: '#2D3748' }}>
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>Free 45-minute call includes:</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', listStyle: 'none' }}>
                  <li>• Discussion with senior architect (not sales)</li>
                  <li>• Written summary report within 48 hours</li>
                  <li>• Zero obligation to purchase services</li>
                  <li>• Fixed-price project proposal within 5 business days</li>
                </ul>
              </div>
            </div>

            <div>
              <ContactForm successText="✓ Request received — our engineering lead will follow up with scheduling links within 1 business day." />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// PAGE 8: /contact/
// ==========================================
const Contact = () => {
  return (
    <>
      <Helmet 
        title="Contact Cyfra Dane | Databricks Consulting UK" 
        description="Get in touch with Cyfra Dane — Databricks and data engineering consulting experts. Email hello@cyfradane.co.uk."
      />

      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '40px', marginBottom: '16px' }}>Contact Our Data Engineers</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            Have a project scope ready or need technical advice? Submit details below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '48px', alignItems: 'start' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Direct Communication</h2>
              <p style={{ color: '#718096', marginBottom: '32px' }}>
                Avoid corporate layers. When you email us, your message goes straight to practicing senior data engineers who understand technical configurations.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Mail style={{ color: '#1E6FFF' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#718096' }}>Email Address</div>
                    <a href="mailto:hello@cyfradane.co.uk" style={{ fontWeight: '600' }}>hello@cyfradane.co.uk</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <MapPin style={{ color: '#1E6FFF' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#718096' }}>Office Location</div>
                    <div style={{ fontWeight: '600' }}>United Kingdom (Remote-first)</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Clock style={{ color: '#1E6FFF' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#718096' }}>Response Standards</div>
                    <div style={{ fontWeight: '600' }}>Within 1 business day (typically faster)</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '40px', borderTop: '1px solid #E2E8F0', paddingTop: '30px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Book Directly</h3>
                <p style={{ color: '#718096', fontSize: '14px', marginBottom: '20px' }}>
                  Want to skip the form process and check calendar availability immediately?
                </p>
                <Link to="/book-assessment/" className="btn btn-teal">Go to Assessment Calendar</Link>
              </div>
            </div>

            <div>
              <form onSubmit={(e) => { e.preventDefault(); alert('✓ Message received. We will respond within 1 business day.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Your Name</label>
                  <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Your Email</label>
                  <input type="email" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Subject</label>
                  <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Message</label>
                  <textarea rows="5" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                </div>
                <button type="submit" className="btn btn-electric">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// INDUSTRY RENDERER
// ==========================================
const IndustryPage = ({ title, tags, useCases, governance }) => {
  return (
    <>
      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'left' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '40px', marginBottom: '16px' }}>{title}</h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {tags.map((tag, i) => (
              <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', fontSize: '13px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: '32px', textAlign: 'left' }}>Industry Use Cases</h2>
          <div className="grid-3">
            {useCases.map((uc, i) => (
              <div key={i} style={{ border: '1px solid #E2E8F0', padding: '24px', borderRadius: '12px', textAlign: 'left' }} className="card-shadow">
                <span style={{ fontSize: '11px', color: '#00C4A0', fontWeight: 'bold', textTransform: 'uppercase' }}>Use Case</span>
                <h3 style={{ fontSize: '18px', margin: '4px 0 10px 0' }}>{uc.name}</h3>
                <p style={{ color: '#718096', fontSize: '14px', marginBottom: '16px' }}>{uc.desc}</p>
                {uc.price && <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1E6FFF' }}>Estimated integration cost: {uc.price}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {governance && (
        <section className="section" style={{ backgroundColor: '#F8F9FC' }}>
          <div className="container" style={{ maxWidth: '800px', textAlign: 'left' }}>
            <h2 style={{ marginBottom: '16px' }}>Security & Governance Strategy</h2>
            <p style={{ color: '#718096', fontSize: '15px', lineHeight: '1.6' }}>{governance}</p>
          </div>
        </section>
      )}

      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <h3 style={{ color: '#FFFFFF', fontSize: '20px' }}>Build Compliant Industry Pipelines</h3>
          <Link to="/book-assessment/" className="btn btn-teal">Book Assessment</Link>
        </div>
      </section>
    </>
  );
};

// ==========================================
// RESOURCES / ARTICLE TEMPLATE
// ==========================================
const ArticlePage = ({ title, readTime, date, author, quickAnswer, contentHtml, relatedLinks }) => {
  return (
    <>
      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'left', maxWidth: '800px' }}>
          <div style={{ fontSize: '13px', color: '#00C4A0', marginBottom: '12px' }}>
            <Link to="/resources/">Resources</Link> &gt; <span style={{ color: '#FFFFFF' }}>Article</span>
          </div>
          <h1 style={{ color: '#FFFFFF', fontSize: '32px', marginBottom: '12px', lineHeight: '1.3' }}>{title}</h1>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
            {date} · {readTime} · By {author}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'left' }}>
          {quickAnswer && (
            <div style={{ backgroundColor: '#E8F0FF', borderLeft: '4px solid #1E6FFF', padding: '20px', borderRadius: '8px', marginBottom: '32px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1E6FFF', textTransform: 'uppercase', marginBottom: '4px' }}>Quick Summary</div>
              <p style={{ color: '#2D3748', fontSize: '15px' }}>{quickAnswer}</p>
            </div>
          )}

          <article 
            style={{ fontSize: '16px', color: '#2D3748', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '20px' }}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div style={{ backgroundColor: '#F8F9FC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Need assistance with this architecture?</h4>
              <p style={{ color: '#718096', fontSize: '14px' }}>Talk directly to our senior UK engineering consultants.</p>
            </div>
            <Link to="/book-assessment/" className="btn btn-teal">Request Call</Link>
          </div>

          {relatedLinks && (
            <div style={{ borderTop: '1px solid #E2E8F0', marginTop: '48px', paddingTop: '32px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '16px' }}>Related Resources:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {relatedLinks.map((rl, i) => (
                  <Link key={i} to={rl.path} className="btn btn-outline-navy" style={{ padding: '6px 12px', fontSize: '13px' }}>
                    {rl.name} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// ==========================================
// RESOURCES LIST PAGE
// ==========================================
const ResourcesList = () => {
  const articles = [
    { title: "What Is Databricks?", desc: "Plain English guide to the Lakehouse platform capabilities, pricing models, and cloud services.", slug: "what-is-databricks", readTime: "10 min read" },
    { title: "Databricks vs Snowflake", desc: "Detailed architectural comparison for engineering leads looking to choose in 2025.", slug: "databricks-vs-snowflake", readTime: "7 min read" },
    { title: "Delta Lake Guide", desc: "Understand ACID transactions, time travel queries, and schema evolution properties.", slug: "delta-lake-guide", readTime: "9 min read" },
    { title: "ETL vs ELT", desc: "Learn which pipeline design pattern fits modern medallion storage schemas on Databricks.", slug: "etl-vs-elt", readTime: "6 min read" },
    { title: "Data Pipeline Guide", desc: "6 criteria for building production-grade data pipelines that resist transient failures.", slug: "data-pipeline-guide", readTime: "8 min read" },
    { title: "Data Warehouse vs Data Lake", desc: "A side-by-side comparison to help UK teams decide their 2025 storage path.", slug: "data-warehouse-vs-data-lake", readTime: "8 min read" }
  ];

  return (
    <>
      <section style={{ backgroundColor: '#0A1628', color: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'left' }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '40px', marginBottom: '16px' }}>Databricks Insights & Guides</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '700px' }}>
            Practioner-grade guides and architectural reviews written by senior Databricks consultants.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {articles.map((art, idx) => (
              <div key={idx} style={{ border: '1px solid #E2E8F0', padding: '24px', borderRadius: '12px', textAlign: 'left', display: 'flex', flexDirection: 'column', justify: 'space-between' }} className="card-shadow">
                <div>
                  <span style={{ fontSize: '12px', color: '#1E6FFF', fontWeight: 'bold' }}>{art.readTime}</span>
                  <h3 style={{ fontSize: '18px', margin: '6px 0 10px 0' }}>{art.title}</h3>
                  <p style={{ color: '#718096', fontSize: '13px', marginBottom: '20px' }}>{art.desc}</p>
                </div>
                <Link to={`/resources/${art.slug}/`} style={{ color: '#1E6FFF', fontSize: '14px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// 404 NOT FOUND PAGE
// ==========================================
const NotFound = () => {
  return (
    <section className="section" style={{ textAlign: 'center', minHeight: '60svh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <AlertCircle size={64} style={{ color: '#F59E0B', margin: '0 auto 24px auto' }} />
        <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>Page Not Found</h1>
        <p style={{ color: '#718096', fontSize: '16px', marginBottom: '32px' }}>
          We could not locate the requested page URL path. Verify your parameters or return to navigation routes.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-teal">Return Home</Link>
          <Link to="/book-assessment/" className="btn btn-electric">Book Assessment</Link>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// MAIN APP ROUTING & LAYOUT
// ==========================================
function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <Header />
        <main style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/databricks-consulting/" element={<DatabricksConsulting />} />
          
          {/* Sub-services paths mapping to specialized views */}
          <Route path="/databricks-consulting/databricks-implementation/" element={
            <SubServiceDetail 
              serviceName="Databricks Workspace Implementation" 
              subtitle="Provision and secure modern medallion workspaces aligning to business governance strategies."
              checklist={[
                "VNet integration & security setup", 
                "Unity Catalog metadata configuration", 
                "Bronze / Silver / Gold folder setups", 
                "Basic PySpark ingest pipelines"
              ]}
              price="From £25,000"
            />
          } />
          <Route path="/databricks-consulting/databricks-migration/" element={
            <SubServiceDetail 
              serviceName="Databricks Data Migration" 
              subtitle="Transfer structured tables and database stored procedures from legacy servers safely."
              checklist={[
                "Schema audit and source translation", 
                "Staged bulk tables data copy", 
                "PySpark procedure rewrite testing", 
                "Dashboard target link migration"
              ]}
              price="From £30,000"
            />
          } />
          <Route path="/databricks-consulting/databricks-optimization/" element={
            <SubServiceDetail 
              serviceName="Databricks Workspace Optimisation" 
              subtitle="Tweak cluster runtime and compute allocations to stop cloud billing overruns."
              checklist={[
                "Automatic termination configuration rules", 
                "Cluster sizing and scaling parameter audit", 
                "Inefficient PySpark code review rewriting", 
                "Storage parquet file optimization steps"
              ]}
              price="From £15,000"
            />
          } />
          <Route path="/databricks-consulting/delta-lake-consulting/" element={
            <SubServiceDetail 
              serviceName="Delta Lake Consulting" 
              subtitle="Enable transactional ACID support on standard file objects for audit assurance."
              price="From £15,000"
            />
          } />
          <Route path="/databricks-consulting/spark-consulting/" element={
            <SubServiceDetail 
              serviceName="Apache Spark Consulting" 
              subtitle="Construct highly parallelised ETL logic capable of processing terabytes of data daily."
              price="From £20,000"
            />
          } />
          <Route path="/databricks-consulting/databricks-managed-services/" element={<ManagedServices />} />

          {/* Data Engineering services */}
          <Route path="/data-engineering-services/" element={<DataEngineeringServices />} />
          <Route path="/data-engineering-services/data-pipeline-development/" element={
            <SubServiceDetail 
              serviceName="Data Pipeline Development" 
              subtitle="Build reliable automated ingestion scripts fetching from diverse SaaS APIs and files."
              price="From £10,000"
            />
          } />
          <Route path="/data-engineering-services/etl-development/" element={
            <SubServiceDetail 
              serviceName="ETL/ELT Development Services" 
              subtitle="Transform disparate business data streams using clean, verifiable pipeline runs."
              price="From £15,000"
            />
          } />
          <Route path="/data-engineering-services/data-quality/" element={
            <SubServiceDetail 
              serviceName="Data Quality Assurance Engineering" 
              subtitle="Configure validation checks that automatically stop broken schema runs from corrupting gold tables."
              price="From £8,000"
            />
          } />
          <Route path="/data-engineering-services/data-warehouse-consulting/" element={
            <SubServiceDetail 
              serviceName="Data Warehouse Modernisation" 
              subtitle="Structure Gold layers into dimensional schemas designed for fast dashboard retrieval."
              price="From £12,000"
            />
          } />

          {/* Platform & Migrations */}
          <Route path="/data-platform-solutions/" element={<DataPlatformSolutions />} />
          <Route path="/data-migration/" element={<DataMigration />} />

          {/* Industry pages mapping */}
          <Route path="/industries/finance-data-engineering/" element={
            <IndustryPage 
              title="Finance Data Engineering Services"
              tags={['FCA Compliance', 'Risk Analytics', 'Fraud Detection', 'Real-Time Reporting']}
              useCases={[
                { name: "Regulatory Reporting Pipelines", desc: "Automate daily transaction exports to meet FCA reporting standards.", price: "£25K–£60K" },
                { name: "Fraud Detection Platforms", desc: "Injest transaction telemetry streams into ML scoring structures.", price: "£40K–£90K" },
                { name: "Risk Analytics Data Warehouses", desc: "Consolidate debt risk indicators into hourly gold schemas.", price: "£30K–£80K" }
              ]}
              governance="We configure Row and Column level security rules within Unity Catalog, ensuring compliance with FCA governance frameworks."
            />
          } />
          <Route path="/industries/healthcare-data-engineering/" element={
            <IndustryPage 
              title="Healthcare Data Engineering Services"
              tags={['NHS Digital', 'GDPR', 'HL7/FHIR', 'Patient Analytics', 'Clinical Reporting']}
              useCases={[
                { name: "Patient Data Platforms", desc: "Aggregate health records into centralized Delta lakes for processing.", price: "£30K–£75K" },
                { name: "NHS Reporting Pipelines", desc: "Structure daily stats updates matching national reporting criteria.", price: "£20K–£50K" },
                { name: "Clinical Analytics", desc: "Prepare anonymized clinical trial structures for testing models.", price: "£35K–£80K" }
              ]}
              governance="Our platform setups isolate patient credentials under tokenized columns, meeting DSPT security criteria."
            />
          } />
          <Route path="/industries/retail-data-engineering/" element={
            <IndustryPage 
              title="Retail & eCommerce Data Engineering"
              tags={['Customer 360', 'Inventory Forecasting', 'Omnichannel Reports']}
              useCases={[
                { name: "Customer 360 Database", desc: "Merge Shopify webclicks, mail campaigns, and retail tills sales.", price: "£25K–£80K" },
                { name: "Real-Time Inventory Status", desc: "Sync live warehouse counts with public shop display portals.", price: "£20K–£60K" },
                { name: "Demand Forecasting Systems", desc: "Compile product seasonal velocity arrays for prediction models.", price: "£30K–£100K" },
                { name: "Omnichannel Reporting Dashboards", desc: "Consolidate retail metrics into uniform Gold structures.", price: "£15K–£40K" }
              ]}
            />
          } />
          <Route path="/industries/manufacturing-data-engineering/" element={
            <IndustryPage 
              title="Manufacturing Data Engineering"
              tags={['IoT Ingestion', 'Predictive Maintenance', 'OEE Metrics']}
              useCases={[
                { name: "IoT Sensor Pipelines", desc: "Capture industrial machine vibrations to trigger alerts.", price: "From £25K" },
                { name: "Predictive Maintenance Prep", desc: "Store structured vibration lists for R-script analysis.", price: "From £35K" },
                { name: "OEE Performance Analytics", desc: "Track line downtime codes vs shift targets dynamically.", price: "From £20K" },
                { name: "Supply Chain Integration", desc: "Map external carrier API updates directly into schedule logic.", price: "From £30K" }
              ]}
            />
          } />
          <Route path="/industries/saas-data-engineering/" element={
            <IndustryPage 
              title="SaaS Product Data Engineering"
              tags={['Usage Telemetry', 'Cohort Analysis', 'MRR Calculations']}
              useCases={[
                { name: "Product Analytics pipelines", desc: "Process raw user interface event logs into metrics lists.", price: "From £15K" },
                { name: "Customer Health Scoring", desc: "Calculate churn threat signals from click activity declines.", price: "From £25K" },
                { name: "Usage Telemetry databases", desc: "Summarize API payload volumes to automate usage billing checks.", price: "From £12K" },
                { name: "Cohort Analysis grids", desc: "Segment active customer accounts by registration periods.", price: "From £10K" }
              ]}
            />
          } />

          {/* Book Assessment & Contact */}
          <Route path="/book-assessment/" element={<BookAssessment />} />
          <Route path="/contact/" element={<Contact />} />

          {/* Resources & Articles */}
          <Route path="/resources/" element={<ResourcesList />} />
          <Route path="/resources/what-is-databricks/" element={
            <ArticlePage 
              title="What Is Databricks? A Guide for UK Businesses"
              date="June 12, 2025" readTime="10 min read" author="Senior Consultant"
              quickAnswer="Databricks is a unified cloud database and AI processing system that stores unstructured files like simple database tables, reducing cost overheads."
              contentHtml={`
                <h2>1. Core Capabilities</h2>
                <p>Databricks offers four main capabilities: scalable data engineering pipelines, SQL query environments for dashboard reports, machine learning infrastructure, and real-time streaming tools.</p>
                <h2>2. Lakehouse Architecture</h2>
                <p>The Lakehouse structure replaces old setups where teams had to maintain both a slow file repository (Data Lake) and a structured database warehouse. By using Delta Lake, Databricks enables transactions directly on raw files.</p>
                <h2>3. Cloud Hosts & Business Fit</h2>
                <p>Databricks runs natively on Azure, AWS, and Google Cloud. It suits UK businesses handling large datasets or teams planning to integrate custom machine learning models in 2025.</p>
              `}
              relatedLinks={[
                { name: "Delta Lake Guide", path: "/resources/delta-lake-guide/" },
                { name: "Databricks vs Snowflake", path: "/resources/databricks-vs-snowflake/" }
              ]}
            />
          } />
          <Route path="/resources/databricks-vs-snowflake/" element={
            <ArticlePage 
              title="Databricks vs Snowflake: 2025 Practical Comparison"
              date="May 28, 2025" readTime="7 min read" author="Engineering Lead"
              quickAnswer="Choose Databricks if your roadmap centers on machine learning or python pipelines. Choose Snowflake if you seek a SQL-only database warehouse."
              contentHtml={`
                <h2>1. Core Architectural Differences</h2>
                <p>Databricks was built on Spark to process distributed code tasks, whereas Snowflake was designed as a cloud data warehouse database. While their features overlap today, their core foundations remain distinct.</p>
                <h2>2. Pricing Models</h2>
                <p>Databricks bills separately for storage files and compute tasks (DBUs). Snowflake charges a flat query runtime credit fee which can be easier to forecast but occasionally harder to optimize for complex scripts.</p>
                <h2>3. AI Readiness</h2>
                <p>If your plan calls for training models or running large-scale python scraping scripts, Databricks provides direct developer environments that Snowflake cannot easily match.</p>
              `}
              relatedLinks={[
                { name: "What is Databricks?", path: "/resources/what-is-databricks/" }
              ]}
            />
          } />
          <Route path="/resources/delta-lake-guide/" element={
            <ArticlePage 
              title="What is Delta Lake? Storage Layer Explained"
              date="April 15, 2025" readTime="9 min read" author="Data Architect"
              quickAnswer="Delta Lake is an open-source storage file layout that adds ACID transactions, schema enforcement, and time-travel features to standard Parquet files."
              contentHtml={`
                <h2>1. Why Delta Lake Exists</h2>
                <p>In standard data lakes, partial writes or failed pipelines leave corrupted files. Delta Lake writes a transaction log file, meaning users only see complete query states.</p>
                <h2>2. Time Travel & Audits</h2>
                <p>Because the transaction log keeps file revision paths, you can query exactly what a database table looked like two weeks ago, satisfying strict UK compliance audits.</p>
                <h2>3. Schema Evolution</h2>
                <p>If a vendor changes their API payload schema, Delta Lake blocks the pipeline rather than letting bad columns corrupt downstream dashboard reports.</p>
              `}
            />
          } />
          <Route path="/resources/etl-vs-elt/" element={
            <ArticlePage 
              title="ETL vs ELT: Modernizing Data Flow Design"
              date="March 10, 2025" readTime="6 min read" author="Senior Engineer"
              quickAnswer="Modern systems favor ELT (Extract, Load, Transform) because cheap cloud storage allows raw files to be stored before running transformations."
              contentHtml={`
                <h2>1. The Old Way: ETL</h2>
                <p>Extract, Transform, and Load (ETL) transformed data in server memory before writing. If the target server crashed, the transform step had to be rerun from scratch.</p>
                <h2>2. The New Way: ELT</h2>
                <p>Extract, Load, Transform (ELT) writes raw data directly to a Bronze cloud storage layer, then uses Databricks compute nodes to build clean Silver and Gold layers.</p>
                <h2>3. Business Benefits</h2>
                <p>ELT ensures you never lose raw source history, making it simple to recalculate metrics if business dashboard rules change later.</p>
              `}
            />
          } />
          <Route path="/resources/data-pipeline-guide/" element={
            <ArticlePage 
              title="Building Production-Grade Data Pipelines"
              date="February 18, 2025" readTime="8 min read" author="Principal Architect"
              quickAnswer="A reliable data pipeline must support automated retries, complete error alerting, strict schema checks, and separated compute resources."
              contentHtml={`
                <h2>1. 6 Criteria for Production Pipelines</h2>
                <p>We build pipelines to meet six criteria: idempotency (rerunnability), automated error alerts, cluster autoscale controls, data quality checks, query partitioning, and isolated staging environments.</p>
                <h2>2. Common Failure Modes</h2>
                <p>Transient API timeouts, schema changes, and unchecked database locks are the most common reasons data pipelines fail in production.</p>
              `}
            />
          } />
          <Route path="/resources/data-warehouse-vs-data-lake/" element={
            <ArticlePage 
              title="Data Warehouse vs Data Lake: Choosing Your Stack"
              date="January 05, 2025" readTime="8 min read" author="Engineering Lead"
              quickAnswer="A Lakehouse merges the low storage cost of a data lake with the fast query speeds of a traditional database warehouse."
              contentHtml={`
                <h2>1. Comparison Metrics</h2>
                <p>Traditional warehouses scale storage and compute together, making them expensive. Data lakes are cheap but slow for reporting. The Lakehouse architecture decouples these layers for optimal scale.</p>
              `}
            />
          } />

          {/* Catch all redirecting to 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA />
      </div>
    </BrowserRouter>
  );
}

export default App;
