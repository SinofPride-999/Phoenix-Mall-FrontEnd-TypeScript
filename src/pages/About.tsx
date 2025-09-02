import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  TrendingUp,
  Star,
  Zap,
  Award,
  ArrowRight,
  ShoppingBag,
  Link as LinkIcon,
  CheckCircle,
  Target,
  Globe,
  CreditCard,
  Flame
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const About: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Users' },
    { icon: ShoppingBag, value: '100,000+', label: 'Products Listed' },
    { icon: Star, value: '4.9/5', label: 'Customer Rating' },
    { icon: Globe, value: 'Nationwide', label: 'Coverage' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your transactions are protected with our advanced escrow system, ensuring safe payments for buyers and guaranteed payments for sellers.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We\'re building more than a marketplace—we\'re creating a community where students and young entrepreneurs can thrive together.'
    },
    {
      icon: TrendingUp,
      title: 'Empowerment',
      description: 'We believe everyone should have the opportunity to earn. Our Plug system makes entrepreneurship accessible to all.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We\'re constantly evolving to bring you the most modern, efficient, and enjoyable shopping experience in Ghana.'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Sign Up & Explore',
      description: 'Create your free account in seconds. Browse thousands of products from trusted sellers across Ghana.',
      icon: Users
    },
    {
      step: '2',
      title: 'Shop or Sell Safely',
      description: 'Buy with confidence using our secure escrow system, or list your products to start earning.',
      icon: Shield
    },
    {
      step: '3',
      title: 'Become a Plug & Earn',
      description: 'Share products with your network and earn commissions on every successful referral.',
      icon: LinkIcon
    },
    {
      step: '4',
      title: 'Grow With Us',
      description: 'Join a community that supports your growth, whether you\'re a buyer, seller, or Plug.',
      icon: TrendingUp
    }
  ];

  const plugBenefits = [
    'Earn commissions on every successful referral',
    'No upfront costs or fees to join',
    'Flexible—work from anywhere, anytime',
    'Access to marketing tools and resources',
    'Build your network and reputation',
    'Exclusive rewards and recognition'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-red-600 via-red-700 to-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Revolutionizing <br /> E-commerce in <span className="text-amber-300">Ghana</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              The student-first, community-driven marketplace where everyone can buy, sell, and earn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Join the Revolution
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 mt-16 md:mt-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="flex justify-center mb-3">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              More Than Just a Marketplace
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              PhoeniX Mall is transforming the way Ghanaians shop and sell online. We've combined a secure marketplace with an empowering affiliate system to create opportunities for everyone.
            </p>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <p className="text-red-700 font-medium">
                "Our mission is to empower the next generation of entrepreneurs, starting with students and young hustlers across Ghana."
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Built for <span className="text-red-600">Students</span>, by Innovators
              </h3>
              <p className="text-gray-600 mb-6">
                We understand the unique challenges faced by students and young entrepreneurs in Ghana. That's why we designed PhoeniX Mall to be accessible, affordable, and empowering.
              </p>
              <p className="text-gray-600">
                Whether you're looking to make extra income between classes, start your first business, or simply shop smarter, PhoeniX Mall provides the tools and community to help you succeed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-red-500 to-amber-500 p-1 rounded-2xl"
            >
              <div className="bg-white p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">The Future of E-commerce</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Secure escrow payments for peace of mind</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Earn commissions as a Plug with our affiliate system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Community-driven marketplace with verified sellers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Zero setup costs for sellers and Plugs</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plug System Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Earn With Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Become a <span className="text-red-600">Plug</span> & Start Earning
            </h2>
            <p className="text-lg text-gray-600">
              In Ghanaian slang, a "Plug" connects people to what they need. At PhoeniX Mall, you can become an official Plug and earn commissions by promoting products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-soft">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Become a Plug?</h3>
                <ul className="space-y-4">
                  {plugBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/become-a-plug')}
                  className="mt-8 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Join the Plug Program
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">₵500+</div>
                <div className="text-sm text-gray-600">Average Monthly Earnings</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">5,000+</div>
                <div className="text-sm text-gray-600">Active Plugs</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">15%</div>
                <div className="text-sm text-gray-600">Average Commission</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">24h</div>
                <div className="text-sm text-gray-600">Quick Payouts</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Safe & Secure
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Shop & Sell with <span className="text-red-600">Confidence</span>
            </h2>
            <p className="text-lg text-gray-600">
              Our advanced escrow system protects both buyers and sellers, ensuring fair transactions and building trust in our marketplace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-center p-6 bg-gray-50 rounded-2xl"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Payments are held securely in escrow until both parties are satisfied with the transaction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center p-6 bg-gray-50 rounded-2xl"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Sellers</h3>
              <p className="text-gray-600">
                All sellers undergo a verification process to ensure a trustworthy marketplace experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-center p-6 bg-gray-50 rounded-2xl"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dispute Resolution</h3>
              <p className="text-gray-600">
                Our dedicated team helps resolve issues fairly and efficiently when they arise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How <span className="text-red-600">PhoeniX Mall</span> Works
            </h2>
            <p className="text-lg text-gray-600">
              Getting started with PhoeniX Mall is simple. Whether you want to shop, sell, or become a Plug, we've made the process straightforward and rewarding.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                      {step.step}
                    </div>
                    <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-0.5 bg-red-200 hidden lg:block"></div>
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-red-600 to-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the <span className="text-amber-300">Revolution</span>?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Whether you're looking to shop smart, start selling, or earn as a Plug, PhoeniX Mall has everything you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/become-a-plug')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Become a Plug
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
