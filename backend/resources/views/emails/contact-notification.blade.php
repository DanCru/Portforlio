<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
        .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .field-label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .field-value { font-size: 15px; color: #1e293b; line-height: 1.6; padding: 12px; background: #f8fafc; border-left: 3px solid #0ea5e9; border-radius: 0 8px 8px 0; }
        .message-box { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 16px; white-space: pre-wrap; }
        .footer { text-align: center; padding: 20px; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📬 New Contact Message</h1>
            <p>Someone reached out through your portfolio</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-label">From</div>
                <div class="field-value">{{ $contactMessage->name }}</div>
            </div>
            <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">
                    <a href="mailto:{{ $contactMessage->email }}" style="color: #0ea5e9; text-decoration: none;">{{ $contactMessage->email }}</a>
                </div>
            </div>
            <div class="field">
                <div class="field-label">Subject</div>
                <div class="field-value">{{ $contactMessage->subject }}</div>
            </div>
            <div class="field">
                <div class="field-label">Message</div>
                <div class="field-value message-box">{{ $contactMessage->message }}</div>
            </div>
        </div>
        <div class="footer">
            Sent from Duc.DEV Portfolio &copy; {{ date('Y') }}
        </div>
    </div>
</body>
</html>
