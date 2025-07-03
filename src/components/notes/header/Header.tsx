import LogoutBtn from "./LogoutBtn";

export default function Header({ email, setSidebarOpen }: { email: string | null, setSidebarOpen: (arg: boolean) => void}) {
  return (
    <header className="bg-green-700 text-white p-4 flex justify-between items-center shadow">
      <button
        className="text-2xl font-bold hover:text-gray-200"
        onClick={() => setSidebarOpen(true)}
      >
        &#9776;
      </button>
      <div className="flex items-center space-x-4">
        <span>{email}</span>
        <LogoutBtn />
      </div>
    </header>
  );
}
