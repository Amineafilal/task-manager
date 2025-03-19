import { NextResponse } from "next/server"

// This is a mock implementation - in a real app, this would use MongoDB

// Reference to the mock tasks array (in a real app, this would be MongoDB)
let tasks = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the quarterly project proposal for the marketing team",
    dueDate: "2024-03-15",
    priority: "high",
    status: "incomplete",
    category: "work",
    userId: "user1",
  },
  {
    id: "2",
    title: "Schedule team meeting",
    description: "Set up a team meeting to discuss the new product launch",
    dueDate: "2024-03-10",
    priority: "medium",
    status: "complete",
    category: "work",
    userId: "user1",
  },
]

// GET /api/tasks/[id] - Get a specific task
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // In a real app, you would:
  // 1. Authenticate the user
  // 2. Query MongoDB for the task with the given ID
  // 3. Check if the task belongs to the authenticated user

  const task = tasks.find((t) => t.id === id)

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  return NextResponse.json(task)
}

// PUT /api/tasks/[id] - Update a task
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // In a real app, you would:
    // 1. Authenticate the user
    // 2. Query MongoDB for the task with the given ID
    // 3. Check if the task belongs to the authenticated user

    const taskIndex = tasks.findIndex((t) => t.id === id)

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    // Update the task
    const updatedTask = {
      ...tasks[taskIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    // In a real app, update in MongoDB
    tasks[taskIndex] = updatedTask

    return NextResponse.json(updatedTask)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // In a real app, you would:
  // 1. Authenticate the user
  // 2. Query MongoDB for the task with the given ID
  // 3. Check if the task belongs to the authenticated user

  const taskIndex = tasks.findIndex((t) => t.id === id)

  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  // In a real app, delete from MongoDB
  tasks = tasks.filter((t) => t.id !== id)

  return NextResponse.json({ success: true })
}

