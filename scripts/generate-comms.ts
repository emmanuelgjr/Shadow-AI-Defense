/**
 * Generate Word .docx comms templates for the Shadow AI Defense program.
 * Run: npx tsx scripts/generate-comms.ts
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Footer,
  Tab,
  TabStopPosition,
  TabStopType,
  BorderStyle,
} from 'docx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'templates');
mkdirSync(outDir, { recursive: true });

const ACCENT = 'B45309'; // amber accent
const INK_900 = '1a1a1a';
const INK_600 = '4a4a4a';
const INK_400 = '8a8a8a';

interface TemplateSpec {
  id: string;
  title: string;
  from: string;
  to: string;
  body: Paragraph[];
  footerName: string;
}

/* ------------------------------------------------------------------ */
/*  Helper builders                                                    */
/* ------------------------------------------------------------------ */

function headerParagraph(): Paragraph {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: 'AI GOVERNANCE PROGRAM',
        bold: true,
        size: 20,
        font: 'Calibri',
        color: ACCENT,
      }),
    ],
  });
}

function titleParagraph(title: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 200 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 32,
        font: 'Calibri',
        color: INK_900,
      }),
    ],
  });
}

function metadataBlock(from: string, to: string): Paragraph[] {
  const metaStyle = { size: 22, font: 'Calibri', color: INK_600 };
  return [
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: 'Date: ', bold: true, ...metaStyle }),
        new TextRun({ text: '[DATE]', ...metaStyle }),
      ],
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: 'From: ', bold: true, ...metaStyle }),
        new TextRun({ text: from, ...metaStyle }),
      ],
    }),
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({ text: 'To: ', bold: true, ...metaStyle }),
        new TextRun({ text: to, ...metaStyle }),
      ],
    }),
    new Paragraph({
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT },
      },
      spacing: { after: 240 },
      children: [],
    }),
  ];
}

function bodyParagraph(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 160 },
    children: [
      new TextRun({ text, size: 22, font: 'Calibri', color: INK_900 }),
    ],
  });
}

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26,
        font: 'Calibri',
        color: INK_900,
      }),
    ],
  });
}

function bulletPoint(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 80 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: '•  ', size: 22, font: 'Calibri', color: INK_600 }),
      new TextRun({ text, size: 22, font: 'Calibri', color: INK_900 }),
    ],
  });
}

function footerParagraph(templateName: string): Footer {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `Shadow AI Defense · ${templateName} · CC-BY 4.0`,
            size: 16,
            font: 'Calibri',
            color: INK_400,
            italics: true,
          }),
        ],
      }),
    ],
  });
}

