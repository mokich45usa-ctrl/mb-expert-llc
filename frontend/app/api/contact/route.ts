import { createTransport } from 'nodemailer';

type ContactPayload = {
  zipCode?: string;
  year?: string;
  make?: string;
  model?: string;
  phone?: string;
  email?: string;
  message?: string;
  website?: string;
  recaptchaToken?: string;
};

type RateLimitState = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const rateLimitStore = new Map<string, RateLimitState>();

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getAllowedOrigins() {
  const configuredOrigins = process.env.CONTACT_ALLOWED_ORIGINS;
  if (configuredOrigins) {
    return configuredOrigins
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mbexpertllc.com';

  try {
    const parsed = new URL(siteUrl);
    const origins = new Set<string>([parsed.origin]);

    if (parsed.hostname === 'mbexpertllc.com') {
      origins.add(`${parsed.protocol}//www.${parsed.hostname}`);
    }

    if (parsed.hostname.startsWith('www.')) {
      origins.add(`${parsed.protocol}//${parsed.hostname.slice(4)}`);
    }

    return [...origins];
  } catch {
    return ['https://mbexpertllc.com', 'https://www.mbexpertllc.com'];
  }
}

function getRequestOrigin(req: Request) {
  const origin = req.headers.get('origin');
  if (origin) {
    return origin;
  }

  const referer = req.headers.get('referer');
  if (!referer) {
    return '';
  }

  try {
    return new URL(referer).origin;
  } catch {
    return '';
  }
}

function isAllowedRequest(req: Request) {
  const requestOrigin = getRequestOrigin(req);
  const allowedOrigins = getAllowedOrigins();
  return requestOrigin ? allowedOrigins.includes(requestOrigin) : false;
}

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? '';
  }

  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('true-client-ip') ??
    ''
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return current.count > MAX_SUBMISSIONS_PER_WINDOW;
}

export async function POST(req: Request) {
  try {
    if (!isAllowedRequest(req)) {
      return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
    }

    const rateLimitKey = getClientIp(req) || req.headers.get('user-agent') || 'anonymous';
    if (isRateLimited(rateLimitKey)) {
      return Response.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    const body = (await req.json()) as ContactPayload;

    if (normalize(body.website)) {
      return Response.json({ ok: true });
    }

    const zipCode = normalize(body.zipCode);
    const year = normalize(body.year);
    const make = normalize(body.make);
    const model = normalize(body.model);
    const phone = normalize(body.phone);
    const email = normalize(body.email);
    const message = normalize(body.message);
    const recaptchaToken = normalize(body.recaptchaToken);

    if (!zipCode || !year || !make || !model || !phone || !email || !message) {
      return Response.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    if (
      zipCode.length > 20 ||
      year.length > 10 ||
      make.length > 80 ||
      model.length > 80 ||
      phone.length > 40 ||
      email.length > 254 ||
      message.length > 4000
    ) {
      return Response.json({ error: 'Please shorten the form details and try again.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      if (!recaptchaToken) {
        return Response.json(
          { error: 'Please complete the anti-spam check before sending.' },
          { status: 400 }
        );
      }

      const verificationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: recaptchaToken,
        }),
      });

      const verification = (await verificationResponse.json()) as { success?: boolean };
      if (!verification.success) {
        return Response.json(
          { error: 'Anti-spam verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpPort = Number(process.env.SMTP_PORT ?? 465);
    const recipient = process.env.CONTACT_EMAIL_TO ?? smtpUser;

    if (!smtpHost || !smtpUser || !smtpPassword || !recipient) {
      return Response.json(
        {
          error:
            'Email delivery is not configured yet. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD, and CONTACT_EMAIL_TO.',
        },
        { status: 500 }
      );
    }

    const from = process.env.CONTACT_EMAIL_FROM ?? `MB Expert LLC <${smtpUser}>`;
    const subject = `New MB Expert LLC request: ${year} ${make} ${model}`;
    const details = [
      ['ZIP Code', zipCode],
      ['Year', year],
      ['Make', make],
      ['Model', model],
      ['Phone', phone],
      ['Email', email],
      ['Issue', message],
    ];

    const transport = createTransport({
      host: smtpHost,
      port: Number.isFinite(smtpPort) ? smtpPort : 465,
      secure: (Number.isFinite(smtpPort) ? smtpPort : 465) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    await transport.sendMail({
      from,
      to: recipient,
      replyTo: email,
      subject,
      text: details.map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0b0f12">
          <h2 style="margin:0 0 16px">New MB Expert LLC request</h2>
          <p style="margin:0 0 16px"><strong>Vehicle:</strong> ${escapeHtml(year)} ${escapeHtml(make)} ${escapeHtml(model)}</p>
          <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px">
            ${details
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="padding:8px 0;border-top:1px solid #e5e7eb;width:140px;font-weight:700">${escapeHtml(label)}</td>
                    <td style="padding:8px 0;border-top:1px solid #e5e7eb">${escapeHtml(value)}</td>
                  </tr>
                `
              )
              .join('')}
          </table>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return Response.json(
      {
        error: 'Could not send the request right now. Please try again later.',
      },
      { status: 500 }
    );
  }
}
