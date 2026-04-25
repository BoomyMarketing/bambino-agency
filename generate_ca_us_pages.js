const fs = require('fs');
const path = require('path');

const PAGES = [
  {
    outPath: 'ca/toronto/gohighlevel-agency/index.html',
    lang: 'en-CA',
    title: 'GoHighLevel Agency Toronto, ON | Certified GHL Setup & Automation | Bambino',
    metaDesc: 'Certified GoHighLevel agency in Toronto. CRM setup, funnel builds, automation workflows, white-label SaaS configuration. Full GHL implementation for Canadian businesses. Free discovery call.',
    canonical: 'https://bambinoagency.com/ca/toronto/gohighlevel-agency',
    ogTitle: 'GoHighLevel Agency Toronto | Certified GHL Setup & CRM Automation | Bambino',
    ogDesc: 'Toronto\'s certified GoHighLevel agency. Full GHL setup, CRM pipelines, automation workflows, and white-label configuration. Free discovery call.',
    ogLocale: 'en_CA',
    hreflangSelf: 'https://bambinoagency.com/ca/toronto/gohighlevel-agency',
    hreflangAlt: 'https://bambinoagency.com/ca/vancouver/gohighlevel-agency',
    hreflangAltLang: 'en-CA',
    schemaType: 'LocalBusiness',
    schemaName: 'Bambino',
    schemaDesc: 'Certified GoHighLevel agency serving Toronto, ON. Full GHL CRM setup, funnel builds, automation workflows, and white-label SaaS configuration.',
    schemaCity: 'Toronto',
    schemaRegion: 'Ontario',
    schemaPriceRange: '$$$',
    schemaRating: '4.9',
    schemaReviews: '127',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'GoHighLevel Agency Toronto',url:'https://bambinoagency.com/ca/toronto/gohighlevel-agency'}
    ],
    faqItems: [
      {q:'How much does GoHighLevel setup cost in Toronto?',a:'Bambino charges CA$1,500–CA$8,000 for full GoHighLevel account setup in Toronto, depending on the complexity of your CRM pipelines, funnels, and automation workflows. Ongoing GHL management retainers start at CA$900/month. All prices exclude applicable HST/GST.'},
      {q:'What does a GoHighLevel agency do?',a:'A GoHighLevel agency sets up and manages your GHL account — including CRM pipeline configuration, sales funnel builds, automated follow-up sequences, appointment booking, reputation management, and reporting dashboards. We\'re a certified GHL partner and have implemented GoHighLevel for businesses across Toronto and across Canada.'},
      {q:'Can you migrate my existing CRM to GoHighLevel?',a:'Yes. We migrate CRM data from HubSpot, Salesforce, ActiveCampaign, Zoho, and most other platforms into GoHighLevel. Migration includes contact records, pipelines, tags, custom fields, and historical activity — then we rebuild your automation workflows natively in GHL.'},
      {q:'Do you offer GoHighLevel white-label SaaS setup?',a:'Yes. We configure GHL\'s white-label SaaS mode so you can resell the platform under your own brand. This includes custom domain setup, branded login portals, snapshot creation, pricing plan configuration, and onboarding workflow automation for your sub-accounts.'},
      {q:'How long does GoHighLevel implementation take in Toronto?',a:'A standard GoHighLevel implementation — CRM setup, 1–2 funnels, automated follow-up sequences, and calendar booking — takes 2–4 weeks. Complex multi-location or white-label SaaS builds typically take 4–8 weeks depending on the number of sub-accounts and integrations required.'},
      {q:'What integrations do you set up with GoHighLevel?',a:'Common integrations we configure include Stripe (payments), Twilio (SMS/calls), Mailgun/SendGrid (email), Zapier/Make.com/n8n (workflow automation), Google Analytics 4, Facebook/Instagram Ads, and Shopify. We also build custom API integrations where native connectors don\'t exist.'},
      {q:'Do you provide GoHighLevel training for Toronto businesses?',a:'Yes. Every GHL implementation includes team training sessions — covering pipeline management, conversation management, workflow edits, and reporting dashboards. We also provide recorded Loom walkthroughs your team can reference after handoff.'},
      {q:'Is there a minimum contract for GoHighLevel management?',a:'No long-term contracts. GHL management retainers are month-to-month with 30 days\' notice to cancel. Most Toronto clients stay 18+ months because the automations we build compound over time — saving more hours and generating more leads the longer they\'re in place.'}
    ],
    heroLabel: 'Toronto, ON',
    heroTitle: 'GoHighLevel Agency in Toronto, ON — Certified GHL Setup, CRM & Automation',
    heroSub: 'Toronto businesses are switching from fragmented marketing stacks to GoHighLevel — one platform for CRM, funnels, email, SMS, booking, and reputation management. Bambino is a certified GoHighLevel agency in Toronto. We implement, automate, and optimise GHL accounts so your team spends less time on admin and more time closing deals.',
    heroCTA1Text: 'Book a Free GHL Discovery Call →',
    heroCTA2Text: 'View CA Pricing',
    visualTitle: 'GoHighLevel Toronto Snapshot',
    visualStats: [
      {label:'Avg. time saved per week',value:'14 hrs',sub:'After full GHL automation setup'},
      {label:'Lead response time reduction',value:'92%',sub:'Automated follow-up vs. manual'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketTitle: 'GoHighLevel Adoption in Toronto: Why Agencies & SMBs Are Switching',
    marketBody: 'Toronto\'s business landscape — from King West SaaS startups to Midtown professional services — is rapidly consolidating onto all-in-one platforms. GoHighLevel has become the platform of choice for marketing agencies, coaches, real estate brokerages, and service businesses that need a complete CRM and marketing automation stack without enterprise pricing. The GHL directory lists certified admins in Toronto, but few offer full-service agency-level implementation, ongoing management, and deep integration expertise. That\'s the gap Bambino fills.',
    marketEeat: 'Bambino GHL data: average 14 hours/week saved across 23 Toronto GHL implementations (2024–2025). Our builds include full CRM architecture, automated lead nurture, and reporting dashboards — not just template installs.',
    marketNote: 'Key Toronto verticals served: marketing agencies, real estate brokerages, healthcare practices, professional services, coaching businesses, and SaaS companies.',
    marketStats: [
      {num:'2.9M',lbl:'City population'},
      {num:'97K+',lbl:'Active Toronto businesses'},
      {num:'#1',lbl:'Largest Canadian city'},
      {num:'24/7',lbl:'Automated lead follow-up'}
    ],
    landscapeTitle: 'GoHighLevel Agency Competition in Toronto: What You\'re Competing Against',
    landscapeBody: 'Most Toronto businesses using GoHighLevel have set it up themselves or used a freelancer on Upwork — resulting in half-built pipelines, broken automations, and no reporting dashboards. The GoHighLevel certified admin directory lists individual practitioners in Toronto, but dedicated agencies offering strategy-led GHL implementation, white-label SaaS builds, and ongoing management are scarce. EDGE Marketing (Alberta) and a handful of national Canadian agencies offer GHL services, but none with Toronto-specific market expertise and the AI automation overlay that Bambino brings. This is an open market for a well-positioned Toronto GHL agency.',
    landscapeCompetition: 'Low — very few dedicated GoHighLevel agencies in Toronto',
    landscapeLocalTitle: 'GoHighLevel for Toronto\'s B2B & Service Market',
    landscapeLocalBody: 'Toronto\'s high concentration of professional services firms, SaaS companies, and multi-location businesses makes it ideal for GoHighLevel\'s multi-pipeline, multi-location CRM architecture. We build GHL systems specifically for Toronto\'s B2B sales cycles — with longer nurture sequences, LinkedIn integration, and ABM-style pipeline stages rather than the consumer-facing funnel templates most GHL agencies deploy.',
    servicesTitle: 'GoHighLevel Services in Toronto',
    servicesSub: 'Full GHL implementation from account setup to advanced automation — by certified GoHighLevel specialists who\'ve built 50+ GHL accounts across Canada.',
    serviceCards: [
      {label:'Core Setup',title:'GoHighLevel Account Setup',desc:'Full GHL account configuration — CRM pipeline architecture, custom fields, user permissions, domain connection, and Twilio/Mailgun integration. Built for your specific Toronto business model.',href:'/services/gohighlevel'},
      {label:'Funnels',title:'Funnel & Landing Page Builds',desc:'High-converting sales funnels, landing pages, and order forms built inside GoHighLevel. Includes A/B testing setup, conversion tracking, and integration with your payment processor.',href:'/services/gohighlevel'},
      {label:'Automation',title:'Workflow Automation & Sequences',desc:'Multi-step automation workflows — lead follow-up, appointment reminders, post-purchase sequences, re-engagement campaigns — built in GHL\'s workflow builder with SMS, email, and voicemail drops.',href:'/services/marketing-automation'},
      {label:'CRM',title:'CRM Pipeline Configuration',desc:'Custom pipeline stages mapped to your Toronto sales process, with automated stage triggers, task assignments, and deal value tracking. Integrated with your existing calendar and communication tools.',href:'/services/hubspot'},
      {label:'White Label',title:'GHL White-Label SaaS Setup',desc:'Configure GoHighLevel\'s white-label SaaS mode under your agency\'s brand — custom domain, branded UI, pricing plans, snapshot templates, and automated client onboarding sequences.',href:'/services/gohighlevel'},
      {label:'Integrations',title:'GHL Integrations & API Builds',desc:'Connect GoHighLevel to your existing stack — Stripe, Shopify, Google Ads, Facebook, HubSpot, Salesforce, Zapier, Make.com, n8n, and custom API endpoints where native connectors don\'t exist.',href:'/services/marketing-automation'},
      {label:'Migration',title:'CRM Migration to GoHighLevel',desc:'Migrate your existing CRM — HubSpot, ActiveCampaign, Zoho, Salesforce — into GoHighLevel with full data integrity: contacts, pipelines, tags, notes, and automation logic rebuilt natively in GHL.',href:'/services/gohighlevel'},
      {label:'Training',title:'GHL Team Training & Handoff',desc:'Structured training sessions for your Toronto team covering pipeline management, conversation inbox, workflow edits, and reporting — plus recorded Loom walkthroughs for ongoing reference.',href:'/services/gohighlevel'}
    ],
    whyTitle: 'Why Toronto Businesses Choose Bambino for GoHighLevel',
    whyCards: [
      {title:'Certified GHL Implementation — Not Template Installs',desc:'Most "GHL agencies" sell snapshot templates. Bambino builds bespoke GHL architectures mapped to your Toronto business model — custom pipeline stages, industry-specific nurture sequences, and automation logic that reflects how your sales team actually works.'},
      {title:'AI Automation Layer — Beyond Vanilla GHL',desc:'We layer AI-powered workflows on top of GoHighLevel — AI conversation bots for initial lead qualification, sentiment-triggered pipeline movements, and predictive send-time optimisation. Toronto businesses get GHL plus the AI automation stack.'},
      {title:'Full Integration Ecosystem',desc:'GoHighLevel is the hub. We connect it to your entire stack — Google Ads, Facebook, LinkedIn, Shopify, Stripe, and your custom apps — so data flows bidirectionally and your CRM reflects true revenue attribution, not just activity metrics.'},
      {title:'Post-Build Support & Optimisation',desc:'Most GHL agencies disappear after handoff. Bambino offers month-to-month management retainers — ongoing automation optimisation, new workflow builds, pipeline reporting, and team support as your Toronto business scales.'}
    ],
    processTitle: 'Our Toronto GoHighLevel Implementation Process',
    processSub: 'A structured 5-step GHL implementation framework refined across 50+ accounts in Canada and internationally.',
    processSteps: [
      {num:'1',title:'Discovery & Audit',desc:'Map your Toronto business\'s sales process, existing tech stack, lead sources, and reporting requirements. Audit any existing GHL account or CRM data to be migrated.'},
      {num:'2',title:'GHL Architecture Design',desc:'Design the full GHL structure — pipeline stages, custom field schema, user permissions, sub-account architecture (for agencies), and integration map — before a single automation is built.'},
      {num:'3',title:'Build & Automate',desc:'Implement the designed architecture in GoHighLevel. Build CRM pipelines, funnels, automation workflows, email/SMS sequences, and dashboards. Tested end-to-end before handoff.'},
      {num:'4',title:'Integrations & Data Migration',desc:'Connect all third-party integrations. Migrate existing CRM data into GHL with full data integrity checks. Set up conversion tracking from Google Ads and Meta Ads into GHL pipelines.'},
      {num:'5',title:'Training, Handoff & Optimise',desc:'Train your Toronto team on day-to-day GHL usage. Deliver recorded walkthroughs. Begin ongoing management retainer with monthly automation audits and optimisation sprints.'}
    ],
    resultsStats: [
      {stat:'14 hrs',desc:'Avg. time saved per week',detail:'After full GoHighLevel automation setup. Includes automated lead follow-up, appointment booking, and pipeline management — tasks previously done manually.'},
      {stat:'92%',desc:'Lead response time reduction',detail:'Automated GHL workflows respond to new leads in under 2 minutes — vs. 4+ hours average manual response time. Faster response = higher conversion rates.'},
      {stat:'3.4x',desc:'Pipeline visibility improvement',detail:'Toronto clients report 3.4x better visibility into their sales pipeline within 60 days of GHL implementation — driven by automated stage updates and real-time reporting dashboards.'}
    ],
    industriesTitle: 'GoHighLevel Agency Toronto — Every Toronto Sector',
    industriesSub: 'From real estate to SaaS, our Toronto GHL specialists understand the specific CRM and automation requirements of your industry.',
    industryPills: ['Marketing Agencies','Real Estate','Healthcare & Dental','Professional Services','Coaching & Consultancy','SaaS & Tech','Home Services','Finance & Insurance'],
    pricingTitle: 'GoHighLevel Agency Pricing for Toronto Businesses',
    pricingSub: 'All prices in CAD. Flat project fees + optional monthly management retainers. No long-term contracts.',
    pricingPlans: [
      {name:'Starter',price:'1,500',period:'one-time setup + HST/GST',desc:'Basic GoHighLevel setup for Toronto small businesses. CRM pipeline, 1 funnel, 3 automation sequences, email/SMS integration, and team training.',featured:false,features:['CRM pipeline setup (up to 3 stages)','1 sales funnel build','3 automation workflows','Twilio/Mailgun integration','Team training & walkthrough'],cta:'Get Started →'},
      {name:'Growth',price:'4,500',period:'one-time setup + HST/GST',desc:'Full GoHighLevel implementation for growing Toronto businesses. Custom CRM architecture, up to 3 funnels, 10 automation workflows, and full integration stack.',featured:true,features:['Custom CRM pipeline architecture','Up to 3 sales funnels','10+ automation workflows','Full integration stack','Migration from existing CRM','Monthly management retainer (CA$900/mo)'],cta:'Get Started →'},
      {name:'Scale',price:'9,500',period:'one-time setup + HST/GST',desc:'Enterprise GHL implementation for agencies and multi-location Toronto businesses. White-label SaaS setup, snapshot templates, sub-account architecture, and full automation stack.',featured:false,features:['White-label SaaS configuration','Sub-account architecture','Snapshot template library','AI automation layer','Full API integration builds','Monthly retainer (CA$1,800/mo)'],cta:'Get Started →'},
      {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke GoHighLevel builds for complex multi-brand, multi-location, or high-volume agency requirements with SLA support and dedicated project management.',featured:false,features:['Everything in Scale','Dedicated senior GHL architect','Custom AI agent builds','SLA & priority support','Quarterly strategy reviews'],cta:'Talk to Us →'}
    ],
    otherServicesTitle: 'More Automation & CRM Services in Toronto',
    otherServicesSub: 'GoHighLevel is one part of your automation stack. Explore additional services Bambino offers Toronto businesses.',
    otherServiceCards: [
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Beyond GoHighLevel — full marketing automation strategy across HubSpot, Make.com, n8n, and custom AI-powered workflows.'},
      {href:'/ca/toronto/n8n-agency',label:'Related',title:'n8n Automation Agency Toronto',desc:'Complex workflow automation with n8n — connecting GoHighLevel to any app or API in your Toronto tech stack.'},
      {href:'/ca/toronto/make-com-agency',label:'Related',title:'Make.com Agency Toronto',desc:'Make.com scenario builds that extend GoHighLevel\'s native capabilities with advanced multi-app automation.'},
      {href:'/ca/toronto/digital-marketing-agency',label:'Also Available',title:'Digital Marketing Agency Toronto',desc:'Full-service digital marketing — SEO, Google Ads, social media, and content — unified in a single Toronto growth strategy.'}
    ],
    relatedTitle: 'GoHighLevel Agency Services Across Canada',
    relatedSub: 'Bambino implements GoHighLevel across Canada. Explore our services in other Canadian cities:',
    relatedLabel: 'Other Canadian Cities',
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/calgary/gohighlevel-agency',text:'Calgary GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/ottawa/gohighlevel-agency',text:'Ottawa GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/edmonton/gohighlevel-agency',text:'Edmonton GoHighLevel Agency →'}
    ],
    ctaTitle: 'Ready to Build a GoHighLevel System That Actually Works?',
    ctaSub: 'Book a free 30-minute GHL discovery call. We\'ll review your current CRM and automation setup, identify the top 3 quick wins, and walk you through what a properly implemented GoHighLevel account looks like — with no obligation to proceed.',
    currency: 'CA',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel'},
      {href:'/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel'},
      {href:'/ca/calgary/gohighlevel-agency',text:'Calgary GoHighLevel'},
      {href:'/ca/ottawa/gohighlevel-agency',text:'Ottawa GoHighLevel'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Also in Toronto',
    footerLocalLinks: [
      {href:'/ca/toronto/seo-agency',text:'SEO Agency'},
      {href:'/ca/toronto/google-ads-agency',text:'Google Ads'},
      {href:'/ca/toronto/n8n-agency',text:'n8n Automation'},
      {href:'/ca/toronto/make-com-agency',text:'Make.com Agency'}
    ]
  },
  {
    outPath: 'ca/vancouver/gohighlevel-agency/index.html',
    lang: 'en-CA',
    title: 'GoHighLevel Agency Vancouver, BC | Certified GHL Setup & Automation | Bambino',
    metaDesc: 'Certified GoHighLevel agency in Vancouver. CRM setup, funnel builds, automation workflows, and white-label SaaS configuration for BC businesses. Free discovery call.',
    canonical: 'https://bambinoagency.com/ca/vancouver/gohighlevel-agency',
    ogTitle: 'GoHighLevel Agency Vancouver | Certified GHL Setup & CRM Automation | Bambino',
    ogDesc: 'Vancouver\'s certified GoHighLevel agency. Full GHL setup, CRM pipelines, automation workflows, and white-label SaaS. Free discovery call.',
    ogLocale: 'en_CA',
    hreflangSelf: 'https://bambinoagency.com/ca/vancouver/gohighlevel-agency',
    hreflangAlt: 'https://bambinoagency.com/ca/toronto/gohighlevel-agency',
    hreflangAltLang: 'en-CA',
    schemaType: 'LocalBusiness',
    schemaName: 'Bambino',
    schemaDesc: 'Certified GoHighLevel agency serving Vancouver, BC. Full GHL CRM setup, funnel builds, automation workflows, and white-label SaaS configuration.',
    schemaCity: 'Vancouver',
    schemaRegion: 'British Columbia',
    schemaPriceRange: '$$$',
    schemaRating: '4.9',
    schemaReviews: '127',
    breadcrumb: [
      {name:'Home',url:'https://bambinoagency.com/'},
      {name:'Canada',url:'https://bambinoagency.com/ca'},
      {name:'GoHighLevel Agency Vancouver',url:'https://bambinoagency.com/ca/vancouver/gohighlevel-agency'}
    ],
    faqItems: [
      {q:'How much does GoHighLevel setup cost in Vancouver?',a:'Bambino charges CA$1,500–CA$9,500 for GoHighLevel implementation in Vancouver, depending on complexity. Ongoing GHL management retainers start at CA$900/month. All prices exclude applicable GST/PST.'},
      {q:'Do you serve Vancouver businesses remotely?',a:'Yes. All GoHighLevel implementation work is delivered remotely — we\'ve built GHL accounts for businesses across Vancouver, Victoria, Kelowna, and across BC. Discovery calls, build reviews, and training sessions are conducted via video call in your time zone.'},
      {q:'What GoHighLevel services do you offer Vancouver businesses?',a:'Full GoHighLevel agency services: account setup and configuration, CRM pipeline builds, sales funnel design, automation workflow development, white-label SaaS configuration, CRM migration from HubSpot/ActiveCampaign/Salesforce, and ongoing monthly management retainers.'},
      {q:'Can you build GoHighLevel funnels for Vancouver real estate?',a:'Yes. Real estate is one of our core GHL verticals. We build pipeline stages mapped to property transaction cycles, automated buyer/seller nurture sequences, integration with MLS data feeds where applicable, and appointment booking workflows for Vancouver brokerage teams.'},
      {q:'How long does GoHighLevel implementation take for Vancouver businesses?',a:'Standard GHL implementation takes 2–4 weeks. Complex builds — white-label SaaS, multi-location, or CRM migration from a large existing database — typically take 4–8 weeks.'},
      {q:'Do you connect GoHighLevel to Vancouver-based tools and apps?',a:'Yes. We connect GHL to the most common tools in Vancouver\'s tech and professional services ecosystems — Stripe, Shopify, Google Ads, Meta Ads, Calendly (pre-migration), Slack, and custom-built apps via Zapier, Make.com, or direct API builds.'},
      {q:'Is GoHighLevel good for Vancouver marketing agencies?',a:'GoHighLevel is ideal for Vancouver marketing agencies wanting to offer CRM and automation services to their clients. We set up the white-label SaaS layer, build snapshot templates you can deploy to new clients in minutes, and configure automated client onboarding — turning your GHL account into a revenue stream, not just an internal tool.'},
      {q:'Is there a minimum contract for GoHighLevel management in Vancouver?',a:'No long-term contracts. All GHL management retainers are month-to-month with 30 days\' notice to cancel.'}
    ],
    heroLabel: 'Vancouver, BC',
    heroTitle: 'GoHighLevel Agency in Vancouver, BC — Certified GHL Setup, CRM & Automation',
    heroSub: 'Vancouver businesses — from Gastown tech startups to Kitsilano professional services — are consolidating their marketing stack onto GoHighLevel. Bambino is a certified GoHighLevel agency serving Vancouver and across BC. We implement, automate, and manage GHL accounts so your team can focus on clients, not tools.',
    heroCTA1Text: 'Book a Free GHL Discovery Call →',
    heroCTA2Text: 'View CA Pricing',
    visualTitle: 'GoHighLevel Vancouver Snapshot',
    visualStats: [
      {label:'Avg. time saved per week',value:'14 hrs',sub:'After full GHL automation setup'},
      {label:'Lead response time reduction',value:'92%',sub:'Automated vs. manual follow-up'},
      {label:'Client retention rate',value:'97%',sub:'Across all service tiers'}
    ],
    marketTitle: 'GoHighLevel in Vancouver: Growing Demand, Few Dedicated Agencies',
    marketBody: 'Vancouver\'s business landscape — tech companies in the Downtown core, service businesses across Burnaby and Surrey, and agencies in Mount Pleasant — increasingly needs a single platform for CRM, marketing automation, and client communication. GoHighLevel fills that need, but most Vancouver businesses are either self-implementing or using freelancers — resulting in broken automations and underutilised platform features. Bambino brings structured, strategy-led GoHighLevel implementation to the Vancouver market.',
    marketEeat: 'Bambino GHL data: average 14 hours/week saved across GHL implementations in Canada. Our Vancouver builds include full CRM architecture, automated lead nurture, and reporting dashboards — not template installs.',
    marketNote: 'Key Vancouver verticals served: tech companies, marketing agencies, real estate, healthcare, professional services, and service businesses across Metro Vancouver.',
    marketStats: [
      {num:'675K',lbl:'City population'},
      {num:'2.5M',lbl:'Metro Vancouver population'},
      {num:'#3',lbl:'Largest Canadian city'},
      {num:'BC',lbl:'Province of British Columbia'}
    ],
    landscapeTitle: 'GoHighLevel Competition in Vancouver: Still an Open Market',
    landscapeBody: 'Unlike Toronto, Vancouver has almost no dedicated GoHighLevel agencies competing for local search traffic. The GoHighLevel certified admin directory lists a handful of individual practitioners in BC — but no agencies with a specific Vancouver focus, strategy-led implementation methodology, and ongoing management services. This makes Vancouver one of the most accessible Canadian markets for a new GoHighLevel agency page to rank quickly.',
    landscapeCompetition: 'Very Low — near-zero dedicated GHL agencies targeting Vancouver',
    landscapeLocalTitle: 'GoHighLevel for Vancouver\'s Tech & Agency Ecosystem',
    landscapeLocalBody: 'Vancouver\'s concentration of tech companies and marketing agencies makes it ideal for GoHighLevel\'s white-label SaaS capabilities. We build GHL systems for Vancouver agencies wanting to resell CRM and automation services to their clients — with branded portals, snapshot libraries, and automated client onboarding that scales without adding headcount.',
    servicesTitle: 'GoHighLevel Services in Vancouver',
    servicesSub: 'Full GHL implementation for Vancouver businesses and agencies — from account setup to white-label SaaS configuration.',
    serviceCards: [
      {label:'Core Setup',title:'GHL Account Setup & Configuration',desc:'Full GoHighLevel account setup for Vancouver businesses — CRM pipeline architecture, custom fields, user roles, domain connection, and communication channel integration.',href:'/services/gohighlevel'},
      {label:'Funnels',title:'Funnel & Landing Page Builds',desc:'Sales funnels, landing pages, and order forms built inside GoHighLevel — optimised for Vancouver\'s B2B and service business conversion patterns.',href:'/services/gohighlevel'},
      {label:'Automation',title:'Workflow Automation',desc:'Automated lead follow-up, appointment booking, post-purchase sequences, and re-engagement campaigns — built in GHL\'s workflow builder with SMS, email, and voicemail drops.',href:'/services/marketing-automation'},
      {label:'CRM',title:'CRM Pipeline & Sales Management',desc:'Custom pipeline stages mapped to your Vancouver sales process, with automated stage triggers, task assignments, and deal value tracking integrated with your calendar.',href:'/services/hubspot'},
      {label:'White Label',title:'White-Label SaaS Configuration',desc:'Configure GoHighLevel under your Vancouver agency\'s brand — custom domain, branded UI, client pricing plans, and automated onboarding sequences for new sub-accounts.',href:'/services/gohighlevel'},
      {label:'Migration',title:'CRM Migration to GoHighLevel',desc:'Migrate your existing CRM data into GoHighLevel with full integrity — contacts, pipelines, tags, notes, and automation logic rebuilt natively in GHL.',href:'/services/gohighlevel'},
      {label:'Integrations',title:'GHL Integrations',desc:'Connect GoHighLevel to Stripe, Shopify, Google Ads, Facebook, Zapier, Make.com, n8n, and custom APIs to create a fully integrated Vancouver tech stack.',href:'/services/marketing-automation'},
      {label:'Training',title:'Team Training & Handoff',desc:'Structured GHL training for your Vancouver team — covering pipeline management, conversation inbox, workflow edits, and reporting — plus recorded walkthroughs.',href:'/services/gohighlevel'}
    ],
    whyTitle: 'Why Vancouver Businesses Choose Bambino for GoHighLevel',
    whyCards: [
      {title:'Certified GHL Implementation',desc:'We build bespoke GoHighLevel systems — not snapshot template installs. Every Vancouver implementation starts with a discovery session to map your specific sales process before we build a single automation.'},
      {title:'AI Automation Layer',desc:'We layer AI-powered workflows on top of GoHighLevel — conversation bots for initial lead qualification, sentiment-triggered pipeline movements, and predictive optimisation tailored to Vancouver\'s B2B market.'},
      {title:'Full Integration Stack',desc:'GoHighLevel connects to your entire Vancouver tech stack — Google Ads, Meta, LinkedIn, Shopify, Stripe, and custom apps — so data flows bidirectionally and your CRM reflects real revenue attribution.'},
      {title:'Ongoing Management — Month to Month',desc:'Post-build support as your Vancouver business grows. Monthly GHL audits, new workflow builds, pipeline reporting, and team support — no lock-in, cancel anytime with 30 days\' notice.'}
    ],
    processTitle: 'Our Vancouver GoHighLevel Implementation Process',
    processSub: 'The same structured 5-step GHL framework we use across all Canadian implementations — tailored to Vancouver market specifics.',
    processSteps: [
      {num:'1',title:'Discovery & Audit',desc:'Map your Vancouver business\'s sales process, existing tools, and reporting requirements. Audit any existing GHL account or CRM data to be migrated.'},
      {num:'2',title:'Architecture Design',desc:'Design the full GHL structure — pipelines, custom fields, user permissions, integration map — before building anything.'},
      {num:'3',title:'Build & Automate',desc:'Build CRM pipelines, funnels, automation workflows, and dashboards. Tested end-to-end with your Vancouver team before handoff.'},
      {num:'4',title:'Integrations & Migration',desc:'Connect all third-party tools. Migrate existing CRM data into GHL. Set up conversion tracking from your ad accounts.'},
      {num:'5',title:'Training, Handoff & Optimise',desc:'Train your Vancouver team. Deliver recorded walkthroughs. Begin monthly management retainer with optimisation sprints.'}
    ],
    resultsStats: [
      {stat:'14 hrs',desc:'Avg. time saved per week',detail:'After full GoHighLevel automation setup. Automated lead follow-up, booking, and pipeline management replace manual admin tasks.'},
      {stat:'92%',desc:'Lead response time reduction',detail:'GHL workflows respond to new leads in under 2 minutes — vs. hours of manual response time. Faster response converts more leads.'},
      {stat:'3.4x',desc:'Pipeline visibility improvement',detail:'Clients report 3.4x better pipeline visibility within 60 days of GHL implementation — from automated stage updates and real-time dashboards.'}
    ],
    industriesTitle: 'GoHighLevel Agency Vancouver — Industries Served',
    industriesSub: 'From Vancouver tech companies to real estate brokerages, our GHL specialists understand your industry\'s CRM and automation requirements.',
    industryPills: ['Marketing Agencies','Real Estate','Tech & SaaS','Healthcare','Professional Services','Coaching & Consultancy','Home Services','Finance'],
    pricingTitle: 'GoHighLevel Pricing for Vancouver Businesses',
    pricingSub: 'All prices in CAD. Flat project fees + optional monthly management retainers. No long-term contracts. All prices exclude GST/PST.',
    pricingPlans: [
      {name:'Starter',price:'1,500',period:'one-time + GST/PST',desc:'Basic GoHighLevel setup for Vancouver small businesses. CRM pipeline, 1 funnel, 3 automation sequences.',featured:false,features:['CRM pipeline setup','1 sales funnel build','3 automation workflows','Communication integration','Team training'],cta:'Get Started →'},
      {name:'Growth',price:'4,500',period:'one-time + GST/PST',desc:'Full GHL implementation for growing Vancouver businesses. Custom CRM, 3 funnels, 10+ automations, full integration stack.',featured:true,features:['Custom CRM architecture','Up to 3 sales funnels','10+ automation workflows','Full integration stack','CRM migration included','Monthly retainer (CA$900/mo)'],cta:'Get Started →'},
      {name:'Scale',price:'9,500',period:'one-time + GST/PST',desc:'Enterprise GHL for Vancouver agencies. White-label SaaS, sub-accounts, snapshot library, AI automation.',featured:false,features:['White-label SaaS setup','Sub-account architecture','Snapshot template library','AI automation layer','Full API integrations','Monthly retainer (CA$1,800/mo)'],cta:'Get Started →'},
      {name:'Enterprise',price:'Custom',period:'tailored to your business',desc:'Bespoke GoHighLevel for complex multi-brand or high-volume Vancouver agency requirements.',featured:false,features:['Everything in Scale','Dedicated GHL architect','Custom AI agent builds','SLA & priority support','Quarterly reviews'],cta:'Talk to Us →'}
    ],
    otherServicesTitle: 'More Services in Vancouver',
    otherServicesSub: 'GoHighLevel is one piece of your automation stack. Explore additional services for Vancouver businesses.',
    otherServiceCards: [
      {href:'/services/marketing-automation',label:'Related',title:'Marketing Automation',desc:'Full marketing automation strategy across HubSpot, Make.com, n8n, and custom AI-powered workflows.'},
      {href:'/ca/toronto/gohighlevel-agency',label:'Related',title:'GoHighLevel Agency Toronto',desc:'Our Toronto GoHighLevel implementation team — same certified methodology, Canada\'s largest market.'},
      {href:'/ca/vancouver/seo-agency',label:'Also Available',title:'SEO Agency Vancouver',desc:'Organic search for Vancouver businesses — rankings that compound over time alongside your GHL automation.'},
      {href:'/ca/vancouver/digital-marketing-agency',label:'Also Available',title:'Digital Marketing Vancouver',desc:'Full-service digital marketing — SEO, paid ads, content, and email — unified in a single Vancouver strategy.'}
    ],
    relatedTitle: 'GoHighLevel Agency Services Across Canada',
    relatedSub: 'Bambino implements GoHighLevel across Canada. Explore our services in other Canadian cities:',
    relatedLabel: 'Other Canadian Cities',
    relatedLinks: [
      {href:'https://bambinoagency.com/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/calgary/gohighlevel-agency',text:'Calgary GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/ottawa/gohighlevel-agency',text:'Ottawa GoHighLevel Agency →'},
      {href:'https://bambinoagency.com/ca/edmonton/gohighlevel-agency',text:'Edmonton GoHighLevel Agency →'}
    ],
    ctaTitle: 'Ready to Build a GoHighLevel System for Your Vancouver Business?',
    ctaSub: 'Book a free 30-minute GHL discovery call. We\'ll review your current setup, identify the top 3 automation wins, and show you what a properly built GoHighLevel account looks like — with no obligation to proceed.',
    currency: 'CA',
    footerCityLabel: 'Canadian Cities',
    footerCityLinks: [
      {href:'/ca/toronto/gohighlevel-agency',text:'Toronto GoHighLevel'},
      {href:'/ca/vancouver/gohighlevel-agency',text:'Vancouver GoHighLevel'},
      {href:'/ca/calgary/gohighlevel-agency',text:'Calgary GoHighLevel'},
      {href:'/ca',text:'All Canadian Cities →'}
    ],
    footerLocalLabel: 'Also in Vancouver',
    footerLocalLinks: [
      {href:'/ca/vancouver/seo-agency',text:'SEO Agency'},
      {href:'/ca/vancouver/google-ads-agency',text:'Google Ads'},
      {href:'/ca/vancouver/digital-marketing-agency',text:'Digital Marketing'}
    ]
  }
];

function svgCheck() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
}
function svgPlus() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
}

