import nodemailer from 'nodemailer';

// Create a type for order details
interface OrderDetails {
    email: string;
    fullName: string;
    orderItems: Array<{
        service?: string;
        shop?: string;
        quantity: number;
        appointmentDate?: string;
        appointmentTime?: string;
    }>;
    totalAmount?: number;
}

// Create transporter using Gmail (App Password recommended)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send order confirmation email
export async function sendOrderConfirmationEmail(order: OrderDetails) {
    try {
        // Generate HTML for order items
        const orderItemsHtml = order.orderItems
            .map(
                (item) => `
      <tr>
        <td>${item.service || item.shop}</td>
        <td>${item.quantity}</td>
        <td>${item.appointmentDate || 'N/A'}</td>
        <td>${item.appointmentTime || 'N/A'}</td>
      </tr>
    `
            )
            .join('');

        // Email configuration
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: order.email,
            subject: 'Order Confirmation',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Order Confirmation</h1>
          <p>Dear ${order.fullName},</p>
          <p>Thank you for your order. Here are the details:</p>
          
          <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHtml}
            </tbody>
          </table>
          
          <p>We appreciate your business!</p>
          <p>Best regards,<br>Your Company Name</p>
        </div>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        return false;
    }
}
