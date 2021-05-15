import Head from 'next/head';
import { useState } from 'react';
import { instance } from '..';

export default () => {
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
            token: process.env.TOKEN
      })
      .then(res => res.data);

      return {
            props: {
                  contactList
            }
      }
}