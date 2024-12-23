import React from 'react'

type Props = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Models: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        className="p-2 rounded bg-slate-600 text-white border-none focus:outline-none cursor-pointer"
      >
        <option value="gpt-4o">GPT-4</option>
        <option value="llama-3.3-70b">Llama 3.3 70B</option>
        <option value="llama-3.2-90b">Llama 3.2 90B</option>
      </select>
    </div>
  );
};

export default Models;
