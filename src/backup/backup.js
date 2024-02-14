const mysqldump = require('mysqldump')
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config()

// commande node src/backup/backup.js

cron.schedule('*/5 * * * * *', async () => {
  try {
    const now = new Date();
    // Effectuer la sauvegarde
    await mysqldump({
      connection: {
        host: process.env.DB_HOST,
        port: 3307,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      dumpToFile: `src/backup/savesql/backup_${now.toLocaleString().replace(/[/ :]/g, '_')}.sql`,
    });

    // Configurer le transporteur de messagerie
    const transporter = nodemailer.createTransport({
      service: 'protonmail',
      auth: {
        user: 'tlutlu53@protonmail.com',
        pass: process.env.MAIL_PASS
      }
    });

    // Lit le fichier de sauvegarde
    const backupFile = fs.readFileSync(`src/backup/savesql/backup_${now.toLocaleString().replace(/[/ :]/g, '_')}.sql`);

    // Configurer l'e-mail à envoyer
    const mailOptions = {
      from: 'tlutlu53@protonmail.com',
      to: 'tlutlu53@protonmail.com',
      subject: 'Sauvegarde de la base de données',
      text: 'Veuillez trouver ci-joint la sauvegarde de la base de données.',
      attachments: [{
        filename: `backup_${now.toLocaleString().replace(/[/ :]/g, '_')}.sql`,
        content: backupFile
      }]
    };

    // Envoyer l'e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé: ' + info.response);
  } catch (error) {
    console.error(error);
  }
});




