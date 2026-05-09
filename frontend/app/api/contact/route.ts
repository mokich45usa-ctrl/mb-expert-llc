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

export async function POST(req: Request) {
  try {
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
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Could not send the request.',
      },
      { status: 500 }
    );
  }
}
