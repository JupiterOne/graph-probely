export interface Account {
  status: string;
  plan: {
    id: string;
    name: string;
    description: string;
    is_trial: boolean;
    charge_model: string;
    price: number;
    currency_code: string;
    period: number;
    period_unit: 'week' | 'month' | 'year';
    allowed_scan_profiles: string[];
  };
  free_target_quantity: number;
  plan_target_quantity: number;
  pool_size: number;
  auto_collection: boolean;
  next_billing_at: string | null;
  trial_end: string | null;
  balance: number;
  balance_currency_code: string;
  has_used_trial: boolean;
  heroku: boolean;
}

interface Author {
  id: string;
  name: string;
  email: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  title: string;
  is_billing_admin: boolean;
  changed_by: Author;
  changed: string;
  last_login: string;
  is_apiuser: boolean;
}

export interface Profile extends User {
  intercom_user_id: string;
  is_sso: boolean;
  is_owner: boolean;
}

interface KeyValue {
  name: string;
  value: string;
}

interface ScanProfile {
  id: string;
  name: string;
  description: string | null;
}

interface Stack {
  id: string;
  name: string;
  desc: string;
}

interface Site {
  id: string;
  name: string;
  desc: string | null;
  url: string;
  host: string;
  has_form_login: boolean;
  form_login_url: string;
  form_login: string | null;
  has_sequence_login: boolean;
  has_sequence_navigation: boolean;
  has_basic_auth: boolean;
  basic_auth: {
    username: string;
    password: string;
  };
  headers: KeyValue[];
  cookies: KeyValue[] | null;
  whitelist: string[];
  blacklist: string[];
  changed: string;
  changed_by: Author;
  auth_enabled: boolean;
  logout_condition: 'any' | 'all';
  stack: Stack[];
  verified: boolean;
  verification_token: string;
  verification_date: string;
  verification_method: string;
  verification_last_error: string;
  api_scan_settings: null | {
    api_schema_type: string;
    api_schema_url: string | null;
    api_schema_file: string | null;
    custom_api_parameters: string;
    media_type: string;
    api_login_url: string;
    api_login_payload: string;
    api_login_token_field: string;
    token_prefix: string;
    token_parameter_name: string;
    token_parameter_location: string;
  };
}

export interface Target {
  id: string;
  name: string;
  site: Site;
  lows: number | null;
  mediums: number | null;
  highs: number | null;
  risk: number | null;
  scan_profile: string;
  type: string;
  enabled: boolean;
  environment: 'testing' | 'production';
  connected_target: string | null;
  report_type: 'default' | 'owasp' | 'pci';
  allowed_scan_profiles: ScanProfile[];
  labels: string[];
  scanning_agent: string | null;
  include_deduplicated_endpoints: boolean | null;
  changed: string;
  changed_by: Author;
  incremental: boolean;
  reduced_scope: boolean;
  schedule_incremental: boolean;
  schedule_reduced_scope: boolean;
  crawl_sequences_only: boolean;
  schedule_crawl_sequences_only: boolean;
}

enum InsertionPoint {
  COOKIE = 'cookie',
  PARAMETER = 'parameter',
  HEADER = 'header',
  ARBITRARY_URL_PARAM = 'arbitrary_url_param',
  URL_FILENAME = 'url_filename',
  URL_FOLDER = 'url_folder',
  MULTIPART_PARAMETER = 'multipart_parameter',
  NONE = '',
}

export enum FindingState {
  NOT_FIXED = 'notfixed',
  INVALID = 'invalid',
  ACCEPTED = 'accepted',
  FIXED = 'fixed',
}

interface FindingRequest {
  request: string;
  response: string;
}

interface FindingDefinition {
  id: string;
  name: string;
  desc: string;
}

export interface Finding {
  id: string;
  target: Target;
  fix: string;
  requests: FindingRequest[];
  evidence: string;
  extra: string;
  definition: FindingDefinition;
  url: string;
  path: string;
  method: string;
  insertion_point: InsertionPoint;
  assignee: Author | null;
  state: FindingState;
  severity: number;
  cvss_score: number;
  cvss_vector: string;
  last_found: string;
  changed: string;
  changed_by: Author;
}

export type Paginated<T> = {
  count: number;
  page_total: number;
  page: number;
  length: number;
  results: T[];
};
