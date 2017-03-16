using System;
using System.Drawing;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Web.Script.Serialization;

namespace TimeTracker
{
    public partial class TimeTracker : Form
    {
        private Point mouseLocation;
        private DateTime timerStart;
        static HttpClient client = new HttpClient();
        private Break b;
        static bool done = false;

        public TimeTracker(Rectangle bounds)
        {
            InitializeComponent();
            Bounds = bounds;

            b = new Break();
            b.from = DateTime.Now.Ticks;
            
            client.BaseAddress = new Uri("http://localhost:8080/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

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
            Console.WriteLine("MouseMove");
            Register(b);
        }

        private void TimeTracker_KeyPress(object sender, KeyPressEventArgs e)
        {
            Console.WriteLine("KeyPress");
            Application.Exit();
        }

        private void TimeTracker_MouseMove(object sender, MouseEventArgs e)
        {
            if (!mouseLocation.IsEmpty)
            {
                // Terminate if mouse is moved a significant distance
                if (Math.Abs(mouseLocation.X - e.X) > 5 ||
                    Math.Abs(mouseLocation.Y - e.Y) > 5)
                    Register(b);

            }

            // Update current mouse location
            mouseLocation = e.Location;

        }

        private void timer_Tick(object sender, EventArgs e)
        {
            var duration = new TimeSpan(DateTime.Now.Ticks - b.from);
            label.Text = duration.ToString("c");
        }


        public async Task Register(Break b)
        {
            if (done)
                return;
            done = true;

            b.to = DateTime.Now.Ticks;
            

            var json = new JavaScriptSerializer().Serialize(b);
            var data = new StringContent(json);
            Console.WriteLine(data);

            var response = await client.PostAsync("/register", data);
            Console.WriteLine(response);
            Application.Exit();
        }


    }
}