function buildDocument(spec: TemplateSpec): Document {
  return new Document({
    creator: 'Emmanuel Guilherme Jr.',
    description: `Shadow AI Defense — ${spec.title}`,
    sections: [
      {
        properties: {},
        headers: {},
        footers: { default: footerParagraph(spec.footerName) },
        children: [
          headerParagraph(),
          titleParagraph(spec.title),
          ...metadataBlock(spec.from, spec.to),
          ...spec.body,
        ],
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/*  Template definitions                                               */
/* ------------------------------------------------------------------ */

const templates: TemplateSpec[] = [
  /* 1. Individual warning: repeat occurrence */
  {
    id: 'comms-individual-warning-repeat',
    title: 'Individual Warning: Repeat Occurrence',
    from: '[AI GOVERNANCE PROGRAM / MANAGER NAME]',
    to: '[EMPLOYEE NAME]',
    footerName: 'Individual Warning: Repeat Occurrence',
    body: [
      bodyParagraph('Dear [EMPLOYEE NAME],'),
      bodyParagraph(
        'This letter serves as a formal notification regarding your continued use of unauthorized AI services in violation of the AI Acceptable Use Policy (AUP). Our monitoring systems have detected that you accessed [AI SERVICE NAME] on [DATE(S) OF DETECTION], following a prior warning issued on [DATE OF FIRST WARNING].'
      ),
      sectionHeading('Background'),
      bodyParagraph(
        'On [DATE OF FIRST WARNING], you received a first-occurrence notification regarding the use of [AI SERVICE NAME / PRIOR SERVICE NAME]. At that time, you were informed of the organization\'s AI Acceptable Use Policy, the risks associated with unauthorized AI service use, and the approved alternatives available to you.'
      ),
      bodyParagraph(
        'Despite this prior communication, our detection systems have identified a subsequent violation. This repeat occurrence requires escalation per our enforcement policy.'
      ),
      sectionHeading('Current Violation Details'),
      bulletPoint('Detection date(s): [DATE(S)]'),
      bulletPoint('AI service accessed: [AI SERVICE NAME]'),
      bulletPoint('Number of access events: [COUNT]'),
      bulletPoint('Prior warning date: [DATE OF FIRST WARNING]'),
      bulletPoint('Prior warning case reference: [CASE ID]'),
      sectionHeading('Required Actions'),
      bodyParagraph(
        'As a result of this repeat violation, the following actions will be taken:'
      ),
      bulletPoint(
        'A formal meeting will be scheduled with your direct manager and HR Business Partner within [10] business days to discuss this matter.'
      ),
      bulletPoint(
        'This incident will be documented in your personnel file per the organization\'s progressive discipline policy.'
      ),
      bulletPoint(
        'Enhanced monitoring of your AI service access will be applied for the next [60] days.'
      ),
      bulletPoint(
        '[IF APPLICABLE: Specific access restrictions may be applied to your device or network access profile.]'
      ),
      sectionHeading('Approved Alternatives'),
      bodyParagraph(
        'The organization provides approved AI tools for legitimate business use. Please use the following resources:'
      ),
      bulletPoint('Approved AI tools list: [LINK TO APPROVED TOOLS]'),
      bulletPoint('AI use-case intake form: [LINK TO INTAKE FORM]'),
      bulletPoint('Questions: [AI GOVERNANCE TEAM EMAIL]'),
      sectionHeading('Acknowledgment'),
      bodyParagraph(
        'Please acknowledge receipt of this notice by responding to this communication within [5] business days. Your acknowledgment confirms that you have read and understood the contents of this letter and the potential consequences of further violations.'
      ),
      bodyParagraph('Sincerely,'),
      bodyParagraph('[MANAGER NAME]'),
      bodyParagraph('[TITLE]'),
      bodyParagraph('CC: [HR BUSINESS PARTNER], [AI GOVERNANCE TEAM]'),
    ],
  },

  /* 2. Department-level briefing */
  {
    id: 'comms-department-level-briefing',
    title: 'Department-Level Briefing: Detected AI Use',
    from: '[AI GOVERNANCE PROGRAM LEAD]',
    to: '[DEPARTMENT HEAD / LEADERSHIP TEAM]',
    footerName: 'Department-Level Briefing',
    body: [
      bodyParagraph('Dear [DEPARTMENT HEAD],'),
      bodyParagraph(
        'This briefing summarizes AI service usage detected within [DEPARTMENT NAME] and provides recommendations for your leadership team. This information is shared under the AI Governance Program\'s commitment to transparent, constructive engagement with business units.'
      ),
      sectionHeading('Detection Summary'),
      bulletPoint('Reporting period: [START DATE] to [END DATE]'),
      bulletPoint('Number of unique users detected: [COUNT]'),
      bulletPoint('AI services accessed: [LIST OF SERVICES]'),
      bulletPoint('Total access events: [COUNT]'),
      bulletPoint('Data sensitivity assessment: [LOW / MEDIUM / HIGH / UNDER INVESTIGATION]'),
      sectionHeading('Context'),
      bodyParagraph(
        'The use of consumer AI services by employees often reflects a genuine productivity need that is not yet met by approved tools. The AI Governance Program\'s goal is not punitive action, but rather to ensure that employees have access to effective, secure, and approved AI tools while protecting the organization from data-loss and compliance risks.'
      ),
      sectionHeading('Key Risks Identified'),
      bulletPoint('[RISK 1: e.g., Potential exposure of client data to consumer AI training sets]'),
      bulletPoint('[RISK 2: e.g., Use of AI-generated content in client deliverables without review]'),
      bulletPoint('[RISK 3: e.g., Regulatory implications specific to this department\'s function]'),
      sectionHeading('Recommended Actions for Department Leadership'),
      bulletPoint(
        'Team communication: Brief your team on the AI Acceptable Use Policy and approved alternatives. Use the talking points provided separately.'
      ),
      bulletPoint(
        'Needs assessment: Identify the top [3-5] workflows where your team is seeking AI assistance. Submit these to the AI use-case intake process for evaluation.'
      ),
      bulletPoint(
        'Approved-tool adoption: Ensure your team is aware of and trained on currently approved AI tools: [LIST OF APPROVED TOOLS].'
      ),
      bulletPoint(
        'Ongoing dialogue: Designate a departmental AI liaison to coordinate with the AI Governance Program on emerging needs and feedback.'
      ),
      sectionHeading('Support Available'),
      bodyParagraph(
        'The AI Governance team is available to support your department with:'
      ),
      bulletPoint('Tailored team briefings on AI policy and approved tools'),
      bulletPoint('Fast-track evaluation of department-specific AI use cases'),
      bulletPoint('Guidance on AI-related regulatory requirements for your function'),
      bodyParagraph(
        'Please contact [AI GOVERNANCE TEAM EMAIL] to schedule a follow-up discussion.'
      ),
      bodyParagraph('Regards,'),
      bodyParagraph('[AI GOVERNANCE PROGRAM LEAD]'),
      bodyParagraph('[TITLE]'),
    ],
  },

  /* 3. Approved-pilot announcement */
  {
    id: 'comms-approved-pilot-announcement',
    title: 'Approved AI Pilot Program Announcement',
    from: '[AI GOVERNANCE PROGRAM LEAD / SPONSOR]',
    to: '[PILOT PARTICIPANTS / DEPARTMENT / ORGANIZATION]',
    footerName: 'Approved Pilot Announcement',
    body: [
      bodyParagraph('Dear colleagues,'),
      bodyParagraph(
        'We are pleased to announce the launch of an approved AI pilot program for [AI TOOL NAME]. This pilot reflects our commitment to enabling productive and responsible use of AI across the organization while maintaining our security and compliance standards.'
      ),
      sectionHeading('Pilot Overview'),
      bulletPoint('AI tool: [AI TOOL NAME] ([ENTERPRISE / CONSUMER TIER])'),
      bulletPoint('Pilot duration: [START DATE] to [END DATE]'),
      bulletPoint('Participating teams: [LIST OF TEAMS / DEPARTMENTS]'),
      bulletPoint('Number of pilot seats: [COUNT]'),
      bulletPoint('Pilot sponsor: [EXECUTIVE SPONSOR NAME AND TITLE]'),
      sectionHeading('What This Means for Pilot Participants'),
      bodyParagraph(
        'As a pilot participant, you are authorized to use [AI TOOL NAME] for the approved use cases listed below. This authorization applies only during the pilot period and only for the specified use cases.'
      ),
      sectionHeading('Approved Use Cases'),
      bulletPoint('[USE CASE 1: e.g., Drafting internal communications and meeting summaries]'),
      bulletPoint('[USE CASE 2: e.g., Code review assistance for non-production code]'),
      bulletPoint('[USE CASE 3: e.g., Research summarization for internal analysis]'),
      sectionHeading('Restrictions During the Pilot'),
      bulletPoint('Do NOT upload client data, personally identifiable information (PII), or regulated data to the tool.'),
      bulletPoint('Do NOT use AI-generated content in external communications or client deliverables without human review and approval.'),
      bulletPoint('Do NOT share your pilot credentials or extend access to non-participants.'),
      bulletPoint('All use must comply with the AI Acceptable Use Policy (AUP).'),
      sectionHeading('Getting Started'),
      bulletPoint('Access instructions: [LINK TO ONBOARDING GUIDE]'),
      bulletPoint('Training materials: [LINK TO TRAINING]'),
      bulletPoint('Support channel: [SLACK CHANNEL / EMAIL / TEAMS CHANNEL]'),
      bulletPoint('Feedback form: [LINK TO FEEDBACK FORM]'),
      sectionHeading('What We Will Measure'),
      bodyParagraph(
        'During the pilot, we will evaluate:'
      ),
      bulletPoint('Productivity impact: time saved and quality improvements reported by participants'),
      bulletPoint('Security posture: DLP events, data-handling compliance, and access patterns'),
      bulletPoint('User experience: ease of use, training effectiveness, and unmet needs'),
      bulletPoint('Cost-benefit: license cost vs. measured productivity gains'),
      bodyParagraph(
        'Your feedback is critical to the success of this pilot. Please complete the weekly feedback survey and report any concerns to [SUPPORT CHANNEL].'
      ),
      bodyParagraph(
        'We look forward to learning from this pilot and using the results to make informed decisions about AI tool adoption across the organization.'
      ),
      bodyParagraph('Regards,'),
      bodyParagraph('[AI GOVERNANCE PROGRAM LEAD]'),
      bodyParagraph('[EXECUTIVE SPONSOR]'),
    ],
  },

  /* 4. Incident notification: sensitive data egress */
  {
    id: 'comms-incident-notification-sensitive-data-egress',
    title: 'Incident Notification: Sensitive Data Egress to AI Service',
    from: '[INCIDENT COMMANDER / CISO]',
    to: '[AFFECTED PARTIES / MANAGEMENT / REGULATORY — AS APPLICABLE]',
    footerName: 'Incident Notification: Sensitive Data Egress',
    body: [
      bodyParagraph('[CLASSIFICATION: CONFIDENTIAL]'),
      bodyParagraph('Dear [RECIPIENT],'),
      bodyParagraph(
        'This notification is issued pursuant to our Incident Response Plan and applicable regulatory requirements. It documents a confirmed incident of sensitive data egress to an external AI service.'
      ),
      sectionHeading('Incident Summary'),
      bulletPoint('Incident ID: [INCIDENT-ID]'),
      bulletPoint('Date of detection: [DETECTION DATE]'),
      bulletPoint('Date of occurrence: [OCCURRENCE DATE(S), IF DIFFERENT]'),
      bulletPoint('AI service involved: [AI SERVICE NAME]'),
      bulletPoint('Detection method: [DLP RULE / MANUAL REPORT / INVESTIGATION]'),
      sectionHeading('Data Involved'),
      bulletPoint('Data classification: [PII / PHI / PCI / INTELLECTUAL PROPERTY / CONFIDENTIAL BUSINESS]'),
      bulletPoint('Volume: [APPROXIMATE NUMBER OF RECORDS / DOCUMENTS / DATA ELEMENTS]'),
      bulletPoint('Data subjects affected: [DESCRIPTION — e.g., "employee records", "client account data"]'),
      bulletPoint('Number of individuals affected: [COUNT OR ESTIMATE]'),
      sectionHeading('Cause and Circumstances'),
      bodyParagraph(
        '[DESCRIPTION OF HOW THE DATA WAS EGRESSED — e.g., "An employee in [DEPARTMENT] uploaded [DESCRIPTION] to [AI SERVICE] via [METHOD — browser / API / desktop app]. The upload occurred [WITH / WITHOUT] a DLP override. The employee [WAS / WAS NOT] aware of the AI Acceptable Use Policy restrictions."]'
      ),
      sectionHeading('Actions Taken'),
      bulletPoint('[ACTION 1: e.g., The user\'s access to the AI service has been restricted.]'),
      bulletPoint('[ACTION 2: e.g., A deletion request has been submitted to the AI service provider.]'),
      bulletPoint('[ACTION 3: e.g., The employee\'s manager and HR have been notified.]'),
      bulletPoint('[ACTION 4: e.g., DLP policies have been updated to prevent recurrence.]'),
      bulletPoint('[ACTION 5: e.g., Legal/Privacy team has assessed regulatory notification obligations.]'),
      sectionHeading('Regulatory Notification Status'),
      bulletPoint('Applicable regulation(s): [GDPR / HIPAA / CCPA / STATE BREACH LAWS / SECTOR-SPECIFIC]'),
      bulletPoint('Notification required: [YES / NO / UNDER ASSESSMENT]'),
      bulletPoint('Notification deadline: [DATE, IF APPLICABLE]'),
      bulletPoint('Notification status: [PENDING / SUBMITTED / NOT REQUIRED]'),
      sectionHeading('Risk Assessment'),
      bodyParagraph(
        'The AI service provider\'s data processing terms [DO / DO NOT] include provisions for data deletion upon request. The provider\'s training data policy states: [SUMMARY OF TRAINING DATA POLICY]. Based on this assessment, the residual risk is rated as [LOW / MEDIUM / HIGH].'
      ),
      sectionHeading('Next Steps'),
      bulletPoint('[NEXT STEP 1: e.g., Await deletion confirmation from the AI service provider.]'),
      bulletPoint('[NEXT STEP 2: e.g., Complete regulatory notification if required.]'),
      bulletPoint('[NEXT STEP 3: e.g., Conduct post-incident review within 30 days.]'),
      bodyParagraph(
        'For questions regarding this incident, contact [INCIDENT COMMANDER / PRIVACY OFFICER] at [EMAIL / PHONE].'
      ),
      bodyParagraph('Regards,'),
      bodyParagraph('[INCIDENT COMMANDER NAME]'),
      bodyParagraph('[TITLE]'),
      bodyParagraph('[DATE]'),
    ],
  },

  /* 5. Quarterly program update */
  {
    id: 'comms-quarterly-program-update',
    title: 'Quarterly Shadow AI Program Update',
    from: '[AI GOVERNANCE PROGRAM LEAD]',
    to: '[AI GOVERNANCE COMMITTEE / RISK COMMITTEE / CISO]',
    footerName: 'Quarterly Program Update',
    body: [
      bodyParagraph('Dear committee members,'),
      bodyParagraph(
        'Please find below the quarterly update on the Shadow AI Detection and Response Program for [QUARTER] [YEAR]. This report summarizes detection activity, response outcomes, and program maturity progress.'
      ),
      sectionHeading('Executive Summary'),
      bodyParagraph(
        '[2-3 SENTENCE SUMMARY OF KEY FINDINGS AND TRENDS FOR THE QUARTER]'
      ),
      sectionHeading('Detection Metrics'),
      bulletPoint('Total alerts generated: [COUNT]'),
      bulletPoint('Unique users detected: [COUNT] ([PERCENTAGE] of workforce)'),
      bulletPoint('AI services detected: [COUNT] unique services'),
      bulletPoint('Top 5 services by usage: [LIST]'),
      bulletPoint('Alerts by severity: High: [COUNT] / Medium: [COUNT] / Low: [COUNT] / Informational: [COUNT]'),
      sectionHeading('Response Metrics'),
      bulletPoint('Cases opened: [COUNT]'),
      bulletPoint('Cases closed: [COUNT]'),
      bulletPoint('Mean time to triage (High severity): [HOURS] (target: 1 hour)'),
      bulletPoint('Mean time to user notification: [DAYS] (target: 5 business days)'),
      bulletPoint('Repeat offender rate: [PERCENTAGE] (target: < 10%)'),
      bulletPoint('Conversion to approved-pilot enrollment: [PERCENTAGE] (target: > 30%)'),
      sectionHeading('Data-Loss Prevention'),
      bulletPoint('DLP events related to AI services: [COUNT]'),
      bulletPoint('Confirmed sensitive-data egress incidents (RB-002): [COUNT]'),
      bulletPoint('Data classifications involved: [LIST]'),
      bulletPoint('Regulatory notifications required: [COUNT]'),
      sectionHeading('Program Maturity Progress'),
      bulletPoint('Detection rules deployed: [COUNT] of [TOTAL AVAILABLE] ([PERCENTAGE])'),
      bulletPoint('Stack coverage: [DESCRIPTION OF DEPLOYED STACK]'),
      bulletPoint('Approved AI tools available: [COUNT]'),
      bulletPoint('Employees trained on AI AUP: [COUNT] ([PERCENTAGE] of workforce)'),
      bulletPoint('Vendor AI disclosure clauses in contracts: [COUNT] ([PERCENTAGE] of critical vendors)'),
      sectionHeading('Trends and Observations'),
      bulletPoint('[TREND 1: e.g., Shift from ChatGPT to code-assistant tools among engineering teams]'),
      bulletPoint('[TREND 2: e.g., Increasing use of AI browser extensions, especially in marketing]'),
      bulletPoint('[TREND 3: e.g., Declining repeat-offender rate following updated comms]'),
      sectionHeading('Recommendations'),
      bulletPoint('[RECOMMENDATION 1: e.g., Fast-track sanctioning of [TOOL] based on demand signals]'),
      bulletPoint('[RECOMMENDATION 2: e.g., Expand DLP coverage to [AREA]]'),
      bulletPoint('[RECOMMENDATION 3: e.g., Update AUP section [X] to address [GAP]]'),
      sectionHeading('Next Quarter Priorities'),
      bulletPoint('[PRIORITY 1]'),
      bulletPoint('[PRIORITY 2]'),
      bulletPoint('[PRIORITY 3]'),
      bodyParagraph(
        'The full dataset underlying this report is available in [DASHBOARD / REPORT LOCATION]. Please direct questions to [AI GOVERNANCE TEAM EMAIL].'
      ),
      bodyParagraph('Regards,'),
      bodyParagraph('[AI GOVERNANCE PROGRAM LEAD]'),
      bodyParagraph('[TITLE]'),
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Generate                                                           */
/* ------------------------------------------------------------------ */

async function main() {
  for (const spec of templates) {
    const doc = buildDocument(spec);
    const buffer = await Packer.toBuffer(doc);
    const outPath = join(outDir, `${spec.id}.docx`);
    writeFileSync(outPath, buffer);
    console.log(`  created ${spec.id}.docx`);
  }
  console.log(`\n${templates.length} comms templates generated in ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
