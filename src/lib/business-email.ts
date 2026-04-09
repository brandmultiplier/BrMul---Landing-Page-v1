export const BUSINESS_EMAIL_REQUIRED_MESSAGE =
  "Business email required. Please enter a valid company/work email address.";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BLOCKED_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.co.uk",
  "ymail.com",
  "rocketmail.com",
  "hotmail.com",
  "outlook.com",
  "outlook.co.uk",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "protonmail.com",
  "proton.me",
  "pm.me",
  "mail.com",
  "gmx.com",
  "gmx.us",
  "inbox.com",
  "yandex.com",
  "yandex.ru",
  "zoho.com",
  "fastmail.com",
  "hey.com",
  "rediffmail.com",
  "qq.com",
  "163.com",
  "126.com",
  "naver.com",
]);

const BLOCKED_DISPOSABLE_EMAIL_DOMAINS = new Set([
  "10minutemail.com",
  "20minutemail.com",
  "dispostable.com",
  "emailondeck.com",
  "fakeinbox.com",
  "guerrillamail.com",
  "maildrop.cc",
  "mailinator.com",
  "sharklasers.com",
  "temp-mail.org",
  "tempmail.com",
  "tempmailo.com",
  "trashmail.com",
  "yopmail.com",
]);

const getDomain = (email: string): string => {
  const [, domain = ""] = email.trim().toLowerCase().split("@");
  return domain;
};

export const isValidEmailShape = (email: string): boolean =>
  EMAIL_REGEX.test(email.trim());

export const isBlockedEmailDomain = (domain: string): boolean =>
  BLOCKED_EMAIL_DOMAINS.has(domain) ||
  BLOCKED_DISPOSABLE_EMAIL_DOMAINS.has(domain);

export const isBusinessEmail = (email: string): boolean => {
  const normalizedEmail = email.trim().toLowerCase();
  const domain = getDomain(normalizedEmail);

  if (!normalizedEmail || !isValidEmailShape(normalizedEmail) || !domain) {
    return false;
  }

  return !isBlockedEmailDomain(domain);
};

const EMAILVALIDATION_INFO_URL = "https://api.emailvalidation.io/v1/info";

type EmailValidationResponse = {
  is_free_email?: unknown;
  free?: unknown;
  is_disposable_email?: unknown;
  disposable?: unknown;
  is_mx_found?: unknown;
  mx_found?: unknown;
  is_deliverable?: unknown;
  smtp_check?: unknown;
  format_valid?: unknown;
  state?: unknown;
  reason?: unknown;
};

const getValidationFieldValue = (field: unknown): boolean | undefined => {
  if (typeof field === "boolean") {
    return field;
  }

  if (typeof field === "number") {
    return field === 1;
  }

  if (typeof field === "string") {
    return field.toLowerCase() === "true";
  }

  if (field && typeof field === "object" && "value" in field) {
    const nestedValue = (field as { value?: unknown }).value;
    return getValidationFieldValue(nestedValue);
  }

  return undefined;
};

const hasDnsMxRecord = async (domain: string): Promise<boolean> => {
  try {
    const dns = await import("node:dns/promises");
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
};

export const isStrictBusinessEmail = async (email: string): Promise<boolean> => {
  if (!isBusinessEmail(email)) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const domain = getDomain(normalizedEmail);
  const apiKey = process.env.EMAILVALIDATION_API_KEY;
  if (!apiKey) {
    console.warn("[email-validation] Missing EMAILVALIDATION_API_KEY");
    return hasDnsMxRecord(domain);
  }

  try {
    const url = `${EMAILVALIDATION_INFO_URL}?apikey=${encodeURIComponent(apiKey)}&email=${encodeURIComponent(normalizedEmail)}`;
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      const dnsFallbackAccepted = await hasDnsMxRecord(domain);
      console.info("[email-validation]", {
        domain,
        accepted: dnsFallbackAccepted,
        reason: "api-http-error",
        status: response.status,
        dnsFallbackAccepted,
      });
      return dnsFallbackAccepted;
    }

    const data = (await response.json()) as EmailValidationResponse;
    const isFreeEmail = getValidationFieldValue(data.is_free_email ?? data.free);
    const isDisposableEmail = getValidationFieldValue(
      data.is_disposable_email ?? data.disposable,
    );
    const hasMxRecord = getValidationFieldValue(data.is_mx_found ?? data.mx_found);
    const isDeliverable = getValidationFieldValue(
      data.is_deliverable ?? data.smtp_check,
    );
    const isFormatValid = getValidationFieldValue(data.format_valid);
    const state =
      typeof data.state === "string" ? data.state.toLowerCase() : undefined;
    const reason = typeof data.reason === "string" ? data.reason : undefined;

    if (isFreeEmail === true || isDisposableEmail === true) {
      console.info("[email-validation]", {
        domain,
        accepted: false,
        reason: reason ?? "blocked-provider",
        state,
        isFreeEmail,
        isDisposableEmail,
        hasMxRecord,
        isDeliverable,
        isFormatValid,
      });
      return false;
    }

    if (isFormatValid === false || state === "undeliverable") {
      console.info("[email-validation]", {
        domain,
        accepted: false,
        reason: reason ?? "undeliverable",
        state,
        isFreeEmail,
        isDisposableEmail,
        hasMxRecord,
        isDeliverable,
        isFormatValid,
      });
      return false;
    }

    if (
      reason === "invalid_domain" ||
      reason === "invalid_format" ||
      reason === "invalid_mailbox" ||
      reason === "invalid_smtp" ||
      reason === "invalid_mx" ||
      (hasMxRecord === false && state === "undeliverable")
    ) {
      console.info("[email-validation]", {
        domain,
        accepted: false,
        reason: reason ?? "undeliverable",
        state,
        isFreeEmail,
        isDisposableEmail,
        hasMxRecord,
        isDeliverable,
        isFormatValid,
      });
      return false;
    }

    if (state === "deliverable" || hasMxRecord === true) {
      console.info("[email-validation]", {
        domain,
        accepted: true,
        reason,
        state,
        isFreeEmail,
        isDisposableEmail,
        hasMxRecord,
        isDeliverable,
        isFormatValid,
      });
      return true;
    }

    // API can return ambiguous timeout/no_connect/unknown states. Resolve via DNS MX before final decision.
    const dnsFallbackAccepted = await hasDnsMxRecord(domain);
    console.info("[email-validation]", {
      domain,
      accepted: dnsFallbackAccepted,
      reason: reason ?? "dns-fallback",
      state,
      isFreeEmail,
      isDisposableEmail,
      hasMxRecord,
      isDeliverable,
      isFormatValid,
      dnsFallbackAccepted,
    });

    return dnsFallbackAccepted;
  } catch {
    const dnsFallbackAccepted = await hasDnsMxRecord(domain);
    console.info("[email-validation]", {
      domain,
      accepted: dnsFallbackAccepted,
      reason: "api-exception",
      dnsFallbackAccepted,
    });
    return dnsFallbackAccepted;
  }
};

