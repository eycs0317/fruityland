export default async function Message({ messageCode }: { messageCode: string }) {

  if (messageCode) {
    let message = '';

    switch (messageCode) {
      // Error
      case 'E0001': message = 'User Id and Password required';
        break;
      case 'E0002': message = 'Login credential is invalid.';
        break;
      case 'E0003': message = 'Error logging in.  Please try again later.';
        break;
      case 'E0004': message = 'Invalid coupon code.  Please check and try again.';
        break;
      case 'E0005': message = 'Error processing.  Please try again later.';
        break;
      case 'E0006': message = 'Session timeout due to inactivity.';
        break;
      case 'E0007': message = 'Unable to check in.  Please try again later.';
        break;

      // Info
      case 'I0001': message = 'Data existed.  No new data generated.';
        break;

      // Success
      case 'S0001': message = 'Login successful.';
        break;
      case 'S0002': message = 'Logout successful.';
        break;
      case 'S0003': message = 'Data successfully generated.';
        break;
      case 'S0004': message = 'Reservation successful cancelled.';
        break;
      case 'S0005': message = 'Checked in successful.';
        break;
    }

    switch(messageCode.charAt(0)) {
      case 'E':
        return (
          <section className="bg-alert-100 px-4 py-2 border border-alert-600 mb-4">
            <p>{message}</p>
          </section>
        );
      case 'I':
        return (
          <section className="bg-info-100 px-4 py-2 border border-info-600 mb-4">
            <p>{message}</p>
          </section>
        );
      case 'S':
        return (
          <section className="bg-success-100 px-4 py-2 border border-success-600 mb-4">
            <p>{message}</p>
          </section>
        );
    }
  }
}
