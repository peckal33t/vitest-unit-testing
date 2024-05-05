import { describe, it, expect, beforeEach } from "vitest";
import { addTodo, toggleTodo, deleteTodo } from "../functions";
import { Todo } from "../types/Todo";

let myTodos: Todo[];

beforeEach(() => {
	myTodos = [
		{
			id: 1,
			title: "My first todo",
			completed: false,
		},
		{
			id: 2,
			title: "My second todo",
			completed: true,
		},
	];
});

describe("add a todo", () => {
	it("should add a todo", () => {
		const todo = addTodo("My new todo", myTodos);

		expect(todo.success).toBe(true);
		expect(myTodos.length).toBe(3);
		expect(myTodos[myTodos.length - 1].title).toBe("My new todo");
	});

	it("should not add a todo with empty title", () => {
		const todo = addTodo("", myTodos);

		expect(todo.success).toBe(false);
		expect(todo.error).toBe("Title cannot be empty");
		expect(myTodos.length).toBe(2);
	});

	it("should not add a todo with title shorter than 3 characters", () => {
		const todo = addTodo(".", myTodos);

		expect(todo.success).toBe(false);
		expect(todo.error).toBe("Title must be at least 3 characters long");
		expect(myTodos.length).toBe(2);
	});
});

describe("toggle a todo", () => {
	it("should toggle a todo", () => {
		const todo = toggleTodo(1, myTodos);

		expect(todo.success).toBe(true);
		expect(myTodos[0].completed).toBe(true);
	});

	it("should not toggle a todo that does not exist", () => {
		const todo = toggleTodo(3, myTodos);

		expect(todo.success).toBe(false);
		expect(todo.error).toBe("Todo not found");
		expect(myTodos[0].completed).toBe(false);
		expect(myTodos[1].completed).toBe(true);
	});
});

describe("delete a todo", () => {
	it("should delete a todo", () => {
		const todo = deleteTodo(1, myTodos);

		expect(todo.success).toBe(true);
		expect(myTodos.length).toBe(1);
		expect(myTodos[0].id).toBe(2);
	});

	it("should not delete a todo that does not exist", () => {
		const todo = deleteTodo(3, myTodos);

		expect(todo.success).toBe(false);
		expect(todo.error).toBe("Todo not found");
		expect(myTodos.length).toBe(2);
	});
});
