// metadata
export const metadata = {
  title: 'Delete User',
};

interface Props {
  searchParams: Promise<{ id: string }>;
}

export default async function MainPage(props: Props) {
  const dataGET = await props.searchParams;

  const user = await fetch(process.env.URL + '/api/deleteUser?id=' + dataGET.id)
    .then(res => res.json())
    .then(data => {
      console.log('Data: ', data);
      return data;
    })
    .catch(err => console.error('Error: ', err));

  return (
    <main role="main">
      <h1>User Deleted</h1>
      <p>{user.name} deleted!</p>
    </main>
  );
}

