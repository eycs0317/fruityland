// metadata
export const metadata = {
  title: 'List User',
};

export default async function MainPage() {
  const users = await fetch(process.env.URL + '/api/listUser')
    .then(res => res.json())
    .then(data => {
      console.log('Data: ', data);
      return data;
    })
    .catch(err => console.error('Error: ', err));

  return (
    <main role="main">
      <h1>User List</h1>
      <ul>
        {users.map((user: {id:string; name:string;}) => (
          <li key={user.id}>{user.name} ({user.id}) (<a href={'/deleteUser?id=' + user.id}>Delete</a>)</li>
        ))}
      </ul>
    </main>
  );
}

