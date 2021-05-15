import Head from 'next/head';
import { useState } from 'react';
import { instance } from '..';

const sendMessage = async(message, sendList) => {
      for (const contact in sendList) {
            await instance.post('chat.sendMessage', {
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
            });
      }
}

const Home = () => {
      const [ message, updateMessage ] = useState('');
      const [ contacts, updateContacts ] = useState([]);

      return (
            <>
                  <Head>
                        <title> TAMS Flock Bot - v1.0.0 </title> 
                        <meta name="description" content="Flock Bot for sending messages. Coded for TAMS Infotech." />
                        <link rel="icon" href="/favicon.ico" />
                  </Head>

                  <main>
                        { /* TODO: Main body content here */ }
                  </main>

                  <footer>
                        { /* TODO: Footer with company branding */ }
                  </footer>
            </>
      );
}

export const getServerSideProps = async() => {
      const contactList = await instance.post('roster.listContacts', {
            token: process.env.USER_TOKEN
      })
      .then(res => res.data);

      return {
            props: {
                  contactList
            }
      }
}

export default Home;