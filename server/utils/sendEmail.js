const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const templates = {
  welcome: (data) => ({
    subject: 'Welcome to Auto X Sri Lanka!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">Welcome to Auto X Sri Lanka, ${data.name}!</h2>
        <p>Thank you for joining Auto X Sri Lanka, your trusted partner for construction materials and vehicle rentals.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse premium construction materials</li>
          <li>Rent professional vehicles and equipment</li>
          <li>Track your orders and requests</li>
          <li>Access 24/7 customer support</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>The Auto X Sri Lanka Team</p>
      </div>
    `
  }),

  serviceRequestConfirmation: (data) => ({
    subject: `Service Request Confirmation - ${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">Service Request Confirmed</h2>
        <p>Your ${data.type} request has been received and is being processed.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details:</h3>
          <p><strong>Order Number:</strong> ${data.orderNumber}</p>
          <p><strong>Item:</strong> ${data.itemName}</p>
          <p><strong>Total Amount:</strong> $${data.totalPrice}</p>
          <p><strong>Required Date:</strong> ${new Date(data.requiredDate).toLocaleDateString()}</p>
        </div>
        <p>We'll contact you soon with updates on your request.</p>
        <p>Best regards,<br>The Auto X Sri Lanka Team</p>
      </div>
    `
  }),

  statusUpdate: (data) => ({
    subject: `Order ${data.status.toUpperCase()} - ${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">Order Status Update</h2>
        <p>Your order <strong>${data.orderNumber}</strong> status has been updated to: <strong>${data.status.toUpperCase()}</strong></p>
        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
        <p>You can track your order status in your account dashboard.</p>
        <p>Best regards,<br>The Auto X Sri Lanka Team</p>
      </div>
    `
  })
};

const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    let emailContent;
    if (options.template && templates[options.template]) {
      emailContent = templates[options.template](options.data);
    } else {
      emailContent = {
        subject: options.subject,
        html: options.html || options.text
      };
    }

    const mailOptions = {
      from: `Auto X Sri Lanka <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = sendEmail;