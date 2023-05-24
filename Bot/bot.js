const qrcode = require('qrcode-terminal');
const {Client, LocalAuth,MessageMedia} = require('whatsapp-web.js');
const quotable =require('quotable');


const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('QR Code received, scan it!');
});

client.on('authenticated', session => {
  console.log('Client authenticated');
  // Save the session object for subsequent logins
  // This step is crucial to avoid scanning the QR code every time you run the code
  // You can save the session object to a file or database for future use
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', message=>{
  console.log(message.body);
})
client.on('message',message=>{
  if(message.body){
    message.reply('Hello Welcome to Atriexz Data Shop\n '+
    'We offer services as Follows:\n\n'+
    '1.Data Bundles(Bingwa Sokoni)\n'+
    '2.Buy Cheap Airtime @90%\n'+
    '3.Convert Airtime To cash @80%\n'+
    '4.Give Us your Feedback\n'+
    '5.Report a Problem/Service Not Delivered\n'+
    '6.Todays Quote! ');

  }
})

client.on('message',async(message)=>{
  var insideMessage = message.body.toLowerCase;
  if(insideMessage==='quote'){
    const aNewQuote = await quotable.getRandomQuote();

    message.reply( aNewQuote.content +" "+"_"+aNewQuote.author);
  }
});

client.initialize();
