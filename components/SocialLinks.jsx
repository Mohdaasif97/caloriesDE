/**
 * Lightweight Social Media Links Component
 * Optimized for performance and Core Web Vitals
 * Can be used in header, footer, or standalone placement
 * 
 * Usage:
 * import SocialLinks from '@/components/SocialLinks'
 * <SocialLinks variant="icons" /> or variant="full"
 */

export default function SocialLinks({ variant = 'icons', className = '' }) {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61588221497294',
      icon: '📘',
      color: '#1877F2',
    },
    {
      name: 'Twitter / X',
      url: 'https://x.com/MohdAasif763323',
      icon: '𝕏',
      color: '#000000',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohd-aasif-44121a261',
      icon: '🔗',
      color: '#0A66C2',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@violent34343',
      icon: '▶️',
      color: '#FF0000',
    },
  ];

  // Icons-only variant (minimal performance impact)
  if (variant === 'icons') {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer me"
            title={link.name}
            aria-label={`Folge uns auf ${link.name}`}
            style={{
              fontSize: '24px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              opacity: 0.8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '0.8';
            }}
          >
            {link.icon}
          </a>
        ))}
      </div>
    );
  }

  // Full variant with text
  if (variant === 'full') {
    return (
      <div className={className}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer me"
              title={`Besuche uns auf ${link.name}`}
              aria-label={link.name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '6px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = link.color;
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Vertical variant (for sidebars)
  if (variant === 'vertical') {
    return (
      <nav
        className={className}
        aria-label="Social media links"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer me"
            title={`Folge uns auf ${link.name}`}
            aria-label={link.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: '13px',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.paddingLeft = '16px';
              e.currentTarget.style.backgroundColor = link.color;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.paddingLeft = '12px';
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.color = '#333';
            }}
          >
            <span style={{ fontSize: '18px' }}>{link.icon}</span>
            <span>{link.name}</span>
          </a>
        ))}
      </nav>
    );
  }

  return null;
}
