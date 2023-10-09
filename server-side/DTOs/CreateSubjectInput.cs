using server_side.Types.Enums;

namespace server_side.DTOs
{
    public class CreateSubjectInput
    {
        public string Name { get; set; }
        public SubjectLessonType LessonType { get; set; }
        public string TeacherName { get; set; }
    }
}
