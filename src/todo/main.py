"""
Main CLI application for the Todo application.
"""
from src.todo.manager import TodoManager


def display_tasks(tasks):
    """
    Display all tasks in a formatted table.

    Args:
        tasks (List[Task]): List of tasks to display
    """
    if not tasks:
        print("\nNo tasks yet.")
        return

    # Print table header
    print("\n{:<5} {:<30} {:<40} {:<15}".format("ID", "Title", "Description", "Status"))
    print("-" * 95)

    # Print each task
    for task in tasks:
        status = "Completed" if task.completed else "Pending"
        # Truncate description if too long
        description = task.description if len(task.description) <= 40 else task.description[:37] + "..."
        print("{:<5} {:<30} {:<40} {:<15}".format(task.id, task.title[:30], description, status))


def main():
    """Main function to run the Todo CLI application."""
    print("Todo List Application")
    todo_manager = TodoManager()

    while True:
        print("\n1. Add Task")
        print("2. View Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("5. Mark Complete")
        print("6. Exit")

        choice = input("Enter your choice: ").strip()

        if choice == "1":
            title = input("Enter task title (required): ").strip()
            description = input("Enter task description (optional): ").strip()

            result = todo_manager.add_task(title, description)
            print(result)
        elif choice == "2":
            tasks = todo_manager.get_all_tasks()
            display_tasks(tasks)
        elif choice == "3":
            try:
                task_id_input = input("Enter task ID to update: ").strip()
                if not task_id_input:
                    print("Error: Task ID cannot be empty.")
                    continue
                task_id = int(task_id_input)
                new_title = input("Enter new title: ").strip()
                new_description = input("Enter new description (or press Enter to keep current): ").strip()

                # If description input is empty, use the current description
                if not new_description:
                    # We need to get the current task to keep its description
                    tasks = todo_manager.get_all_tasks()
                    current_description = ""
                    for task in tasks:
                        if task.id == task_id:
                            current_description = task.description
                            break
                    result = todo_manager.update_task(task_id, new_title, current_description)
                else:
                    result = todo_manager.update_task(task_id, new_title, new_description)

                print(result)
            except ValueError:
                print("Error: Task ID must be a number.")
        elif choice == "4":
            try:
                task_id_input = input("Enter task ID to delete: ").strip()
                if not task_id_input:
                    print("Error: Task ID cannot be empty.")
                    continue
                task_id = int(task_id_input)
                result = todo_manager.delete_task(task_id)
                print(result)
            except ValueError:
                print("Error: Task ID must be a number.")
        elif choice == "5":
            try:
                task_id_input = input("Enter task ID to mark complete: ").strip()
                if not task_id_input:
                    print("Error: Task ID cannot be empty.")
                    continue
                task_id = int(task_id_input)
                result = todo_manager.mark_complete(task_id)
                print(result)
            except ValueError:
                print("Error: Task ID must be a number.")
        elif choice == "6":
            print("Exiting application.")
            break
        else:
            print("Invalid option. Please enter a number between 1 and 6.")


if __name__ == "__main__":
    main()