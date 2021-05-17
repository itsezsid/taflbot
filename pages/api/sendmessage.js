import axios from 'axios';

const handler = (req, res) => {
      const { message, sendList } = req.body;

      for (const contact in sendList) {
            await axios.post('https://api.flock.co/v1/chat.sendMessage', {
                  token: process.env.BOT_TOKEN,
                  to: contact[0],
                  text: 'Hey there! You have a new message.',
                  attachments: [{
                        title: 'Message from Upesh Patel',
                        description: '',
                        views: {
                              flockml: '<flockml>' + message.replace('\r\n', '<br />').replace('{name}', contact[1]) + '</flockml>'
                        }
                  }]
            })
            .then(res => console.log(res))
            .catch(err => console.error(err));
      }
}

export default handler;