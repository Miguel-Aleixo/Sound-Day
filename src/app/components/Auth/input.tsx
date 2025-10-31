import { ReactNode } from "react"

type InputProps = {
  type: string
  icon?: ReactNode
  placeholder?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  color: string
}

export function Input({ type, placeholder, icon, value, onChange, color }: InputProps) {
  return (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full ${color} border rounded-lg py-3 pl-10 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all duration-300`}
            required
          />
        </div>
  )
}
