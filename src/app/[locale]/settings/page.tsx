"use client";

import Button from "@/components/Button";
import { changeUserPassword } from "@/firebase/firebaseService";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setLoading(true);
    const result = await changeUserPassword(newPassword);
    setMessage(result.success ? `${result.message}` : `${result.message}`);
    setLoading(false);
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        <div className="col-md-3 bg-white vh-100 px-0 border-end">
          {/* Mobile toggle button */}
          <div className="d-flex d-md-none justify-content-between align-items-center px-3 py-3 border-bottom">
            <div className="d-flex align-items-center gap-2">
              <Image
                src="/pp.jpg"
                alt="profile"
                className="rounded-circle"
                width={40}
                height={40}
              />
              <strong>Peterson Kennady</strong>
            </div>
            <button
              className="btn btn-outline-primary"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {/* Sidebar content */}
          <div
            className={`${
              menuOpen ? "d-block" : "d-none"
            } d-md-block bg-white p-3`}
          >
            <div className="text-center mb-4 d-none d-md-block">
              <Image
                src="/pp.jpg"
                alt="profile"
                className="rounded-circle mb-3"
                width={100}
                height={100}
              />
              <h6 className="fw-semibold mb-0">Peterson Kennady</h6>
              <p className="text-muted small">petersonkenn@demo.com</p>
            </div>

            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link fs-5 text-dark d-flex align-items-center gap-2" href="#">
                  👤 User Profile
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link fs-5 text-dark d-flex align-items-center gap-2" href="#">
                  📣 Referrals
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link fs-5 text-dark d-flex align-items-center gap-2" href="#">
                  🔑 API Keys
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link fs-5 text-dark d-flex align-items-center gap-2" href="#">
                  🕓 Login History
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link active bg-primary text-white rounded-pill fs-5 d-flex align-items-center gap-2" href="#">
                  🔒 Change Password
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-5 d-flex flex-column align-items-start justify-content-center bg-white">
          <h3 className="mb-4 fs-1 fw-bold">Change Password</h3>
          <form onSubmit={handleChangePassword} className="w-75">
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="btn-primary text-white fs-4" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
            {message && (
              <div className="alert alert-info mt-3 w-100">{message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
