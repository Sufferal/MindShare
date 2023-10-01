using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Sockets;
using System.Text;

namespace MindShare.ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServerController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            // Your existing server logic goes here
            string ipAddress = "127.0.0.1";
            int port = 8080;
            TcpClient client = new TcpClient(ipAddress, port);
            NetworkStream stream = client.GetStream();

            // Send a sample request to your server
            string request = "Hello, Server!";
            byte[] requestData = Encoding.ASCII.GetBytes(request);
            stream.Write(requestData, 0, requestData.Length);

            // Read the response from your server
            byte[] buffer = new byte[1024];
            int bytesRead = stream.Read(buffer, 0, buffer.Length);
            string response = Encoding.ASCII.GetString(buffer, 0, bytesRead);

            // Close the client connection
            client.Close();

            return $"Response from server: {response}";
        }
    }
}