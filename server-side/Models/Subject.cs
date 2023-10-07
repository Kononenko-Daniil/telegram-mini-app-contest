using server_side.Types.Enums;

namespace server_side.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string Name { get; set; }
        public SubjectLessonType LessonType { get; set; }
        public string TeacherName { get; set; }
    }
}
