"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isBusinessEmail } from "@/lib/business-email";

// Window.dataLayer is declared globally in GtmPageViewTracker.tsx.

const CONSENT_CHECKBOX_TEXT =
  "I'd like access to the library. I agree that BrandMultiplier may store and process the details above to give me access, and may contact me at the email address — and, if I've given one, the phone number — I've provided, by email and by live phone call placed by BrandMultiplier or someone acting on its behalf, about the Diagnostic and related services. No automated dialing, no recorded messages, no marketing texts. Not a condition of any purchase, and you can stop it anytime by replying to any email or writing to support@brandmultiplier.ai. I've read the Privacy Policy and Terms.";

const DISCLOSURE_TEXT =
  "We use your details to give you access to the library and to follow up about the Diagnostic. We do not sell your data or share it with third parties for their own marketing. You can withdraw consent or request deletion at any time by emailing support@brandmultiplier.ai. If you are in the EU/EEA or UK, you have the right to access, rectify, erase, restrict, and port your data, and to lodge a complaint with your supervisory authority. See our Privacy Policy and Terms.";

const ARR_OPTIONS = ["Under $3M", "$3M - $10M", "$10M - $50M", "$50M+"];

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  work_email: "",
  phone: undefined as string | undefined,
  company_name: "",
  approximate_arr: "",
  consent_marketing: false,
};

function isCountryCodeOnly(value: string): boolean {
  try {
    const parsed = parsePhoneNumber(value);
    return Boolean(parsed && !parsed.nationalNumber);
  } catch {
    return false;
  }
}

function normalizePhoneValue(value?: string): string | undefined {
  if (!value) return undefined;
  return value;
}

function phoneForValidation(phone?: string): string | undefined {
  return normalizePhoneValue(phone);
}

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

const FIELD_ORDER = [
  "first_name",
  "last_name",
  "work_email",
  "phone",
  "consent_marketing",
] as const;

function ConsentLinks() {
  return (
    <>
      <a
        href="https://brandmultiplier.ai/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a href="https://brandmultiplier.ai/terms" target="_blank" rel="noopener noreferrer">
        Terms
      </a>
    </>
  );
}

