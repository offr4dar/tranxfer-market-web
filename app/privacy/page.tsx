import type { Metadata } from "next";
import { InteriorPageLayout } from "../components/InteriorPageLayout";
import {
  PolicyList,
  PolicyMetaTable,
  PolicyParagraph,
  PolicySection,
  PolicySubheading,
  PolicyTitle,
} from "../components/PolicySection";

export const metadata: Metadata = {
  title: "Privacy Policy — Tranxfer Market",
  description: "How tranxfer.market collects, uses, stores, and shares personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <InteriorPageLayout>
      <PolicyTitle>Privacy policy.</PolicyTitle>

      <div className="flex w-full flex-col items-start gap-[30px]">
        <p className="w-full text-center font-body text-[16px] font-bold leading-[1.21] tracking-[0.32px] text-black">
          TRANXFER.MARKET
        </p>
        <PolicyMetaTable
          rows={[
            ["Effective date", "Monday, 25th May 2026"],
            ["Last reviewed", "Monday, 25th May 2026"],
            ["Data controller", "Tranxfer Market Ltd. Address."],
            ["Contact email", "tranxfermarket@gmail.com"],
          ]}
        />
      </div>

      <PolicySection title="1. Introduction">
        <PolicyParagraph>
          This Privacy Policy explains how tranxfer.market (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)
          collects, uses, stores, and shares personal data when you use our football player registration and
          advertising platform. This policy applies to all users of the platform, including players, parents and
          guardians acting on behalf of players under the age of 16, football clubs, scouts, and any other visitors
          to the site.
        </PolicyParagraph>
        <PolicyParagraph>
          We are committed to protecting the privacy and safety of all users, with particular care given to the
          data of children under the age of 16. We process personal data in accordance with the UK General Data
          Protection Regulation (UK GDPR), the Data Protection Act 2018, and all other applicable data protection
          legislation.
        </PolicyParagraph>
      </PolicySection>

      <PolicySection title="2. Data we collect">
        <PolicySubheading>2.1 Player Profile Data</PolicySubheading>
        <PolicyParagraph>
          When a player (or their parent/guardian) registers on the platform, we may collect the following
          information:
        </PolicyParagraph>
        <PolicyList>
          <li>Full name</li>
          <li>Date of birth</li>
          <li>Gender</li>
          <li>Playing position(s) and preferred foot</li>
          <li>Physical attributes relevant to football (e.g. height, weight)</li>
          <li>Photographs and/or video footage uploaded to the profile</li>
          <li>Playing history, experience, achievements, and performance statistics</li>
          <li>Contact details (email address and/or telephone number)</li>
          <li>General location (town/city and county — we do not collect full home addresses)</li>
        </PolicyList>

        <PolicySubheading>2.2 Account and Registration Data</PolicySubheading>
        <PolicyList>
          <li>Email address and password (passwords are stored in encrypted form only)</li>
          <li>Account type (player, parent/guardian, club, scout, agent)</li>
          <li>
            For users under 18: the name, email address, and contact details of the parent or guardian who manages
            the account
          </li>
        </PolicyList>

        <PolicySubheading>2.3 Club and Scout Data</PolicySubheading>
        <PolicyList>
          <li>Organisation name, address, and contact details</li>
          <li>Name and role of the individual registering</li>
          <li>Verification credentials (e.g. FA affiliation, coaching qualifications, DBS certificate reference)</li>
        </PolicyList>

        <PolicySubheading>2.4 Technical and Usage Data</PolicySubheading>
        <PolicyList>
          <li>IP address, browser type, operating system, and device information</li>
          <li>Pages visited, features used, and time spent on the platform</li>
          <li>Cookies and similar technologies (please refer to our Cookie Policy for further details)</li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="3. How We Use Your Data">
        <PolicySubheading>We process personal data for the following purposes:</PolicySubheading>
        <PolicyList>
          <li>
            Providing the service: to create and maintain player profiles and to make those profiles available to
            verified scouts and agents searching for players.
          </li>
          <li>
            Age verification and safeguarding: to confirm whether a user is under 16 and to ensure that a verified
            parent or guardian is linked to the account before any profile is published.
          </li>
          <li>
            Communication: to send service-related messages, respond to enquiries, and facilitate contact between
            players (or their parent/guardian) and interested clubs or scouts.
          </li>
          <li>Safety and moderation: to monitor the platform for misuse, inappropriate behaviour, and potential safeguarding risks.</li>
          <li>Legal compliance: to fulfil our obligations under data protection, safeguarding, and other applicable legislation.</li>
          <li>
            Service improvement: to analyse aggregated or anonymised usage data to improve the platform&rsquo;s
            functionality and user experience.
          </li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="4. Lawful Basis for Processing">
        <PolicySubheading>Under Article 6 of the UK GDPR, we rely on the following lawful bases:</PolicySubheading>
        <PolicyList>
          <li>Performance of a contract: processing that is necessary to deliver the service you have registered for.</li>
          <li>
            Legitimate interests: platform security, fraud prevention, and service improvements, where these
            interests do not override your rights and freedoms.
          </li>
          <li>
            Legal obligation: where processing is required to comply with safeguarding, data protection, or other
            statutory requirements.
          </li>
          <li>
            Consent: where we are required to obtain consent, particularly in relation to the processing of
            children&rsquo;s personal data (see Section 5).
          </li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="5. Children’s Data and Parental Consent">
        <PolicySubheading>
          The protection of children&rsquo;s personal data is of the highest importance to us. The following rules
          apply to all users under the age of 16:
        </PolicySubheading>
        <PolicyList>
          <li>
            A parent or guardian must create the account on behalf of the child, or must be added and verified as
            the account manager, before the child&rsquo;s profile can be made visible on the platform.
          </li>
          <li>The parent or guardian must provide verifiable consent before any of the child&rsquo;s personal data is published.</li>
          <li>
            The parent or guardian retains full control of the child&rsquo;s account at all times, including the
            ability to view, edit, restrict, or permanently delete the profile.
          </li>
          <li>
            All communications from agents or scouts regarding a player under 16 are directed to the parent or
            guardian&rsquo;s contact details. Direct communication with the child is not permitted through the
            platform.
          </li>
          <li>We will never knowingly publish or share a child&rsquo;s personal data without verified parental or guardian consent.</li>
        </PolicyList>
      </PolicySection>
    </InteriorPageLayout>
  );
}
