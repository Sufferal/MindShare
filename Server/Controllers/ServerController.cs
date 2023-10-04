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
        public IActionResult GetHello()
        {
            string message = "Hello, World!";
            return Ok(message);
        }
    }
}