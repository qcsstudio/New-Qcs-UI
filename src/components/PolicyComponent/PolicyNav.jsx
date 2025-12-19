'use client';
import Link from 'next/link';

const policyTypes = [
  { key: 'privacy-policy', label: 'Privacy Policy' },
  { key: 'terms-service', label: 'Terms of Service' },
  { key: 'refund-cancellation', label: 'Refund Policy' },
  { key: 'terms-condition', label: 'Terms and Condition' },
  { key: 'intellectual-property', label: 'Intellectual Property Policy' },
  { key: 'compliance-regulatory', label: 'Compliance & Regulatory Policies' },
  { key: 'liability-disclaimer', label: 'Liability & Disclaimer Policy' },
];

export default function PolicyNav({ active }) {
  return (
    
    <div className="flex gap-4 mb-8 flex-wrap">
      {policyTypes.map(({ key, label }) => (
        <Link
          key={key}
          href={`/${key}`}
          className={`px-4 py-2 rounded ${
            active === key ? 'bg-[#ec6b1a] text-white' : 'bg-[#F1813B] text-white'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
