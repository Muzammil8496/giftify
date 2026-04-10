import React, { useState, useRef } from 'react';
import {
  User, Mail, Phone, Lock, Camera, Save, Eye, EyeOff,
  CheckCircle, AlertCircle, Calendar, Users, ShieldCheck,
  Edit3, X, Gift,
} from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { updateProfileAPI, changePasswordAPI, uploadAvatarAPI } from '../services/api';

// ─── Field wrapper ───────────────────────────────────────────────────────────

const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
      {label}
    </label>
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-all focus-within:border-[#ff5f8f]">
      {Icon && <Icon size={15} className="shrink-0 text-gray-400" />}
      {children}
    </div>
  </div>
);

// ─── Alert ───────────────────────────────────────────────────────────────────

const AlertBanner = ({ type, msg, onClose }) => {
  if (!msg) return null;
  const ok = type === 'success';
  return (
    <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
      ok ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-600'
    }`}>
      {ok ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      <span className="flex-1">{msg}</span>
      <button onClick={onClose} className="opacity-40 hover:opacity-100 transition"><X size={14} /></button>
    </div>
  );
};

// ─── Avatar ──────────────────────────────────────────────────────────────────

const AvatarSection = ({ user, onAvatarChange }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    setUploading(true);
    try {
      const res = await uploadAvatarAPI(file);
      if (res.success) onAvatarChange(res.avatarUrl);
    } catch {
      // preview stays
    } finally {
      setUploading(false);
    }
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="h-24 w-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
          {preview || user?.avatar ? (
            <img src={preview || user.avatar} alt="avatar" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
          )}
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-xl bg-gradient-to-r from-[#ff8b5c] to-[#ff5f8f] text-white shadow-md flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-60"
        >
          {uploading
            ? <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <Camera size={13} />}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-800">{user?.name || '—'}</p>
        <span className="inline-block mt-1 rounded-full bg-gradient-to-r from-[#ff8b5c]/20 to-[#6c5cff]/20 px-2.5 py-0.5 text-xs font-medium text-[#ff5f8f] capitalize">
          {user?.role || 'customer'}
        </span>
      </div>
    </div>
  );
};

// ─── Edit Profile Tab ────────────────────────────────────────────────────────

const EditProfileTab = ({ user, onUserUpdate }) => {
  const { setUser: setAuthUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    dob: user?.dob || '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', msg: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.name.trim()) { setAlert({ type: 'error', msg: 'Name is required' }); return; }
    setLoading(true);
    setAlert({ type: '', msg: '' });
    try {
      const res = await updateProfileAPI(form);
      if (res.success) {
        onUserUpdate(res.user);
        setAuthUser(res.user);
        setAlert({ type: 'success', msg: 'Profile updated successfully!' });
      } else {
        setAlert({ type: 'error', msg: res.message || 'Update failed' });
      }
    } catch {
      setAlert({ type: 'error', msg: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <AlertBanner type={alert.type} msg={alert.msg} onClose={() => setAlert({ type: '', msg: '' })} />

      {/* Read-only */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Account Info (Read Only)</p>
        <Field label="Email Address" icon={Mail}>
          <span className="flex-1 text-sm text-gray-500 select-none">{user?.email || '—'}</span>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Role" icon={ShieldCheck}>
            <span className="text-sm text-gray-500 capitalize">{user?.role || 'customer'}</span>
          </Field>
          <Field label="Member Since" icon={Calendar}>
            <span className="text-sm text-gray-500">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : '—'}
            </span>
          </Field>
        </div>
      </div>

      {/* Editable */}
      <Field label="Full Name *" icon={User}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Your full name"
          className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400" />
      </Field>

      <Field label="Phone Number" icon={Phone}>
        <input name="phone" value={form.phone} onChange={onChange} placeholder="+92 300 1234567"
          className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Gender" icon={Users}>
          <select name="gender" value={form.gender} onChange={onChange}
            className="flex-1 bg-transparent text-sm text-gray-800 outline-none">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not">Prefer not to say</option>
          </select>
        </Field>
        <Field label="Date of Birth" icon={Calendar}>
          <input type="date" name="dob" value={form.dob} onChange={onChange}
            className="flex-1 bg-transparent text-sm text-gray-800 outline-none" />
        </Field>
      </div>

      <button onClick={handleSave} disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] py-3 text-sm font-semibold text-white shadow-md hover:scale-[1.02] hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed">
        {loading
          ? <><div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
          : <><Save size={15} /> Save Changes</>}
      </button>
    </div>
  );
};

// ─── Change Password Tab ─────────────────────────────────────────────────────

const ChangePasswordTab = () => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', msg: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const strength = form.newPassword ? {
    hasCapital: /[A-Z]/.test(form.newPassword),
    hasNumber: /[0-9]/.test(form.newPassword),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword),
    hasMinLength: form.newPassword.length >= 8,
  } : null;

  const isStrong = strength && Object.values(strength).every(Boolean);

  const handleChange = async () => {
    if (!form.currentPassword) return setAlert({ type: 'error', msg: 'Current password is required' });
    if (!isStrong) return setAlert({ type: 'error', msg: 'New password does not meet all requirements' });
    if (form.newPassword !== form.confirmPassword) return setAlert({ type: 'error', msg: 'Passwords do not match' });
    setLoading(true);
    setAlert({ type: '', msg: '' });
    try {
      const res = await changePasswordAPI(form.currentPassword, form.newPassword);
      if (res.success) {
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setAlert({ type: 'success', msg: 'Password changed successfully!' });
      } else {
        setAlert({ type: 'error', msg: res.message || 'Failed to change password' });
      }
    } catch {
      setAlert({ type: 'error', msg: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const PwField = ({ name, label, showKey }) => (
    <Field label={label} icon={Lock}>
      <input type={show[showKey] ? 'text' : 'password'} name={name} value={form[name]}
        onChange={onChange} placeholder="••••••••"
        className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400" />
      <button type="button" onClick={() => setShow((s) => ({ ...s, [showKey]: !s[showKey] }))}
        className="text-gray-400 hover:text-gray-600 transition">
        {show[showKey] ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </Field>
  );

  return (
    <div className="space-y-5">
      <AlertBanner type={alert.type} msg={alert.msg} onClose={() => setAlert({ type: '', msg: '' })} />

      <PwField name="currentPassword" label="Current Password" showKey="current" />
      <PwField name="newPassword" label="New Password" showKey="new" />

      {strength && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-1.5">
          {[
            ['hasMinLength', 'Minimum 8 characters'],
            ['hasCapital', 'Capital letter (A-Z)'],
            ['hasNumber', 'Number (0-9)'],
            ['hasSpecial', 'Special character (!@#$...)'],
          ].map(([key, label]) => (
            <p key={key} className={`text-xs flex items-center gap-1.5 ${strength[key] ? 'text-green-600' : 'text-gray-400'}`}>
              <CheckCircle size={11} className={strength[key] ? 'opacity-100' : 'opacity-30'} />
              {label}
            </p>
          ))}
        </div>
      )}

      <PwField name="confirmPassword" label="Confirm New Password" showKey="confirm" />

      {form.confirmPassword && form.newPassword === form.confirmPassword && (
        <p className="text-xs text-green-600 flex items-center gap-1">
          <CheckCircle size={11} /> Passwords match
        </p>
      )}

      <button onClick={handleChange} disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] py-3 text-sm font-semibold text-white shadow-md hover:scale-[1.02] hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed">
        {loading
          ? <><div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Updating...</>
          : <><ShieldCheck size={15} /> Update Password</>}
      </button>
    </div>
  );
};

// ─── Profile Page ─────────────────────────────────────────────────────────────

const TABS = [
  { id: 'profile', label: 'Edit Profile', icon: Edit3 },
  { id: 'password', label: 'Change Password', icon: Lock },
];

const Profile = () => {
  const { user: authUser, setUser: setAuthUser } = useAuth();
  const [localUser, setLocalUser] = useState(authUser);
  const [activeTab, setActiveTab] = useState('profile');

  const handleAvatarChange = (url) => {
    const updated = { ...localUser, avatar: url };
    setLocalUser(updated);
    setAuthUser(updated);
  };

  const handleUserUpdate = (updatedUser) => {
    setLocalUser(updatedUser);
    setAuthUser(updatedUser);
  };

  if (!authUser) {
    return (
      <>
        <TopBar />
        <Navbar />
        <div className="min-h-[60vh] bg-[#fff7f5] flex items-center justify-center">
          <div className="text-center">
            <Gift size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Please login to view your profile</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />

      <div className="min-h-screen bg-[#fff7f5] py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold text-gray-950">My Account</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your profile and account settings</p>
          </div>

          {/* Cover + Avatar card */}
          <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff]" />
            <div className="px-6 pb-6 -mt-12">
              <AvatarSection user={localUser} onAvatarChange={handleAvatarChange} />
            </div>
          </div>

          {/* Tabs card */}
          <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                      active ? 'border-b-2 border-[#ff5f8f] text-[#ff5f8f]' : 'text-gray-400 hover:text-gray-700'
                    }`}>
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="p-6">
              {activeTab === 'profile' && <EditProfileTab user={localUser} onUserUpdate={handleUserUpdate} />}
              {activeTab === 'password' && <ChangePasswordTab />}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
