import { getPasswordStrength } from './../utils';

type Props = {
  password: string;
};

const strengthMap = [
  { label: 'Very weak password', color: '#dc2626' },
  { label: 'Weak password', color: '#f97316' },
  { label: 'Medium password', color: '#eab308' },
  { label: 'Strong password', color: '#22c55e' },
  { label: 'Very strong password', color: '#16a34a' },
];

export function PasswordStrength({ password }: Props) {
  const score = getPasswordStrength(password);
  const strength = strengthMap[Math.max(score - 1, 0)];
  if(password.length === 0){
    return null;
  }
  return (
    <div className='relative z-1 -top-[5px]'>
      <div
        className='h-[6px] w-full bg-gray-150 rounded-sm overflow-hidden'
      >
        <div
          className='h-full'
          style={{
            width: `${(score / 5) * 100}%`,
            backgroundColor: strength.color,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <p
        className='mt-[4px] text-xs text-left sm:text-center'
        style={{
          color: strength.color,
        }}
      >
        {strength.label}
      </p>
    </div>
  );
}
