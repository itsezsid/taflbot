import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';

const sendMessage = async(message, sendList) => {
      await axios.post('/api/sendmessage', {
            message: message,
            sendList: sendList
      })
      .catch(err => console.error(err));
}

const Home = ({ contactList }) => {
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
                        <div className="flex bg-gray-100 w-full min-h-screen justify-center items-center py-10">
                              <div className="flex flex-col rounded-md bg-white w-3/4 lg:w-1/2 justify-center space-y-10 p-10">
                                    <div className="flex flex-col space-y-1">
                                          <span className="text-sm font-bold tracking-widest">
                                                MESSAGE
                                          </span>

                                          <textarea
                                                name="message"
                                                placeholder="Enter the message"
                                                value={message}
                                                onChange={e => updateMessage(e.target.value)}
                                                className="w-full lg:w-3/4 h-60 border rounded-sm p-5 text-sm"
                                          />

                                          <span style={{fontSize: "0.65rem", color: "#333"}}>
                                                You can use {'{name}'} to replace position with contact's name
                                          </span>
                                    </div>

                                    <div className="flex flex-col space-y-1">
                                          <span className="text-sm font-bold tracking-widest">
                                                SELECT CONTACTS
                                          </span>

                                          {
                                                contactList.map((contact, index) => (
                                                      <p key={index} className="flex items-center">
                                                            <input 
                                                                  type="checkbox"
                                                                  name={contact.firstName}
                                                                  value={contact.id}
                                                                  onChange={ (e) => {
                                                                        e.target.checked ? 
                                                                              updateContacts(prev => [...prev, [e.target.value, e.target.name]]) : 
                                                                              updateContacts(prev => [...prev].splice([...prev].indexOf([e.target.value, e.target.name])))
                                                                  }}
                                                            />
                                                            &nbsp;
                                                            <span className="text-sm">
                                                                  {contact.firstName + ' ' + contact.lastName}
                                                            </span>
                                                      </p>
                                                ))
                                          }
                                    </div>

                                    <div className="flex flex-row justify-end text-sm space-x-5">
                                          <button
                                                className="underline"
                                                onClick={() => {}}
                                          >
                                                Save as preset
                                          </button>
                                          <button
                                                className="bg-black rounded-md text-white no-underline p-3"
                                                onClick={() => sendMessage(message, contacts)}
                                          >
                                                Send Message
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </main>

                  <footer className="flex bg-gray-100 justify-center items-center py-5 text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} TAMS Infotech Pvt. Ltd. All Rights Reserved.
                  </footer>
            </>
      );
}

export const getServerSideProps = async() => {
      const contactList = await axios.post('https://api.flock.co/v1/roster.listContacts', {
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