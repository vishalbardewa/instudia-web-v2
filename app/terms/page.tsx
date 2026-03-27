import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions | instudia",
  description:
    "Read instudia's Terms and Conditions governing use of our platform, courses, and services. Last updated July 2025.",
  alternates: { canonical: "https://www.instudianagaland.com/terms" },
  robots: { index: true, follow: true },
};

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Terms and Conditions</h1>
        <p className="mt-2 text-gray-600">
          Last updated: July 5, 2025
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-8">
        <p className="mb-4">
          These Terms and Conditions ("ToS" or "Agreement") govern your access to and use of the Instudia website, services, and content (collectively, the "Platform"). By accessing or using the Platform, you ("User" or "you") agree to be bound by these ToS.
        </p>
      </section>

      {/* Section 1 */}
      <Section title="1. Acceptance of Terms">
        <p className="mb-3"><strong>Agreement to ToS:</strong> Your access or use of the Instudia Platform confirms that you have read, understood, and agree to be bound by these Terms and Conditions. This includes any terms incorporated by reference, such as the Privacy Policy.</p>
        <p className="mb-3"><strong>Disagreement with Terms:</strong> If you do not agree to these Terms, you must not use the Platform or its Services.</p>
        <p className="mb-3"><strong>Updates and Changes:</strong> Instudia may update these Terms at any time without notice. Your continued use of the Platform after changes are made indicates your acceptance of those changes.</p>
        <p><strong>Incorporated Policies:</strong> These ToS incorporate any relevant policies, such as a Privacy Policy.</p>
      </Section>

      {/* Section 2 */}
      <Section title="2. User Accounts and Registration">
        <p className="mb-3"><strong>Accurate Information:</strong> You agree to provide accurate, complete, and truthful information during account registration and update it as needed.</p>
        <p className="mb-3"><strong>Account Security:</strong> You are responsible for protecting your login details and all activities under your account.</p>
        <p className="mb-3"><strong>Unauthorized Use:</strong> Immediately report any suspected security breaches or unauthorized account use to Instudia.</p>
        <p><strong>Liability for Misuse:</strong> Instudia is not liable for losses from unauthorized account access; you are responsible for any losses incurred by Instudia or others due to misuse.</p>
      </Section>

      {/* Section 3 */}
      <Section title="3. Intellectual Property">
        <p className="mb-3"><strong>Ownership:</strong> Instudia and its licensors own all intellectual property rights in the Platform and its content (text, images, videos, software, logos, trademarks, educational resources).</p>
        <p className="mb-3"><strong>Limited License:</strong> You have a limited license to access and use the Platform Content for your personal, non-commercial use only.</p>
        <p className="mb-3"><strong>Prohibited Use:</strong> Duplication, distribution, creating derivative works, or commercial exploitation of the Platform Content without Instudia's permission is prohibited.</p>
        <p><strong>User Data:</strong> While you keep intellectual property rights in your data, you grant Instudia a license to use it for the Services and promotional purposes.</p>
      </Section>

      {/* Section 4 */}
      <Section title="4. Prohibited Activities">
        <p className="mb-3">Users must not use the Platform in a way that violates these ToS, applicable laws, or Instudia policies, including:</p>
        <ul className="list-disc pl-6 mb-3 space-y-1">
          <li>Unlawful activity, harassment or sharing restricted content</li>
          <li>Uploading harmful content (viruses, malware)</li>
          <li>Impersonating others</li>
          <li>Attempting unauthorized access</li>
          <li>Creating a hostile or inappropriate environment</li>
        </ul>
        <p>The Platform can terminate accounts and remove violating content for policy breaches.</p>
      </Section>

      {/* Section 5 */}
      <Section title="5. Third-Party Links">
        <p>The Platform may include links to third-party websites, but Instudia is not responsible for their content or privacy practices. You access such websites at your own risk.</p>
      </Section>

      {/* Section 6 */}
      <Section title="6. Disclaimer of Warranties">
        <p>The Platform and its content are provided "as is" and "as available" without warranties of any kind. Instudia does not guarantee uninterrupted service or the accuracy of information.</p>
      </Section>

      {/* Section 7 */}
      <Section title="7. Limitation of Liability">
        <p>Instudia is not liable for indirect or consequential damages or losses, including lost data. Instudia's total liability is limited to the amount paid for Platform use.</p>
      </Section>

      {/* Section 8 */}
      <Section title="8. Indemnification">
        <p>You agree to indemnify Instudia and its affiliates against liabilities arising from your use of the Platform or any violation of these ToS or applicable law.</p>
      </Section>

      {/* Section 9 */}
      <Section title="9. Governing Law and Jurisdiction">
        <p>These ToS are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in India.</p>
      </Section>

      {/* Section 10 */}
      <Section title="10. Specific Terms for Instudia Programs/Courses">
        <p className="mb-3"><strong>Admissions and Enrollment:</strong> Outline admissions procedures, eligibility, and the non-transferability of enrollments. Specify if visits require appointments.</p>
        <p className="mb-3"><strong>Fees and Payments:</strong> Clearly state course fees, payment methods, renewal policies, and refund eligibility (if applicable). Detail refund request handling, including timelines and any administrative charges.</p>
        <p className="mb-3"><strong>Course Content and Access:</strong> Clarify the content scope and duration of access.</p>
        <p className="mb-3"><strong>Student Conduct:</strong> Set standards for behavior during programs, including rules against plagiarism and academic dishonesty.</p>
        <p className="mb-3"><strong>Technical Requirements:</strong> List necessary equipment or software for accessing courses.</p>
        <p className="mb-3"><strong>Updates and Changes:</strong> Note that course content and policies are subject to change.</p>
        <p className="mb-3"><strong>Certification:</strong> If applicable, state the conditions for receiving certificates upon completion.</p>
        <p><strong>No Guarantee of Placement:</strong> Explicitly state that job placement is not guaranteed.</p>
      </Section>

      {/* Section 11 */}
      <Section title="11. Miscellaneous">
        <p className="mb-3"><strong>Severability:</strong> If any part of these ToS is unenforceable, the remaining provisions remain in effect.</p>
        <p className="mb-3"><strong>Waiver:</strong> Failure to enforce a right doesn't waive that right.</p>
        <p className="mb-3"><strong>Assignment:</strong> These ToS cannot be assigned without written consent.</p>
        <p className="mb-3"><strong>Force Majeure:</strong> Instudia is not liable for performance failures due to circumstances beyond its control.</p>
        <p><strong>Age Restriction:</strong> State age requirements for Platform use or program enrollment.</p>
      </Section>

      {/* Section 12 */}
      <Section title="12. Grievances and Contact Information">
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Contact Information:</h3>
          <p>Email: instudia.nagaland@gmail.com</p>
          <p>Phone: +91-8798-587-779</p>
          <p>Address: First Floor , Vikiye Center, Junction, Notun Bosti, Dimapur, Nagaland 797112</p>
        </div>
      </Section>
    </div>
  );
};

const Section = ({ title, children }: any) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
    <div className="text-gray-700">
      {children}
    </div>
  </section>
);

export default TermsAndConditions;