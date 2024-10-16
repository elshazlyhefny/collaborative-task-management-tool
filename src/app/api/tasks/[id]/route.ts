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
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session  = await getServerSession(authOptions);

    const { userId } = { userId: (session?.user as UserWithId)?.id, };
    const { id } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR DELETING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
