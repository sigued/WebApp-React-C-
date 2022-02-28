using API.Common.Enums;
using API.Entities;
using API.Entities.CorrelationsAndOrders;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;


namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "member"},
                new AppRole{Name = "sadmin"},
                new AppRole{Name = "admin"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, AppRolesType.member.ToString());
            }

            var sadmin = new AppUser
            {
                UserName = "sadmin",
                Status = AppUserStatus.Active,
                Email = "sadmin@test.com",
                Profession = "superAdministrateur"
            };

            var admin = new AppUser
            {
                UserName = "admin",
                Status = AppUserStatus.Active,
                Email = "admin@test.com",
                Profession = "justeAdministrateur"
            };
            //faut pas oublier d'ajouter dans la creation du sadmin
            await userManager.CreateAsync(sadmin, "Pa$$w0rd");
            await userManager.AddToRoleAsync(sadmin, AppRolesType.sadmin.ToString());
            await userManager.AddToRoleAsync(sadmin, AppRolesType.admin.ToString());
            await userManager.AddToRoleAsync(sadmin, AppRolesType.member.ToString());

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRoleAsync(admin, AppRolesType.admin.ToString());
            await userManager.AddToRoleAsync(admin, AppRolesType.member.ToString());


        }

        public static async Task SeedOrder(IParameterRepository paramRepo, ICorrelationRepository corrRepo)
        {
            if (true)
            {
                // Parameter
                await paramRepo.Add(new Parameter("Indice des vides", false, "Paramètres de caractérisation", "e", string.Empty, 0));
                await paramRepo.Add(new Parameter("Porosité", false, "Paramètres de caractérisation", "n", "%", 0));
                await paramRepo.Add(new Parameter("Degré de saturation", false, "Paramètres de caractérisation", "Sr", "%", 0));
                await paramRepo.Add(new Parameter("Teneur en eau", false, "Paramètres de caractérisation", "w", "%", 0));
                await paramRepo.Add(new Parameter("Masse volumique", false, "Paramètres de caractérisation", "ρ", "kg/m^3", 0));
                await paramRepo.Add(new Parameter("Masse volumique des grains solides", false, "Paramètres de caractérisation", "ρs", "kg/m^3", 0));
                await paramRepo.Add(new Parameter("Masse volumique du sol sec", false, "Paramètres de caractérisation", "ρd", "kg/m^3", 0));
                await paramRepo.Add(new Parameter("Masse volumique du sol saturé", false, "Paramètres de caractérisation", "ρsat", "kg/m^3", 0));
                await paramRepo.Add(new Parameter("Masse volumique du sol déjaugé", false, "Paramètres de caractérisation", "ρ'", "kg/m^3", 0));
                await paramRepo.Add(new Parameter("Poids volumique total", false, "Paramètres de caractérisation", "γ", "kg/m^3", 0));
                await paramRepo.Add(new Parameter("Poids volumique des grains solides", false, "Paramètres de caractérisation", "γs", "kg/m^3", 0));
                await paramRepo.Add(new Parameter("Poids volumique de l'eau", true, "Paramètres de caractérisation", "γw", "kg/m^3", 9.81));
                await paramRepo.Add(new Parameter("Densité relative des grains", false, "Paramètres de caractérisation", "Dr", string.Empty, 0));
                await paramRepo.Add(new Parameter("Teneur en eau à saturation", false, "Paramètres de caractérisation", "wsat", "%", 0));
                await paramRepo.Add(new Parameter("Teneur en eau volumique", false, "Paramètres de caractérisation", "θ", string.Empty, 0));
                await paramRepo.Add(new Parameter("Coefficient de courbure", false, "Paramètres de caractérisation", "Cc", string.Empty, 0));
                await paramRepo.Add(new Parameter("Coefficient d'uniformité", false, "Paramètres de caractérisation", "Cu", string.Empty, 0));
                await paramRepo.Add(new Parameter("Conductivité hydraulique", false, "Paramètres hydrauliques", "k", "m/s", 0));
                await paramRepo.Add(new Parameter("Perméabilité", false, "Paramètres hydrauliques", "K", "m^2", 0));
                await paramRepo.Add(new Parameter("Gradient hydraulique", false, "Paramètres hydrauliques", "i", string.Empty, 0));
                await paramRepo.Add(new Parameter("Teneur en eau à saturation", false, "Paramètres hydrauliques", "θs", string.Empty, 0));
                await paramRepo.Add(new Parameter("Teneur en eau à satiation", false, "Paramètres hydrauliques", "θo", string.Empty, 0));
                await paramRepo.Add(new Parameter("Teneur en eau résiduelle", false, "Paramètres hydrauliques", "θr", string.Empty, 0));
                await paramRepo.Add(new Parameter("Conductivité hydraulique à saturation", false, "Paramètres hydrauliques", "ks", "m/s", 0));
                await paramRepo.Add(new Parameter("Conductivité hydraulique à satiation", false, "Paramètres hydrauliques", "ko", "m/s", 0));
                await paramRepo.Add(new Parameter("Résistance à la compression simple", false, "Paramètres mécaniques", "Rc", "kPa", 0));
                await paramRepo.Add(new Parameter("Résistance au cisaillement", false, "Paramètres mécaniques", "Cu", "kPa", 0));
                await paramRepo.Add(new Parameter("Coefficient de compression vierge", false, "Paramètres mécaniques", "Cc", string.Empty, 0));
                await paramRepo.Add(new Parameter("Coefficient de recompression", false, "Paramètres mécaniques", "Cr", string.Empty, 0));
                await paramRepo.Add(new Parameter("Rapport de surconsolidation", false, "Paramètres mécaniques", "OCR", string.Empty, 0));
                await paramRepo.Add(new Parameter("Contrainte de préconsolidation", false, "Paramètres mécaniques", "σ'p", "kPa", 0));


                // Help Tables
                var equation = new List<Equation>();
                equation.Add(new Equation("100 * (Cc^(2/3))", "Argiles finlandaises", "Argiles finlandaises"));
                equation.Add(new Equation("Cc / 0.0115", "Sols organiques ,tourbes, limons et argiles organiques", "Moran et al (1958)"));
                equation.Add(new Equation("(Cc + 0.05) / 0.01", "Toutes les argiles", "Azzouz et al.(1976)"));
                equation.Add(new Equation("Cc / 0.01", "Toutes les argiles", "Koppula (1981)"));
                equation.Add(new Equation("(Cc + 0.075) / 0.01", "Toutes les argiles", "Herrero (1983)"));
                var listpar = new List<Parameter>();
                var output = await paramRepo.GetBySymboleAndCategory("w", "Paramètres de caractérisation");
                listpar.Add(await paramRepo.GetBySymboleAndCategory("Cc", "Paramètres de caractérisation"));
                await corrRepo.Add(new Correlation(listpar, output.Id, CorrelationType.Equation, equation, null, SetDescription(listpar, output)));

                equation = new List<Equation>();
                equation.Add(new Equation("(Cc + 0.049) / 0.007", "Argiles remaniées", "Skempton (1944)"));
                equation.Add(new Equation("(Cc + 0.0414) / 0.0046", "Argiles Brésiliennes", "Cozzolino (1961)"));
                equation.Add(new Equation("(Cc + 0.09) / 0.009", "Argiles normalement consolidées", "Terzaghi et Peck (1967)"));
                equation.Add(new Equation("(Cc + 0.054) / 0.006", "Toutes les argiles avec  WL <100%", "Azzouz et al.(1976)"));
                equation.Add(new Equation("(Cc + 0.1196) / 0.0092", "Toutes les argiles", "Mayne(1980)"));
                listpar = new List<Parameter>();
                output = await paramRepo.GetBySymboleAndCategory("w", "Paramètres de caractérisation");
                listpar.Add(await paramRepo.GetBySymboleAndCategory("Cc", "Paramètres de caractérisation"));
                await corrRepo.Add(new Correlation(listpar, output.Id, CorrelationType.Equation, equation, null, SetDescription(listpar, output)));

                equation = new List<Equation>();
                equation.Add(new Equation("(Cc - 0.37 * e + 0.1258) / 0.00111", "Pour les sols argileux", "Azzouz et al.(1976)"));
                equation.Add(new Equation("(Cc - 0.411 * e + 0.156) / 0.00058", "Pour les sols argileux", "Al Khafaji et Andersland (1992)"));
                listpar = new List<Parameter>();
                output = await paramRepo.GetBySymboleAndCategory("w", "Paramètres de caractérisation");
                listpar.Add(await paramRepo.GetBySymboleAndCategory("Cc", "Paramètres de caractérisation"));
                listpar.Add(await paramRepo.GetBySymboleAndCategory("e", "Paramètres de caractérisation"));
                await corrRepo.Add(new Correlation(listpar, output.Id, CorrelationType.Equation, equation, null, SetDescription(listpar, output)));

                equation = new List<Equation>();
                equation.Add(new Equation("(Cc + 0.189) / 0.54", "Toutes les argiles", "Nishida (1956)"));
                equation.Add(new Equation("(Cc + 0.0783) / 0.29", "Sols cohesifs, non organiques; Argiles limoneuses; argiles", "Hough (1957)"));
                equation.Add(new Equation("(Cc + 0.175) / 0.35", "Organique, sols à grains fins, limon organique", "Hough (1957)"));
                equation.Add(new Equation("(Cc + 0.1075) / 0.43", "Argiles brésiliennes", "Cozzolino (1961)"));
                equation.Add(new Equation("(Cc + 0.375) / 0.75", "Sols de faible plasticité", "Sowers (1970)"));
                listpar = new List<Parameter>();
                output = await paramRepo.GetBySymboleAndCategory("e", "Paramètres de caractérisation");
                listpar.Add(await paramRepo.GetBySymboleAndCategory("Cc", "Paramètres de caractérisation"));
                await corrRepo.Add(new Correlation(listpar, output.Id, CorrelationType.Equation, equation, null, SetDescription(listpar, output)));

                equation = new List<Equation>();
                equation.Add(new Equation("138 * Cc - 26", "Corrélation utilisée pour les argiles CM , CL et CH", string.Empty));
                listpar = new List<Parameter>();
                output = await paramRepo.GetBySymboleAndCategory("i", "Paramètres hydrauliques");
                listpar.Add(await paramRepo.GetBySymboleAndCategory("Cc", "Paramètres de caractérisation"));
                await corrRepo.Add(new Correlation(listpar, output.Id, CorrelationType.Equation, equation, null, SetDescription(listpar, output)));

                listpar = new List<Parameter>();
                output = await paramRepo.GetBySymboleAndCategory("ρd", "Paramètres de caractérisation");
                listpar.Add(await paramRepo.GetBySymboleAndCategory("Cc", "Paramètres de caractérisation"));
                listpar.Add(await paramRepo.GetBySymboleAndCategory("w", "Paramètres de caractérisation"));
                var listAbaques = new List<Abaque>();
                listAbaques.Add(new Abaque($"Abaque {listAbaques.Count + 1}: Pour les argiles non remaniées"));
                listAbaques.Add(new Abaque($"Abaque {listAbaques.Count + 1}: Pour les argiles alluvionnaires et glaciaires"));
                await corrRepo.Add(new Correlation(listpar, output.Id, CorrelationType.Abaque, null, listAbaques, SetDescription(listpar, output)));

                var correlll = await corrRepo.GetAll();
            }

        }

        private static string SetDescription(ICollection<Parameter> listParam, Parameter output)
        {
            string unit = (output.Unit == "") ? string.Empty : $" ({ output.Unit})";
            string leOrLes = (listParam.Count > 1) ? "les paramètres" : "le paramètre";
            string description = $"Calcul de {output.Symbole}{unit} avec {leOrLes}:";
            foreach(var p in listParam)
            {
                unit = (p.Unit == "") ? string.Empty : $" ({ p.Unit})";
                description += $" {p.Symbole}{unit},";
            }

            return description.Remove(description.Length - 1);
        }
    }
}
