import {useState} from "react";
import {Input} from "../components/ui/Input";
import {Button} from "../components/ui/Button";
import {TodoItem} from "../components/ui/TodoItem";
import {Plus, Menu, ListTodo} from "lucide-react";

import {useDashboardPage} from "../hooks/useDashboardPage";
import SideBar from "../components/sideBar";

// Sample todo data for UI demonstration
const sampleTodos = [
  {id: "1", title: "Review project requirements", completed: true},
  {id: "2", title: "Design dashboard wireframes", completed: true},
  {id: "3", title: "Implement authentication flow", completed: false},
  {id: "4", title: "Write unit tests for components", completed: false},
  {id: "5", title: "Deploy to production", completed: false},
];

function DashboardPage() {
  const {User} = useDashboardPage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [todos, setTodos] = useState(sampleTodos);
  const [newTodo, setNewTodo] = useState("");

  const handleToggle = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {id: Date.now().toString(), title: newTodo.trim(), completed: false},
      ]);
      setNewTodo("");
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <SideBar User={User} />
      {/* Main content */}
      <main className="flex-1">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {User?.dataUser.name} ! Here&apos;s your task
              overview.
            </p>
          </div>

          {/* Stats badge */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
            <span className="text-sm text-muted-foreground">Completed:</span>
            <span className="text-sm font-medium text-foreground">
              {completedCount}/{totalCount}
            </span>
          </div>
        </header>

        {/* Content area */}
        <div className="p-4 lg:p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Add todo section */}
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="new-todo"
                  type="text"
                  placeholder="Add a new task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                />
              </div>
              <Button onClick={handleAddTodo} size="md">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>

            {/* Todo list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Your Tasks
                </h2>
                <span className="text-xs text-muted-foreground">
                  {todos.filter((t) => !t.completed).length} remaining
                </span>
              </div>

              {todos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
                    <ListTodo className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">
                    No tasks yet
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your first task to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      {...todo}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Progress card */}
            {todos.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground">
                    Progress
                  </h3>
                  <span className="text-2xl font-bold text-primary">
                    {Math.round((completedCount / totalCount) * 100)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{width: `${(completedCount / totalCount) * 100}%`}}
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  You&apos;ve completed {completedCount} out of {totalCount}{" "}
                  tasks. Keep it up!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
