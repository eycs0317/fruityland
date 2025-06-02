// metadata
export const metadata = {
  title: 'Create User',
};

export default async function MainPage() {
  const user = await fetch(process.env.URL + '/api/createUser')
    .then(res => res.json())
    .then(data => {
      console.log('Data: ', data);
      return data;
    })
    .catch(err => console.error('Error: ', err));

  return (
    <main role="main">
      <h1>User Created</h1>
      <p>{user.name} ({user.id})</p>
    </main>
  );
}
