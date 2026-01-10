import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Calendar, DollarSign, Clock, Home, FileText, CreditCard, Key, Truck, ShieldCheck, Percent, Building } from 'lucide-react';
import InventoryLink from '@/components/InventoryLink';

const Financing = () => {
  const rentToOwnBenefits = [
    '90 Days Same as Cash',
    'No Credit Check - We Do Not Report to Credit Agencies',
    'Choose a monthly term and payment that works for you',
    'Pay a small down payment to have your building delivered',
    'Free Delivery and Setup of your building',
    'No early pay-off penalties',
    'Financial Hardship? Just call and we will pick up the building with no effect on your credit',
    'Own the structure at the end of the rental contract',
    'Save time & fuel - have storage in your own backyard',
    'Own it for life after the Contract is fulfilled',
    'Adds value to your home and property',
    'Portable - can be moved',
    '24, 36, 48, and 60 month terms available',
    'Pay Online - Set up automatic ACH, Debit Card or Credit Card payments',
  ];

  const financingBenefits = [
    '100% financing available with approved credit',
    'Rates as low as 9.99% with approved credit',
    'Choose from 12, 24, 36, & 48 month terms',
    '5 easy payment options: online, phone, auto draft, mail, or call a rep',
    'No early pay-off penalties',
    'Quick Approval process',
  ];

  const howItWorks = [
    {
      icon: Home,
      step: '01',
      title: 'Select A Building',
      description: 'Select what you want to buy from our wide range of storage buildings, cabins, and garages.',
    },
    {
      icon: FileText,
      step: '02',
      title: 'Choose Your Option',
      description: 'Select Rent to Own (no credit check) or Financing (with approved credit).',
    },
    {
      icon: CreditCard,
      step: '03',
      title: 'Easy Approval',
      description: 'Rent to Own requires no credit check. Financing gets quick approval with Upgrade.',
    },
    {
      icon: Key,
      step: '04',
      title: 'You Own It',
      description: 'Own it at the end of your term with flexible payments that fit your budget.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Financing & Rent to Own | Summit Portable Buildings</title>
        <meta name="description" content="Flexible payment options for your storage building. Rent to Own with no credit check or financing with rates as low as 9.99%. Apply today!" />
        <link rel="canonical" href="https://summitbuildings.com/financing" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent" />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Flexible Payment Options
              </span>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
                Rent to Own or Finance Your Building
              </h1>
              <p className="text-primary-foreground/90 text-xl md:text-2xl mb-4">
                No credit check required for Rent to Own. Financing available with approved credit.
              </p>
              <p className="text-secondary text-lg font-semibold mb-8">
                No Early Payoff Penalties on Either Option!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6"
                  asChild
                >
                  <a href="#rent-to-own">
                    Rent to Own
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
                  asChild
                >
                  <a href="#financing">
                    Apply for Financing
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="font-heading text-3xl md:text-4xl text-center mb-12">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {howItWorks.map((item, index) => (
                <div key={index} className="text-center relative">
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
                  )}
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <span className="inline-block bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1 rounded-full mb-3">
                      Step {item.step}
                    </span>
                    <h3 className="font-heading text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rent to Own Section */}
        <section id="rent-to-own" className="py-16 bg-muted scroll-mt-24">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  No Credit Check Required
                </span>
                <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                  Rent to Own
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Rent to Own is simply a rent payment each month that allows you to have a storage shed, garage, cabin, animal shelter, dog kennel or swing set for your backyard or business, when and where you need it. Once you make the last payment, ownership transfers to you!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-2 border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Percent className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="font-heading text-xl text-foreground">90 Days Same as Cash</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Pay off your building within 90 days and pay no additional rental fees - just the cash price!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="font-heading text-xl text-foreground">No Credit Check</h3>
                    </div>
                    <p className="text-muted-foreground">
                      We do not run credit checks and do not report to credit agencies. Your credit score is not affected.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Truck className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="font-heading text-xl text-foreground">Free Delivery & Setup</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Your building is delivered and set up at no extra charge within our delivery area.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Building className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="font-heading text-xl text-foreground">No Questions Asked Return</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Financial hardship? Just call and we will pick up the building at anytime with no effect on your credit score.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Down Payment Info */}
              <div className="bg-card rounded-xl p-8 border border-border mb-12">
                <h3 className="font-heading text-2xl text-foreground mb-6 text-center">Down Payment Requirements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted rounded-lg p-6">
                    <h4 className="font-heading text-lg text-secondary mb-2">24 & 36 Month Terms</h4>
                    <p className="text-foreground">Only require first month's rent at time of sale</p>
                    <p className="text-sm text-muted-foreground mt-1">(For buildings up to $14,999)</p>
                  </div>
                  <div className="bg-muted rounded-lg p-6">
                    <h4 className="font-heading text-lg text-secondary mb-2">48 & 60 Month Terms</h4>
                    <p className="text-foreground">Require 2 months' rent at time of sale</p>
                    <p className="text-sm text-muted-foreground mt-1">(For buildings up to $14,999)</p>
                  </div>
                </div>
                <p className="text-center text-muted-foreground mt-6 text-sm">
                  Custom down payment required for buildings over $15,000. Contact a Sales Rep for more info.
                </p>
              </div>

              {/* All Benefits */}
              <h3 className="font-heading text-2xl text-foreground mb-6 text-center">Key Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {rentToOwnBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6"
                  asChild
                >
                  <a href="/contact-us">
                    Contact Us About Rent to Own
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Financing Section */}
        <section id="financing" className="py-16 bg-primary scroll-mt-24">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  With Approved Credit
                </span>
                <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">
                  Financing Through Upgrade
                </h2>
                <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
                  Summit Portable Buildings also offers financing provided by Upgrade. This is a standard installment loan agreement with approved credit - get 100% financing with rates as low as 9.99%.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Percent className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-heading text-lg text-primary-foreground mb-2">Rates as Low as</h3>
                    <p className="text-3xl font-bold text-secondary">9.99%</p>
                    <p className="text-primary-foreground/70 text-sm mt-1">with approved credit</p>
                  </CardContent>
                </Card>

                <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-heading text-lg text-primary-foreground mb-2">100% Financing</h3>
                    <p className="text-3xl font-bold text-secondary">Available</p>
                    <p className="text-primary-foreground/70 text-sm mt-1">with approved credit</p>
                  </CardContent>
                </Card>

                <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-heading text-lg text-primary-foreground mb-2">Term Options</h3>
                    <p className="text-3xl font-bold text-secondary">12-48</p>
                    <p className="text-primary-foreground/70 text-sm mt-1">month terms available</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {financingBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-primary-foreground/10 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-primary-foreground/80 mb-6">
                  Find out if you're approved NOW by clicking the button below!
                </p>
                <Button 
                  size="lg" 
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6"
                  asChild
                >
                  <a href="https://upgrade.com/h/6lFlFMgaJZ" target="_blank" rel="noopener noreferrer">
                    Apply for Financing Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom text-center">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you choose Rent to Own or Financing, we're here to help you get the perfect storage building for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                asChild
              >
                <a href="https://summitbuildings.shedpro.co/" target="_blank" rel="noopener noreferrer">
                  Build Your Own
                </a>
              </Button>
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                asChild
              >
                <InventoryLink>
                  Browse Our Inventory
                </InventoryLink>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact-us">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Financing;
