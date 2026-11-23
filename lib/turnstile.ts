/**
 * Cloudflare Turnstile Server Verification Helper
 */

export async function verifyTurnstileToken(
  token: string | undefined | null,
  clientIp?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // If no secret key is set, allow (for safe fallback)
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "Missing Turnstile verification token" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (clientIp) formData.append("remoteip", clientIp);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await res.json();
    if (data.success) {
      return { success: true };
    }
    return {
      success: false,
      error: (data["error-codes"] || []).join(", ") || "Turnstile verification failed",
    };
  } catch (err: any) {
    console.error("Turnstile server verification error:", err);
    return { success: false, error: err?.message || "Verification request failed" };
  }
}
