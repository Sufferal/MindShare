namespace Server.Domain;

public class Comment
{
    public int Id { get; set; }
    public string Author { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public int PostId { get; set; }
}