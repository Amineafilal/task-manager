import { NextResponse } from "next/server"

// In a real application, this would connect to MongoDB
// This is a simplified mock implementation

// Sample users data (this would be in MongoDB in a real app)
const users = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    // In a real app, this would be a hashed password
    password: "password123",
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === body.email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // In a real app, you would hash the password
    // const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = {
      id: `user${users.length + 1}`,
      name: body.name,
      email: body.email,
      password: body.password, // In a real app, this would be hashedPassword
    }

    // In a real app, save to MongoDB
    users.push(newUser)

    // Don't return the password in the response
    const { password, ...userWithoutPassword } = newUser

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}

