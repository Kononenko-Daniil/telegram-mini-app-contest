namespace server_side.Models
{
    public class Hometask
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public string Content { get; set; }
        public DateTime Deadline { get; set; }
    }
}
