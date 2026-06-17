import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'

const CONTACT_EMAIL = 'hello@tiesverse.com'

const BODY = {
  privacy: [
    ['Who we are', [
      'This Privacy Policy explains how Tiesverse Foundation (“Tiesverse”, “we”, “us”) collects, uses, shares and protects your personal data when you use tiesverse.com and our related brands, products and services (together, the “Services”).',
      'Tiesverse Foundation is a Section 8 organisation registered in India (CIN U88900MP2025NPL079342). For any privacy question or request, write to us at ' + CONTACT_EMAIL + '.',
    ]],
    ['Information we collect', [
      'Information you give us: your name, email address, phone number, organisation, and anything you include when you subscribe to our newsletter, fill an enquiry or contact form, register for an event, webinar or workshop, or apply for a role (including your resume and links such as GitHub or a portfolio).',
      'Payment information: when you buy a ticket to a paid event, payments are processed by third-party payment providers. We do not store your full card or banking details on our servers.',
      'Information we collect automatically: device and browser type, IP address, pages visited and similar analytics, collected through cookies and comparable technologies to keep the Services secure and to understand how they are used.',
    ]],
    ['How we use your information', [
      'To respond to your enquiries; to deliver the newsletters, registrations and tickets you ask for; to review job applications; to operate, secure and improve the Services; and to comply with legal obligations.',
      'We do not sell your personal data. We use it only for the purposes described here or for which you have given consent.',
    ]],
    ['Your consent and your rights', [
      'We process personal data on the basis of your consent or other lawful grounds permitted under India’s Digital Personal Data Protection Act, 2023. You may withdraw consent at any time, and you can unsubscribe from emails using the link in any message.',
      'You have the right to access the personal data we hold about you, to ask us to correct or update it, and to request its erasure, subject to applicable law. To exercise any of these rights, or to raise a grievance, contact our team at ' + CONTACT_EMAIL + ' and we will respond within a reasonable time.',
    ]],
    ['Sharing and service providers', [
      'We share personal data only with service providers who help us run the Services (for example email, form, analytics and payment providers), and only to the extent they need it. Some of these providers may process data outside India; where they do, we take reasonable steps to protect your information.',
      'We may also disclose information where required by law, or to protect the rights, safety and security of Tiesverse, our users or the public.',
    ]],
    ['Retention and security', [
      'We keep personal data only for as long as needed for the purposes above or as required by law, after which it is deleted or anonymised. We use reasonable technical and organisational safeguards to protect your data, though no method of transmission or storage is completely secure.',
    ]],
    ['Children', [
      'The Services are intended for a general audience and are not directed at children under 18. If you believe a child has provided us personal data without appropriate consent, contact us and we will delete it.',
    ]],
    ['Changes and contact', [
      'We may update this policy from time to time; the “last updated” date below reflects the latest version. For any privacy concern, email ' + CONTACT_EMAIL + '.',
    ]],
  ],
  terms: [
    ['Acceptance of these terms', [
      'These Terms of Use govern your access to and use of tiesverse.com and our related brands, content and services (the “Services”), operated by Tiesverse Foundation. By using the Services you agree to these terms. If you do not agree, please do not use the Services.',
    ]],
    ['Eligibility and acceptable use', [
      'You agree to use the Services lawfully and not to misuse them, including by attempting to disrupt or gain unauthorised access to them, scraping or harvesting data at scale, or republishing our content without permission.',
    ]],
    ['Content and intellectual property', [
      'Unless stated otherwise, all editorial content, research, designs, maps and other materials on the Services are owned by Tiesverse Foundation or its contributors and are protected by applicable intellectual-property laws. Brand names and marks belong to their respective initiatives.',
      'You may share and cite our content with clear attribution and a link, for non-commercial purposes. Any other use, including commercial reproduction or redistribution, requires our prior written permission.',
    ]],
    ['Submissions and applications', [
      'When you submit information through a form, registration or job application, you confirm it is accurate and that you have the right to share it. We may use submissions to operate the relevant service (for example, to evaluate an application or confirm a registration).',
    ]],
    ['Events, webinars, workshops and tickets', [
      'Some events and workshops are free and some are paid. For paid registrations, the price shown at checkout applies, and payment is handled by our payment partners. Programmes may be rescheduled or changed; where an event is cancelled by us, we will make reasonable efforts to offer a refund or alternative. Joining links and venue details are shared with confirmed registrants.',
    ]],
    ['Third-party links and products', [
      'The Services may link to third-party websites and tools that we do not control. We are not responsible for their content, policies or practices, and your use of them is at your own risk.',
    ]],
    ['Disclaimers and limitation of liability', [
      'The Services and content are provided “as is”, without warranties of any kind. To the maximum extent permitted by law, Tiesverse Foundation is not liable for any indirect or consequential loss arising from your use of the Services.',
    ]],
    ['Governing law and contact', [
      'These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts at the registered office of Tiesverse Foundation. We may update these terms from time to time. Questions? Write to ' + CONTACT_EMAIL + '.',
    ]],
  ],
  disclaimer: [
    ['Editorial independence and opinions', [
      'Content published across Tiesverse and its brands is produced independently. Views and analysis are those of the respective authors and contributors, and do not necessarily represent the position of any institution, partner or government we may work with.',
    ]],
    ['Not professional advice', [
      'Our content is provided for information and education only. It is not financial, investment, legal, policy or professional advice, and should not be relied on as such. Always seek qualified advice before acting on anything you read here.',
    ]],
    ['Accuracy and forecasts', [
      'We research carefully using primary and secondary sources and aim for accuracy, but we make no guarantee that all content is complete, current or error-free. Any forward-looking analysis or forecast is inherently uncertain and may not come to pass.',
    ]],
    ['External links and trademarks', [
      'Links to third-party sites are provided for convenience; we are not responsible for their content. All third-party names, logos and trademarks belong to their respective owners and are used only for identification or fair comment.',
    ]],
    ['Contact', [
      'If you believe something we have published is inaccurate, write to us at ' + CONTACT_EMAIL + ' and we will review it.',
    ]],
  ],
}
const TITLES = { privacy: 'Privacy Policy', terms: 'Terms of Use', disclaimer: 'Disclaimer' }

export default function Legal({ kind }) {
  const sections = BODY[kind] || []
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top lg">
        <div className="container lg-wrap">
          <h1 className="serif">{TITLES[kind]}</h1>
          <p className="lg-meta">Tiesverse Foundation · Last updated June 2026</p>
          <div className="lg-body">
            {sections.map(([h, paras]) => (
              <section className="lg-sec" key={h}>
                <h2 className="serif">{h}</h2>
                {paras.map((p, i) => <p key={i}>{p}</p>)}
              </section>
            ))}
          </div>
        </div>
      </main>
      <CtaBand />
      <Footer />
      <style>{`
        .pad-top{padding-top:74px}
        .lg{padding:110px 0 var(--sec)}
        .lg-wrap{max-width:920px}
        .lg h1{text-align:center;color:var(--ink);font-size:clamp(40px,5.5vw,68px)}
        .lg-meta{text-align:center;color:var(--soft);font-size:14px;margin:16px 0 56px}
        .lg-body{max-width:820px;margin:0 auto}
        .lg-sec{margin-bottom:34px}
        .lg-sec h2{font-size:22px;margin-bottom:12px}
        .lg-sec p{color:#4a4133;font-size:16.5px;line-height:1.8;margin-bottom:12px}
      `}</style>
    </>
  )
}
