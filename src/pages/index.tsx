import Card from "@/components/card";
import Header from "@/components/header";
import TodoForm from "@/components/todoForm";
import TodoList from "@/components/todoList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <Header />
      <Card>
        <TodoForm />
      </Card>
      <Card>
        <TodoList />
      </Card>
    </div>
  );
}
