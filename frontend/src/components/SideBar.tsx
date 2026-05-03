import {Link} from "react-router-dom";
import {CheckSquare, Home, LogOut, X} from "lucide-react";
import {useState} from "react";
import {cn} from "../lib/utils";

import type {User} from "../types/logIn.singUp.type";

type UserInfo = {
  AccessToken: string;
  dataUser: User;
};

type Props = {
  User: UserInfo | null;
};

export default function SideBar({User}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const Userdata = User?.dataUser;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Sidebar header */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <CheckSquare className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">TaskFlow</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <NavItem icon={Home} label="Dashboard" active />
      </nav>

      {/* User profile section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-sm font-medium">{Userdata?.name[0]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {Userdata?.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {User?.dataUser.email}
            </p>
          </div>
          <Link
            to="/login"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

// Navigation item component
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

function NavItem({icon: Icon, label, active}: NavItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
