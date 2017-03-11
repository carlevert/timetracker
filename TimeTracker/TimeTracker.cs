using System;
using System.Drawing;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TimeTracker
{
    public partial class TimeTracker : Form
    {
        private Point mouseLocation;
        private DateTime timerStart;
        static HttpClient client = new HttpClient();

        public TimeTracker(Rectangle Bounds)
        {
            InitializeComponent();
            this.Bounds = Bounds;
            this.timerStart = DateTime.Now;

        }

        private void TimeTracker_Load(object sender, System.EventArgs e)
        {
            Cursor.Hide();
            TopMost = true;

            label.Width = Width;
            label.Left = 0;
            label.Top = (int) (Height * 0.3);

            timer.Interval = 100;
            timer.Tick += new EventHandler(timer_Tick);
            timer.Start();
        }


        private void TimeTracker_MouseClick(object sender, MouseEventArgs e)
        {
            Close();
            //Application.Exit();
        }

        private void TimeTracker_KeyPress(object sender, KeyPressEventArgs e)
        {
            //Application.Exit();
        }

        private void TimeTracker_MouseMove(object sender, MouseEventArgs e)
        {
            if (!mouseLocation.IsEmpty)
            {
                // Terminate if mouse is moved a significant distance
                if (Math.Abs(mouseLocation.X - e.X) > 5 ||
                    Math.Abs(mouseLocation.Y - e.Y) > 5)
                    Close();
                    // Application.Exit();
            }

            // Update current mouse location
            mouseLocation = e.Location;

        }

        private void timer_Tick(object sender, EventArgs e)
        {
            var duration = DateTime.Now - this.timerStart;
            label.Text = duration.ToString("c");
        }

        static async Task RunAsync()
        {
            // New code:
            client.BaseAddress = new Uri("http://localhost:55268/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            Console.ReadLine();
        }

        public async Task Register(Break b)
        {
        }


    }
}
