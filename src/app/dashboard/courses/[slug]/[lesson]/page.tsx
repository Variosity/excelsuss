export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { COURSES } from "@/lib/data/curriculum";
import { notFound } from "next/navigation";
import LessonViewer from "./LessonViewer";

interface Props {
  params: Promise<{ slug: string; lesson: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { slug, lesson: lessonSlug } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Try DB first, fall back to static curriculum
  const { data: dbCourse } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();

  const course: any = dbCourse || COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  // Fetch lessons + progress in parallel
  const [{ data: lessons }, { data: progress }] = await Promise.all([
    supabase
      .from("lessons")
      .select("*")
      .eq("course_id", course.id)
      .order("order_index", { ascending: true }),
    supabase
      .from("user_progress")
      .select("lesson_id, completed")
      .eq("user_id", user!.id)
      .eq("course_id", course.id),
  ]);

  const lesson = lessons?.find((l: any) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const completedIds = new Set<string>(
    progress
      ?.filter((p: any) => p.completed)
      .map((p: any) => p.lesson_id as string) ?? [],
  );
  const isCompleted = completedIds.has(lesson.id);

  const currentIdx = lessons?.findIndex((l: any) => l.id === lesson.id) ?? 0;
  const prevLesson = currentIdx > 0 ? lessons?.[currentIdx - 1] : null;
  const nextLesson =
    lessons && currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

  return (
    <LessonViewer
      course={course}
      lesson={lesson}
      lessons={lessons || []}
      completedIds={Array.from(completedIds)}
      isCompleted={isCompleted}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      userId={user!.id}
      courseSlug={slug}
    />
  );
}
