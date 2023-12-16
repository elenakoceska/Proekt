const fs = require("fs");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

// const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});
const config = require("../config");

const mailTemplates = {
  PASSWORD_TEMPLATE: {
    title: "Your password reset link has been generated",
    text: "Reset password",
  },
  WELCOME: {
    title: "Welcome",
    text: "Thank you for registering",
  },
};

const sendMail = async (to, type, data) => {
  console.log("send mail");
  const mg = mailgun.client({
    username: "api",
    key:
      config.getSection("development").api_key ||
      "pubkey-9c17048e93e64b21e9edbd50cbf1003c",
  });

  let title = mailTemplates[type].title;
  let templatePath = `${__dirname}/../../email_templates/${mailTemplates[type].template}`;
  let content = await readTemplate(templatePath);

  for (let i in data) {
    let regex = new RegExp(`\{\{${i}\}\}`, "g");
    content = content.replace(regex, data[i]);
  }

  let options = {
    from: config.getSection("development").sender_email,
    to: to,
    subject: title,
    //html: content,
  };

  console.log("options", options);

  try {
    const res = await mg.messages.create(
      config.getSection("development").domain,
      options
    );
    return res;
  } catch (err) {
    throw err;
  }
};

const readTemplate = async (file) => {
  return new Promise((success, fail) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) return fail(err);
      return success(data);
    });
  });
};

module.exports = {
  sendMail,
};