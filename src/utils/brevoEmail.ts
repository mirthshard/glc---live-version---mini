/**
 * Cloudflare Pages Email Dispatch Service
 *
 * Posts form enquiries exclusively to `/api/send-email` (backed by functions/api/send-email.ts),
 * where `BREVO_API_KEY` is stored server-side in Cloudflare Pages Environment Variables.
 */

export interface EmailDispatchPayload {
  toEmail?: string;
  toName?: string;
  senderName: string;
  senderEmail: string;
  telephone: string;
  location?: string;
  subject: string;
  inquiryType: string;
  preferredChannel?: string;
  message?: string;
  additionalDetails?: Record<string, any>;
}

export interface DispatchResult {
  success: boolean;
  message: string;
  provider: 'cloudflare-function';
  recordId?: string;
}

export const EMAIL_FAILURE_MESSAGE =
  "Sorry, that didn't send. Please email info@thegloballuxuryconsortium.com or call 020 3951 6369.";

export async function sendEmailViaBrevo(payload: EmailDispatchPayload): Promise<DispatchResult> {
  const timestamp = new Date().toISOString();
  const recordId = `TGLC-${Date.now().toString(36).toUpperCase()}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090C; color: #F4F1EA; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #0F1117; border: 1px solid #2B2E39; padding: 32px; }
          .header { border-bottom: 1px solid #8B672B; padding-bottom: 20px; margin-bottom: 24px; text-align: center; }
          .title { color: #CFA85E; font-size: 20px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; }
          .subtitle { color: #9C968A; font-size: 12px; margin-top: 6px; letter-spacing: 0.05em; }
          .section { margin-bottom: 20px; }
          .label { color: #CFA85E; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 4px; }
          .value { color: #F4F1EA; font-size: 14px; background: #151720; border: 1px solid #222530; padding: 10px 14px; margin-top: 2px; }
          .footer { border-top: 1px solid #222530; padding-top: 20px; margin-top: 28px; text-align: center; font-size: 11px; color: #736E65; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">The Global Luxury Consortium</h1>
            <div class="subtitle">Private Introduction · 45 Albemarle Street, Mayfair</div>
          </div>

          <div class="section">
            <div class="label">Reference Code</div>
            <div class="value" style="font-family: monospace; color: #CFA85E;">${recordId} · Logged ${timestamp}</div>
          </div>

          <div class="section">
            <div class="label">Contact Details</div>
            <div class="value">
              <strong>${payload.senderName}</strong><br>
              Email: ${payload.senderEmail}<br>
              Telephone: ${payload.telephone}<br>
              ${payload.location ? `Location: ${payload.location}<br>` : ''}
              ${payload.preferredChannel ? `Preferred Channel: ${payload.preferredChannel}` : ''}
            </div>
          </div>

          <div class="section">
            <div class="label">Area of Interest</div>
            <div class="value" style="color: #F4F1EA; font-weight: 500;">${payload.inquiryType}</div>
          </div>

          ${payload.message ? `
          <div class="section">
            <div class="label">Message</div>
            <div class="value" style="line-height: 1.6; white-space: pre-wrap;">${payload.message}</div>
          </div>
          ` : ''}

          <div class="footer">
            TGLC House · 3rd Floor, 45 Albemarle Street, London W1S 4JL<br>
            Telephone: 020 3951 6369 · info@thegloballuxuryconsortium.com
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const cfResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        recordId,
        htmlContent,
      }),
    });

    if (cfResponse.ok) {
      return {
        success: true,
        message: 'Your enquiry has been sent to our Mayfair office.',
        provider: 'cloudflare-function',
        recordId,
      };
    }
  } catch {
    // Fall through to friendly error response
  }

  return {
    success: false,
    message: EMAIL_FAILURE_MESSAGE,
    provider: 'cloudflare-function',
    recordId,
  };
}
