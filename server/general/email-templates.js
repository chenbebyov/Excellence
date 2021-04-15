getRegisteredMessage = (userName) => {
    console.log('ssss')
    return `
    <!DOCTYPE html>
    <html>
    <title>W3.CSS Template</title>
    <meta charset="UTF-8">
        <style>
            @import url(https://fonts.googleapis.com/earlyaccess/alefhebrew.css);
            body{
                font-family: "Alef Hebrew", sans-serif;
                direction:rtl;
                width: 95%; 
                max-width: 600px; 
                border-top:solid 10px #eccb62; 
                border-bottom:solid 10px #eccb62; 
                margin: 0 auto; 
                padding: 20px 0px;
                text-align: right;
            }
            header {
                margin-bottom: 20px; 
                text-align: right;
            }

            #email-body {
                background: #ffffff; 
                padding: 20px;
                line-height: 1.5;
            }
            img {
                width: 100%; 
                max-width: 600px;
            }
            .bold-text {
                font-weight: bold;
            }

        </style>
        <body>
                <header>
                    <a href="https://localhost:3000/" target="_blank" alt="Excellence" height="43" border="0" /></a>
                </header>
                <div id="email-body">
                    <div  class="bold-text">שלום ${userName},</div>
                    <div  class="bold-text">ברוכים הבאים ל Excellence- בית הספר לאנגלית</div>
                    <div>&nbsp;</div>
                    <div>קיבלנו את בקשת ההצטרפות שלך,</div>
                    <div>אנו ניצור עמך קשר בהקדם האפשרי</div>
                    <div style="padding-top: 15px; padding-right: 0px; padding-bottom: 15px;"> 
                        <img src="https://lessons-files.s3.eu-west-3.amazonaws.com/logo.jpg" />
                    </div>
                    <div>תודה שנרשמת ל Excellence</div>
                    <div>בברכה,</div>
                    <div class="bold-text">צוות Excellence</div>
                </div>
        </body>
    </html>
    `
}

module.exports = {
    getRegisteredMessage
}