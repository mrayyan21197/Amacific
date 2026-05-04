import React, { useState } from "react";
import { trackEvent } from "../utils/analytics";

/**
 * Embedded Mailchimp form — set REACT_APP_MAILCHIMP_FORM_ACTION to your list endpoint.
 * @param {{ tag?: string, audience?: string, className?: string, compact?: boolean, buttonLabel?: string, showStudentChallengeOptIn?: boolean, signupExtraEvent?: string }} props
 */
export default function MailchimpSignupForm({
  tag = "website",
  audience = "newsletter",
  className = "",
  compact = false,
  buttonLabel = "Subscribe",
  showStudentChallengeOptIn = false,
  signupExtraEvent = null,
  optInLight = false,
}) {
  const action = process.env.REACT_APP_MAILCHIMP_FORM_ACTION || "";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [studentUpdates, setStudentUpdates] = useState(false);

  const pushSignupEvents = (method) => {
    trackEvent("email_signup", { tag, audience, method });
    if (signupExtraEvent) {
      trackEvent(signupExtraEvent, {
        tag,
        audience,
        student_challenge_updates: studentUpdates,
      });
    }
  };

  const handleFallback = (e) => {
    e.preventDefault();
    pushSignupEvents("fallback_local");
    setSent(true);
    setEmail("");
    setStudentUpdates(false);
  };

  if (!action) {
    return (
      <form onSubmit={handleFallback} className={className}>
        {!compact && (
          <p className="text-xs text-zinc-500 mb-2">
            Add{" "}
            <code className="bg-zinc-800 px-1 rounded">REACT_APP_MAILCHIMP_FORM_ACTION</code> for live Mailchimp sync.
          </p>
        )}
        {showStudentChallengeOptIn && (
          <label className="mb-3 flex cursor-pointer items-start gap-2 text-left text-xs text-zinc-600">
            <input
              type="checkbox"
              checked={studentUpdates}
              onChange={(e) => setStudentUpdates(e.target.checked)}
              className="mt-0.5"
            />
            <span>Send me student deals and smart cart challenge updates.</span>
          </label>
        )}
        <div className={`flex ${compact ? "flex-col sm:flex-row" : "flex-col"} gap-2`}>
          <input
            type="email"
            name="EMAIL"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-brandOrange text-sm"
          />
          <button
            type="submit"
            className="bg-brandOrange hover:bg-brandOrange-dark text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap"
          >
            {sent ? "Thanks!" : buttonLabel}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      action={action}
      method="post"
      target="_blank"
      className={className}
      onSubmit={() => pushSignupEvents("mailchimp")}
    >
      {showStudentChallengeOptIn && (
        <label
          className={`mb-3 flex cursor-pointer items-start gap-2 text-left text-xs ${optInLight ? "text-slate-700" : "text-zinc-300"}`}
        >
          <input
            type="checkbox"
            checked={studentUpdates}
            onChange={(e) => setStudentUpdates(e.target.checked)}
            className="mt-0.5"
          />
          <span>Send me student deals and smart cart challenge updates.</span>
        </label>
      )}
      <div className={`flex ${compact ? "flex-col sm:flex-row" : "flex-col"} gap-2`}>
        <input type="hidden" name="tags" value={tag} />
        <input
          type="email"
          name="EMAIL"
          required
          placeholder="you@email.com"
          className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-brandOrange text-sm"
        />
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input type="text" name="b_trap" tabIndex={-1} defaultValue="" />
        </div>
        <button type="submit" className="bg-brandOrange hover:bg-brandOrange-dark text-white px-4 py-2 rounded-lg font-bold text-sm">
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}