export default function LibraryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const formStartRef = useRef<number>(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  const fieldRefs = {
    first_name: useRef<HTMLInputElement>(null),
    last_name: useRef<HTMLInputElement>(null),
    work_email: useRef<HTMLInputElement>(null),
    consent_marketing: useRef<HTMLInputElement>(null),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const nextValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePhoneChange = (value?: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!formData.first_name.trim()) next.first_name = "First name is required.";
    if (!formData.last_name.trim()) next.last_name = "Last name is required.";
    const trimmedEmail = formData.work_email.trim();
    if (!EMAIL_REGEX.test(trimmedEmail) || !isBusinessEmail(trimmedEmail)) {
      next.work_email = "Enter a valid work email.";
    }
    const phone = phoneForValidation(formData.phone);
    if (phone && !isValidPhoneNumber(phone)) {
      next.phone = "Enter a valid phone number.";
    }
    if (!formData.consent_marketing) {
      next.consent_marketing = "Please check the box to continue.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const firstInvalid = FIELD_ORDER.find((field) => next[field]);
      if (firstInvalid === "phone") {
        document.getElementById("phone")?.focus();
      } else if (firstInvalid) {
        fieldRefs[firstInvalid].current?.focus();
      }
    }

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setNetworkError("");

    try {
      const response = await fetch("/api/library-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          work_email: formData.work_email,
          phone: phoneForValidation(formData.phone),
          company_name: formData.company_name,
          approximate_arr: formData.approximate_arr,
          consent_marketing: formData.consent_marketing,
          consent_text: CONSENT_CHECKBOX_TEXT,
          website_url: honeypotRef.current?.value ?? "",
          form_ts: formStartRef.current,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Record<string, string>;
      };

      if (response.ok && data.ok) {
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push({ event: "library_optin" });
        router.push("/resources");
        return;
      }

      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        const firstInvalid = FIELD_ORDER.find((field) => data.errors?.[field]);
        if (firstInvalid === "phone") {
          document.getElementById("phone")?.focus();
        } else if (firstInvalid) {
          fieldRefs[firstInvalid].current?.focus();
        }
        return;
      }

      setNetworkError("Something went wrong. Please try again.");
    } catch {
      setNetworkError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="lf-row">
        <div className={`lf-field${errors.first_name ? " lf-error" : ""}`}>
          <label htmlFor="first_name">First name</label>
          <input
            ref={fieldRefs.first_name}
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            maxLength={50}
            aria-invalid={Boolean(errors.first_name)}
            aria-describedby={errors.first_name ? "first_name-error" : undefined}
          />
          {errors.first_name && (
            <p id="first_name-error" className="lf-error-text" role="alert">
              {errors.first_name}
            </p>
          )}
        </div>
        <div className={`lf-field${errors.last_name ? " lf-error" : ""}`}>
          <label htmlFor="last_name">Last name</label>
          <input
            ref={fieldRefs.last_name}
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            maxLength={50}
            aria-invalid={Boolean(errors.last_name)}
            aria-describedby={errors.last_name ? "last_name-error" : undefined}
          />
          {errors.last_name && (
            <p id="last_name-error" className="lf-error-text" role="alert">
              {errors.last_name}
            </p>
          )}
        </div>
      </div>

      <div className={`lf-field${errors.work_email ? " lf-error" : ""}`}>
        <label htmlFor="work_email">Work email</label>
        <input
          ref={fieldRefs.work_email}
          id="work_email"
          name="work_email"
          type="email"
          value={formData.work_email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.work_email)}
          aria-describedby={errors.work_email ? "work_email-error" : undefined}
        />
        {errors.work_email && (
          <p id="work_email-error" className="lf-error-text" role="alert">
            {errors.work_email}
          </p>
        )}
      </div>

      <div className={`lf-field${errors.phone ? " lf-error" : ""}`}>
        <label htmlFor="phone">Phone (optional)</label>
        <div className="lf-phone">
          <PhoneInput
            id="phone"
            international
            defaultCountry="US"
            countryCallingCodeEditable={false}
            smartCaret={false}
            value={formData.phone}
            onChange={handlePhoneChange}
            numberInputProps={{
              name: "phone",
              "aria-invalid": Boolean(errors.phone),
              "aria-describedby": ["phone-help", errors.phone ? "phone-error" : null]
                .filter(Boolean)
                .join(" "),
            }}
          />
        </div>
        <p id="phone-help" className="field-help">
          Optional. If you add it, a real person may call — no robots, no texts.
        </p>
        {errors.phone && (
          <p id="phone-error" className="lf-error-text" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="lf-field">
        <label htmlFor="company_name">Company (optional)</label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          value={formData.company_name}
          onChange={handleChange}
          maxLength={100}
        />
      </div>

      <div className="lf-field">
        <label htmlFor="approximate_arr">Approximate ARR (optional)</label>
        <select
          id="approximate_arr"
          name="approximate_arr"
          value={formData.approximate_arr}
          onChange={handleChange}
        >
          <option value="">Select one</option>
          {ARR_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Honeypot — off-screen, never focusable, never revealed if triggered. */}
      <div className="lf-honeypot" aria-hidden="true">
        <label htmlFor="website_url">Website</label>
        <input
          ref={honeypotRef}
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={`lf-consent${errors.consent_marketing ? " lf-error" : ""}`}>
        <input
          ref={fieldRefs.consent_marketing}
          id="consent_marketing"
          name="consent_marketing"
          type="checkbox"
          checked={formData.consent_marketing}
          onChange={handleChange}
          aria-invalid={Boolean(errors.consent_marketing)}
          aria-describedby={
            errors.consent_marketing ? "consent_marketing-error" : undefined
          }
        />
        <label htmlFor="consent_marketing" className="lf-consent-text">
          {CONSENT_CHECKBOX_TEXT.replace("I've read the Privacy Policy and Terms.", "")}
          I&apos;ve read the <ConsentLinks />.
        </label>
      </div>
      {errors.consent_marketing && (
        <p id="consent_marketing-error" className="lf-error-text" role="alert">
          {errors.consent_marketing}
        </p>
      )}

      <p className="lf-disclosure">
        {DISCLOSURE_TEXT.replace("See our Privacy Policy and Terms.", "")}
        See our <ConsentLinks />.
      </p>

      <button type="submit" className="lf-submit" disabled={isLoading}>
        {isLoading ? "Submitting…" : "Get access"}
      </button>

      {networkError && (
        <p className="lf-network-error" role="alert" style={{ marginTop: 14 }}>
          {networkError}
        </p>
      )}
    </form>
  );
}
