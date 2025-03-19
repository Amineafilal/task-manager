import { NextResponse } from "next/server"

// In a real application, this would connect to MongoDB
// This is a simplified mock implementation

// Sample task data (this would be in MongoDB in a real app)
const tasks = [
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

// GET /api/tasks - Get all tasks for a user
export async function GET(request: Request) {
  // In a real app, you would:
  // 1. Authenticate the user
  // 2. Get the user ID from the authenticated session
  // 3. Query MongoDB for tasks belonging to that user

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "user1" // Default for demo

  const userTasks = tasks.filter((task) => task.userId === userId)

  return NextResponse.json(userTasks)
}

// POST /api/tasks - Create a new task
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // In a real app, get the user ID from the authenticated session
    const userId = "user1" // Default for demo

    const newTask = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || "",
      dueDate: body.dueDate || new Date().toISOString().split("T")[0],
      priority: body.priority || "medium",
      status: body.status || "incomplete",
      category: body.category || "work",
      userId,
    }

    // In a real app, save to MongoDB
    tasks.push(newTask)

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}

