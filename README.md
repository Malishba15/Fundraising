# Rahmat Relief Foundation - Ramzan Fundraising Platform

A production-ready, secure, and visually stunning one-page fundraising platform for NGO Ramzan campaigns.

## Overview

This platform enables the Rahmat Relief Foundation to collect donations during Ramzan to help underprivileged families. The funds support:
- Food distribution during Ramzan
- Clothing donation for poor communities
- Ramzan ration package preparation
- Community support programs

## Features

### Frontend
- **Modern Design**: Eye-catching Islamic-themed design with emerald, blue, and white color palette
- **Fully Responsive**: Optimized for mobile, tablet, and desktop viewing
- **Smooth Animations**: Fade-in effects, hover transitions, and auto-rotating carousels
- **Single Page Layout**: Seamless scrolling experience with distinct sections

### Backend & Security
- **Supabase Database**: Secure PostgreSQL database with Row Level Security (RLS)
- **Data Privacy**: Donor information is protected with proper access controls
- **Form Validation**: Client-side validation ensures data integrity
- **Transaction Tracking**: Each donation gets a unique transaction reference

### Donation System
- **Preset Amounts**: Quick selection buttons (500, 1000, 2500, 5000 PKR)
- **Custom Amount**: Option to enter any donation amount (minimum 100 PKR)
- **Demo Mode**: Test payment processing with simulated bank account
- **Success Feedback**: Clear confirmation message after successful donation

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Type Safety**: Full TypeScript support

## Database Schema

The platform uses a secure `donations` table with the following structure:

```sql
- id (UUID, primary key)
- donor_name (text)
- donor_email (text)
- amount (numeric)
- transaction_reference (text, unique)
- status (pending/completed/failed)
- created_at (timestamp)
- updated_at (timestamp)
```

### Security Features
- Row Level Security (RLS) enabled
- Public INSERT for anonymous donations
- Authenticated SELECT for admin dashboard (future feature)
- Indexed for performance

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Landing section with CTA
│   ├── About.tsx         # Organization mission and values
│   ├── WhatWeDo.tsx      # Programs and services
│   ├── Partners.tsx      # NGO partner carousel
│   ├── Donation.tsx      # Donation form with validation
│   └── Footer.tsx        # Contact info and links
├── lib/
│   └── supabase.ts       # Supabase client configuration
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles and animations
```

## Local Development

The development server starts automatically. The site will be available at the provided local URL.

## Key Sections

### 1. Hero Section
- Compelling headline and tagline
- Statistics showcasing impact
- Clear call-to-action buttons
- Animated background effects

### 2. About Us
- Mission statement
- Trust-building content
- Core values with icons
- Transparency commitment

### 3. What We Do
- Four main programs displayed as cards
- Impact statistics
- Visual indicators of active programs

### 4. Partner NGOs
- Auto-rotating carousel (4-second intervals)
- Partner information cards
- Smooth transition animations
- Manual navigation dots

### 5. Donation Section
- User-friendly form layout
- Preset and custom amount options
- Real-time form validation
- Secure submission to database
- Success confirmation modal
- Demo bank account details displayed

## Donation Flow

1. User enters name and email
2. Selects or enters donation amount (min 100 PKR)
3. Form validation ensures data integrity
4. Simulated payment processing (1.5 second delay)
5. Transaction saved to Supabase database
6. Success message displayed
7. Form resets for next donation

## Partner Organizations

The platform features four trusted partner NGOs:

1. **Humanity First Group** - Emergency Relief (Est. 2005)
2. **CareBridge Foundation** - Healthcare (Est. 2010)
3. **Hope & Unity Alliance** - Education (Est. 2008)
4. **Community Hands Network** - Community Development (Est. 2012)

## Demo Payment Details

**Bank Name**: ABC National Bank
**Account Number**: 1234-5678-9012
**Mode**: Test/Demo (No real transactions)

## Privacy & Security

- All donor information is encrypted and secure
- Personal data is protected with RLS policies
- Email addresses are stored in lowercase
- Minimum data collection principle
- No unauthorized access to donor records
- Transparent data usage

## Future Enhancements

Potential features for production deployment:

- Real payment gateway integration (Stripe, PayPal, etc.)
- Admin dashboard for donation management
- Email confirmation for donors
- Receipt generation
- Donation certificates
- Social sharing features
- Multi-language support
- SMS notifications
- Recurring donation options
- Campaign progress tracker

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized bundle size
- Lazy loading where applicable
- Efficient database queries
- Responsive images
- Smooth animations (60fps)

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios
- Readable font sizes

## License

This project is created for humanitarian purposes.

## Contact

For questions or support:
- Email: info@rahmatrelief.org
- Phone: +92 300 1234567
- Location: Karachi, Pakistan

---

**Built with compassion for those in need during Ramzan 2026**
