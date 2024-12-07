using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ProductManagementAPI.Models;

namespace ProductManagementAPI.Helpers
{
    public class JwtHelper
    {
        private readonly string _jwtSecret;

        public JwtHelper(string jwtSecret)
        {
            _jwtSecret = jwtSecret;
        }

        public string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            // Create the JWT with issuer, audience, claims, and signing credentials
            var token = new JwtSecurityToken(
                issuer: "ProductManagementAPI",
                audience: "ProductManagementClient",
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token); // Serialize the token to a string
        }
    }
}
