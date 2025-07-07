import React, { useState, useEffect } from 'react';
import { FiSettings, FiInfo, FiDollarSign, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getSettings, updateSettings, Settings } from '../services/api';

const fields = [
  {
    label: 'Max Conversions per User',
    name: 'conversionLimit',
    type: 'number',
    defaultValue: 100,
    icon: <FiInfo className="text-gray-400 ml-2" title="Maximum conversions allowed per user." />,
    tooltip: 'Maximum conversions allowed per user.'
  },
  {
    label: 'Starter Plan Price',
    name: 'starterPrice',
    type: 'number',
    defaultValue: 10,
    icon: <FiDollarSign className="text-gray-400 ml-2" title="Price for Starter plan in USD." />,
    tooltip: 'Price for Starter plan in USD.'
  },
  {
    label: 'Pro Plan Price',
    name: 'proPrice',
    type: 'number',
    defaultValue: 29,
    icon: <FiDollarSign className="text-gray-400 ml-2" title="Price for Pro plan in USD." />,
    tooltip: 'Price for Pro plan in USD.'
  },
  {
    label: 'Business Plan Price',
    name: 'businessPrice',
    type: 'number',
    defaultValue: 99,
    icon: <FiDollarSign className="text-gray-400 ml-2" title="Price for Business plan in USD." />,
    tooltip: 'Price for Business plan in USD.'
  },
];

const AdminSettings: React.FC = () => {
  const [form, setForm] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      try {
        const settings = await getSettings();
        setForm(settings);
      } catch (err) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    // Only allow numbers, fallback to 0 if empty
    const numValue = value === '' ? 0 : Number(value);
    setForm({ ...form, [name]: isNaN(numValue) ? 0 : numValue });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      // Ensure all values are numbers and not NaN
      const safeForm = {
        conversionLimit: Number(form.conversionLimit) || 0,
        starterPrice: Number(form.starterPrice) || 0,
        proPrice: Number(form.proPrice) || 0,
        businessPrice: Number(form.businessPrice) || 0,
      };
      const updated = await updateSettings(safeForm);
      setForm(updated);
      toast.success('Settings saved!');
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setForm({
      conversionLimit: 100,
      starterPrice: 10,
      proPrice: 29,
      businessPrice: 99,
    });
    toast('Reset to default values', { icon: '🔄' });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] animate-fade-in">
      <form
        onSubmit={handleSave}
        className="w-full max-w-lg bg-white/90 rounded-2xl shadow-lg p-8 space-y-6 backdrop-blur-md border border-gray-100 relative"
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <span className="mr-3">
            <FiSettings className="text-2xl text-indigo-500 transition-transform duration-300 group-hover:rotate-180 hover:rotate-180" />
          </span>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h2>
        </div>
        {loading || !form ? (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-8 w-8 text-indigo-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1 flex items-center">
                    {field.label}
                    <span className="ml-1 cursor-pointer group relative">
                      <FiInfo className="text-gray-400 hover:text-indigo-500" />
                      <span className="absolute left-1/2 -translate-x-1/2 top-7 w-max bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 whitespace-nowrap">
                        {field.tooltip}
                      </span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof Settings] ?? 0}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition outline-none bg-white text-gray-900 pr-10"
                      min={0}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      {field.icon}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition shadow"
              >
                <FiRefreshCw /> Reset to Default
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {saving && (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                Save Settings
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AdminSettings; 