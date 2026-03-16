import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState('Administrator');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign in with:', { fullName, selectedRole });
    alert(`Xin chào ${fullName}! Bạn đã đăng nhập với vai trò ${selectedRole}.`);
    navigate('/');
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🍴</span>
          </div>
          <h2>Restaurant Manager</h2>
          <p>Sign in to access your dashboard</p>
        </div>

        <form className={styles.authForm} onSubmit={handleSignIn}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Select Role</label>
            <div className={styles.roleSelection}>
              <div className={styles.roleOption}>
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="Administrator"
                  checked={selectedRole === 'Administrator'}
                  onChange={() => setSelectedRole('Administrator')}
                />
                <label htmlFor="admin" className={styles.roleLabel}>
                  <div className={styles.roleInfo}>
                    <strong>Administrator</strong>
                    <span>Complete system access and management</span>
                  </div>
                  <span className={`${styles.roleBadge} ${styles.fullAccess}`}>Full Access</span>
                </label>
              </div>

              <div className={styles.roleOption}>
                <input
                  type="radio"
                  id="staff"
                  name="role"
                  value="Staff Member"
                  checked={selectedRole === 'Staff Member'}
                  onChange={() => setSelectedRole('Staff Member')}
                />
                <label htmlFor="staff" className={styles.roleLabel}>
                  <div className={styles.roleInfo}>
                    <strong>Staff Member</strong>
                    <span>Dashboard, reservations, menu, and staff scheduling</span>
                  </div>
                  <span className={`${styles.roleBadge} ${styles.limitedAccess}`}>Limited Access</span>
                </label>
              </div>

              <div className={styles.roleOption}>
                <input
                  type="radio"
                  id="user"
                  name="role"
                  value="User"
                  checked={selectedRole === 'User'}
                  onChange={() => setSelectedRole('User')}
                />
                <label htmlFor="user" className={styles.roleLabel}>
                  <div className={styles.roleInfo}>
                    <strong>User</strong>
                    <span>View dashboard and menu only</span>
                  </div>
                  <span className={`${styles.roleBadge} ${styles.readOnly}`}>Read Only</span>
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>Sign In</button>
        </form>

        <div className={styles.authFooter}>
          <p>Demo mode - No password required</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
