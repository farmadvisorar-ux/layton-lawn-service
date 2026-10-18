import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Award,
  Star,
  Sparkles,
  Scissors,
  TreePine,
  Building2,
  Home,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Calculator,
  Search,
  Send,
  Menu,
  X,
  Leaf,
  DollarSign,
  PhoneCall,
  Check,
  Zap,
  ThumbsUp,
  FileText
} from 'lucide-react'

// Mock high-quality photography suited for East Texas Lawn & Landscaping
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1592417817098-8f3d69103a87?auto=format&fit=crop&w=1800&q=80", // Pristine striped green lawn
  mowing: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80", // Lawn mower cutting healthy grass
  commercial: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80", // Manicured commercial estate grounds
  landscape: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80", // Fresh mulch and floral landscaping
  cleanup: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80", // Pine woods / seasonal cleanup
  before: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80", // Overgrown wild yard
  after: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1000&q=80", // Sharp striped manicured grounds
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('residential')
  
  // Interactive Before/After slider position (0-100)
  const [sliderPosition, setSliderPosition] = useState(50)

  // Service Area Checker state
  const [searchQuery, setSearchQuery] = useState('')
  const [areaResult, setAreaResult] = useState(null)

  // Calculator State
  const [calcService, setCalcService] = useState('residential-mow')
  const [calcLotSize, setCalcLotSize] = useState('medium')
  const [calcFrequency, setCalcFrequency] = useState('weekly')
  const [calcCity, setCalcCity] = useState('Marshall')

  // Quote Form State
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Marshall',
    serviceType: 'Residential Lawn Maintenance',
    notes: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // FAQ open states
  const [openFaq, setOpenFaq] = useState(0)

  // Calculate rough estimate range
  const calculateEstimate = () => {
    let base = 45
    if (calcService === 'residential-mow') {
      base = 45
      if (calcLotSize === 'small') base = 40
      if (calcLotSize === 'medium') base = 55
      if (calcLotSize === 'large') base = 85
      if (calcLotSize === 'acreage') base = 150
      if (calcLotSize === 'commercial') base = 220
      if (calcFrequency === 'biweekly') base = Math.round(base * 1.25)
      if (calcFrequency === 'onetime') base = Math.round(base * 1.5)
    } else if (calcService === 'commercial') {
      base = 180
      if (calcLotSize === 'small') base = 120
      if (calcLotSize === 'medium') base = 200
      if (calcLotSize === 'large') base = 350
      if (calcLotSize === 'acreage') base = 500
      if (calcLotSize === 'commercial') base = 750
    } else if (calcService === 'mulch-flowerbed') {
      base = 250
      if (calcLotSize === 'small') base = 195
      if (calcLotSize === 'medium') base = 350
      if (calcLotSize === 'large') base = 550
      if (calcLotSize === 'acreage') base = 850
      if (calcLotSize === 'commercial') base = 1200
    } else if (calcService === 'seasonal-cleanup') {
      base = 220
      if (calcLotSize === 'small') base = 175
      if (calcLotSize === 'medium') base = 280
      if (calcLotSize === 'large') base = 480
      if (calcLotSize === 'acreage') base = 750
      if (calcLotSize === 'commercial') base = 950
    }

    const min = Math.round(base * 0.9)
    const max = Math.round(base * 1.15)
    return { min, max }
  }

  const estimate = calculateEstimate()

  // Service Area Lookup handler
  const handleAreaCheck = (e) => {
    e.preventDefault()
    const query = searchQuery.trim().toLowerCase()
    if (!query) return

    const coveredAreas = [
      { name: 'Marshall', zip: '75672', zips: ['75670', '75671', '75672'], note: 'Primary Hub - Daily Route Coverage' },
      { name: 'Jefferson', zip: '75657', zips: ['75657'], note: 'Full Coverage - Residential & Historic Properties' },
      { name: 'Hallsville', zip: '75650', zips: ['75650'], note: 'Full Coverage - Fast Growing Subdivisions & Commercial' },
      { name: 'Carthage', zip: '75633', zips: ['75633'], note: 'Full Coverage - Panola County Residential & Commercial' },
      { name: 'Waskom', zip: '75692', zips: ['75692'], note: 'Route Coverage - Highway 80 & I-20 Corridor' },
      { name: 'Elysian Fields', zip: '75642', zips: ['75642'], note: 'Route Coverage - Southern Harrison County' },
      { name: 'Scottsville', zip: '75688', zips: ['75688'], note: 'Route Coverage - Marshall Metro Area' },
      { name: 'Harleton', zip: '75651', zips: ['75651'], note: 'Route Coverage - Lake O\' The Pines Region' }
    ]

    const matched = coveredAreas.find(area => 
      area.name.toLowerCase().includes(query) || 
      area.zips.some(z => z.includes(query)) ||
      query.includes(area.name.toLowerCase())
    )

    if (matched) {
      setAreaResult({
        covered: true,
        name: matched.name,
        note: matched.note,
        message: `Great news! Layton Lawn Service provides full service to ${matched.name} and surrounding neighborhoods.`
      })
    } else {
      setAreaResult({
        covered: false,
        name: searchQuery,
        message: `We often accommodate properties just outside standard routes. Call us directly at (903) 702-9586 to confirm your address!`
      })
    }
  }

  // Handle quote form submit
  const handleQuoteSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const faqs = [
    {
      q: "How long has Layton Lawn Service been in business in East Texas?",
      a: "Layton Lawn Service has proudly operated locally for over 10 years! We are rooted right here in Marshall, Texas 75672, and have grown to serve Harrison, Marion, and Panola Counties through consistent reliability, commercial-grade equipment, and fair pricing."
    },
    {
      q: "Do you require long-term contracts for residential mowing?",
      a: "No! For residential clients, we operate on a flexible, pay-as-you-go service model (weekly or bi-weekly). You can pause or adjust your schedule at any time. For commercial properties, we offer both annual master service agreements and seasonal arrangements to suit budget requirements."
    },
    {
      q: "Which specific towns and zip codes do you serve?",
      a: "Our core service territory includes Marshall (75672, 75670, 75671), Hallsville (75650), Jefferson (75657), Carthage (75633), as well as Waskom, Elysian Fields, Scottsville, and surrounding rural routes. If you live anywhere in this East Texas region, we likely have a truck nearby."
    },
    {
      q: "What is included with standard residential lawn maintenance?",
      a: "Our comprehensive routine service includes precision mowing at the appropriate height for your turf type (Bermuda, St. Augustine, or Zoysia), razor-sharp line edging along sidewalks, curbs, and driveways, weed-eating around fences, trees, and obstacles, and high-velocity blowing of all clippings off hardscapes and patios."
    },
    {
      q: "Are you licensed and insured for commercial properties?",
      a: "Yes, 100%. We carry comprehensive general commercial liability insurance. We can readily provide Certificates of Insurance (COI) for property managers, corporate offices, retail centers, churches, and HOAs."
    },
    {
      q: "What happens if it rains on my scheduled service day?",
      a: "East Texas weather can change fast! If heavy rain causes soggy turf that could be damaged or rutted by mowers, we shift your service to the next safe drying window, ensuring your property is cared for promptly without tearing up your lawn."
    }
  ]

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      
      {/* Top Banner */}
      <div className="bg-forest-950 text-white text-xs sm:text-sm py-2 px-4 border-b border-forest-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center justify-center bg-forest-700 text-gold-400 rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
              10+ Years in East Texas
            </span>
            <span>Serving Marshall (75672), Hallsville, Jefferson, Carthage & Surrounding Areas</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:9037029586" 
              className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>(903) 702-9586</span>
            </a>
            <span className="hidden md:inline text-forest-600">|</span>
            <span className="hidden md:inline text-stone-300">Mon - Sat: 7:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-12 h-12 rounded-xl bg-forest-800 text-white flex items-center justify-center shadow-md shadow-forest-900/20 border border-forest-700">
              <Leaf className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-forest-950 font-heading leading-tight">
                LAYTON <span className="text-forest-600 font-extrabold">LAWN</span>
              </div>
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-widest flex items-center gap-1">
                <span>SERVICE</span>
                <span className="w-1 h-1 rounded-full bg-forest-500"></span>
                <span className="text-forest-700 font-semibold">MARSHALL, TX • EST. 10+ YRS</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-stone-700">
            <button onClick={() => scrollToSection('services')} className="hover:text-forest-700 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('calculator')} className="hover:text-forest-700 transition-colors flex items-center gap-1 text-forest-800">
              <Calculator className="w-4 h-4 text-forest-600" />
              Cost Estimator
            </button>
            <button onClick={() => scrollToSection('service-areas')} className="hover:text-forest-700 transition-colors">
              Service Areas
            </button>
            <button onClick={() => scrollToSection('before-after')} className="hover:text-forest-700 transition-colors">
              Transformations
            </button>
            <button onClick={() => scrollToSection('reviews')} className="hover:text-forest-700 transition-colors">
              Reviews
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-forest-700 transition-colors">
              FAQ
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-forest-700 transition-colors">
              Contact
            </button>
          </nav>

          {/* Direct CTA on Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="tel:9037029586"
              className="flex items-center gap-2 text-forest-900 font-bold px-3 py-2 rounded-lg hover:bg-forest-50 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-forest-700" />
              <span>(903) 702-9586</span>
            </a>
            <button 
              onClick={() => scrollToSection('quote-form')}
              className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-forest-600"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Free Estimate</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a 
              href="tel:9037029586"
              aria-label="Call Layton Lawn Service"
              className="bg-forest-50 text-forest-800 p-2.5 rounded-lg border border-forest-200"
            >
              <Phone className="w-5 h-5 text-forest-700" />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 rounded-lg hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-3 font-semibold text-stone-700 text-base">
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-left py-2 px-3 rounded-md hover:bg-forest-50 hover:text-forest-800"
              >
                Our Services
              </button>
              <button 
                onClick={() => scrollToSection('calculator')} 
                className="text-left py-2 px-3 rounded-md hover:bg-forest-50 hover:text-forest-800 flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-forest-600" />
                Instant Cost Estimator
              </button>
              <button 
                onClick={() => scrollToSection('service-areas')} 
                className="text-left py-2 px-3 rounded-md hover:bg-forest-50 hover:text-forest-800"
              >
                Service Areas (Marshall, Jefferson, Hallsville, Carthage)
              </button>
              <button 
                onClick={() => scrollToSection('before-after')} 
                className="text-left py-2 px-3 rounded-md hover:bg-forest-50 hover:text-forest-800"
              >
                Before & After Transformations
              </button>
              <button 
                onClick={() => scrollToSection('reviews')} 
                className="text-left py-2 px-3 rounded-md hover:bg-forest-50 hover:text-forest-800"
              >
                Local Reviews
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-left py-2 px-3 rounded-md hover:bg-forest-50 hover:text-forest-800"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('quote-form')} 
                className="w-full mt-2 bg-forest-700 text-white font-bold py-3 rounded-lg text-center shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                Request Free Estimate
              </button>
              <a 
                href="tel:9037029586" 
                className="w-full bg-stone-100 text-forest-950 font-bold py-3 rounded-lg text-center flex items-center justify-center gap-2 border border-stone-300"
              >
                <Phone className="w-4 h-4 text-forest-700" />
                Call (903) 702-9586
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-forest-950 overflow-hidden">
        {/* Background photo with high quality gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="absolute inset-0 hero-gradient" />

        {/* Hero Decorative Shapes */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-white z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/80 border border-forest-600/80 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-semibold shadow-inner">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Marshall, TX 75672 • 10+ Years Local Experience</span>
                <span className="hidden sm:inline text-forest-400">• Fully Insured</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.1] text-white">
                East Texas Turf & Grounds Done Right. <br className="hidden sm:block" />
                <span className="text-emerald-400">Dependable Quality Every Time.</span>
              </h1>

              {/* Subhead */}
              <p className="text-base sm:text-lg lg:text-xl text-stone-200 font-normal max-w-2xl leading-relaxed">
                Layton Lawn Service has cared for Marshall and surrounding East Texas lawns for over 10 years. Specializing in residential lawn care, commercial property maintenance, flowerbed revitalizations, and full-season cleanup.
              </p>

              {/* Quick Service Areas Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                <span className="text-xs uppercase font-bold text-stone-300 tracking-wider">Serving:</span>
                {['Marshall (75672)', 'Jefferson', 'Hallsville', 'Carthage'].map((loc) => (
                  <span key={loc} className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-full text-xs font-medium text-stone-100 border border-white/10">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {loc}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('quote-form')}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-black text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 text-forest-950" />
                  <span>Get A Free Fast Estimate</span>
                </button>
                <a 
                  href="tel:9037029586"
                  className="w-full sm:w-auto bg-forest-900/90 hover:bg-forest-800 text-white font-bold text-base px-7 py-4 rounded-xl border border-forest-600 transition-all flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>Call (903) 702-9586</span>
                </a>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-forest-800/80">
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">10+</div>
                  <div className="text-xs text-stone-300">Years in Business</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">100%</div>
                  <div className="text-xs text-stone-300">Locally Owned & Run</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">5-Star</div>
                  <div className="text-xs text-stone-300">East Texas Service</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">Insured</div>
                  <div className="text-xs text-stone-300">Commercial & Res.</div>
                </div>
              </div>

            </div>

            {/* Right Card Column - Quick Free Quote Quick-Launcher */}
            <div className="lg:col-span-5">
              <div className="bg-white text-stone-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-forest-700 via-emerald-500 to-forest-600"></div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-heading text-forest-950">
                      Fast Estimate Request
                    </h2>
                    <p className="text-xs text-stone-500">
                      No obligation • 24hr response or same-day call
                    </p>
                  </div>
                  <div className="bg-forest-50 p-2.5 rounded-xl border border-forest-100 text-forest-700">
                    <Award className="w-6 h-6 text-forest-700" />
                  </div>
                </div>

                {formSubmitted ? (
                  <div className="bg-forest-50 border border-forest-200 rounded-xl p-6 text-center space-y-3">
                    <div className="w-12 h-12 bg-forest-700 text-white rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-forest-950">Thank You! Estimate Received</h4>
                    <p className="text-sm text-stone-600">
                      Layton Lawn Service has received your details. We will review your property and reach out by phone or email shortly!
                    </p>
                    <p className="text-xs text-forest-800 font-semibold">
                      Need immediate assistance? Call <a href="tel:9037029586" className="underline font-bold">(903) 702-9586</a>
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-forest-700 underline font-medium pt-2"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. John Miller" 
                        value={quoteFormData.name}
                        onChange={(e) => setQuoteFormData({...quoteFormData, name: e.target.value})}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          required
                          placeholder="(903) 000-0000" 
                          value={quoteFormData.phone}
                          onChange={(e) => setQuoteFormData({...quoteFormData, phone: e.target.value})}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Town / City *
                        </label>
                        <select 
                          value={quoteFormData.city}
                          onChange={(e) => setQuoteFormData({...quoteFormData, city: e.target.value})}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none transition-colors bg-white"
                        >
                          <option value="Marshall">Marshall, TX (75672)</option>
                          <option value="Hallsville">Hallsville, TX (75650)</option>
                          <option value="Jefferson">Jefferson, TX (75657)</option>
                          <option value="Carthage">Carthage, TX (75633)</option>
                          <option value="Other East Texas">Other Surrounding Area</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Service Needed *
                      </label>
                      <select 
                        value={quoteFormData.serviceType}
                        onChange={(e) => setQuoteFormData({...quoteFormData, serviceType: e.target.value})}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none transition-colors bg-white"
                      >
                        <option value="Residential Lawn Maintenance">Residential Regular Lawn Mowing & Edging</option>
                        <option value="Commercial Grounds Maintenance">Commercial Property & Grounds Maintenance</option>
                        <option value="Mulching & Flowerbeds">Flowerbed Weeding, Edging & Mulch Refresh</option>
                        <option value="Seasonal Clean Up & Leaves">Seasonal Clean Up / Leaf & Brush Clearing</option>
                        <option value="Landscape Installation">Custom Landscaping / Shrub & Sod Work</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Street Address or Neighborhood (Optional)
                      </label>
                      <input 
                        type="text" 
                        placeholder="Street or subdivision" 
                        value={quoteFormData.address}
                        onChange={(e) => setQuoteFormData({...quoteFormData, address: e.target.value})}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none transition-colors"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-forest-700 hover:bg-forest-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Send My Free Estimate Request</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" /> No Obligation
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" /> 100% Free
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" /> Fast Response
                      </span>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Accreditations Banner */}
      <section className="bg-forest-900 text-stone-200 py-6 border-y border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold tracking-wide text-white">Commercial Liability Insured</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-gold-400" />
              <span className="text-sm font-semibold tracking-wide text-white">10+ Years Serving Marshall TX</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold tracking-wide text-white">Consistent Weekly Schedule</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ThumbsUp className="w-5 h-5 text-gold-400" />
              <span className="text-sm font-semibold tracking-wide text-white">100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-forest-700 text-xs font-bold uppercase tracking-widest bg-forest-100 px-3 py-1 rounded-full mb-3">
              <Scissors className="w-3.5 h-3.5" />
              Comprehensive Property Care
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 font-heading">
              Professional Lawn & Property Maintenance
            </h2>
            <p className="mt-3 text-stone-600 text-base sm:text-lg">
              Whether you own a home in Marshall or manage commercial real estate in Hallsville or Carthage, Layton Lawn Service delivers pristine results every single visit.
            </p>

            {/* Service Category Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button 
                onClick={() => setActiveTab('residential')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'residential' 
                    ? 'bg-forest-700 text-white shadow-md' 
                    : 'bg-white text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Home className="w-4 h-4" />
                Residential Maintenance
              </button>
              <button 
                onClick={() => setActiveTab('commercial')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'commercial' 
                    ? 'bg-forest-700 text-white shadow-md' 
                    : 'bg-white text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Commercial Property Care
              </button>
              <button 
                onClick={() => setActiveTab('landscaping')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'landscaping' 
                    ? 'bg-forest-700 text-white shadow-md' 
                    : 'bg-white text-stone-700 hover:bg-stone-200'
                }`}
              >
                <TreePine className="w-4 h-4" />
                Landscaping & Mulching
              </button>
              <button 
                onClick={() => setActiveTab('cleanups')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'cleanups' 
                    ? 'bg-forest-700 text-white shadow-md' 
                    : 'bg-white text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Seasonal & Storm Cleanups
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-200/80">
            {activeTab === 'residential' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-block bg-forest-50 text-forest-800 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider">
                    Routine Home Lawn Care
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-forest-950 font-heading">
                    Keep Your Yard Looking Like a Golf Course Without Lifting a Finger
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    Layton Lawn Service provides worry-free residential lawn care for homeowners across Marshall (75672), Jefferson, Hallsville, and Carthage. We arrive on your designated day, cut at the optimal seasonal height for Bermuda and St. Augustine grasses, and leave your property immaculate.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      'Razor-sharp line edging on sidewalks & driveways',
                      'Precision mowing at healthy seasonal heights',
                      'Thorough weed-eating along fences and borders',
                      'High-velocity clean blowing of all hardscapes',
                      'Hedge, bush, and ornamental shrub trimming',
                      'Reliable weekly or bi-weekly route scheduling'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => scrollToSection('quote-form')}
                      className="bg-forest-700 hover:bg-forest-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Get Residential Estimate</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a 
                      href="tel:9037029586" 
                      className="text-forest-900 font-bold text-sm flex items-center gap-2 hover:underline"
                    >
                      <Phone className="w-4 h-4 text-forest-700" />
                      <span>Call (903) 702-9586</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 group">
                    <img 
                      src={IMAGES.mowing} 
                      alt="Residential lawn mowing service in Marshall TX" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white">
                        <div className="font-bold text-lg">Pristine East Texas Yards</div>
                        <div className="text-xs text-stone-300">Clean lines, no tire ruts, perfectly blown surfaces</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'commercial' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-block bg-forest-50 text-forest-800 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider">
                    Commercial Grounds Maintenance
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-forest-950 font-heading">
                    First Impressions Matter: Crisp, Professional Curb Appeal for Your Business
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    We maintain commercial facilities, retail plazas, corporate offices, medical complexes, churches, and HOAs throughout Harrison and Panola Counties. We understand business hours and operate safely, efficiently, and quietly with full commercial liability insurance.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      'Full grounds & parking lot perimeter maintenance',
                      'HOA common area & neighborhood entrance upkeep',
                      'Offices, banks, medical clinics & retail strips',
                      'Annual master contracts with predictable invoicing',
                      'Strict adherence to business schedule & safety',
                      'Prompt storm & high-wind cleanup coverage'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => scrollToSection('quote-form')}
                      className="bg-forest-700 hover:bg-forest-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Request Commercial RFP / Bid</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-stone-500 font-medium">COI available upon request</span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 group">
                    <img 
                      src={IMAGES.commercial} 
                      alt="Commercial property grounds maintenance in East Texas" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white">
                        <div className="font-bold text-lg">Commercial Excellence</div>
                        <div className="text-xs text-stone-300">Marshall, Hallsville & Carthage business properties</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'landscaping' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-block bg-forest-50 text-forest-800 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider">
                    Landscape Enhancements
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-forest-950 font-heading">
                    Transform Dull Flowerbeds into Vibrant, Weed-Free Highlights
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    In East Texas, heat and pine needles can take a toll on flowerbeds. Our landscape team delivers fresh shredded hardwood mulch, East Texas pine straw, bed edging, weed barrier installation, and native shrub plantings to elevate your property's value.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      'Dark brown, black, and red hardwood mulch delivery & spread',
                      'Natural East Texas pine straw bed coverings',
                      'Trenching and crisp mechanical flowerbed edging',
                      'Weed removal and commercial barrier installation',
                      'Shrub, perennial, and seasonal annual planting',
                      'River rock and stone border installations'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => scrollToSection('quote-form')}
                      className="bg-forest-700 hover:bg-forest-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Get Landscape Estimate</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 group">
                    <img 
                      src={IMAGES.landscape} 
                      alt="Landscaping and mulch in Marshall Texas" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white">
                        <div className="font-bold text-lg">Fresh Mulch & Flowerbed Care</div>
                        <div className="text-xs text-stone-300">Locks in moisture against the Texas summer sun</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cleanups' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-block bg-forest-50 text-forest-800 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider">
                    Seasonal & Debris Cleanups
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-forest-950 font-heading">
                    Clear Leaves, Pine Straw, Overgrowth, and Storm Debris Fast
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    East Texas thunderstorms and heavy autumn pine needle drops can overwhelm yards in a matter of hours. Layton Lawn Service provides high-power leaf clearing, fallen branch disposal, fence line brush trimming, and complete spring/fall prep.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      'Spring scalping, weed pre-emergent prep & aerating',
                      'Fall leaf vacuuming and thorough pine straw clearing',
                      'Fallen tree branch and storm debris clearing',
                      'Fence line, ditch, and pasture perimeter clearing',
                      'Rental property turnover & foreclosed yard resets',
                      'Complete haul-away and disposal options'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => scrollToSection('quote-form')}
                      className="bg-forest-700 hover:bg-forest-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Book Seasonal Cleanup</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 group">
                    <img 
                      src={IMAGES.cleanup} 
                      alt="Seasonal yard cleanup and pine needle removal East Texas" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white">
                        <div className="font-bold text-lg">East Texas Pine & Leaf Clearing</div>
                        <div className="text-xs text-stone-300">Reclaim your turf and protect it from smothering</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cards for All 4 Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: Scissors,
                title: "Precision Mowing",
                desc: "Striped mowing, edging, weed-eating, and clean blowing on every visit.",
                tag: "Weekly / Bi-Weekly"
              },
              {
                icon: Building2,
                title: "Commercial Accounts",
                desc: "Trusted by retail, medical offices, churches & HOAs with guaranteed schedules.",
                tag: "Fully Insured"
              },
              {
                icon: TreePine,
                title: "Landscaping & Beds",
                desc: "Hardwood mulch, pine straw, stone borders, weed barrier & shrub pruning.",
                tag: "Custom Enhancements"
              },
              {
                icon: Sparkles,
                title: "Cleanups & Storm Care",
                desc: "Leaf cleanup, pine needle raking, fallen branch hauling and property resets.",
                tag: "Seasonal & On-Demand"
              }
            ].map((srv, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm card-hover flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4">
                    <srv.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-forest-700 uppercase tracking-wider mb-1">{srv.tag}</div>
                  <h4 className="text-lg font-bold text-stone-900 mb-2 font-heading">{srv.title}</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">{srv.desc}</p>
                </div>
                <button 
                  onClick={() => scrollToSection('quote-form')}
                  className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-forest-700 flex items-center gap-1 hover:text-forest-900"
                >
                  <span>Request service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Cost Estimator Section */}
      <section id="calculator" className="py-20 bg-forest-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#28633a_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-widest bg-forest-900 border border-forest-700 px-3 py-1 rounded-full mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Transparent Pricing Tool
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Instant Lawn Care Cost Estimator
            </h2>
            <p className="mt-3 text-stone-300 text-base sm:text-lg">
              Get an instant realistic ballpark price for your Marshall or East Texas property. No gimmicks, no hidden fees.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-forest-900/90 rounded-3xl p-6 sm:p-10 border border-forest-700 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Controls Column */}
              <div className="md:col-span-7 space-y-6">
                
                {/* 1. Service Type */}
                <div>
                  <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                    1. Select Service Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'residential-mow', label: 'Residential Mowing & Edging' },
                      { id: 'commercial', label: 'Commercial Grounds' },
                      { id: 'mulch-flowerbed', label: 'Mulch & Flowerbed Care' },
                      { id: 'seasonal-cleanup', label: 'Seasonal / Leaf Cleanup' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCalcService(item.id)}
                        className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                          calcService === item.id 
                            ? 'bg-emerald-500 text-forest-950 border-emerald-400 shadow-md font-extrabold'
                            : 'bg-forest-950/60 text-stone-300 border-forest-800 hover:border-forest-600'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Lot / Property Size */}
                <div>
                  <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                    2. Estimated Property Size
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'small', label: 'Town Lot', sub: '< 0.25 Acre' },
                      { id: 'medium', label: 'Standard', sub: '0.25 - 0.5 Ac' },
                      { id: 'large', label: 'Large Lot', sub: '0.5 - 1.0 Ac' },
                      { id: 'acreage', label: 'Acreage', sub: '1 - 3 Acres' },
                      { id: 'commercial', label: 'Campus', sub: 'Commercial' }
                    ].map(size => (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setCalcLotSize(size.id)}
                        className={`p-2.5 rounded-xl text-center transition-all border ${
                          calcLotSize === size.id
                            ? 'bg-emerald-500 text-forest-950 border-emerald-400 shadow-md'
                            : 'bg-forest-950/60 text-stone-300 border-forest-800 hover:border-forest-600'
                        }`}
                      >
                        <div className="text-xs font-bold">{size.label}</div>
                        <div className="text-[10px] opacity-80">{size.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Frequency & Town */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                      3. Service Frequency
                    </label>
                    <select
                      value={calcFrequency}
                      onChange={(e) => setCalcFrequency(e.target.value)}
                      className="w-full bg-forest-950 border border-forest-700 text-white text-xs font-semibold rounded-xl px-3.5 py-3 outline-none focus:border-emerald-400"
                    >
                      <option value="weekly">Weekly (Recommended for Lawn Health)</option>
                      <option value="biweekly">Bi-Weekly (Every 2 Weeks)</option>
                      <option value="onetime">One-Time Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                      4. Your City / Area
                    </label>
                    <select
                      value={calcCity}
                      onChange={(e) => setCalcCity(e.target.value)}
                      className="w-full bg-forest-950 border border-forest-700 text-white text-xs font-semibold rounded-xl px-3.5 py-3 outline-none focus:border-emerald-400"
                    >
                      <option value="Marshall">Marshall, TX (75672)</option>
                      <option value="Hallsville">Hallsville, TX (75650)</option>
                      <option value="Jefferson">Jefferson, TX (75657)</option>
                      <option value="Carthage">Carthage, TX (75633)</option>
                      <option value="Other">Surrounding East Texas</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Estimate Output Column */}
              <div className="md:col-span-5 bg-forest-950/90 rounded-2xl p-6 border border-forest-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-forest-800 pb-3 mb-4">
                    <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">Estimated Ballpark</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                      {calcCity}, TX
                    </span>
                  </div>

                  <div className="text-center py-4">
                    <div className="text-stone-400 text-xs uppercase tracking-widest font-semibold mb-1">
                      Estimated Range:
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-heading">
                      ${estimate.min} - ${estimate.max}
                    </div>
                    <div className="text-xs text-stone-400 mt-1">
                      {calcFrequency === 'onetime' ? 'estimated project cost' : `per visit (${calcFrequency})`}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-stone-300 border-t border-forest-800 pt-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Includes mowing, clean edge, weed-eating & blow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Commercial grade zero-turn precision</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>No long term contract required</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => {
                      setQuoteFormData(prev => ({
                        ...prev, 
                        city: calcCity,
                        notes: `Ballpark Calculator interest: ${calcService} for ${calcLotSize} lot (${calcFrequency}) in ${calcCity}`
                      }))
                      scrollToSection('quote-form')
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-black py-3.5 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Lock In This Rate with Free Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-2">
                    Final quote verified upon quick drive-by or address check
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* East Texas Service Areas Spotlight */}
      <section id="service-areas" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-forest-700 text-xs font-bold uppercase tracking-widest bg-forest-100 px-3 py-1 rounded-full mb-3">
              <MapPin className="w-3.5 h-3.5" />
              Local Territory
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 font-heading">
              Proudly Serving Marshall & Surrounding East Texas
            </h2>
            <p className="mt-3 text-stone-600 text-base sm:text-lg">
              Based right here in Marshall (75672), our trucks run consistent weekly routes throughout Harrison, Marion, and Panola Counties.
            </p>

            {/* Interactive City / Zip Search */}
            <form onSubmit={handleAreaCheck} className="mt-8 max-w-md mx-auto flex items-center gap-2 bg-white p-2 rounded-2xl shadow-md border border-stone-200">
              <input 
                type="text"
                placeholder="Enter your city or zip (e.g. 75672 or Jefferson)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm text-stone-800 placeholder-stone-400 outline-none rounded-xl"
              />
              <button 
                type="submit"
                className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Check</span>
              </button>
            </form>

            {areaResult && (
              <div className={`mt-4 p-4 rounded-xl text-sm font-semibold max-w-md mx-auto transition-all ${
                areaResult.covered 
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}>
                <div className="flex items-center justify-center gap-2 font-bold mb-1">
                  {areaResult.covered ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <MapPin className="w-4 h-4 text-amber-600" />}
                  <span>{areaResult.covered ? 'Service Available!' : 'Special Request Territory'}</span>
                </div>
                <p className="text-xs font-normal">{areaResult.message}</p>
                {areaResult.note && (
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">
                    Route: {areaResult.note}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Marshall Card */}
            <div className="bg-white rounded-2xl p-6 border-2 border-forest-600 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-forest-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg tracking-wider">
                Home Base
              </div>
              <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-forest-700" />
              </div>
              <h3 className="text-xl font-black text-forest-950 font-heading">Marshall, TX</h3>
              <div className="text-xs font-bold text-forest-700 mb-2">Zip Codes: 75672, 75670, 75671</div>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Our central base for 10+ years. Daily mowing, landscape, and commercial contracts across downtown, ETBU campus corridor, Harrison County routes, and established residential neighborhoods.
              </p>
              <div className="text-[11px] font-semibold text-stone-500 bg-stone-100 p-2.5 rounded-lg">
                Daily Route Coverage • Same-Day Drive-By Quotes
              </div>
            </div>

            {/* Hallsville Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm card-hover">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-xl font-black text-forest-950 font-heading">Hallsville, TX</h3>
              <div className="text-xs font-bold text-forest-700 mb-2">Zip Code: 75650</div>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                High-frequency service to Hallsville's fast-growing residential developments, Highway 80 commercial strip, and local school district family neighborhoods.
              </p>
              <div className="text-[11px] font-semibold text-stone-500 bg-stone-100 p-2.5 rounded-lg">
                Regular Weekly & Bi-Weekly Mowing Crews
              </div>
            </div>

            {/* Jefferson Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm card-hover">
              <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-forest-700" />
              </div>
              <h3 className="text-xl font-black text-forest-950 font-heading">Jefferson, TX</h3>
              <div className="text-xs font-bold text-forest-700 mb-2">Zip Code: 75657</div>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Specialized grounds maintenance for historic estates, bed & breakfast properties, Caddo Lake getaways, and Marion County commercial and residential grounds.
              </p>
              <div className="text-[11px] font-semibold text-stone-500 bg-stone-100 p-2.5 rounded-lg">
                Historic Property Care & Bed Detail
              </div>
            </div>

            {/* Carthage Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm card-hover">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-xl font-black text-forest-950 font-heading">Carthage, TX</h3>
              <div className="text-xs font-bold text-forest-700 mb-2">Zip Code: 75633</div>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Full-service lawn care and commercial grounds management across Panola County, Hwy 59/79 corridors, large rural acreage, and residential subdivisions.
              </p>
              <div className="text-[11px] font-semibold text-stone-500 bg-stone-100 p-2.5 rounded-lg">
                Acreage, Residential & Commercial
              </div>
            </div>

          </div>

          {/* Surrounding towns ticker */}
          <div className="mt-8 text-center text-xs text-stone-500 font-medium bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
            Also providing reliable route coverage to: <strong className="text-stone-800">Waskom (75692)</strong> • <strong className="text-stone-800">Elysian Fields (75642)</strong> • <strong className="text-stone-800">Scottsville (75688)</strong> • <strong className="text-stone-800">Harleton (75651)</strong> • <strong className="text-stone-800">Nesbitt</strong> • <strong className="text-stone-800">Woodlawn</strong>
          </div>

        </div>
      </section>

      {/* Interactive Before & After Visual Slider */}
      <section id="before-after" className="py-20 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-forest-700 text-xs font-bold uppercase tracking-widest bg-forest-100 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              The Layton Difference
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 font-heading">
              See The Transformation
            </h2>
            <p className="mt-3 text-stone-600 text-base sm:text-lg">
              Drag the interactive slider left and right to see how Layton Lawn Service transforms overgrown, ragged turf into clean, picture-perfect curb appeal.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Interactive Image Slider */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none h-[380px] sm:h-[480px]">
              
              {/* After Image (Background) */}
              <img 
                src={IMAGES.after} 
                alt="After professional lawn care and manicured landscape" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-6 right-6 bg-forest-900/90 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg backdrop-blur-md shadow-md border border-forest-700">
                After (Layton Lawn Care)
              </div>

              {/* Before Image (Clipped) */}
              <div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={IMAGES.before} 
                  alt="Before overgrown grass and unedged lawn" 
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '100%', height: '100%' }}
                />
                <div className="absolute bottom-6 left-6 bg-stone-900/90 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg backdrop-blur-md shadow-md border border-stone-700">
                  Before (Overgrown & Unedged)
                </div>
              </div>

              {/* Slider Handle Divider Line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-forest-700 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-bold">
                  ⇄
                </div>
              </div>

              {/* Range input overlay for full accessibility & touch/mouse dragging */}
              <input 
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label="Before and after transformation slider"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-2 mt-3">
              <span>◄ Drag slider left for AFTER</span>
              <span>Drag slider right for BEFORE ►</span>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Layton Lawn Service (10 Years Experience Highlights) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-forest-700 text-xs font-bold uppercase tracking-widest bg-forest-100 px-3 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" />
                Proven 10-Year Track Record
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 font-heading leading-tight">
                Why East Texas Homeowners & Businesses Count On Layton Lawn Service
              </h2>

              <p className="text-stone-600 text-base leading-relaxed">
                We've seen fly-by-night lawn crews come and go in Marshall and Harrison County. When you hire Layton Lawn Service, you get a decade of proven reliability, local pride, and genuine craftsmanship.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "We Show Up On Schedule, Every Time",
                    desc: "No wondering whether your grass will be cut before the weekend. We run disciplined weekly routes and notify you of any weather adjustments."
                  },
                  {
                    title: "Commercial-Grade Razor Sharp Blades",
                    desc: "Dull blades tear grass and cause brown tips. We sharpen our commercial mower blades daily for crisp cuts that promote disease-resistant, green turf."
                  },
                  {
                    title: "East Texas Soil & Grass Specialists",
                    desc: "Whether dealing with stubborn Harrison County red clay, deep shade under tall pines, or Bermuda sun requirements, we understand local soil."
                  },
                  {
                    title: "Easy Payment & Invoicing",
                    desc: "Convenient payment methods including cards, autopay, checks, or digital invoices for both residential accounts and commercial AP departments."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200">
                    <div className="w-8 h-8 rounded-lg bg-forest-100 text-forest-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-base">{item.title}</h4>
                      <p className="text-sm text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => scrollToSection('quote-form')}
                  className="bg-forest-700 hover:bg-forest-800 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <span>Experience The Difference</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            <div className="lg:col-span-6 space-y-6">
              
              {/* Stat card 1 */}
              <div className="bg-forest-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-forest-800">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="text-emerald-400 text-5xl font-black font-heading">10+</div>
                  <div className="text-xl font-bold mt-2">Years Serving Marshall, TX 75672</div>
                  <p className="text-stone-300 text-sm mt-2 leading-relaxed">
                    Decade-long relationships with local homeowners, churches, retail centers, and property managers who know our trucks and trust our handshake.
                  </p>
                </div>
              </div>

              {/* Stat card 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                  <ShieldCheck className="w-8 h-8 text-forest-700 mb-3" />
                  <div className="font-bold text-stone-900 text-lg">Fully Insured</div>
                  <p className="text-xs text-stone-600 mt-1">
                    Complete commercial liability protection for residential homes & commercial facilities.
                  </p>
                </div>

                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                  <ThumbsUp className="w-8 h-8 text-forest-700 mb-3" />
                  <div className="font-bold text-stone-900 text-lg">Satisfaction First</div>
                  <p className="text-xs text-stone-600 mt-1">
                    If any gate was left unlatched or spot missed, we return immediately to make it 100% right.
                  </p>
                </div>
              </div>

              {/* Service Promise Quote Box */}
              <div className="border-l-4 border-forest-600 pl-4 py-2 italic text-stone-700 text-sm">
                "Our business was built on being the lawn crew that actually shows up every single week and treats your yard like our own property."
                <div className="font-bold not-italic text-stone-900 text-xs mt-1">— Layton Lawn Service Management</div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-forest-700 text-xs font-bold uppercase tracking-widest bg-forest-100 px-3 py-1 rounded-full mb-3">
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
              Verified Local Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 font-heading">
              What East Texas Neighbors Are Saying
            </h2>
            <p className="mt-3 text-stone-600 text-base sm:text-lg">
              Read authentic feedback from residential and commercial clients across Marshall, Hallsville, Jefferson, and Carthage.
            </p>
            
            {/* Overall Rating badge */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="font-bold text-stone-900 text-sm">5.0 Star Local Reputation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Review 1 */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-gold-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic mb-4">
                  "Layton Lawn Service has been mowing our home in Marshall for 4 seasons now. They never miss our Thursday slot, the edging around our driveway is always razor sharp, and they never blow grass clippings into our pool. Truly the best in Harrison County."
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Robert & Brenda M.</div>
                  <div className="text-xs text-stone-500">Homeowners • Marshall, TX 75672</div>
                </div>
                <span className="text-[11px] bg-forest-50 text-forest-700 font-semibold px-2 py-1 rounded">Residential</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-gold-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic mb-4">
                  "As a property manager overseeing an office complex in Hallsville and retail lots in Marshall, having Layton handling grounds maintenance has taken a huge weight off my shoulders. Clear monthly invoicing, fully insured, and pristine curb appeal for our tenants."
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">David S.</div>
                  <div className="text-xs text-stone-500">Commercial Property Manager • Hallsville, TX</div>
                </div>
                <span className="text-[11px] bg-forest-50 text-forest-700 font-semibold px-2 py-1 rounded">Commercial</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-gold-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic mb-4">
                  "We have lots of mature pine trees on our property in Jefferson that drop needles all over the yard and beds. Layton Lawn Service did a complete spring overhaul with fresh hardwood mulch and bed edging. It completely transformed our front view."
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Karen T.</div>
                  <div className="text-xs text-stone-500">Historic Homeowner • Jefferson, TX</div>
                </div>
                <span className="text-[11px] bg-forest-50 text-forest-700 font-semibold px-2 py-1 rounded">Landscaping</span>
              </div>
            </div>

            {/* Review 4 */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-gold-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic mb-4">
                  "Finding reliable acreage and perimeter mowing near Carthage used to be a headache. Layton brought out heavy-duty commercial zero-turns and handled our 2-acre residential lot in record time. Professional crew and reasonable pricing."
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Mark W.</div>
                  <div className="text-xs text-stone-500">Acreage Owner • Carthage, TX</div>
                </div>
                <span className="text-[11px] bg-forest-50 text-forest-700 font-semibold px-2 py-1 rounded">Acreage Care</span>
              </div>
            </div>

            {/* Review 5 */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-gold-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic mb-4">
                  "After a heavy wind storm knocked down several large limbs in our yard in Marshall, Layton Lawn Service came out the next morning, cut and chipped the branches, and raked the lawn clean. Lifesavers!"
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Stephanie P.</div>
                  <div className="text-xs text-stone-500">Residential Client • Marshall, TX 75672</div>
                </div>
                <span className="text-[11px] bg-forest-50 text-forest-700 font-semibold px-2 py-1 rounded">Storm Cleanup</span>
              </div>
            </div>

            {/* Review 6 */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-gold-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic mb-4">
                  "Fair, honest, hardworking local guys. They treat you with respect, show up when they say they will, and the results speak for themselves. You can tell they take pride in what they do."
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Gary H.</div>
                  <div className="text-xs text-stone-500">Local Church Trustee • Marshall, TX</div>
                </div>
                <span className="text-[11px] bg-forest-50 text-forest-700 font-semibold px-2 py-1 rounded">Commercial / Church</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Free Quote & Booking Section */}
      <section id="quote-form" className="py-20 bg-forest-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 border border-forest-700 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                Free On-Site or Drive-By Quote
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
                Ready for a Cleaner, Greener Property? Let's Talk.
              </h2>

              <p className="text-stone-300 text-base leading-relaxed">
                Fill out the quick quote form and our team will review your property's location and size. We often do fast drive-by estimates within 24 hours across Marshall, Hallsville, Jefferson, and Carthage.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-700 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-stone-400">Call or Text Directly</div>
                    <a href="tel:9037029586" className="text-lg font-black text-white hover:text-emerald-400 transition-colors">
                      (903) 702-9586
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-700 text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-stone-400">Email Inquiries</div>
                    <a href="mailto:quotes@laytonlawnservice.com" className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
                      quotes@laytonlawnservice.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-700 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-stone-400">Operating Headquarters</div>
                    <div className="text-sm font-semibold text-white">
                      Marshall, Texas 75672
                    </div>
                    <div className="text-xs text-stone-400">Serving Harrison, Marion & Panola Counties</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-700 text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-stone-400">Working Hours</div>
                    <div className="text-sm font-semibold text-white">
                      Monday – Friday: 7:00 AM – 6:00 PM
                    </div>
                    <div className="text-xs text-stone-400">Saturday: 8:00 AM – 2:00 PM</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Interactive Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white text-stone-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-stone-200">
                <div className="border-b border-stone-200 pb-4 mb-6">
                  <h3 className="text-2xl font-black font-heading text-forest-950">
                    Request Your Free Estimate
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Tell us a bit about your property. No obligations, no pushy sales.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-forest-700 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-forest-950 font-heading">
                      Quote Request Received!
                    </h4>
                    <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
                      Thank you for contacting Layton Lawn Service. We are reviewing your property details and will get back to you promptly with pricing and availability.
                    </p>
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 max-w-sm mx-auto">
                      Need a same-day answer? Call us at <a href="tel:9037029586" className="font-bold text-forest-700 hover:underline">(903) 702-9586</a>
                    </div>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-bold text-forest-700 underline mt-4"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Your Name"
                          value={quoteFormData.name}
                          onChange={(e) => setQuoteFormData({...quoteFormData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          required
                          placeholder="(903) 555-0123"
                          value={quoteFormData.phone}
                          onChange={(e) => setQuoteFormData({...quoteFormData, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          placeholder="you@example.com"
                          value={quoteFormData.email}
                          onChange={(e) => setQuoteFormData({...quoteFormData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          City / Community *
                        </label>
                        <select 
                          value={quoteFormData.city}
                          onChange={(e) => setQuoteFormData({...quoteFormData, city: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none bg-white font-medium"
                        >
                          <option value="Marshall">Marshall, TX (75672)</option>
                          <option value="Hallsville">Hallsville, TX (75650)</option>
                          <option value="Jefferson">Jefferson, TX (75657)</option>
                          <option value="Carthage">Carthage, TX (75633)</option>
                          <option value="Waskom">Waskom, TX (75692)</option>
                          <option value="Elysian Fields">Elysian Fields, TX (75642)</option>
                          <option value="Other Area">Other Surrounding East Texas Area</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Property Street Address *
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="123 Main St or Subdivision"
                          value={quoteFormData.address}
                          onChange={(e) => setQuoteFormData({...quoteFormData, address: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Primary Service Requested *
                        </label>
                        <select 
                          value={quoteFormData.serviceType}
                          onChange={(e) => setQuoteFormData({...quoteFormData, serviceType: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none bg-white font-medium"
                        >
                          <option value="Residential Lawn Maintenance">Residential Weekly/Bi-Weekly Lawn Care</option>
                          <option value="Commercial Grounds Maintenance">Commercial Property Maintenance</option>
                          <option value="Flowerbed Mulching & Edging">Flowerbed Weeding & Mulching</option>
                          <option value="Seasonal Cleanup & Pine Needles">Seasonal Clean Up / Leaf Clearing</option>
                          <option value="Shrub Pruning & Landscaping">Landscape Planting & Shrub Trimming</option>
                          <option value="Storm & Debris Haulaway">Storm Debris / Branch Clearing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Property Notes / Gate Codes / Special Requests
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="Tell us about dogs in the yard, fence gate width, preferred mowing day, acreage size, etc."
                        value={quoteFormData.notes}
                        onChange={(e) => setQuoteFormData({...quoteFormData, notes: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-forest-700 hover:bg-forest-800 text-white font-black text-base py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold-400" />
                      <span>Submit Estimate Request</span>
                    </button>

                    <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-forest-700" /> Fully Insured & Protected
                      </span>
                      <span>No Spam Guarantee</span>
                      <span>Serving 75672 & East Texas</span>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <section id="faq" className="py-20 bg-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 text-forest-700 text-xs font-bold uppercase tracking-widest bg-forest-100 px-3 py-1 rounded-full mb-3">
              Helpful Answers
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-stone-600 text-base">
              Everything you need to know about starting service with Layton Lawn Service.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-forest-800 transition-colors"
                  >
                    <span className="text-base font-heading">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-forest-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <h4 className="font-bold text-forest-950 text-base">Have a specific question about your yard or commercial bid?</h4>
            <p className="text-stone-600 text-xs mt-1">Our owner and crew leaders are happy to discuss custom arrangements.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a 
                href="tel:9037029586" 
                className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                Call (903) 702-9586
              </a>
              <button 
                onClick={() => scrollToSection('quote-form')}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs px-5 py-2.5 rounded-lg"
              >
                Send A Message
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-forest-950 text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-800">
            
            {/* Col 1 & 2: Brand & About */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center border border-forest-700">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white font-heading tracking-tight">
                    LAYTON <span className="text-emerald-400">LAWN</span> SERVICE
                  </div>
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                    Marshall, Texas 75672 • 10+ Years Experience
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed pr-6">
                East Texas's trusted partner for residential lawn mowing, commercial property grounds management, mulch and flowerbed landscaping, and seasonal cleanups. Serving Marshall, Jefferson, Hallsville, Carthage, and surrounding communities.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1 text-xs bg-forest-900 border border-forest-700 px-3 py-1 rounded-full text-emerald-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Fully Insured
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-forest-900 border border-forest-700 px-3 py-1 rounded-full text-gold-400 font-semibold">
                  <Award className="w-3.5 h-3.5" /> 10+ Years Local
                </span>
              </div>
            </div>

            {/* Col 3: Services */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-heading">
                Our Services
              </h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setActiveTab('residential'); scrollToSection('services'); }} className="hover:text-emerald-400 transition-colors">Residential Lawn Mowing</button></li>
                <li><button onClick={() => { setActiveTab('residential'); scrollToSection('services'); }} className="hover:text-emerald-400 transition-colors">Precision Edging & Weed-Eating</button></li>
                <li><button onClick={() => { setActiveTab('commercial'); scrollToSection('services'); }} className="hover:text-emerald-400 transition-colors">Commercial Grounds Maintenance</button></li>
                <li><button onClick={() => { setActiveTab('commercial'); scrollToSection('services'); }} className="hover:text-emerald-400 transition-colors">HOA & Corporate Campuses</button></li>
                <li><button onClick={() => { setActiveTab('landscaping'); scrollToSection('services'); }} className="hover:text-emerald-400 transition-colors">Flowerbed Mulch & Pine Straw</button></li>
                <li><button onClick={() => { setActiveTab('landscaping'); scrollToSection('services'); }} className="hover:text-emerald-400 transition-colors">Shrub & Hedge Pruning</button></li>
                <li><button onClick={() => { setActiveTab('cleanups'); scrollToSection('services'); }} className="hover:text-emerald-400 transition-colors">Fall Leaf & Pine Needle Cleanup</button></li>
                <li><button onClick={() => { setActiveTab('cleanups'); scrollToSection('services'); }} className="hover:text-emerald-400 transition-colors">Storm Debris Clearing</button></li>
              </ul>
            </div>

            {/* Col 4: Service Areas */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-heading">
                Service Areas
              </h4>
              <ul className="space-y-2 text-xs">
                <li><span className="text-white font-medium">Marshall, TX</span> <span className="text-stone-400">(75672, 75670)</span></li>
                <li><span className="text-white font-medium">Hallsville, TX</span> <span className="text-stone-400">(75650)</span></li>
                <li><span className="text-white font-medium">Jefferson, TX</span> <span className="text-stone-400">(75657)</span></li>
                <li><span className="text-white font-medium">Carthage, TX</span> <span className="text-stone-400">(75633)</span></li>
                <li><span className="text-stone-300">Waskom, TX (75692)</span></li>
                <li><span className="text-stone-300">Elysian Fields, TX (75642)</span></li>
                <li><span className="text-stone-300">Harrison County, TX</span></li>
                <li><span className="text-stone-300">Panola & Marion Counties</span></li>
              </ul>
            </div>

            {/* Col 5: Contact & Hours */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-heading">
                Get In Touch
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-stone-400">Phone:</div>
                  <a href="tel:9037029586" className="text-white font-bold hover:text-emerald-400 text-sm">
                    (903) 702-9586
                  </a>
                </div>
                <div>
                  <div className="text-stone-400">Location:</div>
                  <div className="text-white font-medium">Marshall, TX 75672</div>
                </div>
                <div>
                  <div className="text-stone-400">Operating Hours:</div>
                  <div className="text-stone-200">Mon-Fri: 7:00am - 6:00pm</div>
                  <div className="text-stone-200">Saturday: 8:00am - 2:00pm</div>
                  <div className="text-stone-400">Sunday: Closed</div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <div>
              © {new Date().getFullYear()} Layton Lawn Service. All rights reserved. Locally owned & operated in Marshall, TX 75672.
            </div>
            <div className="flex items-center gap-4">
              <span>Licensed & Commercial Liability Insured</span>
              <span>•</span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-emerald-400 hover:underline">
                Back to Top ↑
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Bottom Quick-Action Bar on Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 z-40 shadow-2xl flex items-center gap-3">
        <a 
          href="tel:9037029586"
          className="flex-1 bg-stone-100 hover:bg-stone-200 text-forest-950 font-bold text-xs py-3 rounded-xl border border-stone-300 flex items-center justify-center gap-2 text-center"
        >
          <Phone className="w-4 h-4 text-forest-700" />
          <span>Call (903) 702-9586</span>
        </a>
        <button 
          onClick={() => scrollToSection('quote-form')}
          className="flex-1 bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-center"
        >
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>Get Free Estimate</span>
        </button>
      </div>

    </div>
  )
}
