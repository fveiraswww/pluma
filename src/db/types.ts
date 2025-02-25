export interface UserDetails {
  name: string | null;
  username: string;
  user_id: string;
  plan: "BASE" | "PRO" | "SUPER";
  stripe_user_id: string | null;
  stripe_connect: boolean;
  mp_access_token: string | null;
  email: string | null;
  onboarding_completed: boolean;
  type: "streamer" | "agency";
  streamer_profile?: StreamerProfile;
  credits: number;
}

export interface StreamerProfile {
  favicon: string;
  user_id: string;
  category: number[];
  currency: "ars";
  created_at: Date;
  socialLink: string;
  obs_server_password: string | null;
  interval_time: string;
  platform: "kick" | "twitch";
  platform_username: string;
}

export interface Request {
  duration: number;
  id: number;
  created_at: Date;
  title: string | null;
  description: string | null;
  image_url: string | null;
  status: "approved" | "pending" | "rejected";
  owner_email: string | null;
  email: string | null;
  user_id: string | null;
  sender_user_id: string | null;
  times_to_show: number;
  last_time_shown: Date | null;
  amount: number;
  reason: string | null;
  budget: number;
}

export interface SessionAd {
  user_id: string;
  request_id: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  init_at: Date;
  expire_at: Date;
  times_to_show: number;
}

export interface StripeAccount {
  business_profile: {
    annual_revenue: number | null;
    estimated_worker_count: number | null;
    mcc: string;
    name: string;
    support_address: {
      city?: string;
      country?: string;
      line1?: string;
      line2?: string;
      postal_code?: string;
      state?: string;
    };
  };
  capabilities: {
    acss_debit_payments: string;
    affirm_payments: string;
    afterpay_clearpay_payments: string;
    amazon_pay_payments: string;
    bancontact_payments: string;
    [key: string]: string; // To allow for additional capabilities dynamically
  };
  charges_enabled: boolean;
  controller: {
    fees: Record<string, unknown>;
    is_controller: boolean;
    losses: Record<string, unknown>;
    requirement_collection: string;
    stripe_dashboard: Record<string, unknown>;
  };
  country: string;
  created: number; // UNIX timestamp
  default_currency: string;
  details_submitted: boolean;
  email: string;
  external_accounts: {
    object: string;
    data: Array<{
      id?: string;
      object?: string;
      account_holder_name?: string;
      account_holder_type?: string;
      bank_name?: string;
      country?: string;
      currency?: string;
      last4?: string;
      routing_number?: string;
    }>;
    has_more: boolean;
    total_count: number;
    url: string;
  };
  future_requirements: {
    alternatives: Array<unknown>;
    current_deadline: number | null;
    currently_due: Array<string>;
    disabled_reason: string | null;
    errors: Array<unknown>;
    past_due: Array<string>;
    pending_verification: Array<string>;
  };
  id: string;
  metadata: Record<string, unknown>;
  object: string;
  payouts_enabled: boolean;
  requirements: {
    alternatives: Array<unknown>;
    current_deadline: number | null;
    currently_due: Array<string>;
    disabled_reason: string | null;
    errors: Array<unknown>;
    past_due: Array<string>;
    pending_verification: Array<string>;
  };
  settings: {
    bacs_debit_payments: Record<string, unknown>;
    branding: {
      icon?: string;
      logo?: string;
      primary_color?: string;
      secondary_color?: string;
    };
    card_issuing: Record<string, unknown>;
    card_payments: Record<string, unknown>;
    dashboard: Record<string, unknown>;
    payments?: Record<string, unknown>;
  };
  tos_acceptance: {
    date: number; // UNIX timestamp
    ip?: string;
    user_agent?: string;
  };
  type: string;
}

export type StripePaymentStatus = "success" | "pending" | "error";
