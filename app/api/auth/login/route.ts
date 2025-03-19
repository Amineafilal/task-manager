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
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((user) => user.email === body.email)

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In a real app, you would compare hashed passwords
    // const passwordMatch = await bcrypt.compare(body.password, user.password);
    const passwordMatch = body.password === user.password

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In a real app, you would:
    // 1. Create a session or JWT token
    // 2. Set cookies or return the token

    // Don't return the password in the response
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      // In a real app, you would include a token here
      token: "mock_jwt_token",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 })
  }
}

