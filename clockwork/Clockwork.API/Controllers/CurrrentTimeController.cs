using System;
using Microsoft.AspNetCore.Mvc;
using Clockwork.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Data;

namespace Clockwork.API.Controllers
{
    [Route("api/[controller]")]
    public class CurrentTimeController : Controller
    {
        // GET api/currenttime
        [HttpGet]
        public IActionResult Get()
        {
            var utcTime = DateTime.UtcNow;
            var serverTime = DateTime.Now;
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();

            var returnVal = new CurrentTimeQuery
            {
                UTCTime = utcTime,
                ClientIp = ip,
                Time = serverTime
            };

            using (var db = new ClockworkContext())
            {
                /*TODO: to make this works properly, use tools > NuGet Package Manager > Package Manager Counsole, open "20171207214527_InitialCreate" 
                 * in Migration folder and type in "Update-Database" to initialize the database, also check index.cshtml in clockwork.web, get url there need to be updated as well*/
                db.CurrentTimeQueries.Add(returnVal);
                var count = db.SaveChanges();
                Console.WriteLine("{0} records saved to database", count);

                Console.WriteLine();
                foreach (var CurrentTimeQuery in db.CurrentTimeQueries)
                {
                    Console.WriteLine(" - {0}", CurrentTimeQuery.UTCTime);
                }
            }

            return Ok(returnVal);
        }

        [HttpGet("database")]
        public IActionResult GetDateBase()
        {
            List<CurrentTimeQuery> result = new List<CurrentTimeQuery>();
            using (var db = new ClockworkContext())
            {
                result = db.CurrentTimeQueries.ToList();

            }
            return Ok(result);
        }
        [HttpPost]
        public IActionResult TimeZone([FromBody]TimeZoneInput input)
        {
            var utcTime = DateTime.UtcNow;
            var serverTime = DateTime.Now;
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();
            try
            {
                var timeZoneId = TimeZoneInfo.FindSystemTimeZoneById(input.Zone);
                var returnVal = new CurrentTimeQuery
                {
                    UTCTime = utcTime,
                    ClientIp = ip,
                    Time = TimeZoneInfo.ConvertTime(serverTime, timeZoneId)
                };

                using (var db = new ClockworkContext())
                {
                    /*TODO: to make this works properly, use tools > NuGet Package Manager > Package Manager Counsole, open "20171207214527_InitialCreate" 
                     * in Migration folder and type in "Update-Database" to initialize the database, also check index.cshtml in clockwork.web, get url there need to be updated as well*/
                    db.CurrentTimeQueries.Add(returnVal);
                    var count = db.SaveChanges();
                    Console.WriteLine("{0} records saved to database", count);

                    Console.WriteLine();
                    foreach (var CurrentTimeQuery in db.CurrentTimeQueries)
                    {
                        Console.WriteLine(" - {0}", CurrentTimeQuery.UTCTime);
                    }
                }

                return Ok(returnVal);
            }
            catch
            {
                return StatusCode(222, "invalid timezone");
            }


            
        }
    }
}
