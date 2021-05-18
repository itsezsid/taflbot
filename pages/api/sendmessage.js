import axios from 'axios';

const handler = async(req, res) => {
      const { message, sendList } = req.body;

      for (const [id, name] of sendList) {
            await axios.post('https://api.flock.co/v1/chat.sendMessage', {
                  token: process.env.TOKEN,
                  to: id,
                  text: 'Hey there! You have a new message.',
                  attachments: [{
                        title: 'Message from Upesh Patel',
                        description: '',
                        views: {
                              flockml: '<flockml>' + message.replace('\r\n', '<br />').replace('{name}', name) + '</flockml>'
                        }
                  }]
            })
            .catch(err => console.error(err));
      }

      res.status(200).json({});
}

export default handler;