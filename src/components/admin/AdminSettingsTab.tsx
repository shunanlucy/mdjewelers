import React, { useEffect, useState } from "react";
import { Save, Settings } from "lucide-react";
import { AdminSettings } from "../../types/admin";

interface AdminSettingsTabProps {
  settings: AdminSettings;
  onSaveSettings: (settings: AdminSettings) => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [editedSettings, setEditedSettings] = useState<AdminSettings>(settings);

  useEffect(() => {
    setEditedSettings(settings);
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(editedSettings);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="border-b border-[rgba(212,175,55,0.2)] pb-4">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
          <Settings className="text-amber-400" size={20} />
          Helpline & Business Settings
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Yahan se aap website par dikhne wala phone number, WhatsApp number aur security PIN badal sakte hain.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)]">
            Customer Contact Channels
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Primary Helpline Phone Number (Calls)
            </label>
            <input
              type="text"
              value={editedSettings.phone}
              onChange={(e) => setEditedSettings({ ...editedSettings, phone: e.target.value })}
              className="form-input text-xs sm:text-sm font-mono"
              placeholder="+91 81011 21813"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Website ke header aur call buttons par ye number redirect hoga.
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              WhatsApp Number (without +)
            </label>
            <input
              type="text"
              value={editedSettings.whatsapp}
              onChange={(e) => setEditedSettings({ ...editedSettings, whatsapp: e.target.value })}
              className="form-input text-xs sm:text-sm font-mono"
              placeholder="918101121813"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              WhatsApp Slip aur chat triggers is number par open honge.
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)]">
            Service Hub Locations (Kalyani, Bidhannagar & Newtown)
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Kalyani & Bidhannagar Hub Details
            </label>
            <input
              type="text"
              value={editedSettings.bowbazarAddress}
              onChange={(e) =>
                setEditedSettings({ ...editedSettings, bowbazarAddress: e.target.value })
              }
              className="form-input text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Newtown Hub Details
            </label>
            <input
              type="text"
              value={editedSettings.gariahatAddress}
              onChange={(e) =>
                setEditedSettings({ ...editedSettings, gariahatAddress: e.target.value })
              }
              className="form-input text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#121218] p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)]">
            Admin Panel Security
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Admin Portal PIN (4 to 6 Digits)
            </label>
            <input
              type="text"
              maxLength={6}
              value={editedSettings.adminPin}
              onChange={(e) => setEditedSettings({ ...editedSettings, adminPin: e.target.value })}
              className="form-input text-xs sm:text-sm font-mono tracking-widest w-36"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Is PIN se aap admin dashboard login karenge.
            </span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-sm font-bold shadow-gold rounded-xl cursor-pointer"
          >
            <Save size={16} />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
