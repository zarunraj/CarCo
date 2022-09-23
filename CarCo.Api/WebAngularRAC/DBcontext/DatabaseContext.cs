using Microsoft.EntityFrameworkCore;
using WebAngularRAC.Models;

namespace WebAngularRAC.DBcontext
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<UserMasterTB> UserMasterTB { get; set; }
        public DbSet<CarTB> CarTB { get; set; }
        public DbSet<BookingTB> BookingTB { get; set; }
        public DbSet<PaymentTB> PaymentTB { get; set; }
        public DbSet<BankTB> BankTB { get; set; }
        public DbSet<CustomerTB> CustomerTB { get; set; }
        public DbSet<ReviewsTB> ReviewsTB { get; set; }
        public DbSet<OffersTB> OffersTB { get; set; }
        public DbSet<EmergencyTB> EmergencyTB { get; set; }
        public DbSet<DriverTB> DriverTB { get; set; }
        public DbSet<TokenManager> TokenManager { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<KMCostTB> KMCostTB { get; set; }
        public DbSet<VehicleTypeTB> VehicleTypeTB { get; set; }
    }
}
