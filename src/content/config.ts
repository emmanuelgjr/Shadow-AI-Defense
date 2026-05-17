import { defineCollection, z } from 'astro:content';

const Reference = z.object({ title: z.string(), url: z.string().url() });

export const AICategory = z.enum([
  'Conversational AI',
  'Code Assistant',
  'Image Gen',
  'Search',
  'Browser Extension',
  'Productivity',
  'Specialized',
  'Agentic',
]);

export const ServiceTier = z.enum(['Block', 'Allow with DLP', 'Allow Enterprise', 'Conditional']);

export const serviceSchema = z.object({
  slug: z.string(),
  name: z.string(),
  vendor: z.string(),
  category: AICategory,
  enterprise_offering: z.boolean(),
  enterprise_offering_name: z.string().optional(),
  network_signatures: z.object({
    domains: z.array(z.string()).min(1),
    api_endpoints: z.array(z.string()).optional(),
    cdn_domains: z.array(z.string()).optional(),
    sni_patterns: z.array(z.string()).optional(),
  }),
  client_signatures: z.object({
    user_agents: z.array(z.string()).optional(),
    process_names: z.array(z.string()).optional(),
    browser_extensions: z.array(z.object({ name: z.string(), id_chrome: z.string().optional(), risk: z.string() })).optional(),
    desktop_apps: z.array(z.object({ name: z.string(), macOS_bundle: z.string().optional(), windows_publisher: z.string().optional() })).optional(),
    mobile_apps: z.array(z.object({ name: z.string(), bundle_id: z.string().optional(), package_id: z.string().optional() })).optional(),
  }),
  data_egress_concerns: z.array(z.string()).min(1),
  training_use_default: z.string(),
  enterprise_dpa_available: z.boolean(),
  risk_profile: z.object({
    data_exfiltration: z.number().int().min(1).max(5),
    ip_loss: z.number().int().min(1).max(5),
    output_quality: z.number().int().min(1).max(5),
    integration_risk: z.number().int().min(1).max(5),
  }),
  detection_rules: z.array(z.string()).default([]),
  recommended_response: ServiceTier,
  references: z.array(Reference).default([]),
  last_reviewed: z.string(),
});

export type Service = z.infer<typeof serviceSchema>;

export const Platform = z.enum([
  'Microsoft Sentinel',
  'Defender for Cloud Apps',
  'Purview DLP',
  'Defender for Endpoint',
  'CrowdStrike Falcon',
  'Netskope',
  'Zscaler',
  'Generic Network',
  'Conditional Access',
]);

export const DetectionType = z.enum(['Network', 'Endpoint', 'DLP', 'Application Connector', 'Identity']);
export const RuleLanguage = z.enum(['KQL', 'SPL', 'Falcon CQL', 'regex', 'Suricata', 'config']);
export const Severity = z.enum(['Informational', 'Low', 'Medium', 'High']);

export const detectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  platform: Platform,
  detection_type: DetectionType,
  rule_language: RuleLanguage,
  rule_query: z.string().min(50),
  rule_explanation: z.string(),
  required_data_sources: z.array(z.string()).min(1),
  prerequisites: z.array(z.string()).min(1),
  expected_volume: z.string(),
  false_positive_guidance: z.string(),
  tuning_steps: z.array(z.string()).min(1),
  detects_services: z.array(z.string()).default([]),
  severity: Severity,
  recommended_response: z.string().optional(),
  framework_mappings: z.object({
    nist_ai_rmf: z.array(z.string()).optional(),
    iso_iec_42001: z.array(z.string()).optional(),
    mitre_attack: z.array(z.string()).optional(),
    nist_csf: z.array(z.string()).optional(),
  }),
  ai_controls_catalog_refs: z.array(z.string()).default([]),
  author: z.string(),
  contributor_attribution: z.string().optional(),
  created: z.string(),
  last_reviewed: z.string(),
  references: z.array(Reference).default([]),
});

export type Detection = z.infer<typeof detectionSchema>;

export const runbookSchema = z.object({
  id: z.string(),
  title: z.string(),
  trigger: z.string(),
  severity: Severity,
  applies_to: z.array(z.string()).min(1),
  response_phases: z.object({
    immediate: z.array(z.object({ step: z.number(), owner: z.string(), action: z.string(), expected_completion: z.string().optional() })).min(1),
    short_term: z.array(z.object({ step: z.number(), owner: z.string(), action: z.string(), expected_completion: z.string().optional() })).min(1),
    long_term: z.array(z.object({ step: z.number(), owner: z.string(), action: z.string(), expected_completion: z.string().optional() })).min(1),
  }),
  decision_tree: z.array(z.object({ node: z.string(), yes: z.string(), no: z.string() })).default([]),
  comms_templates: z.array(z.string()).default([]),
  policy_references: z.array(z.string()).default([]),
  raci: z.object({
    responsible: z.string(),
    accountable: z.string(),
    consulted: z.array(z.string()).default([]),
    informed: z.array(z.string()).default([]),
  }),
  metrics_to_capture: z.array(z.string()).min(1),
  framework_mappings: z.object({
    nist_ai_rmf: z.array(z.string()).optional(),
    iso_iec_42001: z.array(z.string()).optional(),
    nist_csf: z.array(z.string()).optional(),
  }),
  ai_controls_catalog_refs: z.array(z.string()).default([]),
  references: z.array(Reference).default([]),
});

export type Runbook = z.infer<typeof runbookSchema>;

export const stackSchema = z.object({
  slug: z.string(),
  name: z.string(),
  short: z.string(),
  description: z.string(),
  applicable_rule_platforms: z.array(z.string()),
  not_possible_rules: z.array(z.string()).default([]),
  compensating_controls: z.array(z.string()).default([]),
  things_to_know: z.array(z.object({ title: z.string(), content: z.string(), severity: z.enum(['info', 'warn']) })).default([]),
  policy_token_replacements: z.object({
    siem_tool: z.string(),
    dlp_tool: z.string(),
    edr_tool: z.string(),
    casb_tool: z.string(),
    swg_tool: z.string(),
  }),
  recommended_deployment_order: z.array(z.string()).default([]),
});

export type Stack = z.infer<typeof stackSchema>;

const services = defineCollection({ type: 'data', schema: serviceSchema });
const detections = defineCollection({ type: 'data', schema: detectionSchema });
const runbooks = defineCollection({ type: 'data', schema: runbookSchema });
const stacks = defineCollection({ type: 'data', schema: stackSchema });

export const collections = { services, detections, runbooks, stacks };