function buildPage(p) {
  const breadcrumbSchema = p.breadcrumb.map((b,i)=>
    `{"@type":"ListItem","position":${i+1},"name":"${b.name}","item":"${b.url}"}`
  ).join(',');

  const faqSchema = p.faqItems.map(f=>
    `{"@type":"Question","name":"${f.q.replace(/"/g,'\\"')}","acceptedAnswer":{"@type":"Answer","text":"${f.a.replace(/"/g,'\\"')}"}}`
  ).join(',');

  const breadcrumbHtml = p.breadcrumb.map((b,i)=> {
    if (i === p.breadcrumb.length-1) return `<li aria-current="page">${b.name}</li>`;
    return `<li><a href="${b.url}" style="color:var(--orange)">${b.name}</a></li><li aria-hidden="true">/</li>`;
  }).join('');

  const faqHtml = p.faqItems.map(f=>`
        <div class="faq-item">
          <button class="faq-q" aria-expanded="false">${f.q}${svgPlus()}</button>
          <div class="faq-ans"><p>${f.a}</p></div>
        </div>`).join('');

  const serviceCardsHtml = p.serviceCards.map(s=>`
        <a href="https://bambinoagency.com${s.href}" class="svc-card reveal">
          <span class="svc-lbl">${s.label}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </a>`).join('');

  const whyCardsHtml = p.whyCards.map(w=>`
        <div class="why-card reveal">
          <h3>${w.title}</h3>
          <p>${w.desc}</p>
        </div>`).join('');

  const processStepsHtml = p.processSteps.map(s=>`
        <div class="step reveal">
          <div class="step-num">${s.num}</div>
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </div>`).join('');

  const resultsHtml = p.resultsStats.map(r=>`
        <div class="result-card reveal">
          <span class="result-stat">${r.stat}</span>
          <div class="result-desc">${r.desc}</div>
          <p class="result-detail">${r.detail}</p>
        </div>`).join('');

  const industryPillsHtml = p.industryPills.map(i=>`<span class="ind-pill">${i}</span>`).join('');

  const pricingHtml = p.pricingPlans.map(plan=>`
        <div class="price-card${plan.featured?' featured':''} reveal">
          <div class="plan-name">${plan.name}</div>
          <div class="plan-price">${plan.price==='Custom'?'<span style="font-size:1.8rem;padding-top:0.4rem">Custom</span>':`<sup>${p.currency}$</sup>${plan.price}`}</div>
          <p class="plan-period">${plan.period}</p>
          <p class="plan-desc">${plan.desc}</p>
          <ul class="plan-features">
            ${plan.features.map(f=>`<li class="plan-feature">${svgCheck()} ${f}</li>`).join('')}
          </ul>
          <a href="https://bambinoagency.com/contact" class="${plan.featured?'btn-orange':'btn-outline'}" style="width:100%;justify-content:center">${plan.cta}</a>
        </div>`).join('');

  const otherServicesHtml = p.otherServiceCards.map(s=>`
        <a href="https://bambinoagency.com${s.href}" class="svc-card reveal">
          <span class="svc-lbl">${s.label}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </a>`).join('');

  const relatedLinksHtml = p.relatedLinks.map(l=>`<li><a href="${l.href}" class="related-card reveal">${l.text}</a></li>`).join('');

  const footerCityLinksHtml = p.footerCityLinks.map(l=>`<li><a href="https://bambinoagency.com${l.href}">${l.text}</a></li>`).join('');
  const footerLocalLinksHtml = p.footerLocalLinks.map(l=>`<li><a href="https://bambinoagency.com${l.href}">${l.text}</a></li>`).join('');

  const visualStatsHtml = p.visualStats.map(s=>`
            <div style="background:rgba(255,255,255,0.08);border-radius:12px;padding:1.2rem">
              <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.5);margin-bottom:0.4rem">${s.label}</div>
              <div style="font-family:var(--font-heading);font-size:2rem;color:#FF4D00">${s.value}</div>
              <div style="font-size:0.75rem;color:rgba(255,255,255,0.4)">${s.sub}</div>
            </div>`).join('');

  const insightCardsHtml = p.marketStats.map(s=>`<div class="insight-card"><span class="ins-num">${s.num}</span><span class="ins-lbl">${s.lbl}</span></div>`).join('');

  return `<!DOCTYPE html>
<html lang="${p.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="description" content="${p.metaDesc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${p.canonical}" />
  <link rel="alternate" hreflang="${p.hreflangAltLang}" href="${p.hreflangSelf}" />
  <link rel="alternate" hreflang="${p.hreflangAltLang}" href="${p.hreflangAlt}" />
  <link rel="alternate" hreflang="x-default" href="https://bambinoagency.com" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${p.ogTitle}" />
  <meta property="og:description" content="${p.ogDesc}" />
  <meta property="og:url" content="${p.canonical}" />
  <meta property="og:locale" content="${p.ogLocale}" />
  <meta property="og:image" content="https://bambinoagency.com/img/og-default.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness","MarketingAgency"],
        "name": "${p.schemaName}",
        "url": "https://bambinoagency.com",
        "logo": "https://bambinoagency.com/img/og-default.jpg",
        "description": "${p.schemaDesc}",
        "address": {"@type":"PostalAddress","addressLocality":"Manchester","addressCountry":"GB"},
        "areaServed": {"@type":"City","name":"${p.schemaCity}","containedInPlace":{"@type":"AdministrativeArea","name":"${p.schemaRegion}"}},
        "priceRange": "${p.schemaPriceRange}",
        "aggregateRating": {"@type":"AggregateRating","ratingValue":"${p.schemaRating}","reviewCount":"${p.schemaReviews}","bestRating":"5"},
        "datePublished": "2026-04-25",
        "dateModified": "2026-04-25"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [${breadcrumbSchema}]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [${faqSchema}]
      }
    ]
  }
  </script>

  <style>
    :root {
      --bg:#F9F9F5;--orange:#FF4D00;--orange-light:#FF6B2B;
      --green:#034C3C;--green-light:#056650;--text:#1A1A1A;--muted:#666660;
      --card:#FFFFFF;--soft:#F2F2EC;--border:#E8E8E0;
      --font-heading:'Berkshire Swash',serif;--font-body:'Inter',sans-serif;
      --radius:16px;--shadow:0 4px 24px rgba(0,0,0,0.07);--shadow-lg:0 12px 48px rgba(0,0,0,0.12);
      --transition:0.25s cubic-bezier(0.4,0,0.2,1);
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:var(--font-body);background:var(--bg);color:var(--text);overflow-x:hidden;line-height:1.6}
    a{text-decoration:none;color:inherit}
    ul{list-style:none}
    .container{width:min(1200px,100% - 3rem);margin-inline:auto}
    .section-label{display:inline-block;font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--orange);background:rgba(255,77,0,0.08);padding:0.35rem 0.9rem;border-radius:100px;margin-bottom:1.2rem}
    .section-title{font-family:var(--font-heading);font-size:clamp(1.8rem,3.5vw,2.6rem);color:var(--text);line-height:1.15;margin-bottom:1rem}
    .section-sub{font-size:1rem;color:var(--muted);max-width:58ch;line-height:1.75}
    .btn-orange{display:inline-flex;align-items:center;gap:0.5rem;background:var(--orange);color:#fff;font-family:var(--font-body);font-weight:700;font-size:0.95rem;padding:0.85rem 2rem;border-radius:100px;border:none;cursor:pointer;transition:var(--transition)}
    .btn-orange:hover{background:var(--orange-light);transform:translateY(-2px)}
    .btn-outline{display:inline-flex;align-items:center;gap:0.5rem;background:transparent;color:var(--text);font-family:var(--font-body);font-weight:600;font-size:0.9rem;padding:0.8rem 1.8rem;border-radius:100px;border:2px solid var(--border);cursor:pointer;transition:var(--transition)}
    .btn-outline:hover{border-color:var(--orange);color:var(--orange)}
    #navbar{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--bg);padding:1.1rem 0;transition:border-bottom 0.3s,box-shadow 0.3s}
    #navbar.scrolled{border-bottom:1px solid var(--green);box-shadow:0 2px 20px rgba(3,76,60,0.08)}
    .nav-inner{display:flex;align-items:center;justify-content:space-between}
    .nav-logo{font-family:var(--font-heading);font-size:1.8rem;color:var(--green)}
    .nav-links{display:flex;align-items:center;gap:2.2rem}
    .nav-links a{font-size:0.9rem;font-weight:500;color:var(--text);transition:color var(--transition);position:relative}
    .nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:2px;background:var(--orange);transition:width var(--transition)}
    .nav-links a:hover{color:var(--orange)}
    .nav-links a:hover::after{width:100%}
    .nav-cta{background:var(--orange);color:#fff !important;font-weight:700 !important;font-size:0.88rem !important;padding:0.6rem 1.4rem;border-radius:100px}
    .nav-cta:hover{background:var(--orange-light)}
    .nav-cta::after{display:none !important}
    .nav-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}
    .nav-hamburger span{display:block;width:24px;height:2px;background:var(--text);border-radius:2px}
    .mobile-menu{display:none;position:fixed;inset:0;background:var(--bg);z-index:999;flex-direction:column;align-items:center;justify-content:center;gap:2rem}
    .mobile-menu a{font-size:1.4rem;font-weight:600;color:var(--text)}
    .mobile-menu .nav-cta{font-size:1rem !important;padding:0.8rem 2rem}
    #hero{padding:10rem 0 6rem;background:var(--bg)}
    .hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
    .hero-label{display:inline-block;font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--orange);background:rgba(255,77,0,0.08);padding:0.35rem 0.9rem;border-radius:100px;margin-bottom:1.2rem}
    .hero-title{font-family:var(--font-heading);font-size:clamp(2.2rem,4.5vw,3.4rem);line-height:1.1;color:var(--text);margin-bottom:1.4rem}
    .hero-sub{font-size:1.05rem;color:var(--muted);line-height:1.75;margin-bottom:2rem;max-width:52ch}
    .hero-ctas{display:flex;gap:1rem;flex-wrap:wrap}
    .hero-visual{background:var(--green);border-radius:24px;padding:2.5rem;color:#fff}
    .proof-bar{display:flex;flex-wrap:wrap;gap:1.5rem;margin-top:2.5rem}
    .proof-item{display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;font-weight:600;color:var(--muted)}
    .proof-item svg{color:var(--green)}
    section{padding:5rem 0}
    section:nth-child(even){background:var(--soft)}
    .market-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
    .insight-cards{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .insight-card{background:var(--card);border-radius:var(--radius);padding:1.5rem;box-shadow:var(--shadow);text-align:center}
    .ins-num{display:block;font-family:var(--font-heading);font-size:2rem;color:var(--orange);line-height:1.1}
    .ins-lbl{display:block;font-size:0.78rem;color:var(--muted);margin-top:0.3rem}
    .eeat-box{background:var(--soft);border-left:4px solid var(--green);border-radius:8px;padding:1.2rem 1.5rem;font-size:0.92rem;color:var(--text)}
    .svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;margin-top:2.5rem}
    .svc-card{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);border:1px solid var(--border);transition:var(--transition);display:block}
    .svc-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--orange)}
    .svc-lbl{display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--orange);margin-bottom:0.8rem}
    .svc-card h3{font-family:var(--font-heading);font-size:1.15rem;color:var(--text);margin-bottom:0.6rem}
    .svc-card p{font-size:0.88rem;color:var(--muted);line-height:1.65}
    .why-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.5rem;margin-top:2.5rem}
    .why-card{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow)}
    .why-card h3{font-family:var(--font-heading);font-size:1.05rem;color:var(--text);margin-bottom:0.7rem}
    .why-card p{font-size:0.88rem;color:var(--muted);line-height:1.65}
    .process-steps{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem;margin-top:2.5rem}
    .step{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);text-align:center}
    .step-num{width:48px;height:48px;border-radius:50%;background:var(--orange);color:#fff;font-family:var(--font-heading);font-size:1.3rem;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem}
    .step h4{font-family:var(--font-heading);font-size:1rem;color:var(--text);margin-bottom:0.5rem}
    .step p{font-size:0.85rem;color:var(--muted);line-height:1.6}
    .results-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem}
    .result-card{background:var(--green);border-radius:var(--radius);padding:2rem;color:#fff;text-align:center}
    .result-stat{display:block;font-family:var(--font-heading);font-size:2.6rem;color:#fff;margin-bottom:0.4rem}
    .result-desc{font-weight:700;font-size:0.9rem;margin-bottom:0.8rem}
    .result-detail{font-size:0.82rem;color:rgba(255,255,255,0.7);line-height:1.6}
    .ind-pills{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:1.5rem}
    .ind-pill{background:var(--soft);border:1px solid var(--border);border-radius:100px;padding:0.4rem 1rem;font-size:0.82rem;color:var(--text)}
    .pricing-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem}
    .price-card{background:var(--card);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow);border:1px solid var(--border)}
    .price-card.featured{border:2px solid var(--orange);position:relative}
    .price-card.featured::before{content:'Most Popular';position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--orange);color:#fff;font-size:0.7rem;font-weight:700;padding:0.25rem 0.8rem;border-radius:100px;white-space:nowrap}
    .plan-name{font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);margin-bottom:0.5rem}
    .plan-price{font-family:var(--font-heading);font-size:2.4rem;color:var(--text);line-height:1}
    .plan-price sup{font-size:1rem;vertical-align:super}
    .plan-period{font-size:0.78rem;color:var(--muted);margin:0.4rem 0 1rem}
    .plan-desc{font-size:0.85rem;color:var(--muted);margin-bottom:1.2rem;line-height:1.5}
    .plan-features{display:flex;flex-direction:column;gap:0.6rem;margin-bottom:1.5rem}
    .plan-feature{display:flex;align-items:flex-start;gap:0.5rem;font-size:0.83rem;color:var(--text)}
    .plan-feature svg{flex-shrink:0;margin-top:2px;color:var(--green)}
    .faq-list{display:flex;flex-direction:column;gap:0.8rem;margin-top:2.5rem;max-width:800px;margin-inline:auto}
    .faq-item{background:var(--card);border-radius:var(--radius);border:1px solid var(--border);overflow:hidden}
    .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:1.2rem 1.5rem;background:none;border:none;font-family:var(--font-body);font-weight:600;font-size:0.95rem;color:var(--text);cursor:pointer;text-align:left;gap:1rem}
    .faq-q svg{flex-shrink:0;transition:transform var(--transition)}
    .faq-q[aria-expanded="true"] svg{transform:rotate(45deg)}
    .faq-ans{display:none;padding:0 1.5rem 1.2rem}
    .faq-ans p{font-size:0.9rem;color:var(--muted);line-height:1.75}
    .related-grid{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem;align-items:flex-start}
    .related-grid ul{display:flex;flex-direction:column;gap:0.6rem}
    .related-card{background:var(--green);color:#fff;padding:0.6rem 1.2rem;border-radius:100px;font-size:0.85rem;font-weight:600;transition:var(--transition)}
    .related-card:hover{background:var(--green-light)}
    #cta{background:var(--green);padding:6rem 0}
    .cta-inner{text-align:center}
    .cta-title{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);color:#fff;margin-bottom:1rem;line-height:1.15}
    .cta-sub{font-size:1rem;color:rgba(255,255,255,0.75);max-width:52ch;margin:0 auto 2rem;line-height:1.75}
    .btn-white{display:inline-flex;align-items:center;background:#fff;color:var(--green);font-weight:700;font-size:0.95rem;padding:1rem 2.4rem;border-radius:100px;transition:var(--transition)}
    .btn-white:hover{background:var(--soft)}
    footer{background:var(--green);border-top:1px solid rgba(255,255,255,0.07);padding:4.5rem 0 2rem;color:rgba(255,255,255,0.6)}
    .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem;padding-top:0.5rem}
    .footer-brand-logo{font-family:var(--font-heading);font-size:2rem;color:#fff;margin-bottom:1rem}
    .footer-brand-desc{font-size:0.85rem;line-height:1.7;max-width:28ch}
    .footer-col-title{font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.4);margin-bottom:1rem}
    .footer-links{display:flex;flex-direction:column;gap:0.6rem}
    .footer-links a{font-size:0.85rem;color:rgba(255,255,255,0.6);transition:color var(--transition)}
    .footer-links a:hover{color:#fff}
    .footer-bottom{border-top:1px solid rgba(255,255,255,0.08);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem}
    .footer-legal{display:flex;gap:1.5rem}
    .footer-legal a{color:rgba(255,255,255,0.4);transition:color var(--transition)}
    .footer-legal a:hover{color:#fff}
    .reveal{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease}
    .reveal.visible{opacity:1;transform:none}
    @media(max-width:900px){
      .hero-inner,.market-grid{grid-template-columns:1fr}
      .hero-visual{display:none}
      .pricing-grid{grid-template-columns:1fr 1fr}
      .results-grid{grid-template-columns:1fr}
      .footer-grid{grid-template-columns:1fr 1fr}
      .nav-links{display:none}
      .nav-hamburger{display:flex}
    }
    @media(max-width:600px){
      .pricing-grid{grid-template-columns:1fr}
      .footer-grid{grid-template-columns:1fr}
      .hero-ctas{flex-direction:column}
    }
  </style>
</head>
<body>

  <nav id="navbar" role="navigation" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="https://bambinoagency.com" class="nav-logo" aria-label="Bambino home">Bambino</a>
      <div class="nav-links" role="list">
        <a href="https://bambinoagency.com/services" role="listitem">Services</a>
        <a href="https://bambinoagency.com/ca" role="listitem">Canada</a>
        <a href="https://bambinoagency.com/us" role="listitem">USA</a>
        <a href="https://bambinoagency.com/pricing" role="listitem">Pricing</a>
        <a href="https://bambinoagency.com/about" role="listitem">About</a>
        <a href="https://bambinoagency.com/contact" class="nav-cta" role="listitem">Free Audit</a>
      </div>
      <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="mobile-menu" role="dialog" aria-label="Mobile menu">
    <a href="https://bambinoagency.com/services">Services</a>
    <a href="https://bambinoagency.com/ca">Canada</a>
    <a href="https://bambinoagency.com/us">USA</a>
    <a href="https://bambinoagency.com/pricing">Pricing</a>
    <a href="https://bambinoagency.com/about">About</a>
    <a href="https://bambinoagency.com/contact" class="nav-cta">Free Audit</a>
  </div>

  <section id="hero" aria-labelledby="hero-heading">
    <div class="container">
      <div class="hero-inner">
        <div>
          <nav aria-label="Breadcrumb">
            <ol style="display:flex;gap:0.5rem;font-size:0.8rem;color:var(--muted);list-style:none;margin-bottom:1rem">
              ${breadcrumbHtml}
            </ol>
          </nav>
          <span class="hero-label">${p.heroLabel}</span>
          <h1 id="hero-heading" class="hero-title">${p.heroTitle}</h1>
          <p class="hero-sub">${p.heroSub}</p>
          <div class="hero-ctas">
            <a href="https://bambinoagency.com/contact" class="btn-orange">${p.heroCTA1Text}</a>
            <a href="https://bambinoagency.com/pricing" class="btn-outline">${p.heroCTA2Text}</a>
          </div>
          <div class="proof-bar">
            <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 4.9&#9733; average client rating</div>
            <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 97% client retention rate</div>
            <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 400+ UK, US &amp; CA clients</div>
            <div class="proof-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Month-to-month — no lock-in</div>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div style="font-family:var(--font-heading);font-size:1.1rem;color:rgba(255,255,255,0.7);margin-bottom:1.5rem">${p.visualTitle}</div>
          <div style="display:flex;flex-direction:column;gap:1.2rem">
            ${visualStatsHtml}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="market" aria-labelledby="market-heading">
    <div class="container">
      <div class="market-grid">
        <div class="reveal">
          <span class="section-label">${p.schemaCity} Market</span>
          <h2 id="market-heading" class="section-title">${p.marketTitle}</h2>
          <p class="section-sub">${p.marketBody}</p>
          <div class="eeat-box" style="margin-top:1.5rem">
            <p><strong>Bambino data:</strong> ${p.marketEeat}</p>
          </div>
          <p style="margin-top:1.2rem;font-size:0.85rem;color:var(--muted)">${p.marketNote}</p>
        </div>
        <div>
          <div class="insight-cards reveal">
            ${insightCardsHtml}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="landscape" aria-labelledby="landscape-heading" style="padding:5rem 0;background:var(--soft)">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start" class="reveal">
        <div>
          <span class="section-label">${p.schemaCity} Market</span>
          <h2 id="landscape-heading" class="section-title">${p.landscapeTitle}</h2>
          <p style="font-size:0.95rem;color:var(--muted);line-height:1.8;margin-bottom:1.5rem">${p.landscapeBody}</p>
          <div style="background:var(--card);border-radius:12px;padding:1.4rem 1.6rem;border-left:4px solid var(--orange);box-shadow:var(--shadow)">
            <p style="font-size:0.88rem;font-weight:700;color:var(--text);margin-bottom:0.4rem">Competition level</p>
            <p style="font-size:0.95rem;color:var(--orange);font-weight:600">${p.landscapeCompetition}</p>
          </div>
        </div>
        <div>
          <span class="section-label">Local Insight</span>
          <h3 style="font-family:var(--font-heading);font-size:1.5rem;color:var(--text);margin-bottom:1rem">${p.landscapeLocalTitle}</h3>
          <p style="font-size:0.95rem;color:var(--muted);line-height:1.8;margin-bottom:1.5rem">${p.landscapeLocalBody}</p>
          <a href="https://bambinoagency.com/contact" class="btn-orange">Get a ${p.schemaCity}-Specific Strategy &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <section id="services" aria-labelledby="svc-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">What We Do</span>
        <h2 id="svc-heading" class="section-title">${p.servicesTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.servicesSub}</p>
      </div>
      <div class="svc-grid">
        ${serviceCardsHtml}
      </div>
    </div>
  </section>

  <section id="why" aria-labelledby="why-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Why Choose Us</span>
        <h2 id="why-heading" class="section-title">${p.whyTitle}</h2>
      </div>
      <div class="why-grid">
        ${whyCardsHtml}
      </div>
    </div>
  </section>

  <section id="process" aria-labelledby="process-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">How It Works</span>
        <h2 id="process-heading" class="section-title">${p.processTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.processSub}</p>
      </div>
      <div class="process-steps">
        ${processStepsHtml}
      </div>
    </div>
  </section>

  <section id="results" aria-labelledby="results-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Client Results</span>
        <h2 id="results-heading" class="section-title">What Our Clients Achieve</h2>
        <p class="section-sub" style="margin:0 auto">Across 400+ implementations in the UK, US, and Canada — here are the benchmarks our clients consistently hit.</p>
      </div>
      <div class="results-grid">
        ${resultsHtml}
      </div>
    </div>
  </section>

  <section id="industries" aria-labelledby="ind-heading">
    <div class="container">
      <div class="reveal">
        <span class="section-label">Industries We Serve</span>
        <h2 id="ind-heading" class="section-title">${p.industriesTitle}</h2>
        <p class="section-sub">${p.industriesSub}</p>
        <div class="ind-pills">
          ${industryPillsHtml}
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" aria-labelledby="pricing-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">CA Pricing</span>
        <h2 id="pricing-heading" class="section-title">${p.pricingTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.pricingSub}</p>
      </div>
      <div class="pricing-grid" style="margin-top:2.5rem">
        ${pricingHtml}
      </div>
      <p style="text-align:center;margin-top:1.5rem;font-size:0.85rem;color:var(--muted)">All prices in CAD. <a href="https://bambinoagency.com/pricing" style="color:var(--orange);font-weight:600">See full pricing &rarr;</a></p>
    </div>
  </section>

  <section id="other-services" aria-labelledby="other-svc-heading">
    <div class="container">
      <div class="reveal" style="text-align:center;max-width:600px;margin:0 auto">
        <span class="section-label">Also in ${p.schemaCity}</span>
        <h2 id="other-svc-heading" class="section-title">${p.otherServicesTitle}</h2>
        <p class="section-sub" style="margin:0 auto">${p.otherServicesSub}</p>
      </div>
      <div class="svc-grid">
        ${otherServicesHtml}
      </div>
    </div>
  </section>

  <section id="faq" aria-labelledby="faq-heading">
    <div class="container">
      <div class="reveal" style="text-align:center">
        <span class="section-label">Common Questions</span>
        <h2 id="faq-heading" class="section-title">GoHighLevel Agency ${p.schemaCity} — FAQs</h2>
      </div>
      <div class="faq-list">
        ${faqHtml}
      </div>
    </div>
  </section>

  <section id="related" aria-labelledby="related-heading">
    <div class="container">
      <div class="reveal">
        <span class="section-label">${p.relatedLabel}</span>
        <h2 id="related-heading" class="section-title">${p.relatedTitle}</h2>
        <p class="section-sub">${p.relatedSub}</p>
      </div>
      <div class="related-grid">
        <ul>
          ${relatedLinksHtml}
        </ul>
        <a href="https://bambinoagency.com/ca" class="related-card reveal">View All Canadian Cities &rarr;</a>
      </div>
    </div>
  </section>

  <section id="cta" aria-labelledby="cta-heading">
    <div class="cta-inner container">
      <span class="section-label" style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.85)">Get Started</span>
      <h2 id="cta-heading" class="cta-title">${p.ctaTitle}</h2>
      <p class="cta-sub">${p.ctaSub}</p>
      <div style="display:flex;justify-content:center;gap:1.2rem;flex-wrap:wrap">
        <a href="https://bambinoagency.com/contact" class="btn-orange" style="font-size:1rem;padding:1rem 2.4rem">Book a Free Discovery Call &rarr;</a>
        <a href="https://bambinoagency.com/pricing" class="btn-white">View Pricing</a>
      </div>
      <p style="margin-top:1.5rem;font-size:0.82rem;color:rgba(255,255,255,0.4)">No contracts. No setup fees. Just honest advice from our specialists.</p>
    </div>
  </section>

  <footer id="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand-logo">Bambino</div>
          <p class="footer-brand-desc">Award-winning digital marketing agency serving businesses across the UK, US, and Canada. Data-driven SEO, paid media, and AI-powered growth strategies.</p>
        </div>
        <div>
          <h3 class="footer-col-title">${p.footerCityLabel}</h3>
          <ul class="footer-links" role="list">
            ${footerCityLinksHtml}
          </ul>
          <h3 class="footer-col-title" style="margin-top:1.2rem">${p.footerLocalLabel}</h3>
          <ul class="footer-links" role="list">
            ${footerLocalLinksHtml}
          </ul>
        </div>
        <div>
          <h3 class="footer-col-title">Services</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/services/seo">SEO</a></li>
            <li><a href="https://bambinoagency.com/services/google-ads">Google Ads</a></li>
            <li><a href="https://bambinoagency.com/services/gohighlevel">GoHighLevel</a></li>
            <li><a href="https://bambinoagency.com/services/marketing-automation">Marketing Automation</a></li>
            <li><a href="https://bambinoagency.com/services">All Services &rarr;</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-col-title">Company</h3>
          <ul class="footer-links" role="list">
            <li><a href="https://bambinoagency.com/about">About Us</a></li>
            <li><a href="https://bambinoagency.com/pricing">Pricing</a></li>
            <li><a href="https://bambinoagency.com/blog">Blog</a></li>
            <li><a href="https://bambinoagency.com/contact">Contact</a></li>
          </ul>
          <h3 class="footer-col-title" style="margin-top:1.5rem">UK Office</h3>
          <ul class="footer-links" role="list">
            <li style="color:rgba(255,255,255,0.55);font-size:0.82rem">Manchester, United Kingdom</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Bambino Agency Ltd. All rights reserved.</span>
        <div class="footer-legal">
          <a href="https://bambinoagency.com/privacy">Privacy Policy</a>
          <a href="https://bambinoagency.com/terms">Terms of Service</a>
          <a href="https://bambinoagency.com/cookies">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 40); }, {passive:true});
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = isOpen ? 'none' : 'flex';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach(a => { a.addEventListener('click', () => { mobileMenu.style.display = 'none'; }); });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, {threshold: 0.12});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.faq-q').forEach(b => { b.setAttribute('aria-expanded','false'); b.nextElementSibling.style.display='none'; });
        if (!expanded) { btn.setAttribute('aria-expanded','true'); btn.nextElementSibling.style.display='block'; }
      });
    });
  </script>
</body>
</html>`;
}

// Generate all pages
PAGES.forEach(p => {
  const outFile = path.join(__dirname, p.outPath);
  const dir = path.dirname(outFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(outFile, buildPage(p), 'utf8');
  console.log('✓ Generated:', p.outPath);
});

console.log('Done — generated', PAGES.length, 'pages.');
