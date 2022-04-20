import React, { useState } from 'react';
import useUser from 'lib/useUser';
import Layout from 'components/Layout';
import Form from 'components/Form';
import fetchJson, { FetchError } from 'lib/fetchJson';

export default function Signup() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const body = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    try {
      mutateUser(
        await fetchJson('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error('An unexpected error happened:', error);
      }
    }
  };

  return (
    <Layout>
      <div className='login'>
        <Form errorMessage={errorMsg} isLogin={false} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
}
