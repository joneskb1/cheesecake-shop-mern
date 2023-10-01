import { useEffect, useState } from 'react';
import styles from './MyAccountForm.module.css';
import {
  useUpdatePasswordMutation,
  useUpdateAccountMutation,
  useGetUserQuery,
} from '../../slices/userApiSlice.js';
import { toast } from 'react-toastify';

export default function MyAccountForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordFormError, setPasswordFormError] = useState(null);
  const [accountFormError, setAccountFormError] = useState(null);

  const [updatePassword] = useUpdatePasswordMutation();
  const [updateAccount] = useUpdateAccountMutation();

  const { data } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      console.log(data);

      setName(data.data.user.name);
      setEmail(data.data.user.email);
    }
  }, [data]);

  async function handlePasswordUpdate(e) {
    e.preventDefault();
    try {
      const res = await updatePassword({
        oldPassword,
        newPassword,
        newPasswordConfirm,
      }).unwrap();

      if (res.status === 'success') {
        setPasswordFormError(null);
        toast.success('Password Updated!', {
          hideProgressBar: false,
          progress: undefined,
        });
        setOldPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
      } else {
        setPasswordFormError(res.message);
      }
    } catch (error) {
      setPasswordFormError(error.data.message);
      toast.error(error.data.message, {
        hideProgressBar: false,
        progress: undefined,
      });
    }
  }

  async function handleAccountUpdate(e) {
    e.preventDefault();

    try {
      const res = await updateAccount({
        name,
        email,
      }).unwrap();

      if (res.status === 'success') {
        toast.success('Account updated!');
        setAccountFormError(null);
      } else {
        setAccountFormError(res.message);
      }
    } catch (error) {
      setAccountFormError(error.data.message);
      toast.error(error.data.message, {
        hideProgressBar: false,
        progress: undefined,
      });
    }
  }

  return (
    <div className={styles.myAccountForms}>
      <h2 className={styles.formHeader}>My Info</h2>
      <div className={styles.formsWrap}>
        <form className={styles.accountForm} onSubmit={handleAccountUpdate}>
          <label htmlFor='name' className={styles.myAccountInputLabel}>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            className={styles.myAccountTextInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='email' className={styles.myAccountInputLabel}>
            Email
          </label>
          <input
            type='text'
            name='email'
            id='email'
            className={styles.myAccountTextInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {accountFormError && (
            <p className={styles.error}>{accountFormError}</p>
          )}
          <button className={styles.myAccountFormBtn}>Update Account</button>
        </form>
        <form onSubmit={handlePasswordUpdate}>
          <label htmlFor='old-password' className={styles.myAccountInputLabel}>
            Current Password
          </label>
          <input
            type='password'
            name='old-password'
            id='old-password'
            className={styles.myAccountTextInput}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label htmlFor='new-password' className={styles.myAccountInputLabel}>
            Password
          </label>
          <input
            type='password'
            name='new-password'
            id='new-password'
            className={styles.myAccountTextInput}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label
            htmlFor='new-password-confirm'
            className={styles.myAccountInputLabel}
          >
            Confirm Password
          </label>
          <input
            type='password'
            name='new-password-confirm'
            id='new-password-confirm'
            className={styles.myAccountTextInput}
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
          {setPasswordFormError && (
            <p className={styles.error}>{passwordFormError}</p>
          )}
          <button className={styles.myAccountFormBtn}>Reset Password</button>
        </form>
      </div>
    </div>
  );
}
