// import { NextResponse } from 'next/server'
// import nodemailer from 'nodemailer'

// // Email configuration utility
// const createTransporter = () => {
//   return nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     },
//     debug: true,
//     logger: true
//   })
// }

// export async function GET() {
//   console.log('Starting email test...')
//   const transporter = createTransporter()

//   try {
//     // Test connection
//     await transporter.verify()
    
//     // Send test email
//     const info = await transporter.sendMail({
//       from: `"DONDRA-LANKA Support" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: 'Test Email - GET Method',
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2 style="color: #00957a;">GET Test Successful</h2>
//           <p>Email system is working correctly via GET method.</p>
//           <p>Time: ${new Date().toLocaleString()}</p>
//         </div>
//       `
//     })

//     return NextResponse.json({ success: true, messageId: info.messageId })
//   } catch (error) {
//     console.error('Email test failed:', error)
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }

// export async function POST(request: Request) {
//   const transporter = createTransporter()
//   const { email, subject, message } = await request.json()

//   try {
//     const info = await transporter.sendMail({
//       from: `"DONDRA-LANKA Support" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: subject || 'Test Email - POST Method',
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2 style="color: #00957a;">${subject || 'POST Test Successful'}</h2>
//           <p>${message || 'Email system is working correctly via POST method.'}</p>
//           <p>Time: ${new Date().toLocaleString()}</p>
//         </div>
//       `
//     })

//     return NextResponse.json({ success: true, messageId: info.messageId })
//   } catch (error) {
//     console.error('Email test failed:', error)
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }