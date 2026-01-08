import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const OPTIONS = [
  { id: 'dashboard', label: 'Dashboard Settings' },
  { id: 'products', label: 'Product Settings' },
  { id: 'billing', label: 'Billing Settings' },
  { id: 'customers', label: 'Customer Settings' },
  { id: 'reports', label: 'Reports Settings' },
];

const Settings: React.FC = () => {
  const [active, setActive] = useState<string>('dashboard');

  return (
    <div className="p-4">
      <h2 className="mb-3">Settings</h2>
      <div className="d-flex gap-4">
        <aside style={{ minWidth: 220 }}>
          <div className="list-group">
            {OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setActive(o.id)}
                className={`list-group-item list-group-item-action ${active === o.id ? 'active' : ''}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-grow-1">
          {active === 'dashboard' && (
            <section>
              <h4>Dashboard Settings</h4>
              <p>Configure dashboard widgets, default date range, and layout preferences.</p>
            </section>
          )}

          {active === 'products' && (
            <section>
              <h4>Product Settings</h4>
              <p>Configure product SKU rules, default tax, and inventory thresholds.</p>
            </section>
          )}

          {active === 'billing' && (
            <section>
              <h4>Billing Settings</h4>
              <p>Configure invoice defaults, payment terms, and receipt templates.</p>
            </section>
          )}

          {active === 'customers' && (
            <section>
              <h4>Customer Settings</h4>
              <p>Configure customer fields, default currency, and import/export options.</p>
            </section>
          )}

          {active === 'reports' && (
            <section>
              <h4>Reports Settings</h4>
              <p>Configure default report ranges, export formats, and scheduled reports.</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
