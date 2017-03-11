namespace TimeTracker
{
    public class Break
    {
        public long id { get; set; }
        public string note { get; set; }
        public long from { get; set; }
        public long to { get; set; }
        public bool deleted { get; set; }
        public long createdAt { get; set; }
        public long updatedAt { get; set; }
    }
}
