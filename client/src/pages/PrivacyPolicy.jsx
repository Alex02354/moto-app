import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        We value your privacy and are committed to protecting your personal
        data. This privacy policy explains how we collect, use, and store your
        data, especially in compliance with the General Data Protection
        Regulation (GDPR).
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">1. Who We Are</h2>
        <p className="mt-2">
          Our website, OFF-ROAD ON ROAD, is responsible for the collection and
          management of your personal data. We aim to ensure that your
          information is handled securely and in accordance with the law.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">2. What Data We Collect</h2>
        <p className="mt-2">We collect the following types of personal data:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Contact Information (e.g., name, email address)</li>
          <li>Usage Data (e.g., browsing activity, pages viewed)</li>
          <li>Cookie Data (see our Cookie Policy below for more details)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">3. How We Use Your Data</h2>
        <p className="mt-2">We use your personal data to:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Provide you with services and support</li>
          <li>Improve the functionality and user experience of our website</li>
          <li>Analyze website traffic and trends</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">4. Cookies</h2>
        <p className="mt-2">
          Our website uses cookies to collect information about your browsing
          behavior. Cookies help us enhance your experience by remembering your
          preferences and settings.
        </p>
        <p className="mt-2">
          You have the option to accept or decline cookies when visiting our
          website. If you choose to decline, certain features may not function
          as intended. You can adjust your cookie preferences at any time
          through your browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">5. Your Rights Under GDPR</h2>
        <p className="mt-2">
          As a user within the European Union, you have the following rights:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>The right to access your personal data</li>
          <li>The right to rectify incorrect or incomplete data</li>
          <li>The right to request the deletion of your data</li>
          <li>The right to restrict or object to data processing</li>
          <li>The right to data portability</li>
        </ul>
        <p className="mt-2">
          To exercise any of these rights, please contact us at
          info@offroadonroad.sk.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">6. Data Security</h2>
        <p className="mt-2">
          We implement appropriate technical and organizational measures to
          protect your personal data against unauthorized access, loss, or
          misuse.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
        <p className="mt-2">
          We may update this privacy policy periodically to reflect changes in
          legal requirements or our practices. Please check this page regularly
          to stay informed about how we protect your personal data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">8. Contact Us</h2>
        <p className="mt-2">
          If you have any questions or concerns about this privacy policy,
          please contact us at info@offroadonroad.sk.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
