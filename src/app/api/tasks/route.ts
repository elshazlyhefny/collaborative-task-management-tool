import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
interface UserWithId {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
export async function POST(req: Request) {
  try {
    const session  = await getServerSession(authOptions);

    const { userId } = { userId: (session?.user as UserWithId)?.id, };

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET( ) {
  // try {
    const session  = await getServerSession(authOptions);
    console.log(session)
    const { userId } = { userId: (session?.user as UserWithId)?.id, };

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks);
  // } catch (error) {
  //   console.log("ERROR GETTING TASKS: ", error);
  //   return NextResponse.json({ error: "Error updating task", status: 500 });
  // }
}

export async function PUT(req: Request) {
  try {
    const session  = await getServerSession(authOptions);

    const { userId } = { userId: (session?.user as UserWithId)?.id, };

    const { isCompleted, id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
