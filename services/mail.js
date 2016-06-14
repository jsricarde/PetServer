/*
* 2016: Mailime, MIT
* All Rights Reserved.
* @author Juan Sebastian Hormaza
*/
/**
* @module mailing
*/
/**
 * @requires all sources
 */
var Mail = function () {
}
var express = require('express');
var nodemailer = require("nodemailer");
//set config vaules for nodemailer
var transporter = nodemailer.createTransport('smtps://jsricarde%40gmail.com:92021552862A%2Bb@smtp.gmail.com');

Mail.prototype.sendMail = function (toEmail, subject, textBody) {
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'jsricarde@gmail.com', 
        to: toEmail,
        subject: subject,
        text: textBody 
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    http.listen(port, function () {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
    var self = this;
    var options = {};

    Mail.prototype.className = "Mail";

    module.exports.create = function () {
        return new Mail();
    };
}


module.exports._class = Mail;